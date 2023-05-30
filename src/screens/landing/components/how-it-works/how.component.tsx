// @ts-nocheck
import { Image } from "components";
import { SubTitle, Title } from "../common/title/title.component";
import { HowItWorksContainer, Steps } from "./how.component.styles";
import Step1 from "../../assets/images/step-1.png";
import Step2 from "../../assets/images/step-2.png";
import Step3 from "../../assets/images/step-3.png";
import Feature1 from "../../assets/images/feature1.png";
import YoutubeEmbed from "../video/youtube";

export function HowItWorksSection() {
  return (
    <HowItWorksContainer>
      <Title centered>How It Works?</Title>
      <SubTitle centered className="sub-heading">
        Follow these simple steps to get started 🪜

        <YoutubeEmbed embedId="RDxabcA2Xkk" />
      </SubTitle>

      

      {/* <Steps>
        <div class="step-text-box">
          <p class="step-number">01</p>
          <h3 class="heading-tertiary">Create Voucher</h3>
          <p class="step-description">
            Create a voucher of your desired crypto and specific amount with one
            click
          </p>
        </div>
        <div class="step-img-box">
          <Image src={Feature1} alt="sss" class="step-img" />
        </div>
      </Steps>

      <Steps>
        <div class="step-img-box">
          <Image src={Step2} alt="sss" class="step-img" />
        </div>
        <div class="step-text-box">
          <p class="step-number">02</p>
          <h3 class="heading-tertiary">Share Voucher</h3>
          <p class="step-description">
            Share the voucher via a link, chat, email, or even a printed copy
          </p>
        </div>
      </Steps>

      <Steps>
        <div class="step-text-box">
          <p class="step-number">03</p>
          <h3 class="heading-tertiary">Redeem Voucher</h3>
          <p class="step-description">
            Redeeming the crypto voucher doesn't get easier and safer than this
            with just a click
          </p>
        </div>
        <div class="step-img-box">
          <Image src={Step3} alt="sss" class="step-img" />
        </div>
      </Steps> */}
    </HowItWorksContainer>
  );
}
