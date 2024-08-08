import express, {Express} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();


app.listen(process.env.PORT || "8081", () => {
  console.log(`@echo/notify is listening on ${process.env.HOST || "http://localhost"}:${process.env.PORT || "8081"}`)
})
