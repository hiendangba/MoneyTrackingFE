import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";

function GoogleIcon() {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.74 2.98-4.31 2.98-7.4Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.98-.9 6.63-2.42l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.77-5.61-4.14H3.04v2.61A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.39 13.87A6.02 6.02 0 0 1 6.08 12c0-.65.11-1.28.31-1.87V7.52H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.48l3.35-2.61Z" fill="#FBBC05" />
      <path d="M12 5.99c1.47 0 2.79.5 3.82 1.49l2.87-2.87A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.61C7.18 7.76 9.39 5.99 12 5.99Z" fill="#EA4335" />
    </SvgIcon>
  );
}

export function GoogleButton() {
  return (
    <Button
      fullWidth
      startIcon={<GoogleIcon />}
      sx={{ borderColor: "divider", color: "text.primary" }}
      type="button"
      variant="outlined"
    >
      Tiếp tục với Google
    </Button>
  );
}
