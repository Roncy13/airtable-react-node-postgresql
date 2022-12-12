import SmurfResponse from '@core/response';
import logger from '@config/logger';

export abstract class AppLoggerResponse extends SmurfResponse {

  logger(message: string) {
    const date = +new Date();
    logger.info(`${date}:${this.className} - ${message}`);
  }
}