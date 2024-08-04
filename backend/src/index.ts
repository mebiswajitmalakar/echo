import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Hello, there!"
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on ${process.env.HOST || "localhost"}:${process.env.PORT || "3000"}`);
})
