import dotenv from "dotenv";

import errorHandler from "./routes/hendlers";
import { createServer } from 'http';
import express, { Application, Express, NextFunction, Request, Response } from "express";

import bodyParser from 'body-parser'
import "reflect-metadata";

// TODO:***
//https://www.npmjs.com/package/express-rate-limit?activeTab=readme
//import rateLimit from "express-rate-limit";
import cors from "cors";
// import helmet from "helmet";

// import router from "./routes";
import sequelize from "./models";

import winston from "winston";
import expressWinston from "express-winston";

dotenv.config({ path: __dirname + '/../.env' });

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    AUTHORIZED_CLIENTS: AUTHORIZED,
    TOKEN_SECRET,
    PORT,
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

} = process.env;
const logLevel = "info"
const config = (app: Application, http: any) => {
    app.use(errorHandler);
    /*app.use(bodyParser.urlencoded({
        extended: true
    }));
    // app.use(helmet());

    /*
      const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // 1000 requests
      });
      app.use(limiter);*/

    const allowedOrigins: string[] = [
        'https://www.yoursite.com',
        'http://127.0.0.1:5500',
        'http://localhost:3500',
        'http://localhost:3000',
        '*'
    ];

    const corsOptions = {
        origin: (origin: any, callback: any) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    const errorLoggerOptions = {
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    }
    const loggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    };
    app.use(expressWinston.logger(loggerOptions));
    app.use(expressWinston.errorLogger(errorLoggerOptions));
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
    user: MAILER_USER || '',
    pass: MAILER_PASSWORD || '',
    host: MAILER_HOST || '',
    port: MAILER_PORT || '',
    secure: Number(MAILER_PORT || '') == 465,
}
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
    accessTokenPrivateKey,
    accessTokenPublicKey,
    refreshTokenPrivateKey,
    refreshTokenPublicKey,

    smtp,
    logLevel
};