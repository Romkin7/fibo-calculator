import { createClient } from 'redis';

/**
 * createRedisClient
 * @description Create a redis client
 * @returns {Promise<RedisClientType>}
 */
export default async function createRedisClient() {
    const client = createClient({
        url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        socket: {
            connectTimeout: 0,
            keepAlive: 1000,
            noDelay: true,
            reconnectStrategy: 3000,
        },
    });
    client.on('error', (err) => {
        console.error('Unexpected error on redis client', err);
        process.exit(-1);
    });
    // Connect to the client
    const redisPublisher = client.duplicate();
    return redisPublisher;
}
