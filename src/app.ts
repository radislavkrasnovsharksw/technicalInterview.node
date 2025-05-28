import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import publicRouter from './routes';
import { NotFoundError } from './errors/notFound.error';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', publicRouter);

app.use((req, res, next) => {
  next(new NotFoundError(`The route ${req.method} ${req.originalUrl} was not found on this server.`));
});

app.use(errorHandlerMiddleware);

export default app;
