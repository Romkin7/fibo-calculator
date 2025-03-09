import express from 'express';
import cors from 'cors';

import fiboRoutes from './routes/fibo.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/fibo', fiboRoutes);

export default app;
