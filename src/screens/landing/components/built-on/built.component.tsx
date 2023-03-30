// @ts-nocheck
import { Image } from "components";
import { SubTitle, Title } from "../common/title/title.component";
import { HowItWorksContainer, Steps } from "./built.component.styles";
import Base from "../../assets/images/base.jpg";
import Safe from "../../assets/images/safe.png";
import Web3Auth from "../../assets/images/web3auth.jpg";
import YoutubeEmbed from "../video/youtube";

export function BuiltOnSection() {
  return (
    <HowItWorksContainer>
      <Title centered>Built on</Title>
      
      <Steps>
        <div class="step-img-box">
          <Image src={Base} alt="sss" class="step-img" />
          <SubTitle centered className="sub-heading">
        Base chain
      </SubTitle>
        </div>
        <div class="step-img-box">
          <Image src={Safe} alt="sss" class="step-img" />
          <SubTitle centered className="sub-heading">
        Safe
      </SubTitle>
        </div>
        <div class="step-img-box">
          <Image src={Web3Auth} alt="sss" class="step-img" />
          <SubTitle centered className="sub-heading">
        Web3Auth
      </SubTitle>
        </div>
     
      </Steps>

    </HowItWorksContainer>
  );
}
