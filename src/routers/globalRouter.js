import express from "express";

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => res.send("Sweet home, user"));

export default globalRouter;
