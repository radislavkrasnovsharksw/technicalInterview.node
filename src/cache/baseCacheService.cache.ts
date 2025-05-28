import { ICacheService } from "../interfaces/cache/ICacheService.interface";

export abstract class BaseCacheService implements ICacheService {
  public abstract get<T>(key: string): T | void;
  public abstract set<T>(key: string, value: T, ttlSeconds?: number): void;
  public abstract delete(key: string): void;
  public abstract clear(): void;

  public buildKey(context: string, params: Record<string, any>): string {
    const sortedParams = Object.entries(params)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}_${String(value)}`)
      .join(":");
    return `${context}:${sortedParams}`;
  }
}
