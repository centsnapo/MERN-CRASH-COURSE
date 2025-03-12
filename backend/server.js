import express from 'express';
import dotenv from "dotenv";
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/product.js'; // Ensure the model is imported

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON request body

app.post("/api/products", async (req, res) => {
    const product = req.body;

    // Fix validation condition
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Server is ready");
    console.log(process.env.MONGODB_URL);
});

app.listen(5000, () => {
    connectDB();
    console.log('Server started on http://localhost:5000');
});
