type ApplicationError = Error;

export type OkResult<T> = { success: true; data: T };
export type FailResult<
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
> = OkResult<T> | FailResult<C, E>;

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

export function fail<E extends ApplicationError, C extends FailResult["ctx"]>(
  message: string,
  error?: E,
  ctx?: C,
): FailResult<C, E> {
  return {
    message,
    error,
    ctx,
    success: false,
  };
}

export function isOk<T, E extends ApplicationError>(
  result: Result<T, E>,
): result is OkResult<T> {
  return result.success === true;
}

export function isFail<T, E extends ApplicationError>(
  result: Result<T, E>,
): result is FailResult<E> {
  return result.success === false;
}

// export function resolveResultArray<T, E extends ApplicationError>(
//   results: Result<T, E>[],
// ): Result<T[], E> {
//   const errors = results.filter(isFail);
//   if (errors.length > 0) {
//     return fail(errors.map((e) => e.message).join(", "), errors[0].error);
//   }

//   const data = results.filter(isOk).map((r) => r.data);
//   return ok(data);
// }

export function isAllOk<T, E extends ApplicationError>(
  results: Result<T, E>[],
): results is OkResult<T>[] {
  return results.every(isOk);
}

export function tryCatch<T>(fn: () => T, msg: string): Result<T> {
  try {
    return ok(fn());
  } catch (error) {
    return fail(msg, error as Error);
  }
}

export function tryCatchAsync() {
  throw new Error("not implemented");
}
