//@ts-ignore
import MetaSafe from "../../../assets/images/zen-safe.svg";
import { forwardRef, useContext, useEffect, useState } from "react";
import {
  Container,
  Group,
  Stack,
  Select,
  Button,
  Text,
  Textarea,
  TextInput,
  Paper,
  Avatar,
  Alert,
  Switch,
  Box,
  Modal,
  Loader,
  Center,
} from "@mantine/core";
import { IconAlertCircle, IconCheck, IconCopy, IconPlugConnected } from "@tabler/icons";
import useRecoveryStore from "store/recovery/recovery.store";
import { useStyles } from "./create-recovery.component.styles";
import { BackButton, ProgressStatus, Title, Image } from "../../../components";
import recoveryModule from "../../../artifacts/SocialRecoveryModule.json";
import { useNavigate } from "react-router-dom";
import crypto from "crypto";

//@ts-ignore
import Flask from "../../../assets/icons/flask.svg";
//@ts-ignore
import Zenguard from "../../../assets/icons/zenguard.svg";
import { ethers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeEventEmitterProvider, CHAIN_NAMESPACES } from '@web3auth/base'
import { Web3Auth } from "@web3auth/modal";
import { SafeAccountConfig, SafeFactory } from "@safe-global/safe-core-sdk";
import SafeServiceClient from "@safe-global/safe-service-client";
import { Contract } from "ethers";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { RoutePath } from "navigation";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";
import axios from "axios";
import { client } from "@passwordless-id/webauthn";



const progressMessage = [{text: "Recovering the wallet", image: Zenguard}, {text: "Recovering the wallet", image: Zenguard}]


const RPC_URL='https://restless-young-layer.base-goerli.discover.quiknode.pro/3860a9e7a99900628604b143682330d4cec99db0'
const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'

export const BiometricAuth = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();


  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const [recoveryEmailHash, setRecoveryEmailHash] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [idToken, setIdToken] = useState("");

  const [progressStage, setProgressStage] = useState(0);

  const [authenticated, setAuthenticated] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [creating, setCreating] = useState(false);

  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)

  const { setCreateStep, setFormData, accountDetails, setSafeId } = useRecoveryStore(
    (state: any) => state
  );


  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'
  const recoveryAPI = process.env.REACT_APP_RECOVERY_API;
  
  
  const authenticateUser = async () => {
    
    setCreating(true);
    const web3auth = new Web3Auth({
      clientId: process.env.REACT_APP_W3AUTH_CLIENTID!,
      web3AuthNetwork: 'testnet',
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x14A33",
        rpcTarget: RPC_URL,
      },
      uiConfig: {
        theme: 'dark',
        loginMethodsOrder: ['google', 'facebook']
      }
    });

    await web3auth.initModal()

    await web3auth.connect()

    const safeBeneficiary = new ethers.providers.Web3Provider(web3auth.provider as ethers.providers.ExternalProvider).getSigner(0)

    const userInfo = await web3auth.getUserInfo()
    console.log(userInfo)

    setRecoveryEmailHash(crypto.createHash('sha256').update(userInfo.email!).digest('hex'));
    setIdToken(userInfo.idToken!)
    setNewOwner(await safeBeneficiary.getAddress())

    setAuthenticated(true);
    setCreating(false);

  }


  const authWebAuthn = async () => {


    // setRecoveryEmailHash(crypto.createHash('sha256').update(userInfo.email!).digest('hex'));

    console.log(recoveryEmailHash);

    setCreating(true);

    try {
      const accountDetails = await axios.get(`${recoveryAPI}/recovery-account`, { params: {
        recoveryEmailHash: recoveryEmailHash
      }})
      if(accountDetails.data.status) {

        console.log(accountDetails.data.data.webAuthnCreds.id)


        const challenge = "56535b13-5d93-4194-a282-f234c1c24500"
        const authentication = await client.authenticate([accountDetails.data.data.webAuthnCreds.id], challenge, {
            "authenticatorType": "auto",
            "userVerification": "required",
            "timeout": 60000
        })

        setAuthenticated(true);

      }
      setCreating(false);

    }
  catch(e) {
    setCreating(false);
    console.log(e);
  }
  }


  const recoverWallet = async () => {

    setCreating(true);

    try {
      const recoveryResponse = await axios.post(`${recoveryAPI}/recover`, {
        recoveryEmailHash: recoveryEmailHash,
        newOwner: newOwner,
        idToken: idToken,
        type: 'biometric'
      })
      console.log(recoveryResponse)
      setSafeId(recoveryResponse.data.data.safeAddress)
      navigate(RoutePath.wallet)
      setCreating(false);

    }
  catch(e) {
    setCreating(false);
    console.log(e);
  }
}


  const backButtonHandler = () => {
    setCreateStep(1);
  };

  return (
    <Container className={classes.box}>
            <Modal
        centered
        opened={creating}
        onClose={() => !creating}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        // overlayOpacity={0.5}
        size={320}
      >
        <Box sx={{ padding: "20px" }}>
          <Group>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
              
              <Text mt={"lg"} align='center'>{progressMessage[progressStage].text}
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={progressMessage[progressStage].image} width={50}/></Center> </Box>
              </Text>
              
            </Container>
          </Group>
        </Box>
      </Modal>
      <Paper className={classes.formContainer} withBorder>
        <BackButton label="Back to Previous" onClick={backButtonHandler} />
        <Group mb={30}>
          <Title>Recover a Wallet</Title>
        </Group>
        <Stack justify="flex-start">

        <Container sx={{ padding: 0, marginBottom: "46px" }}>
          <div className={classes.voucherImage}>
            <Center style={{ height: "100%" }}>
              <Center style={{ flexDirection: "column" }}>
                <Image src={MetaSafe} width={200} />
                <Text mt={10} weight={600} style={{ color: "white" }}>
                  {}
                </Text>
              </Center>
            </Center>
          </div>
          </Container>

          <TextInput label="Your Recovery email" placeholder="Enter Your Recovery email" onChange={(event)=>setRecoveryEmailHash(crypto.createHash('sha256').update(event.target.value).digest('hex'))} />
         
        { !authenticated && <Alert icon={<IconPlugConnected size={32} />} title="Verify your identity through biometric!" color="grape" radius="lg">
            Authenticate with your devide Touch ID/ Face ID to verify your biometric.
        </Alert>
       }

        { authenticated && <Alert icon={<IconCheck size={32} />} title="Biometric verified!" color="green" radius="lg">
            Your biometric is successfully verified proceed to recover the wallet.
          </Alert> 
          }

      {
         authenticated && <TextInput label="New Wallet Owner" placeholder="Enter New Wallet Owner Address" onChange={(event)=>setNewOwner(event.target.value)} />

       }


         
          <Button
            loading={creating}
            className={classes.button}
            onClick={() => {
              authenticated ? recoverWallet() : authWebAuthn(); 
              
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
             { authenticated ? "Recover" : "Authenticate" }
          </Button>
        </Stack>
      </Paper>

      <Container className={classes.progressbox}>
        <ProgressStatus
          title="Recovering a wallet"
          description="Authenticate with your social accounts to verify your email and recover the wallet. 🛡️"
          // update the status according to the progress
          status={creating ? 100 : 50}
        />
      </Container>
    </Container>
  );
};
