// Copyright (c) 2026 Zablon Dawit
// Licensed under the Apache License, Version 2.0
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
