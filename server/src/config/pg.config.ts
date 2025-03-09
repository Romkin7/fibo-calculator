import { Pool } from 'pg';
import keys from '../keys';

export default async function createPool() {
    const pool = new Pool({
        user: keys.PG_USER,
        host: keys.PG_HOST,
        database: keys.PG_DATABASE,
        password: keys.PG_PASSWORD,
        port: keys.PG_PORT,
    });
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });
    // Create a table in the database
    pool.query('CREATE TABLE IF NOT EXISTS fibo (number INT);')
        .then(() => {
            console.log('Table created successfully or already exists');
        })
        .catch((err) => {
            console.error('Error creating table', err);
        });
    return pool;
}
