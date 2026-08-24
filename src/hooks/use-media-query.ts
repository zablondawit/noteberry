import React from "react";

export const useMediaQuery = (query: string) => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = window.matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
};

if (import.meta.vitest) {
  const { it, expect, beforeEach } = import.meta.vitest;
  const { injectWindow } = await import("@/lib/test/window");

  beforeEach(() => {
    injectWindow();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => {
        return {
          matches: query === "(min-width: 0px)",
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as unknown as MediaQueryList;
      },
    });
  });

  it("should return true for a matching media query", () => {
    const query = "(min-width: 0px)";
    const result = window.matchMedia(query);
    expect(result.matches).toBe(true);
  });
}
