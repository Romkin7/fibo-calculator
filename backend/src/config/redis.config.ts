const redisConfig = {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    socket: {
        connectTimeout: 0,
        keepAlive: 1000,
        noDelay: true,
        reconnectStrategy: 3000,
    },
};

export default redisConfig;
