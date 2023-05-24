import {
  Accordion,
  Alert,
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
  SegmentedControl,
  Avatar,
  Timeline,
  Notification,
  Switch,
  useMantineTheme
} from "@mantine/core";

import { IconHammer, IconFingerprint, IconMail, IconDatabase, IconScan, IconGitBranch, IconX } from '@tabler/icons';

// import Safe, { SafeFactory } from "@safe-global/safe-core-sdk";
import Safe, { getSafeContract, EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
import { MetaTransactionData, OperationType, SafeTransactionDataPartial, RelayTransaction, MetaTransactionOptions } from "@safe-global/safe-core-sdk-types";
import { GelatoRelayPack } from '@safe-global/relay-kit'
// import EthersAdapter from "@safe-global/safe-ethers-lib";
import SafeApiKit from "@safe-global/api-kit";
import { BackButton, EmptyState, Image } from "components";
import { Contract, ethers } from "ethers";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useRecoveryStore from "store/recovery/recovery.store";
import crypto from 'crypto';
//@ts-ignore
import SafeIcon from "../../assets/icons/safe.png";


import recoveryModule from "../../artifacts/SocialRecoveryModule.json";
//@ts-ignore
import ZenGuard from "../../assets/icons/zenguard.svg";
import { IconCheck } from "@tabler/icons";
import { client, server } from "@passwordless-id/webauthn";
import { register } from "@passwordless-id/webauthn/dist/esm/client";


const oauthGuardian = '0x14E900767Eca41A42424F2E20e52B20c61f9E3eA';
const recoveryAPI = process.env.REACT_APP_RECOVERY_API;
const GELATO_RELAY_API_KEY = process.env.REACT_APP_GELATO_RELAY_API_KEY

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
  const theme = useMantineTheme();

  const { accountDetails, safeId, setSafeId } = useRecoveryStore(
    (state: any) => state
  );

  const [signalingPeriod, setSignalingPeriod] = useState(30);
  const [walletBeneficiary, setWalletBeneficiary]: any = useState('');
  const [webAuthnData, setWebAuthnData] = useState({});
  const [recoveryType, setRecoveryType]: any = useState('email');
  const [claimType, setClaimType]: any = useState();
  const [creating, setCreating] = useState(false);
  const [ guard, setGuard ] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [executedHash, setExecutedHash] = useState("");
  

  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'



  const registerBiometric = async () => {

  try {  
  setRegistering(true); 
  setRegistrationSuccess(false); 
  const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e"
  const registration = await client.register("ZenGuard Recovery", challenge, {
  "authenticatorType": "auto",
  "userVerification": "required",
  "timeout": 60000,
  "attestation": false,
  "debug": false
})

console.log(registration)
setRegistering(false); 
setRegistrationSuccess(true);

setWebAuthnData(registration);
  }
  catch(e) {

    setRegistering(false); 

  }



  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const createRecovery = async () => {

    const recoveryEmailHash = crypto.createHash('sha256').update(walletBeneficiary).digest('hex');

    console.log(recoveryEmailHash)

    try {
    const recoveryResponse = await axios.post(`${recoveryAPI}/recovery`, {
      type: 'email',
      recoveryEmailHash: recoveryEmailHash,
      webAuthnData: webAuthnData,
      safeAddress: safeId,
      chainId: 84531
    })
    
    const recModule = recoveryResponse.data.data.recoveryModuleAddress;
    



    const gasLimit = '100000'

const options: MetaTransactionOptions = {
  gasLimit,
  isSponsored: true
}
  
    
    setCreating(true);
    const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider).getSigner(0)
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider:safeOwner
    })

    
    // const safeService = new SafeApiKit({ txServiceUrl, ethAdapter })
    // console.log(await safeService.getSafesByOwner(accountDetails.authResponse.eoa))


    

    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress: safeId })
    console.log(await safeSdk.getOwners())


    const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY)

    // const safeTransaction = await safeSdk.createTransaction({
    //   safeTransactionData
    // })


    const safeSingletonContract = await getSafeContract({ ethAdapter, safeVersion: await safeSdk.getContractVersion() })

    

    
    let enableModuleTrans = await safeSdk.createEnableModuleTx(recModule);
    let signedSafeTx = await safeSdk.signTransaction(enableModuleTrans)

    let encodedTx = safeSingletonContract.encode('execTransaction', [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures()
    ])

    let relayTransaction: RelayTransaction = {
      target: safeId,
      encodedTransaction: encodedTx,
      chainId: 84531,
      options
    }

    let response = await relayKit.relayTransaction(relayTransaction)

    let taskStatus;
    do {
    await sleep(2000)
    console.log('waiting')
    try {
    taskStatus = await relayKit.getTaskStatus(response.taskId)
    }
    catch(e)
    {
      // pass
    }

    } while(taskStatus?.taskState != 'ExecSuccess') {
    }
    
    // let txResponse = await safeSdk.executeTransaction(enableModuleTrans)


    console.log(await safeSdk.getModules())


    const recoveryModuleInstance = new Contract(recModule, recoveryModule.abi, safeOwner)

    console.log(recoveryModuleInstance)

    let addGuardian =  recoveryModuleInstance.interface.encodeFunctionData('addGuardianWithThreshold', [safeId, oauthGuardian, 1])
    
    const safeTransactionData: SafeTransactionDataPartial = {
      to: recModule,
      value: "0",
      data: addGuardian 
    }

    const transaction = await safeSdk.createTransaction({safeTransactionData})

        
    signedSafeTx = await safeSdk.signTransaction(transaction)

    encodedTx = safeSingletonContract.encode('execTransaction', [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures()
    ])

    relayTransaction = {
      target: safeId,
      encodedTransaction: encodedTx,
      chainId: 84531,
      options
    }

     response = await relayKit.relayTransaction(relayTransaction)


    taskStatus = null;
    do {
    await sleep(2000)
    console.log('waiting')
    try {
    taskStatus = await relayKit.getTaskStatus(response.taskId)
    }
    catch(e)
    {
      // pass
    }

    } while(taskStatus?.taskState != 'ExecSuccess') 
    

    
    if(taskStatus.transactionHash) {
      setExecutedHash(taskStatus.transactionHash);
    }

    console.log(await recoveryModuleInstance.getGuardians(safeSdk.getAddress()))

    setCreating(false);
  }
  catch(e) {
    console.log(e)
    setCreating(false);

  }
  
  }



  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />
  
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );


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
              
              <Text mt={"lg"} align='center'> Enabling recovery on your wallet
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

          <Select
                label="Change wallet account"
                placeholder="Select a Safe wallet"
                // itemComponent={SelectItem}
                value={safeId}
                data={accountDetails.authResponse.safes.map((safe: any) =>
                   ({
                    // image: 
                    value: safe,
                    label: safe,
                    image: SafeIcon
                  }))
                  
                }  
                itemComponent={SelectItem} 
                
                onChange={(value) => setSafeId(value)}
              />

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Recovery settings 🛡️
            </Text>{" "}

          </Group> 

          <SegmentedControl size="lg"
          value={recoveryType}
          onChange={(value)=>{setRecoveryType(value)}}
      data={[
        {
          value: 'email',
          label: (
            <Center>
              <IconMail size="1.5rem" />
              <Box ml={10}>Email</Box>
            </Center>
          ),
        },
        {
          value: 'biometric',
          label: (
            <Center>
              <IconFingerprint size="1.5rem" />
              <Box ml={10}>Biometric</Box>
            </Center>
          ),
        },
        {
          disabled: true,
          value: 'arbitration',
          label: (
            <Center>
              <IconHammer size="1.5rem" />
              <Box ml={10}>Arbitration</Box>
            </Center>
          ),
        },
      ]}
    />
         { recoveryType == 'email' && <TextInput
            type="email"
            placeholder="Enter Beneficiary email"
            label="Beneficiary Email"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletBeneficiary(event.target.value);
            }}
          />

          }

        { recoveryType == 'biometric' && <>
        
        
        <Group sx={{ justifyContent: "space-between" }}>

            <Timeline active={registrationSuccess ? 1 : 0} bulletSize={30} lineWidth={3}>
            <Timeline.Item bullet={<IconScan size={20} />} title="Register your Biometric 🐾"   style={{
              paddingBottom: 30
            }}>
                <Text color="dimmed" size="sm"  style={{
              paddingTop: 20,  paddingBottom: 20  }}> Authenticate now with Touch ID or Face ID</Text>
            
                <Button
                // loading={registering}
                onClick={() => {
                  registerBiometric();
                }}
                leftIcon={<IconScan />} 
                variant="default"
                color="dark"
              >
                Register Now
              </Button>

              { registering && <Notification
                  loading
                  title="Registering your Touch ID/ Face ID"
                  withCloseButton={false}
                  style={{
                    marginTop: 30
                  }}
               >
              Authenticating Touch ID or Face ID with your device
               </Notification> }

               { registrationSuccess && <Notification
                  // loading
                  icon={<IconCheck size={20} />}
                  color="teal"
                  title="Registration Scuccessful"
                  withCloseButton={false}
                  style={{
                    marginTop: 30
                  }}
               >
              Successfully registered Face ID/ Touch ID using your device
               </Notification> }
              </Timeline.Item>

            <Timeline.Item bullet={<IconMail size={12} />} title="Email to identify recovery" style={{
              paddingBottom: 35 }}>
              
              <Text color="dimmed" size="sm"  style={{
              paddingTop: 20,  paddingBottom: 20  }}> Provide an email ID to idenity this recovery later</Text>
                
            <TextInput
              type="email"
              placeholder="Enter your email"
              // label="Email for recovery"
              rightSectionWidth={92}
              onChange={(event) => {
                setWalletBeneficiary(event.target.value);
              }}
              />

            </Timeline.Item>
          </Timeline>
          </Group>

             </>

          }

    <Switch
        checked={guard}
        onChange={(event) => setGuard(event.currentTarget.checked)}
        color="teal"
        size="md"
        label="Enable additional recovery guard"
        thumbIcon={
          guard ? (
            <IconCheck size="0.8rem" color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
          ) : (
            <IconX size="0.8rem" color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
          )
        }
      /> 
      { guard && <>
              <Select
                label="Add additional recovery guard"
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
          </>
          }

        <Button
            loading={creating}
            disabled={!walletBeneficiary || !registrationSuccess }
            onClick={() => {
              createRecovery();
            }}
            style={{
              background:
                "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
            }}
          >
            Create Recovery
          </Button>

          { executedHash && <Alert icon={<IconCheck size={32} />} title="Recovery created!" color="green" radius="lg">
            Recovery successfully created for the wallet. Verify <a href={`https://goerli.basescan.org/tx/${executedHash}`} target="_blank">here</a>
          </Alert> 
          }

        </Stack>
      </Container>
    </Paper>
  );
};
