"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AuthNotificationContextValue = {
  feedback: string;
  notify: (message: string) => void;
  clearNotification: () => void;
};

const AuthNotificationContext = createContext<AuthNotificationContextValue | undefined>(undefined);

export function AuthNotificationProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useState("");

  return (
    <AuthNotificationContext.Provider value={{ feedback, notify: setFeedback, clearNotification: () => setFeedback("") }}>
      {children}
    </AuthNotificationContext.Provider>
  );
}

export function useAuthNotification() {
  const context = useContext(AuthNotificationContext);
  if (!context) throw new Error("useAuthNotification must be used inside AuthNotificationProvider");
  return context;
}
