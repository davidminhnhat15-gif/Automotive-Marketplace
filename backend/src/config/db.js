import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  driver: process.env.DB_DRIVER || "ODBC Driver 17 for SQL Server",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_INSTANCE || undefined,
  },
};

if (process.env.DB_PORT) {
  dbConfig.port = Number(process.env.DB_PORT);
}

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("SQL Server connected");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    throw err;
  });

export { sql };
