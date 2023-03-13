import winston from "winston";
const { NODE_ENV } = process.env;
export const errorLoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
};
export const loggerOptions = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `.logs/${NODE_ENV}-${((d = new Date()) =>
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0"))()}.log.json`,
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),

    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.align(),

    winston.format.printf((info: any) => {
      try {
        const {
          ip,
          method,
          url,
          query,
          params,
          body,
          headers: {
            "sec-ch-ua-platform": so,
            "sec-ch-ua": browser,
            "sec-ch-ua-mobile": modile,
          },
        } = info?.meta?.req??{};
        const log = `<> ${[info?.timestamp]}: ${info?.level}: ${
          info.meta?.res?.statusCode
        }: ${info?.message}: ${info?.meta?.responseTime} >>stak: ${JSON.stringify({
          ip,
          method,
          url,
          query,
          params,
          body,
          so,
          modile,
          browser,
        })}`;

        return log;
      } catch (error) {
        console.error(error);
      }

      return "error writing logs";
    })
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP > code: {{res.statusCode}}, METHOD: {{req.method}}, RESPONSE_TIME: {{res.responseTime}}ms, URL: {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
};
//app.use(expressWinston.logger(loggerOptions));

export const logger = winston.createLogger(loggerOptions);
export const log = logger;
export default log;
