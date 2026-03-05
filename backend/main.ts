import { Application, Router } from "jsr:@oak/oak";
import postgres from "https://deno.land/x/postgresjs/mod.js";
import "jsr:@std/dotenv/load";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set in .env");

const sql = postgres(DATABASE_URL);
const PORT = Number(Deno.env.get("PORT") ?? 8000);

const router = new Router();
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
