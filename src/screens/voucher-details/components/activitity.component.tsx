import { Box, Text } from "@mantine/core";
import { EmptyState } from "components";

export const Activity = () => {
  return (
    <Box mt={40}>
      <Text size="lg" weight={600} align="center">
        Activities
      </Text>

      <EmptyState message="No Activities yet" />
    </Box>
  );
};
