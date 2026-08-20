export const combine =
  <T extends (...args: any[]) => any>(...fns: (T | undefined)[]) =>
  (...args: Parameters<T>): ReturnType<T> | void =>
    fns.forEach((fn) => fn && fn(...args));

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("combine should call all functions with the same arguments", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    const combined = combine(fn1, fn2, fn3);
    combined(1, 2, 3);

    expect(fn1).toHaveBeenCalledWith(1, 2, 3);
    expect(fn2).toHaveBeenCalledWith(1, 2, 3);
    expect(fn3).toHaveBeenCalledWith(1, 2, 3);
  });
}
