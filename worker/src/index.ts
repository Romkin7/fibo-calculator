import { createClient } from 'redis';
import keys from './keys';
import fib from './fib';

async function main() {
    const client = await createClient({
        url: `${keys.REDIS_HOST}:${keys.REDIS_PORT}`,
        socket: {
            connectTimeout: 0,
            keepAlive: 1000,
            noDelay: true,
            reconnectStrategy: 3000,
        },
    })
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect();
    // Create a duplicate client
    const sub = client.duplicate();
    // Subscribe to the insert event
    sub.on('message', (channel, message) => {
        client.hSet('values', message, fib(parseInt(message)));
    });
}

main();
