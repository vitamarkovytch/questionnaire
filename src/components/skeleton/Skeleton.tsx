import { Box, Stack, Skeleton as SkeletonMUI } from "@mui/material";
import { SkeletonProps } from "../../utils/types";

const Skeleton = ({ boxesHeight }: SkeletonProps) => {
  return (
    <Box sx={{ pb: "30px" }}>
      <Stack spacing={3}>
        {boxesHeight.map((height, index) => (
          <SkeletonMUI
            key={index}
            variant="rounded"
            width="100%"
            height={height}
            animation="wave"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Skeleton;
