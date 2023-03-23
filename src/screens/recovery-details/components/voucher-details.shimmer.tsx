import { Center, Container, Group, Stack, Text, Skeleton } from "@mantine/core";
import { useStyles } from "./create-recovery.component.styles";
import { Image } from "../../../components";

export const VoucherDetailsShimmer = () => {
  const { classes } = useStyles();
  return (
    <Container sx={{ width: "591px", margin: "45px auto 0 auto" }}>
      <Skeleton height={20} mt={6} width="10%" />
      <Skeleton height={20} mt={6} mb={8} width="30%" />
      <Skeleton mt={10}>
        <Container sx={{ padding: 0, marginBottom: "32px" }} mt={40}>
          <div className={classes.voucherImage}>
            <Center style={{ height: "100%" }}>
              <Center style={{ flexDirection: "column" }}>
                <Image src="/images/matic.svg" width={40} />
                <Text mt={10} weight={600} style={{ color: "white" }}>
                  Lorem ipsum dolor sit amet.🚀
                </Text>
              </Center>
            </Center>
          </div>
        </Container>
      </Skeleton>

      <Stack mt={20}>
        <Group
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Skeleton height={20} mt={6} width="10%" />
          <Skeleton height={20} mt={6} width="10%" />
        </Group>
        <Group
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Skeleton height={20} mt={6} width="10%" />
          <Skeleton height={20} mt={6} width="10%" />
        </Group>

        <Skeleton height={60} mt={6} width="100%" />
        <Group className={classes.btnContainer} noWrap>
          <Skeleton height={50} mt={6} width="20%" />
          <Skeleton height={50} mt={6} width="20%" />
        </Group>
      </Stack>
    </Container>
  );
};
