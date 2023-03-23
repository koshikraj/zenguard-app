import {
  Modal,
  Button,
  createStyles,
  Group,
  Paper,
  Center,
  Stack,
  TextInput,
  Text,
  Alert,
} from "@mantine/core";
import { useState } from "react";

//@ts-ignore
import Success from "../../assets/icons/success.svg";
import { Image } from "components";

export const useStyles = createStyles((theme) => ({
  SuccessIcon: {
    fill: "#099268",
    width: "60px",
    height: "60px",
  },
  successText: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#099268",
    textAlign: "center",
    marginTop: "30px",
  },
  button: {
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
  },
}));

export const SendModal = (props: any) => {
  const { classes } = useStyles();
  const { sendModal, setSendModal, value, wallet } = props;

  const [address, setAddress] = useState<string>();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendTransaction = async () => {
    setSending(true);
    if (address) {
      const res = await wallet.send(address);
    }
    setSending(false);
    setSuccess(true);
  };

  return (
    <>
      <Modal
        opened={sendModal}
        onClose={setSendModal}
        withCloseButton={false}
        centered
      >
        {/* Modal content */}
        {!success && (
          <Paper radius="md" p="xl">
            <Text size="lg" weight={900}>
              Transfer to your External Wallet
            </Text>

            <Stack mt="md">
              <TextInput
                size="sm"
                label="Enter Wallet Account Address*"
                placeholder="safient.eth"
                onChange={(event) => setAddress(event.target.value)}
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Button
                loading={sending}
                type="submit"
                fullWidth
                onClick={handleSendTransaction}
                className={classes.button}
              >
                {sending ? "Claiming" : "Claim"}
              </Button>
              <Alert variant="light" color="blue">
                A small amount of currency will be used to pay for the gas fee.
              </Alert>
            </Group>
          </Paper>
        )}

        {success && (
          <Paper radius="md" p="xl">
            <Center>
              <Image src={Success} className={classes.SuccessIcon} />
            </Center>
            <Text className={classes.successText}>
              You have successfully claimed the crypto from this voucher, check
              your wallet now. Cheers! 🎉
            </Text>
          </Paper>
        )}
      </Modal>
    </>
  );
};
