import {Request, Response, NextFunction} from 'express';
import Redis from 'ioredis';
import {RateLimiterRedis} from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import redisConfig from '@config/cache'

const {
  config: { redis: redisConfigs },
} = redisConfig;

export default async function ratelimit(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {

    const redisClient = new Redis({ ...redisConfigs });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);

    return next();
  } catch(err) {
    throw new AppError("Too many requests", 429);
    
  }
}