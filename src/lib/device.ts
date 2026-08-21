type DeviceType = "mobile" | "tablet" | "desktop";
const SCREEN_SIZES = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024,
} as const as Record<DeviceType, number>;

export const detectDeviceSize = (_window: Window): DeviceType => {
  if (typeof _window === "undefined") return "desktop";
  const width = _window.innerWidth;

  if (width < SCREEN_SIZES.mobile) {
    return "mobile";
  } else if (width >= SCREEN_SIZES.mobile && width < SCREEN_SIZES.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("should detect device size correctly", () => {
    const mockWindowMobile = { innerWidth: 500 } as Window;
    const mockWindowTablet = { innerWidth: 800 } as Window;
    const mockWindowDesktop = { innerWidth: 1200 } as Window;

    expect(detectDeviceSize(mockWindowMobile)).toBe("mobile");
    expect(detectDeviceSize(mockWindowTablet)).toBe("tablet");
    expect(detectDeviceSize(mockWindowDesktop)).toBe("desktop");
  });
}
