import { injectable } from 'tsyringe';
import { StationService } from '../station.service';
import { InMemoryCacheService } from '../../cache/inMemoryCacheService.cache';
import { Station } from '../../entities/station.entity';
import { config } from '../../config';

@injectable()
export class CachedStationService {
  constructor(
    private actualStationService: StationService,
    private cacheService: InMemoryCacheService
  ) {}

  public async getStations(
    page: number = 1,
    limit: number = 20,
    order: "ASC" | "DESC" = "ASC"
  ): Promise<{ data: Station[]; total: number; page: number; limit: number }> {
    const cacheKey = this.cacheService.buildKey('getServices', { page, limit, order });
    const cachedData = this.cacheService.get<{ data: Station[]; total: number; page: number; limit: number }>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result = await this.actualStationService.getStations(page, limit, order);
    this.cacheService.set(cacheKey, result, config.cacheTtl);
    return result;
  }

  public async getStation(id: number): Promise<Station | null> {
    const cacheKey = this.cacheService.buildKey('getStation', { id });
    const cachedData = this.cacheService.get<Station | null>(cacheKey);

    if (cachedData !== undefined) {
      return cachedData;
    }
    
    const result = await this.actualStationService.getStation(id);
    this.cacheService.set(cacheKey, result, config.cacheTtl);
    return result;
  }

  public async getStationByGeolocation(
    page: number = 1,
    limit: number = 10,
    order: "ASC" | "DESC" = "ASC",
    lng: number,
    lat: number,
    radiusKm: number
  ): Promise<{ data: Station[]; total: number; page: number; limit: number }> {
    const params = { page, limit, order, lng, lat, radiusKm };
    const cacheKey = this.cacheService.buildKey('getStationByGeolocation', params);
    const cachedData = this.cacheService.get<{ data: Station[]; total: number; page: number; limit: number }>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result = await this.actualStationService.getStationByGeolocation(page, limit, order, lng, lat, radiusKm);
    this.cacheService.set(cacheKey, result, config.cacheTtl);
    return result;
  }
}
