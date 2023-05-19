import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Stack,
  Input,
  Paper,
  Center,
} from "@mantine/core";
import { IconCopy } from "@tabler/icons";
import { useClipboard } from "@mantine/hooks";
import QRCode from "react-qr-code";

export interface RecieveModalProps {
  recieveModal: boolean;
  setRecieveModal: any;
  address: string;
}

export const RecieveModal = (props: RecieveModalProps) => {
  const { address, recieveModal, setRecieveModal } = props;

  const clipboard = useClipboard({ timeout: 500 });

  return (
    <>
      {" "}
      <Modal
        opened={recieveModal}
        onClose={() => setRecieveModal(false)}
        centered
        padding={40}
        title="Recieve Funds"
      >
        {/* Modal content */}
        <Stack>
          <Paper withBorder>
            <Center>
              <QRCode value={ address } />
            </Center>
          </Paper>

          <Input
            value={address}
            rightSection={
              <IconCopy
                color={clipboard.copied ? "green" : "grey"}
                onClick={() =>
                  clipboard.copy(address)
                }
              >
                {clipboard.copied ? "Copied" : "Copy"}
              </IconCopy>
            }
          />
        </Stack>
      </Modal>
    </>
  );
};
