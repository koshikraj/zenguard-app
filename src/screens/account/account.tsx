import { useEffect } from "react";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation/route-path";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";
import { NetworkUtil } from "utils/networks";
import { VoucherDetailsShimmer } from "screens/voucher-details/voucher-details.shimmer";

export const Account = () => {
  

    const { accountDetails, setSafeId, setAuthDetails, setAccountDetails, chainId, safeId } = useRecoveryStore((state: any) => state);


    

    const navigate = useNavigate();


    const updateWalletStore =  (authResponse: any) => { 


        let walletStore: any =  localStorage.getItem("defaultWallet") ? JSON.parse(localStorage.getItem("defaultWallet")!) : {};

       try { 
        if(!(authResponse.safes.includes(walletStore[authResponse.eoa][chainId]?.address))) {
            walletStore[authResponse.eoa][chainId] = '';
        }
       }
       catch (e) {
            
        walletStore[authResponse.eoa] = {};
        walletStore[authResponse.eoa][chainId] = ''; 
    }

        return walletStore;

    }

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

    var authStore = localStorage.getItem("openlogin_store");
    if (authStore) { 
      setAuthDetails(JSON.parse(authStore))

    }

    ;(async () => {

    const safeAuth = await authenticateUser(true);
    setAccountDetails({provider: safeAuth.auth?.getProvider(), authResponse: safeAuth.response, safeAuth: safeAuth.auth })    

    let walletStore: any =   updateWalletStore(safeAuth.response);
    localStorage.setItem("defaultWallet", JSON.stringify(walletStore))

    if (safeAuth.response?.safes?.length) { 
        
        if(walletStore && !walletStore[safeAuth.response.eoa][chainId]) {

            const eoa = safeAuth.response.eoa;
            walletStore[eoa][chainId] = { address: safeAuth.response.safes[0], deployed: true }
            
            
        }
        localStorage.setItem("defaultWallet", JSON.stringify(walletStore))
        
        if(!safeId) {
            setSafeId(JSON.parse(localStorage.getItem("defaultWallet")!)[safeAuth.response.eoa][chainId].address)
        }


        navigate(RoutePath.wallet)

    }
    else {
        navigate(RoutePath.createRecovery)

    }
    
  })()



   
  }, [])

  return (<VoucherDetailsShimmer />)
    
};
