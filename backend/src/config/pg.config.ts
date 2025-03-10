import { Pool } from 'pg';
import keys from '../keys';

export default async function createPool() {
    const pgClient = new Pool({
        user: keys.PG_USER,
        host: keys.PG_HOST,
        database: keys.PG_DATABASE,
        password: keys.PG_PASSWORD,
        port: keys.PG_PORT,
    });
    var client = await pgClient.connect();
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.error(err));

    return client;
}
