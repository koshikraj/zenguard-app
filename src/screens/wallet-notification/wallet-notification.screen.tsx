import {
  Box,
  Container,
  createStyles,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { BackButton, EmptyState } from "components";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  notificationContainer: {
    borderRadius: "8px",
    width: "591px",
    margin: "45px auto 0 auto",
    minWidth: "591px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
  },

  formContainer: {
    marginBottom: "40px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "30px 20px",
    },
  },
}));

export const WalletNotification = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Paper withBorder className={classes.notificationContainer}>
      <Container className={classes.formContainer}>
        <Box mt={20}>
          <>
            <BackButton label="Go Back" onClick={() => navigate(-1)} />

            <Text align="center" weight={600} size="lg">
              Notifications
            </Text>
          </>
        </Box>

        <EmptyState message="No Notifications yet" />
      </Container>
    </Paper>
  );
};
