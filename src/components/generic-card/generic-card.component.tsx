//@ts-nocheck

import { Card, Badge } from "@mantine/core";

import {
  Image,
  ImageComponentProps,
} from "../primitives/image/image.component";
import { useStyles } from "./generic-card.component.styles";

import Fingerprint from "../../assets/icons/fingerprint.png";
import Limit from "../../assets/icons/limit.png";
import Session from "../../assets/icons/session.png";
import Email from "../../assets/icons/mail.png";
import NFT from "../../assets/icons/ape.png";

export interface GenericCardProps {
  soon?: boolean;
  title: string;

  onClick?: any;
}

const images = {
  "limit": Limit,
  "biometric": Fingerprint,
  "session": Session,
  "email": Email,
  "nft": NFT,
}

export const GenericCard: React.FC<GenericCardProps & ImageComponentProps> = (
  props
) => {
  const { soon, width, title, name = "biometric", onClick } = props;

  const { classes } = useStyles();
  return (
    <Card className={classes.card} onClick={onClick}>
      {soon && <Badge>Coming soon</Badge>}
      <Image src={images[name]} width={80} className={classes.image} />
      <p className={classes.p}>{title}</p>
    </Card>
  );
};
