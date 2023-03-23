import { Button, Center, Container, Stack } from "@mantine/core";
import { useState } from "react";
import { GenericCard, Image, Title, VoucherCard } from "../../components";
import { useStyles } from "./vouchers.screen.styles";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";
//@ts-ignore
import EmptyState from "../../assets/images/empty.svg";
import useRecoveryStore from "store/recovery/recovery.store";
import { useServices } from "services";
import { Wallet } from "utils";
import { utils } from "ethers";

export const VouchersScreen = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  let { code } = useParams();
  const wallet = new Wallet();
  const { setFetching, setFormData, setRecoveryDetails } = useRecoveryStore(
    (state: any) => state
  );

  const [modalActive, setModalActive] = useState(code ? true : false);

  const voucherCardHandler = async (safeId: any) => {
    setFetching(true);
    // todo- add a check for creator and ben
  };

  return (
    <Container>
      <Container className={classes.voucherScreenContainer}>
        <Container sx={{ padding: 0, marginTop: "42px" }}>
          <Title text="Create a New Wallet" />
        </Container>
        <div className={classes.actionsContainer}>
          <GenericCard
            title="Create"
            name="add"
            onClick={() => {
              navigate(RoutePath.createRecovery);
            }}
          />
          <GenericCard
            title="Recover"
            name="redeem"
            onClick={() => window.location.href = "https://wallet.safient.io"}
          />
        </div>

        <Title text="My Wallets" />

        <div className={classes.vouchersContainer}>

          {[].map((v) => (
            <div key={v}>
              <VoucherCard
                title={v}
                onClick={() => voucherCardHandler(v)}
              />
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};
