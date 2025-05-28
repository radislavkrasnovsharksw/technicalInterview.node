import { injectable } from "tsyringe";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Station } from "../entities/station.entity";

@injectable()
export class StationService {
  private stationRepository: Repository<Station>;

  public constructor(private dataSource: DataSource) {
    this.stationRepository = this.dataSource.getRepository(Station);
  }

  public async getServices(
    page: number = 1,
    limit: number = 20,
    order: "ASC" | "DESC" = "ASC"
  ): Promise<{ data: Station[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.stationRepository.findAndCount({
      relations: ["status", "speed_type", "plug_types", "installation_class"],
      order: { id: order },
      skip: (page - 1) * limit,
      take: limit
    });

    return { data, total, page, limit };
  }

  public async getStation(id: number): Promise<Station | null> {
    return this.stationRepository.findOne({
      where: { id },
      relations: ["status", "speed_type", "plug_types", "installation_class"]
    });
  }

  /**
   * The Haversine formula to calculate the distance between the center point and each object's coordinates.
   * https://community.esri.com/t5/coordinate-reference-systems-blog/distance-on-a-sphere-the-haversine-formula/ba-p/902128
   */
  public async getStationByGeolocation(
    page: number = 1,
    limit: number = 10,
    order: "ASC" | "DESC" = "ASC",
    lng: number,
    lat: number,
    radiusKm: number
  ): Promise<{ data: Station[]; total: number; page: number; limit: number }> {
    const earthRadiusKm = 6371;
    const distanceFormula = `(${earthRadiusKm} * acos(
      cos(radians(:lat)) * cos(radians(station.lat)) * cos(radians(station.lng) - radians(:lng)) +
      sin(radians(:lat)) * sin(radians(station.lat))
    ))`;
    const qb: SelectQueryBuilder<Station> = this.stationRepository
      .createQueryBuilder("station")
      .leftJoinAndSelect("station.status", "status")
      .leftJoinAndSelect("station.speed_type", "speed_type")
      .leftJoinAndSelect("station.plug_types", "plug_types")
      .leftJoinAndSelect("station.installation_class", "installation_class")
      .addSelect(distanceFormula, "distance")
      .where(`${distanceFormula} <= :radiusKm`, { radiusKm })
      .orderBy("distance", order)
      .skip((page - 1) * limit)
      .take(limit)
      .setParameters({ lat, lng });

    const [data, total] = await qb.getManyAndCount();

    return { data, total, page, limit };
  }
}
