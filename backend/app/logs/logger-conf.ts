import { Configuration, Logger } from "log4js";
import { configure, getLogger } from "log4js";

// Passible value: all, trace, debug, info, warn, error, fatal, mark, off
const globalLoggerLevel = 'debug';

const LOGGER_CONFIGURATION: Configuration = {
  appenders: {
    everything: {
      type: "stdout",
      layout: {
        type: "colored"
      }
    },
    storeErrors: {
      type: "file",
      filename: "error.log"
    },
    errors: {
      type: "logLevelFilter",
      appender: "storeErrors",
      level: "error"
    }
  },
  categories: {
    default: {
      appenders: ["everything", "errors"],
      level: globalLoggerLevel
    }
  }
}

export function getLoggerWithConf(name: string): Logger {
  const logger = getLogger(name);
  configure(LOGGER_CONFIGURATION);
  return logger;
}