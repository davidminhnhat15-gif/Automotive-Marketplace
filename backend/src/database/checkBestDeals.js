import { poolPromise } from "../config/db.js";

const pool = await poolPromise;

try {
  const result = await pool.request().query(`
    SELECT title, make, price, mileage, bodyType
    FROM Cars
    WHERE title IN (
      '2021 Toyota Corolla',
      '2020 Hyundai Elantra',
      '2021 Kia Forte',
      '2020 Nissan Sentra'
    )
    ORDER BY price;
  `);

  console.table(result.recordset);
} finally {
  await pool.close();
}
