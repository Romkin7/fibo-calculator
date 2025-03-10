import fib from './fib';
import { config } from 'dotenv';
import connectRedisClient from './config/redis/redisClient';
import connectRedisPublisher from './config/redis/redisPublisher';
config();

(async () => {
    console.log('Worker is running...');
    const redisClient = await connectRedisClient();
    const subscriber = await connectRedisPublisher();
    // Subscribe to the insert event
    subscriber.subscribe('insert', (message) => {
        redisClient.hSet('values', message, fib(parseInt(message)));
    });
})();
