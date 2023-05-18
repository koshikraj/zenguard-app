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
import { IconAlertCircle, IconPlugConnected } from "@tabler/icons";
import useRecoveryStore from "store/recovery/recovery.store";
import { useStyles } from "./create-recovery.component.styles";
import { DatePicker } from "@mantine/dates";
import { useServices } from "services";
import { BackButton, ProgressStatus, Title, Image } from "../../../components";
import recoveryModule from "../../../artifacts/SocialRecoveryModule.json";
import { useNavigate } from "react-router-dom";
import crypto from "crypto";

//@ts-ignore
import Flask from "../../../assets/icons/flask.svg";
//@ts-ignore
import Safe from "../../../assets/icons/safe.png";
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



const progressMessage = [{text: "Creating a wallet using Safe", image: Safe}, {text: "Creating a wallet using Safe", image: Safe}]


const RPC_URL='https://restless-young-layer.base-goerli.discover.quiknode.pro/3860a9e7a99900628604b143682330d4cec99db0'
const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'

export const CreateRecoveryForm = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();


  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const [progressStage, setProgressStage] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [creating, setCreating] = useState(false);

  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)

  const { setCreateStep, setFormData, accountDetails, setSafeId } = useRecoveryStore(
    (state: any) => state
  );


  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'

  



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

  
  
  const authenticateUser = async () => {


    
    const web3auth = new Web3Auth({
      clientId: 'BAcCop_qaWVfw15peOnVq8xd8KefD3UvZ-3bKip0RNy0w1J0Z8ZKNNzWiFW97a66S-UGr-oZpzdk1hE8SwWmy00',
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

    web3auth.connect()

    const walletBeneficiary = await web3auth.getUserInfo()

    const recoveryEmailHash = crypto.createHash('sha256').update(walletBeneficiary.email!).digest('hex');

    console.log(recoveryEmailHash)
    // const response = await safeAuth.signIn()
    // console.log( safeAuth.)
    // console.log('SIGN IN RESPONSE: ', response)
    // setCreating(true);
    // const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider).getSigner(0)
    // const ethAdapter = new EthersAdapter({
    //   ethers,
    //   signerOrProvider:safeOwner
    // })

    
    // const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })

    // console.log(await safeService.getSafesByOwner(accountDetails.authResponse.eoa))

    // const safeFactory = await SafeFactory.create({ ethAdapter })

    // console.log(safeFactory)
    
    // const safeAccountConfig: SafeAccountConfig = {
    //   owners: [accountDetails.authResponse.eoa!],
    //   threshold: 1,
    //   // ... (optional params)
    // }

    // const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })

    // setSafeId(safeSdk.getAddress())

    // setCreating(false);

    // navigate(RoutePath.wallet)
  
  }





  const createRecovery = async () => {
    setCreating(true);

    setFormData({
      title: walletName,
      description: walletDescription
    });

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
        opacity={0.5}
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
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={progressMessage[progressStage].image} width={30}/></Center> </Box>
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



         
        <Alert icon={<IconPlugConnected size={32} />} title="Connect your MetaMask!" color="grape" radius="lg">
            Install the Safient Snap by connecting MetaMask and providing the required permissions.
    </Alert>
         
          <Button
            loading={creating}
            className={classes.button}
            onClick={() => {
              authenticateUser();
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
            Authenticate
          </Button>
        </Stack>
      </Paper>

      <Container className={classes.progressbox}>
        <ProgressStatus
          title="Creating a wallet via Safe"
          description="Provide the basic details for the wallet. You can even create a multisig wallet with multiple signer ✍️."
          // update the status according to the progress
          status={creating ? 100 : 50}
        />
      </Container>
    </Container>
  );
};
