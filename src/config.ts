import dotenv from "dotenv";
import errorHandler from "./routes/hendlers";
import { log, logger, loggerOptions, errorLoggerOptions } from "./application/logger";

import { createServer } from "http";
import express, { Application } from "express";
import session, { MemoryStore } from "express-session";
import bodyParser from "body-parser";
import "reflect-metadata";
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// TODO:***
//https://www.npmjs.com/package/express-rate-limit?activeTab=readme

import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";
import path from "path";

dotenv.config({ path: __dirname + "/../.env" });

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  AUTHORIZED_CLIENTS: AUTHORIZED,
  TOKEN_SECRET,
  PORT = 7100,
  MAILER_HOST,
  MAILER_USER,
  MAILER_PASSWORD,
  MAILER_PORT,
  GOOGLE_MAPS_API_KEY,
  NODE_ENV,
  accessTokenPrivateKey,
  accessTokenPublicKey,
  refreshTokenPrivateKey,
  refreshTokenPublicKey,
  TOKEN_EXPIRE_IN,
} = process.env;

const logLevel = "info";
const config = (app: Application, http: any) => {
  
  app.use(expressWinston.logger(loggerOptions));
  app.use(expressWinston.errorLogger(errorLoggerOptions));
  
  app.use(errorHandler);
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.disable("x-powered-by");
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  //app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "s3Cur3",
      name: "sessionId",
      cookie: {
        secure: true,
        httpOnly: true,
        //  domain: 'example.com',
        // path: 'foo/bar',
        expires: expiryDate,
      },
    })
  );
  app.set("views", path.resolve(__dirname + "/../helpers/mailer/templates/"));

  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100, // 1000 requests
    standardHeaders: true,
    message: "You can only make 100 requests every minutes.",
    keyGenerator: (req: any, res: any) => req.ip,
    //store: new MemoryStore(),
    handler: (req: any, res: any, next: any, opt: any) =>
      res.status(opt.statusCode).send(opt.message),
  });

  app.use(limiter);

  const allowedOrigins: string[] = [
    "https://www.yoursite.com",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
    "http://localhost:3000",
    "*",
  ];

  const corsOptions = {
    credentials: true, // This is important.
    origin: (origin: any, callback: any) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  const httpServer = createServer(app);

  const start = async (): Promise<any> => {
    try {
      return httpServer.listen(PORT, () => {
        console.log(
          `⚡️[server]: Server is running at https://localhost:${PORT}`
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const server = start();
};
export default config;

const AUTHORIZED_CLIENTS = AUTHORIZED?.split(",").map((x: string) =>
  x.split(":")
);
const smtp = {
  user: MAILER_USER || "",
  pass: MAILER_PASSWORD || "",
  host: MAILER_HOST || "",
  port: Number(MAILER_PORT || ""),
  secure: Number(MAILER_PORT || "") == 465,
};
export {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  AUTHORIZED_CLIENTS,
  TOKEN_SECRET,
  PORT,
  MAILER_HOST,
  MAILER_USER,
  MAILER_PASSWORD,
  MAILER_PORT,
  GOOGLE_MAPS_API_KEY,
  NODE_ENV,
  TOKEN_EXPIRE_IN,
  accessTokenPrivateKey,
  accessTokenPublicKey,
  refreshTokenPrivateKey,
  refreshTokenPublicKey,
  smtp,
  logLevel,
  logger
};
