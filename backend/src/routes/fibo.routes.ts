import { Router } from 'express';
import createPool from '../config/pg.config';
import connectRedisClient from '../config/redis/redisClient';
import connectRedisPublisher from '../config/redis/redisPublisher';

const router = Router();

router.get('/values', async (req, res) => {
    try {
        const redisClient = await connectRedisClient();
        const values = await redisClient.hGetAll('values');
        console.log(values);
        return res.status(200).json(values);
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
        console.log('POST /values');
        const index = req.body.index;
        console.log('Index:', index);
        if (parseInt(index) > 40) {
            return res.status(422).json({ message: 'Index too high' });
        }
        const redisClient = await connectRedisClient();
        const publisher = await connectRedisPublisher();
        // Store the index in redis
        // Set the value to 'No values yet!'
        await redisClient.hSet('values', index, 'No values yet!');
        // Publish the insert event, so the worker can calculate the value
        await publisher.publish('insert', index);
        // Store the index in postgres
        const pgClient = await createPool();
        const result = await pgClient.query(
            'INSERT INTO values(number) VALUES($1)',
            [index],
        );
        return res.json({ working: true, result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
