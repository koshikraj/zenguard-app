import { Container } from "@mantine/core";
import { UserAuth } from "./components/user-auth.component";
import { useStyles } from "./create-recovery.screen.styles";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { BiometricAuth } from "./components/biometric-auth.component";

export const WalletRecoveryScreen = () => {
  const { classes } = useStyles();

  const { recoveryType } = useRecoveryStore(
    (state: any) => state
  );

  console.log(recoveryType)

  return (
    <Container className={classes.createScreenContainer}>
      {recoveryType === "email" && <UserAuth />}
      {recoveryType === "biometric" && <BiometricAuth />}
    </Container>
  );
};
