import { Box, Center, Text } from "@mantine/core";
import { EmptyState } from "components";
import { NFTState } from "components";

export const Activity = (props: any) => {
  const { activityCount } = props;
  return (
    <Box >
      <Text size="lg" weight={600} align="center">
       Your NFTs
      </Text>

      <Center mt={20} mb={20}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      // eslint-disable-next-line no-restricted-globals
                      // filter: "blur(8px)", //conditional render
                    }}
                  >
                    <Text weight={600} sx={{ fontSize: "30px" }}>
                    { activityCount }
                    </Text>
                    <Text size="sm">ZenGuard NFTs</Text>
                  </Box>
                </Center> 

      { !Boolean(activityCount) && <EmptyState message="Mint an NFT Gasless" /> }
      { Boolean(activityCount) && <NFTState  /> }
    </Box>
  );
};
