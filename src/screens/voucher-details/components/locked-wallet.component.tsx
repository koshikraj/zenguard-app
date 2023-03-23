// @ts-nocheck

import Locked from "../../../assets/icons/lock.svg";

import { Button, Center, Image, Stack, Text } from "@mantine/core";
import { IconLockAccessOff } from "@tabler/icons";

export const LockedWallet = () => {
  return (
    <Center mt={40}>
      <Stack>
        <Center>
          <Image src={Locked} />
        </Center>
        <Text mt={20}>Wallet is not yet Accessible</Text>
        <Button mt={10}>Claim</Button>
      </Stack>
    </Center>
  );
};
