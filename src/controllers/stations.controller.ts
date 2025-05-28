import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { StationService } from "../services/station.service";

@injectable()
export class StationsController {
  public constructor(private stationService: StationService) {}

  public get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const order =
        (req.query.order as string)?.toUpperCase() === "DESC" ? "DESC" : "ASC";

      const stationsResponse = await this.stationService.getServices(
        page,
        limit,
        order
      );
      res.status(200).json(stationsResponse);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid station ID" });
        return;
      }

      const station = await this.stationService.getStation(id);

      if (!station) {
        res.status(404).json({ message: "Station not found" });
        return;
      }

      res.status(200).json(station);
    } catch (error) {
      next(error);
    }
  };

  public getNearStations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const lng = parseFloat(req.query.lng as string);
      const lat = parseFloat(req.query.lat as string);
      const radius = parseFloat(req.query.radius as string) || 5;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const order =
        (req.query.order as string)?.toUpperCase() === "DESC" ? "DESC" : "ASC";

      if (isNaN(lng) || isNaN(lat)) {
        res
          .status(400)
          .json({ message: "Invalid or missing lng/lat parameters" });
        return;
      }

      const stationsResponse =
        await this.stationService.getStationByGeolocation(
          page,
          limit,
          order,
          lng,
          lat,
          radius
        );

      res.json(stationsResponse);
    } catch (error) {
      next(error);
    }
  };
}
