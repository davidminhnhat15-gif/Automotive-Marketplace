import { poolPromise, sql } from "../config/db.js";

export async function getCars(req, res, next) {
  try {
    const {
      bodyType,
      make,
      model,
      fuelType,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      search,
    } = req.query;

    const pool = await poolPromise;
    const request = pool.request();
    const conditions = [];

    if (bodyType) {
      request.input("bodyType", sql.NVarChar, bodyType);
      conditions.push("bodyType = @bodyType");
    }

    if (make) {
      request.input("make", sql.NVarChar, make);
      conditions.push("make = @make");
    }

    if (model) {
      request.input("model", sql.NVarChar, model);
      conditions.push("model = @model");
    }

    if (fuelType) {
      request.input("fuelType", sql.NVarChar, fuelType);
      conditions.push("fuelType = @fuelType");
    }

    if (minPrice) {
      request.input("minPrice", sql.Decimal(18, 2), Number(minPrice));
      conditions.push("price >= @minPrice");
    }

    if (maxPrice) {
      request.input("maxPrice", sql.Decimal(18, 2), Number(maxPrice));
      conditions.push("price <= @maxPrice");
    }

    if (minYear) {
      request.input("minYear", sql.Int, Number(minYear));
      conditions.push("year >= @minYear");
    }

    if (maxYear) {
      request.input("maxYear", sql.Int, Number(maxYear));
      conditions.push("year <= @maxYear");
    }

    if (search) {
      request.input("search", sql.NVarChar, `%${search}%`);
      conditions.push(`
        (
          title LIKE @search OR
          make LIKE @search OR
          model LIKE @search OR
          description LIKE @search
        )
      `);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await request.query(`
      SELECT *
      FROM Cars
      ${whereClause}
      ORDER BY createdAt DESC
    `);

    res.json({
      total: result.recordset.length,
      cars: result.recordset,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCarById(req, res, next) {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT *
        FROM Cars
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      car: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function createCar(req, res, next) {
  try {
    const {
      title,
      make,
      model,
      year,
      price,
      mileage,
      bodyType,
      fuelType,
      imageUrl,
      description,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("make", sql.NVarChar, make || null)
      .input("model", sql.NVarChar, model || null)
      .input("year", sql.Int, year ? Number(year) : null)
      .input("price", sql.Decimal(18, 2), price ? Number(price) : null)
      .input("mileage", sql.Int, mileage ? Number(mileage) : null)
      .input("bodyType", sql.NVarChar, bodyType || null)
      .input("fuelType", sql.NVarChar, fuelType || null)
      .input("imageUrl", sql.NVarChar, imageUrl || null)
      .input("description", sql.NVarChar, description || null)
      .query(`
        INSERT INTO Cars
          (title, make, model, year, price, mileage, bodyType, fuelType, imageUrl, description)
        OUTPUT INSERTED.*
        VALUES
          (@title, @make, @model, @year, @price, @mileage, @bodyType, @fuelType, @imageUrl, @description)
      `);

    res.status(201).json({
      message: "Car created successfully",
      car: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCar(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      make,
      model,
      year,
      price,
      mileage,
      bodyType,
      fuelType,
      imageUrl,
      description,
    } = req.body;

    const pool = await poolPromise;
    const existing = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id FROM Cars WHERE id = @id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title || null)
      .input("make", sql.NVarChar, make || null)
      .input("model", sql.NVarChar, model || null)
      .input("year", sql.Int, year ? Number(year) : null)
      .input("price", sql.Decimal(18, 2), price ? Number(price) : null)
      .input("mileage", sql.Int, mileage ? Number(mileage) : null)
      .input("bodyType", sql.NVarChar, bodyType || null)
      .input("fuelType", sql.NVarChar, fuelType || null)
      .input("imageUrl", sql.NVarChar, imageUrl || null)
      .input("description", sql.NVarChar, description || null)
      .query(`
        UPDATE Cars
        SET
          title = COALESCE(@title, title),
          make = COALESCE(@make, make),
          model = COALESCE(@model, model),
          year = COALESCE(@year, year),
          price = COALESCE(@price, price),
          mileage = COALESCE(@mileage, mileage),
          bodyType = COALESCE(@bodyType, bodyType),
          fuelType = COALESCE(@fuelType, fuelType),
          imageUrl = COALESCE(@imageUrl, imageUrl),
          description = COALESCE(@description, description)
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    res.json({
      message: "Car updated successfully",
      car: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteCar(req, res, next) {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Cars
        OUTPUT DELETED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      message: "Car deleted successfully",
      car: result.recordset[0],
    });
  } catch (err) {
    next(err);
  }
}
