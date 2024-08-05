import express, {Express} from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config(); // configure environment variables

const app: Express = express();

app.use("/api", router);


app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on ${process.env.HOST || "localhost"}:${process.env.PORT || "3000"}`);
})
