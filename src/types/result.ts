import type { ExpectedError } from "./errors";
import type { TypedError } from "./errors/typed";

type UnexpectedError = TypedError<
  "UNEXPECTED",
  {
    message: string;
    cause: unknown;
  }
>;
export type ApplicationError = UnexpectedError | ExpectedError;
// all the error types generated from application error
export type ApplicationErrorType = ApplicationError extends { type: infer T }
  ? T
  : never;

export type OkResult<T> = { success: true; data: T };
export type FailureResult<
  C = unknown,
  E extends ApplicationError = ApplicationError,
> = {
  success: false;
  message: string;
  error?: E;
  ctx?: C;
};
export type Result<
  T,
  C = unknown,
  E extends ApplicationError = ApplicationError,
> = OkResult<T> | FailureResult<C, E>;

export type AsyncResult<
  T,
  C = unknown,
  E extends ApplicationError = ApplicationError,
> = Promise<Result<T, C, E>>;

export function ok<T>(data: T): OkResult<T> {
  return {
    data,
    success: true,
  };
}

export function fail<
  E extends ApplicationError,
  C extends FailureResult["ctx"],
>(message: string, error?: E, ctx?: C): FailureResult<C, E> {
  return {
    message,
    error,
    ctx,
    success: false,
  };
}

export function isOk<T, E extends ApplicationError>(
  result: Result<T, unknown, E>,
): result is OkResult<T> {
  return result.success === true;
}

export function isFailure<T, E extends ApplicationError>(
  result: Result<T, unknown, E>,
): result is FailureResult<unknown, E> {
  return result.success === false;
}

// export function resolveResultArray<T, E extends ApplicationError>( results: Result<T, E>[]): Result<T[], E>;

export function isAllOk<T, E extends ApplicationError>(
  results: Result<T, E>[],
): results is OkResult<T>[] {
  return results.every(isOk);
}

/**
 * Wraps a function call in a try-catch block and returns a Result type.
 */
export function wrap<T>(fn: () => T, msg: string): Result<T> {
  try {
    return ok(fn());
  } catch (cause) {
    return fail(msg, {
      type: "UNEXPECTED",
      message: msg,
      cause,
    });
  }
}

/**
 * Wraps an async function call in a try-catch block and returns an AsyncResult type.
 */
export async function wrapAsync<T>(
  fn: () => Promise<T>,
  msg: string,
): AsyncResult<T> {
  try {
    return ok(await fn());
  } catch (cause) {
    return fail(msg, {
      type: "UNEXPECTED",
      message: msg,
      cause,
    });
  }
}
