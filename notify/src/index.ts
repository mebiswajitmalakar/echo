import express, {Express} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();


app.listen(process.env.PORT, () => {
  console.log(`@echo/notify is listening on ${process.env.HOST}:${process.env.PORT}`)
})
