import "reflect-metadata";
import express, { Application } from "express";

import router from "./routes";

import config, { PORT } from "./config";

const app: Application = express();
app.set("port", PORT );

const http = require("http").Server(app);

config(app, http);
router(app);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});