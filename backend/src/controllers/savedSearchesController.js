import { poolPromise, sql } from "../config/db.js";

export async function getSavedSearches(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .query(`
        SELECT *
        FROM SavedSearches
        WHERE userId = @userId
        ORDER BY createdAt DESC
      `);

    res.json({
      total: result.recordset.length,
      savedSearches: result.recordset,
    });
  } catch (err) {
    next(err);
  }
}

export async function createSavedSearch(req, res, next) {
  try {
    const {
      name,
      make,
      model,
      bodyType,
      fuelType,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      search,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Search name is required" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.id)
      .input("name", sql.NVarChar, name)
      .input("make", sql.NVarChar, make || null)
      .input("model", sql.NVarChar, model || null)
      .input("bodyType", sql.NVarChar, bodyType || null)
      .input("fuelType", sql.NVarChar, fuelType || null)
      .input("minPrice", sql.Decimal(18, 2), minPrice ? Number(minPrice) : null)
      .input("maxPrice", sql.Decimal(18, 2), maxPrice ? Number(maxPrice) : null)
      .input("minYear", sql.Int, minYear ? Number(minYear) : null)
      .input("maxYear", sql.Int, maxYear ? Number(maxYear) : null)
      .input("search", sql.NVarChar, search || null)
      .query(`
        INSERT INTO SavedSearches
          (userId, name, make, model, bodyType, fuelType, minPrice, maxPrice, minYear, maxYear, search)
        OUTPUT INSERTED.*
        VALUES
          (@userId, @name, @make, @model, @bodyType, @fuelType, @minPrice, @maxPrice, @minYear, @maxYear, @search)
      `);

    res.status(201).json({
      message: "Search saved successfully",
      savedSearch: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSavedSearch(req, res, next) {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, req.user.id)
      .query(`
        DELETE FROM SavedSearches
        OUTPUT DELETED.*
        WHERE id = @id AND userId = @userId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Saved search not found" });
    }

    res.json({
      message: "Saved search deleted successfully",
      savedSearch: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}
