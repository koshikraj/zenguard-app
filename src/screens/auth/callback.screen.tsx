import React, { useEffect, useState } from "react";
import { RoutePath } from "navigation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createStyles, Title, Text, Container, Loader } from "@mantine/core";

import { useServices } from "services";
import { useStores } from "store";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: parseInt(theme.spacing.xl) * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: parseInt(theme.spacing.xl) * 1.5,
  },
}));

export const CallBackScreen = (props: any) => {
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { classes } = useStyles();

  useEffect(() => {
    let provider = searchParams.get("provider");

    provider ? finishSocialLogin() : finishEmailRedirection();
  }, []);

  const finishSocialLogin = async () => {
    try {

    } catch (e) {
      console.log(e);
    }
  };

  const finishEmailRedirection = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.label}>
          <Loader size={50} />
        </div>
        <Title className={classes.title}>signing in</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Please wait while we load your account details. This may take a couple
          of seconds ...
        </Text>
      </Container>
    </>
  );
};
