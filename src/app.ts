import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api", router);

app.get("/", (req:Request, res:Response) => {
  res.send("Welcome to the campers shop!");
});

export default app;
