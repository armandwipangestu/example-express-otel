import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: +(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "example_express_otel",
});
