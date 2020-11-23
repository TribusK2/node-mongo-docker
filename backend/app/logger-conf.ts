import { Configuration, Logger, configure, getLogger } from "log4js";

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
      filename: "app/logs/errors.log"
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

configure(LOGGER_CONFIGURATION);

export const apiLogger = getLogger('API');
export const appLogger = getLogger('APP');