import {
  Group,
  Stack,
  Alert,
  Button,
  Container,
  Center,
  Text,
  Paper,
  Box,
  Badge,
} from "@mantine/core";
import { IconShieldCheck, IconCheck, IconCopy } from "@tabler/icons";
//@ts-ignore
import MetaSafe from "../../../assets/images/meta-safe.svg";
import { BackButton, Image, ProgressStatus, Title } from "../../../components";
import { useStyles } from "./create-recovery.component.styles";
//@ts-ignore
import useRecoveryStore from "store/recovery/recovery.store";
import { useClipboard } from "@mantine/hooks";
import { utils } from "ethers";
import { useEffect, useState } from "react";

import {
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";

export const RecoveryCreationSuccess = () => {

  const { classes } = useStyles();


  const { formData, accountDetails, setCreateStep } =
  useRecoveryStore((state: any) => state);


  return (
    <>
      <Container className={classes.box}>
        <Paper className={classes.formContainer} withBorder>
          <Group mb={30}>
            <Title>Recovery Created</Title>
          </Group>
          
          <Container sx={{ padding: 0, marginBottom: "46px" }}>
            <div className={classes.voucherImage}>
              <Center style={{ height: "100%" }}>
                <Center style={{ flexDirection: "column" }}>
                  <Image src={MetaSafe} width={200} />
                  <Text mt={10} weight={600} style={{ color: "white" }}>
                    {formData.title}
                  </Text>
                </Center>
              </Center>
            </div>
          </Container>

          <Stack mt={32}>
          <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm">Title</Text>
              <Text size="sm" className={classes.voucherText}>
                {formData.title}
              </Text>
            </Group>
            <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm">Description</Text>
              <Text size="sm" className={classes.voucherText}>
                {formData.description}
              </Text>
            </Group>

   

            <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
            </Group>

          </Stack>
          <Paper radius="md" p="xl" withBorder>
              <Group position="apart">
              <Alert icon={<IconShieldCheck size={32} />} title="Guarded by Safient!" color="grape" radius="lg">
      Your MetaMask wallet account is now protected by Safient. You or your beneficiary can now recover the wallet anytime in the future
    </Alert>
              </Group>
            </Paper>

        </Paper>

        <Container className={classes.progressbox}>
          <ProgressStatus
            title="Wallet Recovery Created Successfully 🎊"
            description="The wallet recovery has beeen created. You or beneficiary can now recover the wallet anytime in the future"
            status={100}
          />
        </Container>
      </Container>
    </>
  );
};
