import { Container } from "@mantine/core";
import { CreateRecoveryForm } from "./components/create-recovery-form.component";
import { useStyles } from "./create-recovery.screen.styles";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { RecoveryCreationSuccess } from "./components/create-recovery-success.component";

export const CreateRecoveryScreen = () => {
  const { classes } = useStyles();

  const createStep = useRecoveryStore((state: any) => state.createStep);

  return (
    <Container className={classes.createScreenContainer}>
      {createStep === 1 && <CreateRecoveryForm />}
      {createStep === 2 && <CreateRecoveryForm />}
      {createStep === 3 && <RecoveryCreationSuccess />}
    </Container>
  );
};
