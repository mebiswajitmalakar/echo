import express, {Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { signupRoute } from "./signup";

const app: Express = express();

app.post("/signup", bodyParser.json(), signupRoute);

export default app;
