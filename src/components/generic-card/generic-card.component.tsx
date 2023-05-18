//@ts-nocheck

import { Card } from "@mantine/core";

import {
  Image,
  ImageComponentProps,
} from "../primitives/image/image.component";
import { useStyles } from "./generic-card.component.styles";

import Fingerprint from "../../assets/icons/fingerprint.png";
import Mail from "../../assets/icons/mail.png";
import { Icon123 } from "@tabler/icons";

export interface GenericCardProps {
  title: string;

  onClick?: any;
}

export const GenericCard: React.FC<GenericCardProps & ImageComponentProps> = (
  props
) => {
  const { width, title, name = "biometric", onClick } = props;

  const src = name === "email" ? Mail : Fingerprint;

  const { classes } = useStyles();
  return (
    <Card className={classes.card} onClick={onClick}>
      <Image src={src} width={80} className={classes.image} />
      <p className={classes.p}>{title}</p>
    </Card>
  );
};
