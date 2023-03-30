import {
  Accordion,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Safe, { SafeFactory } from "@safe-global/safe-core-sdk";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import SafeServiceClient from "@safe-global/safe-service-client";
import { BackButton, EmptyState, Image } from "components";
import { Contract, ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useRecoveryStore from "store/recovery/recovery.store";
import sha256 from 'crypto';


import recoveryModule from "../../artifacts/SocialRecoveryModule.json";
//@ts-ignore
import ZenGuard from "../../assets/icons/zenguard.svg";


const oauthGuardian = '0x14E900767Eca41A42424F2E20e52B20c61f9E3eA';
const recoveryAPI = 'http://localhost:8080';

const useStyles = createStyles((theme) => ({
  settingsContainer: {
    borderRadius: "8px",
    width: "591px",
    margin: "45px auto 0 auto",
    minWidth: "591px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
  },

  formContainer: {
    marginBottom: "40px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "30px 20px",
    },
  },
}));

export const WalletSettings = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { accountDetails, safeId } = useRecoveryStore(
    (state: any) => state
  );

  const [signalingPeriod, setSignalingPeriod] = useState(30);
  const [walletBeneficiary, setWalletBeneficiary]: any = useState('');
  const [claimType, setClaimType]: any = useState();
  const [creating, setCreating] = useState(false);
  

  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'

  console.log(accountDetails)


  
  
  const createRecovery = async () => {

    const recoveryEmailHash = sha256.createHash('sha256').update(walletBeneficiary).digest('hex');

    console.log(recoveryEmailHash)

    try {
    const recoveryResponse = await axios.post(`${recoveryAPI}/recovery`, {
      recoveryEmailHash: recoveryEmailHash,
      safeAddress: safeId
    })
    
    const recModule = recoveryResponse.data.data.recoveryModuleAddress;
  
    
    setCreating(true);
    const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider).getSigner(0)
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider:safeOwner
    })

    
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })

    console.log(await safeService.getSafesByOwner(accountDetails.authResponse.eoa))

    

    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress: safeId })
    console.log(await safeSdk.getOwners())

    // let enableModuleTrans = await safeSdk.createEnableModuleTx(recModule);
    // let txResponse = await safeSdk.executeTransaction(enableModuleTrans)
    // await txResponse.transactionResponse?.wait()
    console.log(await safeSdk.getModules())

    console.log(recModule)

    const recoveryModuleInstance = new Contract(recModule, recoveryModule.abi, safeOwner)

    console.log(recoveryModuleInstance)

    let addGuardian =  recoveryModuleInstance.interface.encodeFunctionData('addGuardianWithThreshold', [safeSdk.getAddress(), oauthGuardian, 1])
    
    const safeTransactionData: SafeTransactionDataPartial = {
      to: recModule,
      value: "0",
      data: addGuardian 
    }

    // const transaction = await safeSdk.createTransaction({safeTransactionData})
    // console.log(await safeSdk.executeTransaction(transaction))

    console.log(safeSdk.getAddress())
    console.log(await recoveryModuleInstance.getGuardians(safeSdk.getAddress()))

    setCreating(false);
  }
  catch(e) {
    console.log(e)
    setCreating(false);

  }
  
  }


  return (
    <Paper withBorder className={classes.settingsContainer}>
      <Container className={classes.formContainer} p={40}>
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
        overlayOpacity={0.5}
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
              
              <Text mt={"lg"} align='center'> Adding recovery module to your wallet
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={ZenGuard} width={50}/></Center> </Box>
              </Text>
              
            </Container>
          </Group>
        </Box>
      </Modal>
        <Box mt={20}>
          <>
            <BackButton label="Go Back" onClick={() => navigate(-1)} />

            <Text align="center" weight={600} size="lg">
              Settings
            </Text>
          </>
        </Box>
        <Stack>

          {/* <Select
            label="Select Network"
            placeholder="Select Cliam Type"
            // itemComponent={SelectItem}
            // value={chain}
            data={[
              {
                value: "PolygonMainnet",
                label: "Polygon Mainnet",
              },
            ]}
            // onChange={setChain}
          /> */}

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Recovery settings 🛡️
            </Text>{" "}

          </Group> 
        <TextInput
            type="email"
            placeholder="Enter Beneficiary email"
            label="Beneficiary Email"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletBeneficiary(event.target.value);
            }}
          />
          

          {/* advanced */}

   
              <Select
                label="Select Recovery Type"
                placeholder="Select Recovery Type"
                // itemComponent={SelectItem}
                // value={chain}
                data={[
                  {
                    value: "0",
                    label: "Cooling period (You can revoke before the cooling period)",
                  },
                  {
                    value: "1",
                    label: "Arbitration (Arbitrators decide the recovery claim)",
                  },
                  {
                    value: "2",
                    label: "DDAY (Claim on exact date)",
                  },
                ]}
                onChange={(value) => setClaimType(parseInt(value!))}
              />

          <TextInput
            type="text"
            placeholder={signalingPeriod.toString()}
            label="Cooling period (Seconds)"
            rightSectionWidth={92}
            onChange={(event) => {
              setSignalingPeriod(parseInt(event.target.value));
            }}
          />

        <Button
            loading={creating}
            onClick={() => {
              createRecovery();
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
            Confirm
          </Button>

        </Stack>
      </Container>
    </Paper>
  );
};
