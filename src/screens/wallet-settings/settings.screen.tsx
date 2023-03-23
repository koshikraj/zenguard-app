import {
  Accordion,
  Box,
  Container,
  createStyles,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { BackButton, EmptyState } from "components";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  settingsContainer: {
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

export const WalletSettings = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Paper withBorder className={classes.settingsContainer}>
      <Container className={classes.formContainer} p={40}>
        <Box mt={20}>
          <>
            <BackButton label="Go Back" onClick={() => navigate(-1)} />

            <Text align="center" weight={600} size="lg">
              Settings
            </Text>
          </>
        </Box>
        <Stack>
          <TextInput
            type="text"
            placeholder="Wallet Name"
            label="Waller Name"
            rightSectionWidth={92}
          />

          <TextInput
            type="text"
            placeholder="Wallet Beneficiary"
            label="Wallet Beneficiary"
            rightSectionWidth={92}
          />
          {/* advanced */}

          <TextInput
            type="text"
            placeholder="Enter Signaling Period"
            label="Signaling Period"
            rightSectionWidth={92}
          />

          <Select
            label="Select Network"
            placeholder="Select Cliam Type"
            // itemComponent={SelectItem}
            // value={chain}
            data={[
              {
                value: "PolygonMainnet",
                label: "Polygon Mainnet",
              },
            ]}
            // onChange={setChain}
          />
        </Stack>
      </Container>
    </Paper>
  );
};
