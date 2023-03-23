import { useState } from "react";
import { Modal, Button, Group, Stack, Input, TextInput } from "@mantine/core";

export interface SendModalProps {
  sendModal: boolean;
  setSendModal: any;
}

export const Send = (props: SendModalProps) => {
  const { sendModal, setSendModal } = props;

  return (
    <>
      {" "}
      <Modal
        opened={sendModal}
        onClose={() => setSendModal(false)}
        centered
        padding={40}
        title="Transfer Funds"
      >
        {/* Modal content */}
        <Stack>
          <TextInput label="Enter Address" placeholder="Enter wallet Address" />
          <TextInput label="Enter Value" placeholder="Value" />
          <Button>Send</Button>
        </Stack>
      </Modal>
    </>
  );
};
