export function AppFooter() {
  const currentDateTime = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());

  return (
    <p className="m-0 shrink-0 text-center text-xs text-muted">
      © {currentDateTime} Money Tracking
    </p>
  );
}
