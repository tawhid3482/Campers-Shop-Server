import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true })); // Add this line

app.use(cors({ origin: ['https://campers-shop-client-ten.vercel.app','http://localhost:5173'], credentials: true }));
// application routes
app.use("/api", router);

app.get("/", (req:Request, res:Response) => {
  res.send("Welcome to the campers shop!");
});


app.use(globalErrorHandler)

// Handle unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
