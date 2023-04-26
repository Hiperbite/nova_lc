import "reflect-metadata";

import router from "./routes";

import config from "./config";

const { app } = config();
router(app);


process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});