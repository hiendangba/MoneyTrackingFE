import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

type AuthFieldProps = Omit<TextFieldProps, "variant">;

export function AuthField(props: AuthFieldProps) {
  return <TextField {...props} />;
}
