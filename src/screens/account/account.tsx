import { useEffect } from "react";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation/route-path";

export const Account = () => {
  

    const { accountDetails, setSafeId, setAuthDetails } = useRecoveryStore((state: any) => state);


    var authStore = localStorage.getItem("openlogin_store");
    if (authStore) { 
      setAuthDetails(JSON.parse(authStore))

    }

    const navigate = useNavigate();


    const updateWalletStore =  () => { 


        let walletStore: any =  localStorage.getItem("defaultWallet") ? JSON.parse(localStorage.getItem("defaultWallet")!) : {};

        if(!(accountDetails.authResponse.safes.includes(walletStore[accountDetails.authResponse.eoa]?.address))) {
            walletStore[accountDetails.authResponse.eoa] = '';
        }

        return walletStore;

    }
    

    useEffect(() => {

    ;(async () => {

    let walletStore: any =   updateWalletStore();
    console.log(walletStore)

    console.log(accountDetails.authResponse.safes)

    if (accountDetails.authResponse.safes.length) { 
        
        if(walletStore && !walletStore[accountDetails.authResponse.eoa]) {

            const eoa = accountDetails.authResponse.eoa;
            walletStore[eoa] = { address: accountDetails.authResponse.safes[0] }
            localStorage.setItem("defaultWallet", JSON.stringify(walletStore))
            
        }
        
        console.log(JSON.parse(localStorage.getItem("defaultWallet")!)[accountDetails.authResponse.eoa])
        setSafeId(JSON.parse(localStorage.getItem("defaultWallet")!)[accountDetails.authResponse.eoa].address)


        navigate(RoutePath.wallet)

    }
    else {
        navigate(RoutePath.createRecovery)

    }
    
  })()



   
  }, [])

  return (<> </>)
    
};
