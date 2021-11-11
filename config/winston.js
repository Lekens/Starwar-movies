import * as appRoot from 'app-root-path';
import winston from "winston";

const options = {
    file: {
        level: process.env.NODE_ENV === "development" ? "debug" : "info",
        filename: `${appRoot.path}/logs/development.log`,
        handleExceptions: true,
        json: true,
        maxsize: 1024000000, // 1GB
        maxFiles: 1024,
        colorize: false
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
    }
};
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false // do not exit on handled exceptions
});
export const Winston = {
    stream: {
        write(message, _encoding) {
            logger.info(message);
        }
    }
};


