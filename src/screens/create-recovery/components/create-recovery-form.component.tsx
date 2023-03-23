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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {  } from "services";


//@ts-ignore
import Flask from "../../../assets/icons/flask.svg";
//@ts-ignore
import Safe from "../../../assets/icons/safe.svg";
import { ethers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeAccountConfig, SafeFactory } from "@safe-global/safe-core-sdk";
import SafeServiceClient from "@safe-global/safe-service-client";


const progressMessage = [{text: "Confirm the recovery on MetaMask Snap", image: Flask}, {text: "Creating recovery for wallet", image: Safe}]

export const CreateRecoveryForm = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();


  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const [progressStage, setProgressStage] = useState(0);


  const [signalingPeriod, setSignalingPeriod] = useState(30);

  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [walletBeneficiary, setWalletBeneficiary]: any = useState('');

  const [claimType, setClaimType]: any = useState();
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

  console.log(accountDetails)

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

    // // safeSdk.createRemoveOwnerTx
    
    console.log(safeSdk.getAddress())

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
          <Title>Create a Safe</Title>
        </Group>
        <Stack justify="flex-start">
          <TextInput
            type="text"
            placeholder="Enter Wallet Recovery Name"
            label="Wallet Recovery Name"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletName(event.target.value);
            }}
          />

          <Textarea
            placeholder="Wallet Recovery Description"
            label="Wallet Recovery Description (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletDescription(event.target.value);
            }}
          />

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Add a beneficiary
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

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Add a recovery method
            </Text>{" "}
            <Switch
              checked={advancedOptions}
              onChange={() => setAdvancedOptions(!advancedOptions)}
            />
          </Group>

          {advancedOptions && (
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
              {/* render feilds based on selected values */}
              {/* <DatePicker
                placeholder="Select DDAY date"
                label="Select DDay Date 
"
              /> */}

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
          )}


         

          <Button
            loading={creating}
            className={classes.button}
            onClick={() => {
              createSafe();
            }}
          >
            Create
          </Button>
        </Stack>
      </Paper>

      <Container className={classes.progressbox}>
        <ProgressStatus
          title="Creating a wallet via Safe"
          description="Provide the basic details for wallet recovery. You can select a wallet recovery method and also add a beneficiary ✍️."
          // update the status according to the progress
          status={creating ? 80 : 60}
        />
      </Container>
    </Container>
  );
};
