export interface ICacheEntry<T> {
    value: T,
    expiry: number | null
}
