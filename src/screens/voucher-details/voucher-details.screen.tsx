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
  UnstyledButton,
  Chip,
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
import Transaction from "../../assets/icons/transaction.svg";
//@ts-ignore
import SafeIcon from "../../assets/icons/safe.png";
//@ts-ignore
import Base from "../../assets/icons/base.png";
//@ts-ignore
import ETH from "../../assets/icons/eth.svg";
//@ts-ignore
import Gnosis from "../../assets/icons/gno.svg";
//@ts-ignore
import Polygon from "../../assets/icons/matic.svg";
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
import { useClipboard } from "@mantine/hooks";
import { AddressUtil } from "utils/address";
import NFTDetails  from "utils/artifacts/nft.json";
import { TimeUtil } from "utils/time";
import { NetworkUtil } from "utils/networks";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";


let GELATO_RELAY_API_KEY = process.env.REACT_APP_GELATO_RELAY_API_KEY;
let nftContract = '';

export const VoucherDetailsScreen = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { accountDetails, safeId, safeStatus, chainId, setAccountDetails, setSafeId } = useRecoveryStore((state: any) => state);
  const [ fetching, setFetching ] =  useState(true);
  const [ balance, setBalance ] = useState('0');
  const [ nftBalance, setNFTBalance ] = useState('0');
  const [ loadingActivities, setLoadingActivities ] = useState(false);
  const [ creating, setCreating ] = useState(false);

  const clipboard = useClipboard({ timeout: 500 });


  const authenticateUser = async (signin=false ) => {

    const safeAuth =  await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          
      chainId: '0x' + NetworkUtil.getNetworkById(chainId)?.chainId.toString(16),
      txServiceUrl:  NetworkUtil.getNetworkById(chainId)?.safeService, // Optional. Only if want to retrieve related safes
      authProviderConfig: {
        rpcTarget: NetworkUtil.getNetworkById(chainId)!.url,
        clientId: process.env.REACT_APP_W3AUTH_CLIENTID!,
        network: 'testnet',
        theme: 'dark'
      }
    })

    const response = signin ? await safeAuth?.signIn() : null;

    return { response: response, auth: safeAuth}
  }

  useEffect(() => {
    ;(async () => {

      // const safeAuth = await authenticateUser(true);
      // setAccountDetails({provider: safeAuth.auth?.getProvider(), authResponse: safeAuth.response, safeAuth: safeAuth.auth })
      // setSafeId(JSON.parse(localStorage.getItem("defaultWallet")!)[accountDetails.authResponse.eoa][chainId].address)
      GELATO_RELAY_API_KEY = NetworkUtil.getNetworkById(chainId)?.type == 'Mainnet' ? process.env.REACT_APP_GELATO_RELAY_API_KEY_MAINNET : process.env.REACT_APP_GELATO_RELAY_API_KEY;


      nftContract = JSON.parse(JSON.stringify(NFTDetails)).networkAddresses[chainId];
      console.log(nftContract)
      // const eoa = accountDetails.authResponse.eoa;

      // let defaultWallet: any =  localStorage.getItem("defaultWallet") ? JSON.parse(localStorage.getItem("defaultWallet")!) : {};
  
      // defaultWallet[eoa] = { address: safeId, deployed: safeStatus };
  
      // localStorage.setItem("defaultWallet", JSON.stringify(defaultWallet))
      
      setLoadingActivities(true);
      const safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider)
      setBalance(ethers.utils.formatEther(await safeOwner.getBalance(safeId)));   
      const NFTInstance = new Contract(nftContract, sampleNFT.abi, safeOwner)
      setNFTBalance((await NFTInstance.balanceOf(safeId)).toString());   
      setFetching(false);
      setLoadingActivities(false);

    

    })()
  }, [creating, safeStatus])


  const mintNFT = async () => {
    
    const gasLimit = '100000'

    const options: MetaTransactionOptions = {
      gasLimit,
      isSponsored: true
    }
      
    
    setCreating(true);

    while(!JSON.parse(localStorage.getItem("defaultWallet")!)[accountDetails.authResponse.eoa][chainId].deployed) {
      await TimeUtil.sleep(1000);
    }


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
      chainId: chainId,
      options
    }

    const response = await relayKit.relayTransaction(relayTransaction)


    let taskStatus = null;
    do {
    await TimeUtil.sleep(2000)
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
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={Transaction} width={50}/></Center> </Box>
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
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(73, 179, 147, 0.1);",
                      padding: "4px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    <Image
                    src={
              { 100: Gnosis, 
                84531: Base,
                5: ETH
              }[chainId as number]} width={28} /> 
                    <Text  sx={{
                      padding: "8px",

                    }}
                    color={"green"}> {NetworkUtil.getNetworkById(chainId)?.name } {NetworkUtil.getNetworkById(chainId)?.type }</Text>
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
                   { safeStatus &&  <>
                  <Image src={SafeIcon} width={15} /> 
                  <Chip checked color="green" variant="light" size="xs" radius="md">Deployed</Chip>
                  </>
                  }
                  
                    <UnstyledButton
                    
                   
                      onClick={()=> window.open(
                        `${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${safeId}`,
                        "_blank"
                      )}
                    
                       
                
                    >
                     { AddressUtil.shorternAddress(safeId) }
                      </UnstyledButton>
                      <UnstyledButton>
                      <IconCopy
                      
                color={clipboard.copied ? "green" : "grey"}
                onClick={() =>
                  clipboard.copy(safeId)
                }
              >
                {clipboard.copied ? "Copied" : "Copy"}
              </IconCopy>   
              </UnstyledButton>
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