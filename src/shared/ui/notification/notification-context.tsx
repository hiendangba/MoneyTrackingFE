"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { TranslationKey, useI18n } from "@/shared/i18n";
import { Notification, NotificationVariant } from "./notification";

type NotificationContextValue = {
  feedback: string;
  notify: (message: string, variant?: NotificationVariant) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [feedback, setFeedback] = useState("");
  const [variant, setVariant] = useState<NotificationVariant>(NotificationVariant.Success);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsDismissing(true);
    }, 4500);

    const removeTimer = window.setTimeout(() => {
      setFeedback("");
    }, 5000);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [feedback]);

  const notify = (
    message: string,
    nextVariant: NotificationVariant = NotificationVariant.Success,
  ) => {
    setVariant(nextVariant);
    setIsDismissing(false);
    setFeedback(message);
  };

  const clearNotification = () => {
    setIsDismissing(true);
    window.setTimeout(() => setFeedback(""), 500);
  };

  return (
    <NotificationContext.Provider
      value={{ feedback, notify, clearNotification }}
    >
      {children}
      {feedback && (
        <Notification
          message={feedback}
          style={{
            opacity: isDismissing ? 0 : 1,
            animation: isDismissing
              ? "none"
              : "notification-fade-out 5s linear forwards",
            transition: isDismissing ? "opacity 500ms ease-in-out" : undefined,
          }}
          onClose={clearNotification}
          title={t(TranslationKey.CommonNotificationTitle)}
          variant={variant}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }
  return context;
}
