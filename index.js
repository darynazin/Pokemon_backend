import "./db/index.js";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import pokemonRouter from "./routers/pokemonRouter.js";
import userRouter from "./routers/userRouter.js";
import leaderboardRouter from "./routers/leaderboardRouter.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/pokemons", pokemonRouter);
app.use("/users", userRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

app.use("/users", userRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(port, () => console.log(`Server is running on port ${port}`));
