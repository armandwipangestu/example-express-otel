import express from "express";
import itemsRoute from "./routes/items";
import { tracingLogger } from "./middlewares/tracingLogger";

const app = express();
app.use(express.json());
app.use(tracingLogger);

app.use("/items", itemsRoute);

export default app;
