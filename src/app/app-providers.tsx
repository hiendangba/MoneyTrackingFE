"use client";

import type { ReactNode } from "react";
import { NotificationProvider } from "@/shared/ui/notification/notification-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
