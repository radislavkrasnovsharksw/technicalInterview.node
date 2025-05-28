import { BaseCacheService } from "./baseCacheService.cache";
import { ICacheEntry } from "../interfaces/cache/ICacheEntry.interface";

export class InMemoryCacheService extends BaseCacheService {
  protected cache: Map<string, ICacheEntry<any>> = new Map();

  public get<T>(key: string): T | void {
    const entry = this.cache.get(key);

    if (entry) {
      if (entry.expiry && entry.expiry < Date.now()) {
        this.cache.delete(key);
        return;
      }
      return entry.value as T;
    }
  }

  public set<T>(key: string, value: T, ttlSeconds?: number): void {
    let expiry: number | null = null;

    if (ttlSeconds) {
      expiry = Date.now() + ttlSeconds * 1000;
    }

    this.cache.set(key, { value, expiry });
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public buildKey(context: string, params: Record<string, any>): string {
    const sortedParams = Object.entries(params)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}_${String(value)}`)
      .join(":");
    return `${context}:${sortedParams}`;
  }
}
