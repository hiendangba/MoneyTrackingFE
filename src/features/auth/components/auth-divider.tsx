export function AuthDivider() {
  return (
    <div
      className="my-4 flex items-center gap-3.5 text-xs text-muted before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line"
      role="separator"
    >
      <span>hoặc</span>
    </div>
  );
}
