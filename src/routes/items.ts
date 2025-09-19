import { Router } from "express";
import { pool } from "../db";
import { trace } from "@opentelemetry/api";

const router = Router();

router.post("/", async (req, res) => {
    const tracer = trace.getTracer("custom-tracer");
    const span = tracer.startSpan("create-item");

    try {
        const name = req.body.name;
        const result = await pool.query(
            "INSERT INTO items (name) VALUES ($1) RETURNING id, name",
            [name]
        );

        const newItem = result.rows[0];
        span.setAttribute("db.operation", "insert");
        span.setAttribute("item.id", newItem.id);

        res.json(newItem);
    } catch (err: any) {
        span.recordException(err);
        res.status(500).json({ error: err.message });
    } finally {
        span.end();
    }
});

router.get("/", async (req, res) => {
    const tracer = trace.getTracer("custom-tracer");
    const span = tracer.startSpan("list-items");

    try {
        const result = await pool.query("SELECT id, name FROM items");
        res.json(result.rows);
    } catch (err: any) {
        span.recordException(err);
        res.status(500).json({ error: err.message });
    } finally {
        span.end();
    }
});

export default router;
