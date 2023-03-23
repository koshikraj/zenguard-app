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
}

export const RecieveModal = (props: RecieveModalProps) => {
  const { recieveModal, setRecieveModal } = props;

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
              <QRCode value="0x9264c4dd3ef78ac7d7fc37605b6a870a2803dc3b" />
            </Center>
          </Paper>

          <Input
            value={"0x9264c4dd3ef78ac7d7fc37605b6a870a2803dc3b"}
            rightSection={
              <IconCopy
                color={clipboard.copied ? "green" : "grey"}
                onClick={() =>
                  clipboard.copy("0x9264c4dd3ef78ac7d7fc37605b6a870a2803dc3b")
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
