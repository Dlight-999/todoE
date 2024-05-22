import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import todoRoutes from "./routers/todoRoute.js";
import userRoutes from "./routers/userRouter.js";
dotenv.config();
const port = 5000;

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todo", todoRoutes);
app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
