import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { poolPromise, sql } from "../config/db.js";

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const pool = await poolPromise;
    const existing = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT id FROM Users WHERE email = @email");

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO Users (username, email, password)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.role
        VALUES (@username, @email, @password)
      `);

    const user = result.recordset[0];

    res.status(201).json({
      message: "Account created successfully",
      user,
      token: createToken(user),
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT id, username, email, password, role FROM Users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json({
      message: "Login successful",
      user: safeUser,
      token: createToken(safeUser),
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.user.id)
      .query("SELECT id, username, email, role, createdAt FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: result.recordset[0] });
  } catch (err) {
    next(err);
  }
}
