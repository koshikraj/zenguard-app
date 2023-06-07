// @ts-nocheck
import { Image } from "components";
import { SubTitle, Title } from "../common/title/title.component";
import { HowItWorksContainer} from "./how.component.styles";
import YoutubeEmbed from "../video/youtube";

export function HowItWorksSection() {
  return (
    <HowItWorksContainer>
      <Title centered>How It Works?</Title>
      <SubTitle centered className="sub-heading">
        Follow these simple steps to get started 🪜

        <YoutubeEmbed embedId="Bm5Lo3Pzm9A" />
      </SubTitle>


    </HowItWorksContainer>
  );
}
