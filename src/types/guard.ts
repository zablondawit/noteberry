/**
 * Type guard to prevent using an object in the scope the function
 * is called.
 */
export function useGuard<T>(_obj: T): asserts _obj is never {}
