import {
  Center,
  Container,
  Group,
  Stack,
  Text,
  Paper,
  Box,
  Loader,
  Modal,
  Skeleton,
} from "@mantine/core";
import {
  BackButton,
  ClaimModal,
  Image,
  RecieveModal,
  Send,
  Title,
} from "../../components";
import sampleNFT from "../../artifacts/SampleNFT.json";
//@ts-ignore
import ZenGuard from "../../assets/icons/zenguard.svg";
import { IconCopy, IconBell, IconSettings, IconPlus } from "@tabler/icons";
import { useStyles } from "./voucher-details.screen.styles";
import useRecoveryStore from "store/recovery/recovery.store";
import { useEffect, useState } from "react";
import { VoucherDetailsShimmer } from "./voucher-details.shimmer";
import { Actions } from "./components/actions.component";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation";
import { LockedWallet } from "./components/locked-wallet.component";
import { Activity } from "./components/activitity.component";
import { Contract, ethers } from "ethers";
import { MetaTransactionOptions, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import Safe, { EthersAdapter, getSafeContract } from "@safe-global/protocol-kit";
import { GelatoRelayPack } from "@safe-global/relay-kit";


const GELATO_RELAY_API_KEY = process.env.REACT_APP_GELATO_RELAY_API_KEY
const nftContract = '0xe0c306959922f4094a2AA6f1D88Ff8640D9e3e5e';

export const VoucherDetailsScreen = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { accountDetails, safeId } = useRecoveryStore((state: any) => state);
  const [ fetching, setFetching ] =  useState(true);
  const [ balance, setBalance ] = useState('0');
  const [ nftBalance, setNFTBalance ] = useState('0');
  const [ loadingActivities, setLoadingActivities ] = useState(false);
  const [ creating, setCreating ] = useState(false);


  useEffect(() => {
    ;(async () => {
      setLoadingActivities(true);
      const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider)
      setBalance(ethers.utils.formatEther(await safeOwner.getBalance(safeId)));   
      const NFTInstance = new Contract(nftContract, sampleNFT.abi, safeOwner)
      setNFTBalance((await NFTInstance.balanceOf(safeId)).toString());   
      setFetching(false);
      setLoadingActivities(false);

    })()
  }, [creating])


  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const mintNFT = async () => {
    
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

    

    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress: safeId })

    const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY)



    const safeSingletonContract = await getSafeContract({ ethAdapter, safeVersion: await safeSdk.getContractVersion() })

    const NFTInstance = new Contract(nftContract, sampleNFT.abi, safeOwner)

    let addGuardian =  NFTInstance.interface.encodeFunctionData('mint')
    
    const safeTransactionData: SafeTransactionDataPartial = {
      to: nftContract,
      value: "0",
      data: addGuardian 
    }

    const transaction = await safeSdk.createTransaction({safeTransactionData})

        
    const signedSafeTx = await safeSdk.signTransaction(transaction)

    const encodedTx = safeSingletonContract.encode('execTransaction', [
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

    const relayTransaction = {
      target: safeId,
      encodedTransaction: encodedTx,
      chainId: 84531,
      options
    }

    const response = await relayKit.relayTransaction(relayTransaction)


    let taskStatus = null;
    do {
    await sleep(2000)
    console.log('waiting')
    try {
    taskStatus = await relayKit.getTaskStatus(response.taskId)
    console.log(taskStatus?.taskState)
    }
    catch(e)
    {
      // pass
    }

    } while(taskStatus?.taskState != 'ExecSuccess') 
    

  
    setCreating(false);
  
  }

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
              
              <Text mt={"lg"} align='center'> Minting a new NFT
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={ZenGuard} width={50}/></Center> </Box>
              </Text>
              
            </Container>
          </Group>
        </Box>
      </Modal>
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
                      backgroundColor: "rgba(73, 179, 147, 0.1);",
                      padding: "4px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    <Text color={"green"}> Base Goerli Testnet</Text>
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

                      <IconPlus
                      onClick={() => navigate(RoutePath.createRecovery)}
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
                      onClick={()=> window.open(
                        `https://goerli.basescan.org/address/${safeId}`,
                        "_blank"
                      )}
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

                <Actions address={safeId} mintNFT={mintNFT}/>
                {/* conditional rendering */}

                {/* <LockedWallet /> */}

               
              </Stack>

              <Stack>
                
                
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
                  </Box>
                </Center> 
      { loadingActivities && !creating && <Stack mt={20}>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="10%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="20%" />
        </Group>

        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
           <Skeleton height={120} mt={6} width="25%" />
        </Group>
        
      </Stack>
               }
               { (!loadingActivities || creating )&&  <Activity activityCount={parseInt(nftBalance)}/> }

              </Stack>
            </Container>
          </Paper>
        </>
      )}
    </>
  );
};