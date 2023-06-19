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
  Stepper,
  Notification,
  Divider
} from "@mantine/core";
import { IconAlertCircle, IconAt, IconCheck, IconCopy, IconPlugConnected, IconWallet } from "@tabler/icons";
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
import { NetworkUtil } from "utils/networks";



const progressMessage = [{text: "Verifying the biometrics", image: Zenguard}, {text: "Authenticating a new user", image: Zenguard},  {text: "Recovering the wallet", image: Zenguard}]


export const BiometricAuth = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();


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


  const chainId = 5
  const recoveryAPI = process.env.REACT_APP_RECOVERY_API;
  
  
  const authenticateUser = async () => {
    
    setCreating(true);
    const web3auth = new Web3Auth({
      clientId: process.env.REACT_APP_W3AUTH_CLIENTID!,
      web3AuthNetwork: 'testnet',
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x' + NetworkUtil.getNetworkById(chainId)?.chainId.toString(16),
        rpcTarget: NetworkUtil.getNetworkById(chainId)?.url,
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
  
    const newEOA = await safeBeneficiary.getAddress();

    setNewOwner(await safeBeneficiary.getAddress())   

    setProgressStage(2);

    setCreating(false); 

  }


  const authWebAuthn = async () => {

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
        setProgressStage(1);
        setCreating(false);

      }

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

      setSafeId(recoveryResponse.data.data.safeAddress)

      setCreating(false);
      navigate(RoutePath.wallet)
     

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

          
         
        { !authenticated && 
        <>
        <TextInput icon={<IconAt size="0.8rem" />} label="Your Recovery email for verification" placeholder="Enter Your Recovery email" onChange={(event)=>setRecoveryEmailHash(crypto.createHash('sha256').update(event.target.value).digest('hex'))} />
        <Alert icon={<IconPlugConnected size={32} />} title="Verify your identity through biometric!" color="grape" radius="lg">
            Authenticate with your devide Touch ID/ Face ID to verify your biometric.
        </Alert>
        </>
       }

        {  progressStage == 1 && <Notification icon={<IconCheck size="1.1rem" />} color="teal" title="Biometric verified!"  withCloseButton={false}>
            Your biometric is successfully verified. Proceed to recover the wallet.
              </Notification>
          }

      { progressStage == 2 && <Notification icon={<IconCheck size="1.1rem" />} color="teal" title="All set to recover!"  withCloseButton={false}>
            You are now ready to recover your wallet to your account.
              </Notification>
          }

      {
          progressStage == 1 && 
         <>
         <TextInput icon={<IconWallet size="0.8rem" />} label="New Wallet Owner" placeholder="Enter New Wallet Owner Address" onChange={(event)=>setNewOwner(event.target.value)} />
         <Divider my="xs" label="OR" labelPosition="center" />

         <Button
            variant="default"
            onClick={() => { authenticateUser()}}
         
          >
             Create Account
          </Button>
         </>

       }


         
          <Button
            className={classes.button}
            onClick={() => {
              authenticated ? recoverWallet() : authWebAuthn(); 
              
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
             { authenticated ? "Recover" : "Verify" }
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
