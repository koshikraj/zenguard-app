import { Container } from "@mantine/core";
import { UserAuth } from "./components/user-auth.component";
import { useStyles } from "./create-recovery.screen.styles";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { RecoveryCreationSuccess } from "./components/create-recovery-success.component";

export const WalletRecoveryScreen = () => {
  const { classes } = useStyles();

  const createStep = useRecoveryStore((state: any) => state.createStep);

  return (
    <Container className={classes.createScreenContainer}>
      {createStep === 1 && <UserAuth />}
      {createStep === 2 && <RecoveryCreationSuccess />}
    </Container>
  );
};
