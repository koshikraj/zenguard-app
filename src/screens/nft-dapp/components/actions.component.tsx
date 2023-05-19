//@ts-nocheck
import { Stack, Box, Text, Center, createStyles } from "@mantine/core";
import SendIcon from "../../../assets/icons/send.svg";
import Mint from "../../../assets/icons/mint.svg";
import Transfer from "../../../assets/icons/transfer.svg";
import { ClaimModal, RecieveModal, Send } from "components";
import { useState } from "react";

const useStyles = createStyles(() => ({
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 170px",
  },

  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "50px",
    width: "50px",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

export const Actions = (props: any) => {

  const { mintNFT } = props;
  const [recieveModal, setRecieveModal] = useState(false);

  const { classes } = useStyles();

  return (
    <>

      <div className={classes.actionsContainer}>
        <div className={classes.actionsWrapper}>
          <div
            className={classes.iconContainer}
            onClick={() => mintNFT()}
          >
            <img src={Mint} alt="send" />
          </div>
          <Text mt={10}>Mint NFT</Text>
        </div>

        <div className={classes.actionsWrapper}>
          <div className={classes.iconContainer}>
            <img src={Transfer} alt="trade" />
          </div>
          <Text mt={10}>Transfer</Text>
        </div>
      </div>
    </>
  );
};
