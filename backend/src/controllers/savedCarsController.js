import { poolPromise, sql } from "../config/db.js";

export async function getSavedCars(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .query(`
        SELECT
          Cars.*
        FROM SavedCars
        INNER JOIN Cars ON SavedCars.carId = Cars.id
        WHERE SavedCars.userId = @userId
        ORDER BY SavedCars.createdAt DESC
      `);

    res.json({
      total: result.recordset.length,
      cars: result.recordset,
    });
  } catch (err) {
    next(err);
  }
}

export async function saveCar(req, res, next) {
  try {
    const { carId } = req.params;
    const pool = await poolPromise;

    const carResult = await pool
      .request()
      .input("carId", sql.Int, carId)
      .query("SELECT id FROM Cars WHERE id = @carId");

    if (carResult.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    const existing = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .input("carId", sql.Int, carId)
      .query(`
        SELECT id
        FROM SavedCars
        WHERE userId = @userId AND carId = @carId
      `);

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Car already saved" });
    }

    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .input("carId", sql.Int, carId)
      .query(`
        INSERT INTO SavedCars (userId, carId)
        OUTPUT INSERTED.*
        VALUES (@userId, @carId)
      `);

    res.status(201).json({
      message: "Car saved successfully",
      savedCar: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function removeSavedCar(req, res, next) {
  try {
    const { carId } = req.params;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .input("carId", sql.Int, carId)
      .query(`
        DELETE FROM SavedCars
        OUTPUT DELETED.*
        WHERE userId = @userId AND carId = @carId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Saved car not found" });
    }

    res.json({
      message: "Saved car removed successfully",
      savedCar: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}
