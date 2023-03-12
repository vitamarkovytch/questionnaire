import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { ErrorMessageProps } from "../../utils/types";

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Typography
      variant="body2"
      gutterBottom
      pt="20px"
      color={red["A700"]}
      align="center"
    >
      {text}
    </Typography>
  );
}

export default ErrorMessage;
