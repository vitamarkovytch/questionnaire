import { Box, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { requiredText, subTitle, title } from "./constants";

function FormHead() {
  return (
    <Box sx={{ bgcolor: "white", minHeight: "150px", borderRadius: "7px" }}>
      <Box
        sx={{
          bgcolor: blue[300],
          height: "12px",
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          width: "100%",
        }}
      />
      <Box sx={{ p: "10px 30px" }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {subTitle}
        </Typography>
        <Typography variant="body2" gutterBottom p="10px 0" color={red["A700"]}>
          {requiredText}
        </Typography>
      </Box>
    </Box>
  );
}

export default FormHead;
