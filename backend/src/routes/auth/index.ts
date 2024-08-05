import express, {Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  return res.json("hello to the auth");
})

export default app;
