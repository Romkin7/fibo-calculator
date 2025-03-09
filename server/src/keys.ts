export interface IKeys {
    REDIS_HOST: string;
    REDIS_PORT: number;
    PG_USER?: string;
    PG_HOST?: string;
    PG_DATABASE?: string;
    PG_PASSWORD?: string;
    PG_PORT?: number;
}

export default {
    // Redis host
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    // Redis port
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    // Postgres user
    PG_USER: process.env.PG_USER || 'postgres',
    // Postgres host
    PG_HOST: process.env.PG_HOST || 'postgres',
    // Postgres database
    PG_DATABASE: process.env.PG_DATABASE || 'fibonacci',
    // Postgres password
    PG_PASSWORD: process.env.PG_PASSWORD || 'postgres',
    // Postgres port
    PG_PORT: process.env.PG_PORT || 5432,
} as IKeys;
