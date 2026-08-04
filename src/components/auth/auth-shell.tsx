import type { ReactNode } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "@/components/link";

type AuthShellProps = {
  children: ReactNode;
};

const chartHeights = [38, 52, 45, 70, 62, 84, 96];
const chartLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function Brand() {
  return (
    <Stack
      component={NextLink}
      href="/login"
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", color: "inherit", textDecoration: "none", width: "fit-content" }}
      aria-label="Money Tracking - Trang đăng nhập"
    >
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(97, 35, 12, 0.24)",
          flexShrink: 0,
          height: 46,
          overflow: "hidden",
          width: 46,
        }}
      >
        <Image
          src="/images/moneytracking-brand-icon.png"
          alt="Logo Money Tracking"
          width={46}
          height={46}
          priority
        />
      </Box>
      <Typography sx={{ fontSize: 18, fontWeight: 650, letterSpacing: "-0.02em" }}>
        Money Tracking
      </Typography>
    </Stack>
  );
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        display: { lg: "grid" },
        gridTemplateColumns: { lg: "minmax(390px, 0.9fr) minmax(520px, 1.1fr)" },
        minHeight: "100vh",
      }}
    >
      <Box
        component="section"
        sx={{
          bgcolor: "#7a2e13",
          color: "common.white",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
          px: { lg: 5, xl: 8 },
          py: { lg: 4.5, xl: 6 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(255, 179, 107, 0.16)",
            borderRadius: "50%",
            filter: "blur(70px)",
            height: 340,
            left: -140,
            position: "absolute",
            top: "30%",
            width: 340,
          }}
        />
        <Brand />

        <Stack sx={{ my: "auto", maxWidth: 520, py: 8, position: "relative" }}>
          <Typography
            color="#ffc18a"
            sx={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Tài chính trong tầm tay
          </Typography>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { lg: 42, xl: 52 }, lineHeight: 1.14, mt: 2.5, maxWidth: 460 }}
          >
            Hiểu dòng tiền. Làm chủ tương lai.
          </Typography>
          <Typography sx={{ color: "rgba(255, 247, 237, 0.72)", lineHeight: 1.75, mt: 3, maxWidth: 460 }}>
            Theo dõi thu chi, xây dựng ngân sách và biến những con số phức tạp
            thành quyết định đơn giản mỗi ngày.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              backdropFilter: "blur(12px)",
              bgcolor: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 4,
              color: "common.white",
              mt: 6,
              p: 2.5,
              width: 360,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ color: "rgba(255, 247, 237, 0.62)", fontSize: 12 }}>
                  Tiết kiệm tháng này
                </Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 650, mt: 0.5 }}>
                  8.450.000 ₫
                </Typography>
              </Box>
              <Chip
                label="↗ 12,5%"
                size="small"
                sx={{
                  bgcolor: "rgba(255, 179, 107, 0.14)",
                  color: "#ffc18a",
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "flex-end", height: 96, mt: 3 }}
              aria-hidden="true"
            >
              {chartHeights.map((height, index) => (
                <Box
                  key={chartLabels[index]}
                  sx={{
                    bgcolor: index === chartHeights.length - 1 ? "#ff9a52" : "rgba(255, 255, 255, 0.16)",
                    borderRadius: "5px 5px 0 0",
                    flex: 1,
                    height: `${height}%`,
                  }}
                />
              ))}
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between", mt: 1.5 }}>
              {chartLabels.map((label) => (
                <Typography key={label} sx={{ color: "rgba(255, 247, 237, 0.48)", fontSize: 10 }}>
                  {label}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Stack>

        <Typography sx={{ color: "rgba(255, 247, 237, 0.48)", fontSize: 12 }}>
          © 2026 Money Tracking. Quản lý tốt hơn, sống nhẹ hơn.
        </Typography>
      </Box>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", py: 3 }}>
        <Container maxWidth="sm" sx={{ display: { lg: "none" } }}>
          <Brand />
        </Container>
        <Container
          maxWidth="sm"
          sx={{ alignItems: "center", display: "flex", flex: 1, py: { xs: 5, sm: 7 } }}
        >
          {children}
        </Container>
        <Typography
          color="text.secondary"
          sx={{ display: { lg: "none" }, fontSize: 12, textAlign: "center" }}
        >
          © 2026 Money Tracking
        </Typography>
      </Box>
    </Box>
  );
}
