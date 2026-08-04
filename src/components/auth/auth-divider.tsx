import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export function AuthDivider() {
  return (
    <Divider sx={{ my: 3 }}>
      <Typography color="text.secondary" sx={{ fontSize: 12 }}>
        hoặc
      </Typography>
    </Divider>
  );
}
