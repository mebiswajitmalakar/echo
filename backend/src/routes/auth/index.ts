import express, {Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { signupRoute } from "./signup";
import { loginRoute } from "./login";
import { authTokenCheck } from "../../middlewares";

const app: Express = express();

app.use(cookieParser(), authTokenCheck);
app.post("/signup", bodyParser.json(), signupRoute);
app.post("/login", bodyParser.json(), loginRoute);

export default app;
