import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from "tsyringe";
import publicRouter from './routes';
import { NotFoundError } from './errors/notFound.error';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';
import { SwaggerConfig } from './swagger/swaggerConfig';
import { StationQueryValidator } from './validation/stationQuery.validation';
import { StationParamsValidator } from './validation/stationParams.validator';
import { NearbyStationsQueryValidator } from './validation/nearByStations.validation';

const app: Application = express();
const swaggerConfig = container.resolve(SwaggerConfig);
swaggerConfig.setupSwagger(app);
container.registerSingleton(StationQueryValidator);
container.registerSingleton(StationParamsValidator);
container.registerSingleton(NearbyStationsQueryValidator);

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
