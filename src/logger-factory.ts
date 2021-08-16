import winston, { format } from "winston";
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from "winston-elasticsearch";
import { Client, ClientOptions } from "@elastic/elasticsearch";
import { isEmpty } from "lodash";
import { hostname } from 'os'
import { Options } from "./types";
import { shortMessageFormat } from './formatters';

export class LoggerFactory {
  /**
   * Método para inicializar o logger
   * @param { Options } options Opções para inicialização do logger
   */
  static init(
    options: Options = {
        level: "info",
        color: false,
        defaultMeta: {
          _tags: "LOG_FACTORY",
          host: hostname()
        },
        elk: {
          level: "info",
        },
        formats: [
          shortMessageFormat()
        ]
      }
  ) {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: options.level,
        format: format.combine(
          format.timestamp(),
          options.color ? format.colorize() : format.uncolorize(),
          ...options.formats!
        ),
      }),
    ];

    this.initELKTransport(transports, options.elk);

    const logger = winston.createLogger({
      transports: transports.filter((t) => t),
    });

    logger.defaultMeta = Object.assign(
      {
        app: options.serviceName,
        appVersion: options.serviceVersion,
        version: "1.0"
      },
      options.defaultMeta
    );

    // Compulsory error handling
    logger.on("error", (error) => {
      console.error("Error caught", error);
    });

    return logger;
  }

  private static initELKTransport(
    transports: winston.transport[],
    options: { level: "debug" | "info" | "error"; config?: ClientOptions } = {
      level: "info",
    }
  ) {
    if (!isEmpty(options.config)) {
      const esTransportOpts: ElasticsearchTransportOptions = {
        level: options.level,
        client: new Client(options.config!),
      };

      const esTransport = new ElasticsearchTransport(esTransportOpts);

      esTransport.on("warning", (error) => {
        console.error("Error caught", error);
      });
      transports.push(esTransport);
    }
  }
}
