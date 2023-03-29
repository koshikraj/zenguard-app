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
import { IconAlertCircle } from "@tabler/icons";
import useRecoveryStore from "store/recovery/recovery.store";
import { useStyles } from "./create-recovery.component.styles";
import { DatePicker } from "@mantine/dates";
import { useServices } from "services";
import { BackButton, ProgressStatus, Title, Image } from "../../../components";
import recoveryModule from "../../../artifacts/SocialRecoveryModule.json";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {  } from "services";

//@ts-ignore
import Flask from "../../../assets/icons/flask.svg";
//@ts-ignore
import Safe from "../../../assets/icons/safe.png";
import { ethers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeAccountConfig, SafeFactory } from "@safe-global/safe-core-sdk";
import SafeServiceClient from "@safe-global/safe-service-client";
import { Contract } from "ethers";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";


const progressMessage = [{text: "Creating a wallet using Safe", image: Safe}, {text: "Creating a wallet using Safe", image: Safe}]

export const CreateRecoveryForm = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();


  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const [progressStage, setProgressStage] = useState(0);


  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [walletBeneficiary, setWalletBeneficiary]: any = useState('');

  const [DdayTime, setDdayTime] = useState(0);

  const [date, setDate] = useState(null);


  const [seedPhrase, setSeedPhrase] = useState<any>("");
  const [balanceLoader, setBalanceLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [validator, setValidator] = useState(false);
  const [creating, setCreating] = useState(false);

  const [advancedOptions, setAdvancedOptions] = useState(false);

  const { setCreateStep, setFormData, accountDetails } = useRecoveryStore(
    (state: any) => state
  );


  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'


  
  
  const createSafe = async () => {
  
    setCreating(true);
    const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider).getSigner(0)
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider:safeOwner
    })

    
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })

    console.log(await safeService.getSafesByOwner(accountDetails.authResponse.eoa))

    const safeFactory = await SafeFactory.create({ ethAdapter })

    console.log(safeFactory)
    
    const safeAccountConfig: SafeAccountConfig = {
      owners: [accountDetails.authResponse.eoa!],
      threshold: 1,
      // ... (optional params)
    }

    const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })
    

    let trans = await safeSdk.createEnableModuleTx("0x9E7796874DD7BEd85B25D9589006a2942718a378");
    let txResponse = await safeSdk.executeTransaction(trans)
    await txResponse.transactionResponse?.wait()
    console.log(await safeSdk.getModules())

    const recoveryModuleInstance = new Contract("0x9E7796874DD7BEd85B25D9589006a2942718a378", recoveryModule.abi, safeOwner)

    console.log(recoveryModuleInstance)

    let addGuardian = await recoveryModuleInstance.interface.encodeFunctionData('addGuardianWithThreshold', [safeSdk.getAddress(), '0x14E900767Eca41A42424F2E20e52B20c61f9E3eA', 1])
    
    const safeTransactionData: SafeTransactionDataPartial = {
      to: '0x9E7796874DD7BEd85B25D9589006a2942718a378',
      value: "0",
      data: addGuardian 
    }

    const transaction = await safeSdk.createTransaction({safeTransactionData})
    console.log(await safeSdk.executeTransaction(transaction))

    console.log(safeSdk.getAddress())
    console.log(await recoveryModuleInstance.getGuardians(safeSdk.getAddress()))

    setCreating(false);
  

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
          <Title>Create a Wallet</Title>
        </Group>
        <Stack justify="flex-start">
          <TextInput
            type="text"
            placeholder="Enter Wallet Name"
            label="Wallet Name (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletName(event.target.value);
            }}
          />

          <Textarea
            placeholder="Wallet Description"
            label="Wallet Description (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletDescription(event.target.value);
            }}
          />

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Advanced options
            </Text>{" "}
            <Switch
              checked={isBeneficiary}
              onChange={() => setIsBeneficiary(!isBeneficiary)}
            />
          </Group> 
          { isBeneficiary && <TextInput
            type="email"
            placeholder="Enter Beneficiary email or DID"
            label="Beneficiary Email or DID (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletBeneficiary(event.target.value);
            }}
          />
          }

          {/* advanced */}

          {/* <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Add a recovery method
            </Text>{" "}
            <Switch
              checked={advancedOptions}
              onChange={() => setAdvancedOptions(!advancedOptions)}
            />
          </Group> */}

          {/* {advancedOptions && (
            <>
              <Select
                label="Select Claim Type"
                placeholder="Select Cliam Type"
                // itemComponent={SelectItem}
                // value={chain}
                data={[
                  {
                    value: "0",
                    label: "Signaling (You can send the signal when claimed)",
                  },
                  {
                    value: "1",
                    label: "Arbitration (Arbitrators decide the claim)",
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
            label="Signaling period (Seconds)"
            rightSectionWidth={92}
            onChange={(event) => {
              setSignalingPeriod(parseInt(event.target.value));
            }}
          />

          <Alert>
            This will create a wallet using signaling method with 300 sec
            signaling period. Click on "Add a Claim Type" to update
          </Alert>
            </>
          )} */}


         

          <Button
            loading={creating}
            className={classes.button}
            onClick={() => {
              createSafe();
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
            Create
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
