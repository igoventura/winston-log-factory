import winston, { format } from 'winston';
import { isEmpty } from 'lodash';
import { Options } from '../types';

const _getExtendedMessage = (info: winston.Logform.TransformableInfo) => {
  const {
    baseUrl,
    host,
    origin,
    url,
    clientIp,
    method,
    requestId,
    level,
    message,
    timestamp,
    serviceVersion,
    serviceName,
    functionName,
    functionVersion,
    awsRequestId,
    invokedFunctionArn,
    app,
    appVersion,
    _tags,
    short_message,
    version,
    ...originalInfo
  } = info;

  return isEmpty(originalInfo) ? "" : JSON.stringify(originalInfo, null, 2);
}

/**
 * @type {winston.Logform.Format}
 * @summary Formata a saída no terminal
 */
const printFFormat = (options: Options) =>
  format.printf(
    (info) =>
      `${(options.serviceName || info.functionName)
        ? `${options.serviceName || info.functionName} (${options.functionVersion || info.functionVersion}) @ `
        : ""
      }${info.timestamp} - ${info.level}: ${info.message
      } \n${_getExtendedMessage(info)}`
  );

/**
 * @type {winston.Logform.Format}
 * @summary Formata a saída para aplicações usando express
 */
const expressMessageFormat = winston.format((info) => {
  if (info.method && info.url) {
    info.message = `${info.method} ${info.url} -> ${info.message}`;
  }

  return info;
});

/**
 * @type {winston.Logform.Format}
 * @summary Formata a saída para funções AWS Lambda
 */
const lambdaMessageFormat = winston.format((info) => {
  if (info.awsRequestId && info.functionName && info.functionVersion) {
    info.message = `${info.message}`;
  }
  return info;
});

/**
 * @type {winston.Logform.Format}
 * @summary Formata a saída quando o parâmetro short_message não for informado
 */
const shortMessageFormat = winston.format((info) => {
  if (info.message && !info.short_message) {
    info.short_message = info.message;
  }
  return info;
});


export { printFFormat, expressMessageFormat, lambdaMessageFormat, shortMessageFormat };
