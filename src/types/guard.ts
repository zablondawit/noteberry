/**
 * Type guard to prevent using an object in the scope the function
 * is called.
 */
export function useGuard<T>(obj: T): asserts obj is never {}
