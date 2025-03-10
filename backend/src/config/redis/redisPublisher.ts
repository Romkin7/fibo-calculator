import { createClient } from 'redis';
import redisConfig from './redis.config';

export default async function connectRedisPublisher() {
    const redisClient = createClient(redisConfig);
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    const duplicateClient = redisClient.duplicate();
    const publisher = await duplicateClient.connect();
    return publisher;
}
