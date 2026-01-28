import express from "express";
import multer from "multer";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { query } from "../db.js";

const router = express.Router();

// 1. Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 2. Configure Multer to stream directly to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // Ensure your S3 bucket allows public-read
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname || "");
      const safeName = `products/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, safeName);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
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

// POST create product (Uploads to S3 and saves URL to Postgres)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    // Multer-S3 provides the permanent S3 URL here:
    const imageUrl = req.file.location;

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
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
    // Note: This deletes from the DB. To delete from S3 as well, 
    // you would use the DeleteObjectCommand from @aws-sdk/client-s3.
    await query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

export default router;