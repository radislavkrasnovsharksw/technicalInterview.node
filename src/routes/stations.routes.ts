import { Router } from 'express';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { StationsController } from '../controllers/stations.controller';

const stationsRouter = Router();
container.registerInstance(DataSource, AppDataSource);
const stationsController = container.resolve(StationsController);

stationsRouter.get('/', stationsController.get);
stationsRouter.get('/nearby', stationsController.getNearStations);
stationsRouter.get('/:id', stationsController.getOne);

export default stationsRouter;
