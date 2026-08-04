import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthField } from "@/components/auth/auth-field";
import { GoogleButton } from "@/components/auth/google-button";
import NextLink from "@/components/link";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function RegisterPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3.5 }}>
        <Typography color="primary.main" sx={{ fontSize: 14, fontWeight: 600 }}>
          Bắt đầu miễn phí
        </Typography>
        <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
          Tạo tài khoản mới
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.7, mt: 1.5 }}>
          Chỉ mất một phút để bắt đầu quản lý tài chính tốt hơn.
        </Typography>
      </Box>

      <GoogleButton />
      <AuthDivider />

      <Stack component="form" spacing={2}>
        <AuthField
          autoComplete="name"
          id="fullName"
          label="Họ và tên"
          name="fullName"
          placeholder="Nguyễn Văn An"
          required
          type="text"
        />
        <AuthField
          autoComplete="email"
          id="email"
          label="Email"
          name="email"
          placeholder="ban@example.com"
          required
          type="email"
        />
        <AuthField
          autoComplete="new-password"
          id="password"
          label="Mật khẩu"
          name="password"
          placeholder="Tối thiểu 8 ký tự"
          required
          slotProps={{ htmlInput: { minLength: 8 } }}
          type="password"
        />
        <AuthCheckbox variant="terms" />
        <Button fullWidth type="submit" variant="contained">
          Tạo tài khoản
        </Button>
      </Stack>

      <Typography color="text.secondary" sx={{ fontSize: 14, mt: 3.5, textAlign: "center" }}>
        Đã có tài khoản?{" "}
        <Link component={NextLink} href="/login" sx={{ fontWeight: 650 }}>
          Đăng nhập
        </Link>
      </Typography>
    </Box>
  );
}
