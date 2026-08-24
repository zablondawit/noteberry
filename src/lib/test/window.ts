export const injectWindow = () => {
  Object.defineProperty(globalThis, "window", {
    writable: true,
    value: globalThis,
  });
};
