//@ts-nocheck

import { Card } from "@mantine/core";

import {
  Image,
  ImageComponentProps,
} from "../primitives/image/image.component";
import { useStyles } from "./generic-card.component.styles";

import Create from "../../assets/icons/create.svg";
import Redeem from "../../assets/icons/redeem.svg";

export interface GenericCardProps {
  title: string;

  onClick?: any;
}

export const GenericCard: React.FC<GenericCardProps & ImageComponentProps> = (
  props
) => {
  const { width, title, name = "add", onClick } = props;

  const src = name === "redeem" ? Redeem : Create;

  const { classes } = useStyles();
  return (
    <Card className={classes.card} onClick={onClick}>
      <Image src={src} width={width} className={classes.image} />
      <p className={classes.p}>{title}</p>
    </Card>
  );
};
