import {
  Center,
  Container,
  Group,
  Stack,
  Text,
  Paper,
  Box,
} from "@mantine/core";
import {
  BackButton,
  ClaimModal,
  RecieveModal,
  Send,
  Title,
} from "../../components";
import { IconCopy, IconBell, IconSettings } from "@tabler/icons";
import { useStyles } from "./voucher-details.screen.styles";
import useRecoveryStore from "store/recovery/recovery.store";
import { useEffect, useState } from "react";
import { VoucherDetailsShimmer } from "./voucher-details.shimmer";
import { Actions } from "./components/actions.component";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation";
import { LockedWallet } from "./components/locked-wallet.component";
import { Activity } from "./components/activitity.component";
import { ethers } from "ethers";

export const VoucherDetailsScreen = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { accountDetails, fetching, setFetching, safeId } = useRecoveryStore((state: any) => state);
  const [ balance, setBalance ] = useState('0');

  // const formatExpiration = () => {
  //   const presentTime = Date.now() / 1000;

  //   const expiresOn = ` ${new Date(
  //     recoveryDetails.timeStamp + recoveryDetails.expirationTime * 1000
  //   ).toLocaleString()} ( ${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
  //   const expirationTime =
  //     recoveryDetails.timeStamp / 1000 +
  //     recoveryDetails.expirationTime -
  //     presentTime;

  //   return {
  //     days: Math.floor(expirationTime / 86400),
  //     hours: Math.ceil((expirationTime % 86400) / 3600),
  //     expired: expirationTime <= 0,
  //     expiresOn: expiresOn,
  //   };
  // };

  useEffect(() => {
    ;(async () => {
      
      setFetching(false);
      const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider)
      setBalance(ethers.utils.formatEther(await safeOwner.getBalance(safeId)));   

    })()
  }, [])

  return (
    <>
      {fetching ? (
        <VoucherDetailsShimmer />
      ) : (
        <>
          {/* <Confetti /> */}

          <ClaimModal />

          <Paper withBorder className={classes.voucherDetailsContainer}>
            <Container className={classes.formContainer}>
              <Box mt={20}>
                <BackButton label="Go Back" onClick={() => navigate(-1)} />
              </Box>
              <Container sx={{ padding: 0, marginBottom: "32px" }}>
                <Group
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Title text="Wallet Name" />
                  <Box
                    sx={{
                      backgroundColor: "#EDF7F5",
                      padding: "4px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    <Text color={"green"}>Base Goerli Testnet</Text>
                  </Box>
                  <Group>
                    <IconBell
                      onClick={() => navigate(RoutePath.notifications)}
                      style={{ cursor: "pointer" }}
                    />

                    <IconSettings
                      onClick={() => navigate(RoutePath.walletSettings)}
                      style={{ cursor: "pointer" }}
                    />
                  </Group>
                </Group>
              </Container>

              <Stack>
                <Center mt={20}>
                  <Group>
                    <Text
                      sx={
                        {
                          // filter: "blur(8px)"
                        }
                      }
                    >
                      { safeId }
                    </Text>
                    <IconCopy />
                  </Group>
                </Center>

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
                    { balance }
                    </Text>
                    <Text size="sm">ETH</Text>
                  </Box>
                </Center>

                <Actions />
                {/* conditional rendering */}

                {/* <LockedWallet /> */}

                <Activity />
              </Stack>
            </Container>
          </Paper>
        </>
      )}
    </>
  );
};
