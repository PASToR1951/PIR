import { Application, Router } from "jsr:@oak/oak";
import postgres from "https://deno.land/x/postgresjs/mod.js";
import "jsr:@std/dotenv/load";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set in .env");

const sql = postgres(DATABASE_URL);
const PORT = Number(Deno.env.get("PORT") ?? 8000);

const VALID_STATUSES = ["draft", "submitted", "approved"];

// ── Helpers ──────────────────────────────────
function parseNum(val: unknown): number | null {
  if (val === null || val === undefined || val === "") return null;
  const n = parseFloat(String(val));
  return isNaN(n) ? null : n;
}

function requireFields(body: Record<string, unknown>, fields: string[]): string | null {
  for (const f of fields) {
    if (body[f] === undefined || body[f] === null || String(body[f]).trim() === "") {
      return `Missing required field: ${f}`;
    }
  }
  return null;
}

// ── Router ──────────────────────────────────
const router = new Router();

// ── Schools ──
router.get("/api/schools", async (context) => {
  try {
    const schools = await sql`
            SELECT s.id, s.name, s.level, c.cluster_number as cluster
            FROM schools s
            LEFT JOIN clusters c ON s.cluster_id = c.id
            ORDER BY c.cluster_number ASC, s.name ASC
        `;
    context.response.body = schools;
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// ── Programs ──
router.get("/api/programs", async (context) => {
  try {
    const programs = await sql`SELECT id, title FROM programs ORDER BY title ASC`;
    context.response.body = programs;
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// ================================================================
// AIP ENDPOINTS
// ================================================================

// CREATE AIP
router.post("/api/aip", async (context) => {
  try {
    const body = await context.request.body.json();
    const err = requireFields(body, ["school_id", "fiscal_year"]);
    if (err) {
      context.response.status = 400;
      context.response.body = { error: err };
      return;
    }

    const status = VALID_STATUSES.includes(body.status) ? body.status : "draft";

    const result = await sql.begin(async (tx: any) => {
      const [sub] = await tx`
        INSERT INTO aip_submissions (school_id, fiscal_year, pillar, deped_program, sip_title, project_coordinator, objectives, indicators, annual_target, status)
        VALUES (
          ${parseInt(body.school_id)},
          ${parseInt(body.fiscal_year)},
          ${body.pillar || null},
          ${body.deped_program || null},
          ${body.sip_title || null},
          ${body.project_coordinator || null},
          ${body.objectives || null},
          ${body.indicators || null},
          ${body.annual_target || null},
          ${status}
        )
        RETURNING *
      `;

      if (Array.isArray(body.activities)) {
        for (let i = 0; i < body.activities.length; i++) {
          const act = body.activities[i];
          await tx`
            INSERT INTO aip_activities (aip_id, phase, sort_order, name, period, persons_involved, outputs, budget_amount, budget_source)
            VALUES (
              ${sub.id},
              ${act.phase || "Planning"},
              ${i},
              ${act.name || null},
              ${act.period || null},
              ${act.persons_involved || null},
              ${act.outputs || null},
              ${parseNum(act.budget_amount)},
              ${act.budget_source || null}
            )
          `;
        }
      }

      return sub;
    });

    context.response.status = 201;
    context.response.body = result;
  } catch (e: any) {
    if (e.code === "23505") {
      context.response.status = 409;
      context.response.body = { error: "An AIP already exists for this school/program/year combination." };
    } else {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
      console.error(e);
    }
  }
});

// LIST AIPs
router.get("/api/aip", async (context) => {
  try {
    const schoolId = context.request.url.searchParams.get("school_id");
    let aips;
    if (schoolId) {
      aips = await sql`
        SELECT a.*, s.name as school_name
        FROM aip_submissions a
        JOIN schools s ON a.school_id = s.id
        WHERE a.school_id = ${parseInt(schoolId)}
        ORDER BY a.created_at DESC
      `;
    } else {
      aips = await sql`
        SELECT a.*, s.name as school_name
        FROM aip_submissions a
        JOIN schools s ON a.school_id = s.id
        ORDER BY a.created_at DESC
        LIMIT 100
      `;
    }
    context.response.body = aips;
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// GET SINGLE AIP
router.get("/api/aip/:id", async (context) => {
  try {
    const id = parseInt(context.params.id!);
    const [aip] = await sql`
      SELECT a.*, s.name as school_name
      FROM aip_submissions a
      JOIN schools s ON a.school_id = s.id
      WHERE a.id = ${id}
    `;
    if (!aip) {
      context.response.status = 404;
      context.response.body = { error: "AIP not found" };
      return;
    }
    const activities = await sql`
      SELECT * FROM aip_activities WHERE aip_id = ${id} ORDER BY sort_order ASC
    `;
    context.response.body = { ...aip, activities };
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// ================================================================
// PIR ENDPOINTS
// ================================================================

// CREATE PIR
router.post("/api/pir", async (context) => {
  try {
    const body = await context.request.body.json();
    const err = requireFields(body, ["school_id", "quarter"]);
    if (err) {
      context.response.status = 400;
      context.response.body = { error: err };
      return;
    }

    const status = VALID_STATUSES.includes(body.status) ? body.status : "draft";

    const result = await sql.begin(async (tx: any) => {
      const [sub] = await tx`
        INSERT INTO pir_submissions (school_id, program, quarter, owner, budget, fund_source, status)
        VALUES (
          ${parseInt(body.school_id)},
          ${body.program || null},
          ${body.quarter},
          ${body.owner || null},
          ${parseNum(body.budget)},
          ${body.fund_source || null},
          ${status}
        )
        RETURNING *
      `;

      if (Array.isArray(body.activities)) {
        for (let i = 0; i < body.activities.length; i++) {
          const act = body.activities[i];
          await tx`
            INSERT INTO pir_activities (pir_id, sort_order, name, physical_target, financial_target, physical_accomplishment, financial_accomplishment, actions_to_address_gap)
            VALUES (
              ${sub.id},
              ${i},
              ${act.name || null},
              ${parseNum(act.physical_target)},
              ${parseNum(act.financial_target)},
              ${parseNum(act.physical_accomplishment)},
              ${parseNum(act.financial_accomplishment)},
              ${act.actions_to_address_gap || null}
            )
          `;
        }
      }

      if (Array.isArray(body.factors)) {
        for (const factor of body.factors) {
          await tx`
            INSERT INTO pir_factors (pir_id, factor_type, facilitating, hindering)
            VALUES (
              ${sub.id},
              ${factor.factor_type},
              ${factor.facilitating || null},
              ${factor.hindering || null}
            )
          `;
        }
      }

      return sub;
    });

    context.response.status = 201;
    context.response.body = result;
  } catch (e: any) {
    if (e.code === "23505") {
      context.response.status = 409;
      context.response.body = { error: "A PIR already exists for this school/program/quarter combination." };
    } else {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
      console.error(e);
    }
  }
});

// LIST PIRs
router.get("/api/pir", async (context) => {
  try {
    const schoolId = context.request.url.searchParams.get("school_id");
    let pirs;
    if (schoolId) {
      pirs = await sql`
        SELECT p.*, s.name as school_name
        FROM pir_submissions p
        JOIN schools s ON p.school_id = s.id
        WHERE p.school_id = ${parseInt(schoolId)}
        ORDER BY p.created_at DESC
      `;
    } else {
      pirs = await sql`
        SELECT p.*, s.name as school_name
        FROM pir_submissions p
        JOIN schools s ON p.school_id = s.id
        ORDER BY p.created_at DESC
        LIMIT 100
      `;
    }
    context.response.body = pirs;
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// GET SINGLE PIR
router.get("/api/pir/:id", async (context) => {
  try {
    const id = parseInt(context.params.id!);
    const [pir] = await sql`
      SELECT p.*, s.name as school_name
      FROM pir_submissions p
      JOIN schools s ON p.school_id = s.id
      WHERE p.id = ${id}
    `;
    if (!pir) {
      context.response.status = 404;
      context.response.body = { error: "PIR not found" };
      return;
    }
    const activities = await sql`
      SELECT * FROM pir_activities WHERE pir_id = ${id} ORDER BY sort_order ASC
    `;
    const factors = await sql`
      SELECT * FROM pir_factors WHERE pir_id = ${id} ORDER BY factor_type ASC
    `;
    context.response.body = { ...pir, activities, factors };
  } catch (e) {
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
    console.error(e);
  }
});

// ── App Setup ──────────────────────────────────
const app = new Application();

// Simple CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });
