import { Router } from 'express';
import createPool from '../config/pg.config';
import { createClient } from 'redis';
import redisConfig from '../config/redis.config';

const router = Router();

router.get('/values', async (req, res) => {
    try {
        const redisClient = await createClient(redisConfig)
            .on('error', (err) => console.log('Redis Client Error', err))
            .connect();
        const publisher = redisClient.duplicate();
        const values = publisher.hGetAll('values');
        return res.json(values);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

router.get('/indexes', async (req, res) => {
    try {
        const pgClient = await createPool();
        const indexes = await pgClient.query('SELECT * from values');
        return res.status(200).json(indexes.rows);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/values', async (req, res) => {
    try {
        const index = req.body.index;
        if (parseInt(index) > 40) {
            return res.status(422).json({ message: 'Index too high' });
        }
        // Store the index in redis
        const redisClient = await createClient(redisConfig)
            .on('error', (err) => console.log('Redis Client Error', err))
            .connect();
        const publisher = redisClient.duplicate();
        // Set the value to 'No values yet!'
        publisher.hSet('values', index, 'No values yet!');
        // Publish the insert event, so the worker can calculate the value
        publisher.publish('insert', index);
        // Store the index in postgres
        const pgClient = await createPool();
        await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
        return res.json({ working: true });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
