import { Router } from 'express';
import { container } from 'tsyringe';
import { StationsController } from '../controllers/stations.controller';

const stationsRouter = Router();
const stationsController = container.resolve(StationsController);

stationsRouter.get('/', stationsController.get);

export default stationsRouter;
