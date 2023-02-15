import logger from "pino";
import config from "config";
import { logLevel } from "../config";

const level = logLevel;

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${new Date()}"`,
});

export default log;