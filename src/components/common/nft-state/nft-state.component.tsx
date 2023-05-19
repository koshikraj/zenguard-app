// @ts-nocheck
import { Box, Center, Group, Stack, Text } from "@mantine/core";
import NFTStateImg from "../../../assets/images/zgd-nft.svg";

export interface NFTStateProps {
  message?: string;
}

export const NFTState = (props: NFTStateProps) => {
  const { message } = props;
  return (
    <Box mt={30}>
      <Center>
        <Stack>
          <img src={NFTStateImg} alt="empty" width={200}/>
          <Text align="center">{message}</Text>
        </Stack>
      </Center>
    </Box>
  );
};
