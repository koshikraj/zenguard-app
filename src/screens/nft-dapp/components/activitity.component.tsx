import { Box, Text } from "@mantine/core";
import { EmptyState } from "components";
import { NFTState } from "components";

export const Activity = (props: any) => {
  const { activity } = props;
  return (
    <Box >
      <Text size="lg" weight={600} align="center">
       Your NFTs
      </Text>

      { !activity && <EmptyState message="Mint an NFT Gasless" /> }
      { activity && <NFTState  /> }
    </Box>
  );
};
