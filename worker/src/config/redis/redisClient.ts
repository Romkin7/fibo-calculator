import { createClient } from 'redis';
import redisConfig from './redis.config';

export default async function connectRedisClient() {
    const redisClient = createClient(redisConfig);
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    const client = await redisClient.connect();
    return client;
}
