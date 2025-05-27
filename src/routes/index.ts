import { Router } from 'express';
import stationsRouter from './stations.routes';

const publicRouter = Router();

publicRouter.use('/stations', stationsRouter);

export default publicRouter;
