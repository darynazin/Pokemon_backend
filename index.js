import "./db/index.js";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routers/userRouter.js";
import leadersdRouter from './routers/leaderdRouter.js';
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/users", userRouter);
app.use("/leaders", leadersdRouter)
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
