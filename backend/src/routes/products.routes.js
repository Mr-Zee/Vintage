import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { query } from "../db.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to load products", error: err.message });
  }
});

// POST create product (with image file)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:5000";
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const {
      title,
      price,
      oldPrice,
      rating,
      reviews,
      badge,
      category,
      material,
      movement,
      stone,
      inStock,
    } = req.body;

    const insert = await query(
      `INSERT INTO products
        (title, price, old_price, rating, reviews, badge, category, material, movement, stone, image, in_stock)
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        title,
        Number(price),
        oldPrice ? Number(oldPrice) : null,
        rating ? Number(rating) : 4.5,
        reviews ? Number(reviews) : 0,
        badge || null,
        category,
        material || null,
        movement || "Quartz",
        stone || "None",
        imageUrl,
        String(inStock) === "true" || inStock === true,
      ]
    );

    res.json(insert.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

export default router;
