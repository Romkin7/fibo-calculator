export interface IKeys {
    REDIS_HOST: string;
    REDIS_PORT: number;
}

export default {
    // Redis host
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    // Redis port
    REDIS_PORT: process.env.REDIS_PORT || 6379,
} as IKeys;
