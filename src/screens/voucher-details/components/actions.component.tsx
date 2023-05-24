//@ts-nocheck
import { Stack, Box, Text, Center, createStyles } from "@mantine/core";
import SendIcon from "../../../assets/icons/send.svg";
import Recieve from "../../../assets/icons/recieve.svg";
import Trade from "../../../assets/icons/trade.svg";
import Mint from "../../../assets/icons/mint.svg";
import { ClaimModal, RecieveModal, Send } from "components";
import { useState } from "react";

const useStyles = createStyles(() => ({
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 60px",
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

export const Actions = (props) => {

  const { address, mintNFT } = props;
  const [sendModal, setSendModal] = useState(false);

  const [recieveModal, setRecieveModal] = useState(false);

  const { classes } = useStyles();

  return (
    <>
      <Send sendModal={sendModal} setSendModal={setSendModal} />
      <RecieveModal
        recieveModal={recieveModal}
        setRecieveModal={setRecieveModal}
        address={ address }
      />

      <div className={classes.actionsContainer}>
        <div
          className={classes.actionsWrapper}
          onClick={() => setSendModal(!sendModal)}
        >
          <div className={classes.iconContainer}>
            <img src={SendIcon} alt="send" />
          </div>
          <Text mt={10}>Send</Text>
        </div>

        <div className={classes.actionsWrapper}>
          <div
            className={classes.iconContainer}
            onClick={() => mintNFT()}
          >
            <img src={Mint} alt="mint" />
          </div>
          <Text mt={10}>Mint NFT</Text>
        </div>

        <div className={classes.actionsWrapper}>
          <div className={classes.iconContainer}>
            <img src={Trade} alt="trade" />
          </div>
          <Text mt={10}>Trade</Text>
        </div>
      </div>
    </>
  );
};
