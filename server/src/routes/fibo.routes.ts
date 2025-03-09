import { Router } from 'express';
import createPool from '../config/pg.config';
import createRedisClient from '../config/redis.config';

const router = Router();

router.get('/values', async (req, res) => {
    try {
        const pgClient = await createPool();
        const values = await pgClient.query('SELECT * from values');
        res.json(values.rows);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/values/current', async (req, res) => {
    try {
        const redisClient = await createRedisClient();
        const values = redisClient.hGetAll('values');
        return res.json(values);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/values', async (req, res) => {
    try {
        const index = req.body.index;
        if (parseInt(index) > 40) {
            return res.status(422).json({ message: 'Index too high' });
        }
        // Store the index in redis
        const redisClient = await createRedisClient();
        // Set the value to 'No values yet!'
        redisClient.hSet('values', index, 'No values yet!');
        // Publish the insert event, so the worker can calculate the value
        redisClient.publish('insert', index);
        // Store the index in postgres
        const pgClient = await createPool();
        await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
        return res.json({ working: true });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
