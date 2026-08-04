"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "@/components/link";

type AuthCheckboxProps = {
  variant: "remember" | "terms";
};

export function AuthCheckbox({ variant }: AuthCheckboxProps) {
  if (variant === "remember") {
    return (
      <FormControlLabel
        control={<Checkbox name="remember" size="small" />}
        label="Ghi nhớ đăng nhập"
        slotProps={{ typography: { color: "text.secondary", sx: { fontSize: 14 } } }}
      />
    );
  }

  const termsLabel = (
    <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.5 }}>
      Tôi đồng ý với{" "}
      <Link component={NextLink} href="#" sx={{ fontWeight: 600 }}>
        Điều khoản sử dụng
      </Link>{" "}
      và{" "}
      <Link component={NextLink} href="#" sx={{ fontWeight: 600 }}>
        Chính sách bảo mật
      </Link>
      .
    </Typography>
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          name="terms"
          size="small"
          slotProps={{ input: { required: true } }}
        />
      }
      label={termsLabel}
      sx={{ alignItems: "flex-start", m: 0 }}
    />
  );
}
