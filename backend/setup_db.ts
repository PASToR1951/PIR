import postgres from "https://deno.land/x/postgresjs/mod.js";
import { parse } from "jsr:@std/csv";
import "jsr:@std/dotenv/load";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set in .env");
const sql = postgres(DATABASE_URL);

async function main() {
  console.log("Reading CSV...");
  const csvText = await Deno.readTextFile("./data/Schools.csv");
  const records = parse(csvText, { skipFirstRow: true });

  console.log("Setting up tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS clusters (
        id SERIAL PRIMARY KEY,
        cluster_number INTEGER UNIQUE,
        name VARCHAR(255)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        level VARCHAR(50),
        cluster_id INTEGER REFERENCES clusters(id)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE,
        school_level_requirement VARCHAR(50)
    );
  `;

  // ── AIP Tables ──────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS aip_submissions (
        id SERIAL PRIMARY KEY,
        school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
        fiscal_year INTEGER NOT NULL,
        pillar TEXT,
        deped_program VARCHAR(255),
        sip_title TEXT,
        project_coordinator VARCHAR(255),
        objectives TEXT,
        indicators TEXT,
        annual_target TEXT,
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(school_id, fiscal_year, deped_program)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS aip_activities (
        id SERIAL PRIMARY KEY,
        aip_id INTEGER NOT NULL REFERENCES aip_submissions(id) ON DELETE CASCADE,
        phase VARCHAR(50) NOT NULL,
        sort_order INTEGER DEFAULT 0,
        name TEXT,
        period VARCHAR(100),
        persons_involved TEXT,
        outputs TEXT,
        budget_amount NUMERIC(12,2),
        budget_source VARCHAR(100)
    );
  `;

  // ── PIR Tables ──────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS pir_submissions (
        id SERIAL PRIMARY KEY,
        school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
        program VARCHAR(255),
        quarter VARCHAR(30) NOT NULL,
        owner VARCHAR(255),
        budget NUMERIC(12,2),
        fund_source VARCHAR(50),
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(school_id, program, quarter)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pir_activities (
        id SERIAL PRIMARY KEY,
        pir_id INTEGER NOT NULL REFERENCES pir_submissions(id) ON DELETE CASCADE,
        sort_order INTEGER DEFAULT 0,
        name TEXT,
        physical_target NUMERIC(12,2),
        financial_target NUMERIC(12,2),
        physical_accomplishment NUMERIC(12,2),
        financial_accomplishment NUMERIC(12,2),
        actions_to_address_gap TEXT
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pir_factors (
        id SERIAL PRIMARY KEY,
        pir_id INTEGER NOT NULL REFERENCES pir_submissions(id) ON DELETE CASCADE,
        factor_type VARCHAR(50) NOT NULL,
        facilitating TEXT,
        hindering TEXT
    );
  `;

  // Start with fresh tables if this is run multiple times
  await sql`TRUNCATE TABLE programs RESTART IDENTITY CASCADE`;
  await sql`TRUNCATE TABLE schools RESTART IDENTITY CASCADE`;
  await sql`TRUNCATE TABLE clusters RESTART IDENTITY CASCADE`;

  console.log("Extracting unique clusters...");
  // Use a Set to store unique cluster IDs, parsing them as integers
  const clusterNums = new Set<number>();
  for (const row of records) {
    if (row.ClusterID) {
      clusterNums.add(parseInt(row.ClusterID));
    }
  }

  // Insert clusters
  for (const cNum of clusterNums) {
    await sql`
      INSERT INTO clusters (cluster_number, name) 
      VALUES (${cNum}, ${'Cluster ' + cNum})
      ON CONFLICT DO NOTHING
    `;
  }

  console.log("Extracting schools & programs...");
  for (const row of records) {
    // Insert School
    if (row["School Name"]) {
      console.log(`Inserting school: ${row["School Name"]}`);
      let clusterId = null;
      if (row.ClusterID) {
        // Get the actual internal cluster ID
        const [cluster] = await sql`SELECT id FROM clusters WHERE cluster_number = ${parseInt(row.ClusterID)}`;
        if (cluster) clusterId = cluster.id;
      }

      await sql`
        INSERT INTO schools (name, level, cluster_id)
        VALUES (${row["School Name"]}, ${row["School Level"]}, ${clusterId})
      `;
    }

    // Insert Program if present
    if (row.Title) {
      await sql`
        INSERT INTO programs (title, school_level_requirement)
        VALUES (${row.Title}, ${row.SchoolLevel || null})
        ON CONFLICT (title) DO NOTHING
      `;
    }
  }

  console.log("Database seed completed successfully.");
  await sql.end();
}

main().catch(console.error);
