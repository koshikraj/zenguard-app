import { Container } from "@mantine/core";
import { useStyles } from "./recovery-details.screen.styles";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { RecoveryCreationSuccess } from "./components/create-recovery-success.component";

export const RecoveryDetailsScreen = () => {
  const { classes } = useStyles();

  const createStep = useRecoveryStore((state: any) => state.createStep);

  return (
    <Container className={classes.createScreenContainer}>
     <RecoveryCreationSuccess />
    </Container>
  );
};
