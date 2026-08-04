export type TypedError<T, EXTEND> = {
  type: T;
} & EXTEND;
