import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { poolPromise } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];

if (!fileName) {
  console.error("Usage: node src/database/runSqlFile.js <file.sql>");
  process.exit(1);
}

const filePath = path.isAbsolute(fileName)
  ? fileName
  : path.join(__dirname, fileName);

const sqlText = fs.readFileSync(filePath, "utf8");
const batches = sqlText
  .split(/^GO\s*$/gim)
  .map((batch) => batch.trim())
  .filter(Boolean);

const pool = await poolPromise;

try {
  for (const batch of batches) {
    await pool.request().batch(batch);
  }

  console.log(`Executed ${path.basename(filePath)} successfully.`);
} finally {
  await pool.close();
}
