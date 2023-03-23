import { useEffect, useState } from "react";
import { Modal, Group, Box, Paper, Text } from "@mantine/core";
import {
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { IconCopy } from "@tabler/icons";
import useVoucherStore from "store/recovery/recovery.store";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

export const ShareModal = (props: any) => {
  const { shareModalPopup, setShareModalPopup } = props;
  const [sharableLink, setSharableLink] = useState("");

  const { sharableDigest } = useVoucherStore((state: any) => state);
  const link = `${"http://localhost:3000"}/vouchers/${sharableDigest}`;
  const clipboard = useClipboard({ timeout: 500 });

  const copyLink = async () => {
    clipboard.copy(`${"http://localhost:3000"}/vouchers/${sharableDigest}`);
  };

  useEffect(() => {
    if (sharableLink !== undefined) {
      setSharableLink(link);
    }
  }, []);

  return (
    <>
      <Modal
        opened={shareModalPopup}
        onClose={() => setShareModalPopup(false)}
        withCloseButton={false}
        centered
        sx={{ borderRadius: "4px" }}
      >
        {/* Modal content */}
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={900}>
            Hola.. Share your voucher with
          </Text>

          <Group position="apart" mt={40}>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconCopy
                size={30}
                cursor="pointer"
                color={clipboard.copied ? "teal" : "#626E99"}
                onClick={() => {
                  clipboard.copy(sharableLink);
                  showNotification({
                    message: "Sharable link has been copied",
                  });
                }}
              />
              <Text size="sm" mt={6}>
                Copy URL
              </Text>
            </Box>

            <EmailShareButton
              url={sharableLink}
              body="Click here Redeem your Voucher-"
              subject="Safient Voucher Giveaway"
            >
              <EmailIcon size={30} round={true} />
              <Text size="sm">Email</Text>
            </EmailShareButton>

            <WhatsappShareButton
              title="Click here Redeem your Voucher-"
              url={sharableLink}
            >
              <WhatsappIcon size={30} round={true} />
              <Text size="sm">WhatsApp</Text>
            </WhatsappShareButton>

            <TelegramShareButton
              title="Click here Redeem your Voucher-"
              url={sharableLink}
            >
              <TelegramIcon size={30} round={true} />
              <Text size="sm">Telegram</Text>
            </TelegramShareButton>
          </Group>
        </Paper>
      </Modal>
    </>
  );
};
