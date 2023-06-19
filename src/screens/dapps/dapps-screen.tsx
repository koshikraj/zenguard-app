import { Button, Center, Container, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { GenericCard, Image, Title, VoucherCard } from "../../components";
import { useStyles } from "./dapps-screen.styles";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";
//@ts-ignore
import EmptyState from "../../assets/images/empty.svg";
import useRecoveryStore from "store/recovery/recovery.store";
import { Wallet } from "utils";


export const DAppsScreen = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  let { code } = useParams();
  const wallet = new Wallet();
  const { setFetching, setSafeId, accountDetails, setAuthDetails, setRecoveryType } = useRecoveryStore(
    (state: any) => state
  );

  console.log(accountDetails.authResponse?.safes)

  const [modalActive, setModalActive] = useState(code ? true : false);

  const safeCardHandler = async (safeId: any) => {
    setFetching(true);
    setSafeId(safeId);
    navigate(RoutePath.wallet);
    
  };

  useEffect(() => {

    ;(async () => {

    var authStore = localStorage.getItem("openlogin_store");
    if (authStore) { 
      setAuthDetails(JSON.parse(authStore))
    }
    
  })()   
  }, [])



  return (
    <Container>
      <Container className={classes.voucherScreenContainer}>
        <Container sx={{ padding: 0, marginTop: "42px" }}>
          <Title text="Sample DApps" />
        </Container>
        <div className={classes.actionsContainer}>
          <GenericCard
            title="NFT DApp"
            name="nft"
            onClick={() => {
              navigate(RoutePath.nftDApp);
            }}
          />
        </div>

      </Container>
    </Container>
  );
};
