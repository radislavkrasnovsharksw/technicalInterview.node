import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { CachedStationService } from "../services/cache/cachedStation.service";
import { BadRequestError } from "../errors/badRequest.error";
import {
  StationQueryValidator,
  StationQueryParams
} from "../validation/stationQuery.validation";
import {
  StationParamsValidator,
  StationParams
} from "../validation/stationParams.validator";
import {
  NearbyStationsQueryValidator,
  NearbyStationsQueryParams
} from "../validation/nearByStations.validation";

@injectable()
export class StationsController {
  public constructor(
    private stationService: CachedStationService,
    private queryValidator: StationQueryValidator,
    private paramsValidator: StationParamsValidator,
    private nearbyQueryValidator: NearbyStationsQueryValidator
  ) {}

  /**
   * @swagger
   * /stations:
   *   get:
   *     summary: Get paginated list of stations
   *     tags:
   *       - Stations
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of items per page
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *           default: ASC
   *         description: Sort order
   *     responses:
   *       200:
   *         description: Paginated list of stations
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Station'
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 limit:
   *                   type: integer
   */
  public get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedQuery: StationQueryParams = this.queryValidator.validate(
        req.query
      );

      const stationsResponse = await this.stationService.getStations(
        validatedQuery.page,
        validatedQuery.limit,
        validatedQuery.order
      );
      res.json(stationsResponse);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /stations/{id}:
   *   get:
   *     summary: Get a single station by ID
   *     tags:
   *       - Stations
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The station ID
   *     responses:
   *       200:
   *         description: Station object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Station'
   *       404:
   *         description: Station not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Station not found
   */
  public getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedQuery: StationParams = this.paramsValidator.validate(
        req.params
      );
      const station = await this.stationService.getStation(validatedQuery.id);

      if (!station) {
        throw new BadRequestError("Station not found");
      }

      res.json(station);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /stations/nearby:
   *   get:
   *     summary: Get paginated list of stations near a geographic location within a radius
   *     tags:
   *       - Stations
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number for pagination
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of items per page
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *           default: ASC
   *         description: Sort order by distance
   *       - in: query
   *         name: lng
   *         schema:
   *           type: number
   *           format: float
   *         required: true
   *         description: Longitude of the center point
   *       - in: query
   *         name: lat
   *         schema:
   *           type: number
   *           format: float
   *         required: true
   *         description: Latitude of the center point
   *       - in: query
   *         name: radius
   *         schema:
   *           type: number
   *           format: float
   *           default: 5
   *         required: true
   *         description: Radius in kilometers to search within
   *     responses:
   *       200:
   *         description: Paginated list of nearby stations
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Station'
   *                 total:
   *                   type: integer
   *                   description: Total number of matching stations
   *                 page:
   *                   type: integer
   *                   description: Current page number
   *                 limit:
   *                   type: integer
   *                   description: Number of items per page
   *       400:
   *         description: Invalid or missing parameters
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid or missing lng/lat parameters
   */
  public getNearStations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedQuery: NearbyStationsQueryParams =
        this.nearbyQueryValidator.validate(req.query);

      const stationsResponse =
        await this.stationService.getStationByGeolocation(
          validatedQuery.page,
          validatedQuery.limit,
          validatedQuery.order,
          validatedQuery.lng,
          validatedQuery.lat,
          validatedQuery.radius
        );

      res.json(stationsResponse);
    } catch (error) {
      next(error);
    }
  };
}
