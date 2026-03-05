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
