import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import publicRouter from './routes';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', publicRouter);

export default app;
