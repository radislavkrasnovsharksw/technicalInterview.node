export interface ICacheService {
    get<T>(key: string): T | void;
    set<T>(key: string, value: T, ttlSeconds?: number): void;
    delete(key: string): void;
    clear(): void;
    buildKey(context: string, params: Record<string, any>): string;
}
