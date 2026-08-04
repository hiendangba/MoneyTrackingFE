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
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography color="primary.main" sx={{ fontSize: 14, fontWeight: 600 }}>
          Chào mừng trở lại
        </Typography>
        <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
          Đăng nhập tài khoản
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.7, mt: 1.5 }}>
          Tiếp tục hành trình quản lý tài chính của bạn.
        </Typography>
      </Box>

      <GoogleButton />
      <AuthDivider />

      <Stack component="form" spacing={2.5}>
        <AuthField
          autoComplete="email"
          id="email"
          label="Email"
          name="email"
          placeholder="ban@example.com"
          required
          type="email"
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography component="label" htmlFor="password" sx={{ fontSize: 14, fontWeight: 550 }}>
              Mật khẩu
            </Typography>
            <Link component={NextLink} href="#" sx={{ fontSize: 14, fontWeight: 600 }}>
              Quên mật khẩu?
            </Link>
          </Stack>
          <AuthField
            autoComplete="current-password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            required
            type="password"
          />
        </Box>
        <AuthCheckbox variant="remember" />
        <Button fullWidth type="submit" variant="contained">
          Đăng nhập
        </Button>
      </Stack>

      <Typography color="text.secondary" sx={{ fontSize: 14, mt: 4, textAlign: "center" }}>
        Chưa có tài khoản?{" "}
        <Link component={NextLink} href="/register" sx={{ fontWeight: 650 }}>
          Đăng ký miễn phí
        </Link>
      </Typography>
    </Box>
  );
}
