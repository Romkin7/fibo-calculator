export interface IKeys {
    REDIS_HOST: string;
    REDIS_PORT: number;
}

export default {
    // Redis host
    REDIS_HOST: process.env.REDIS_HOST,
    // Redis port
    REDIS_PORT: process.env.REDIS_PORT,
} as unknown as IKeys;
