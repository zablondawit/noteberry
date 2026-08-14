import type { TypedError } from "./typed";

export type ResourceNotFoundError = TypedError<
  "RESOURCE_NOT_FOUND",
  {
    resource: string;
  }
>;
export type StoreError = ResourceNotFoundError;
