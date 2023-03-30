import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Box,
  Notification,
  Alert,
  Modal,
  Center,
  Loader,
  Container,
} from "@mantine/core";
import { GoogleButton, MetaMaskButton } from "../../components";
import { OAuthProvider } from "@magic-ext/oauth";
import { ethers } from 'ethers'

import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData } from '@safe-global/auth-kit'
import SafeServiceClient from '@safe-global/safe-service-client'
import EthersAdapter from '@safe-global/safe-ethers-lib'

import { useServices } from "services";
import { useStores } from "store";
import { RoutePath } from "navigation";
import { StyledSpan } from "./auth.screen.styles";

import Safe, { SafeAccountConfig, SafeFactory } from '@safe-global/safe-core-sdk'
import useRecoveryStore from "store/recovery/recovery.store";

const RPC_URL='https://restless-young-layer.base-goerli.discover.quiknode.pro/3860a9e7a99900628604b143682330d4cec99db0'


const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'

export function LoginScreen(props: any) {


  
  let navigate = useNavigate();

  const [signingIn, setSigningIn] = useState(false);
  const [loginType, setLoginType] = useState("wallet");

  const { setAccountDetails } = useRecoveryStore(
    (state: any) => state
  );

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<SafeAuthSignInData | null>(
    null
  )
  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)


  useEffect(() => {
    ;(async () => {
      await setSafeAuth(
        await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          
          chainId: "0x14A33",
          txServiceUrl: txServiceUrl, // Optional. Only if want to retrieve related safes
          authProviderConfig: {
            rpcTarget: RPC_URL,
            clientId: 'BAcCop_qaWVfw15peOnVq8xd8KefD3UvZ-3bKip0RNy0w1J0Z8ZKNNzWiFW97a66S-UGr-oZpzdk1hE8SwWmy00',
            network: 'testnet',
            theme: 'dark'
          }
        })
      )
    })()
  }, [])



  const handleLogin = async () => {
    if (!safeAuth) return



    const response = await safeAuth.signIn()
    console.log('SIGN IN RESPONSE: ', response)

    console.log(response)
    setSafeAuthSignInResponse(response)
    setProvider(safeAuth.getProvider() as SafeEventEmitterProvider)

    setAccountDetails({provider: safeAuth.getProvider() as SafeEventEmitterProvider, authResponse: response})

    navigate(RoutePath.recovery)
  }



  const logout = async () => {
    if (!safeAuth) return

    await safeAuth.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }

  return (
    <>
      <Modal
        centered
        opened={signingIn}
        onClose={() => !signingIn}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        overlayOpacity={0.5}
        size={320}
      >
        <Box radius="md" sx={{ padding: "20px" }} {...props}>
          <Group>
            <Container
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
            </Container>
            <Text sx={{ textAlign: "center" }}>
              {" "}
              Please sign the message on Wallet if prompted. This may take a
              couple of seconds ...
            </Text>
          </Group>
          
        </Box>
      </Modal>

      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          padding: "10px",
        })}
      >
        <Paper radius="md" p="xl" sx={{ width: "500px" }} withBorder {...props}>
          <Text size="lg" weight={900}>
            Welcome to ZenGuard👋
          </Text>

          {errorMessage.length > 0 && (
            <Box mt="md">
              <Text size="md" color="red">
                {errorMessage}
              </Text>
            </Box>
          )}

              <Box mt="md">
              <Text size="sm" >
            Get started just with your social accounts, email or even your existing wallets. It's that simple!
            .
          </Text>
            </Box>


          <Group position="apart" mt="xl">
            <Button
              type="submit"
              fullWidth
              onClick={handleLogin}
              style={{
                background:
                  "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
              }}
            >
              Get started
            </Button>
          </Group>

          <Divider label="" labelPosition="center" my="lg" />

          {/* <Text size="sm" align="center">
            By logging in, you are agreeing to the{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/terms",
                  "_blank"
                )
              }
            >
              Terms of Service{" "}
            </StyledSpan>{" "}
            and{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/privacy",
                  "_blank"
                )
              }
            >
              Privacy policy
            </StyledSpan>
            .
          </Text> */}
        </Paper>
      </Box>
    </>
  );
}
