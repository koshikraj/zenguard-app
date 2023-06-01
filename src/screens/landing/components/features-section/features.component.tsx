// @ts-nocheck
import { FeaturesContainer, Steps, IconContainer, IconsContainer, FeatureCard, CardsContainer } from './features.component.styles';
import { SubTitle, Title } from "../common/title/title.component";
import Onboard from "../../assets/images/onboard.svg";
import Recovery from "../../assets/images/recovery.svg";
import Google from "../../assets/images/google.svg";
import Facebook from "../../assets/images/facebook.svg";
import Gasless from "../../assets/images/gasless.svg";
import Plugin from "../../assets/images/plugin.svg";
import Finger from "../../assets/images/finger.svg";
import Face from "../../assets/images/faceid.svg";
import Court from "../../assets/images/court.svg";
import Heart from "../../assets/images/heart.svg";
import Key from "../../assets/images/key.svg";
import Payment from "../../assets/images/payment.svg";


const data = [
  {
    icon: '/icons/key.svg',
    heading: 'Secure Safes',
    description: 'Backup your secrets on Safes that are secured by robust cryptography techniques and data stores.',
  },
  {
    icon: '/icons/check.svg',
    heading: 'Convenient Claimable Safes',
    description: 'The safes are recovered by the beneficiaries only after the pre-specified claim conditions are met.',
  },
  {
    icon: '/icons/decentralized.svg',
    heading: 'Trustless Protocol',
    description:
      'Safes are guarded by trustless guardians and arbitrators to ensure the highest degree of resilience',
  },
];

export const Features = () => {
  return (
    <FeaturesContainer>
            
    <Title centered>Key Features</Title>
            <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Onboard} width="80px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary">Easy onboarding</h3>
          <p class="step-description">
          ZenGuard leverages account abstraction (ERC 4337) and MPC to allow gasless and keyless wallet creation
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
          <FeatureCard >
            <>
          <IconsContainer>
            {/* <IconContainer> */}
            <img src={Google} width="40px" alt='icon' />
            {/* </IconContainer> */}
            {/* <IconContainer> */}
            <img src={Facebook} width="40px" alt='icon' />
            {/* </IconContainer> */}
            </IconsContainer>
            <h4>Web2 authentication + 2FA </h4>
            </>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            
            <img src={Gasless} width="50px" alt='icon' />
            </IconsContainer>
            <h4>GAS less onboarding </h4>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>

      <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Recovery} width="80px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary">Secure recovery</h3>
          <p class="step-description">
          The wallets are recovered by the right owner/ beneficiaries at the right time.
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
          <FeatureCard >
            <>
          <IconsContainer>
            {/* <IconContainer> */}
            <img src={Finger} width="40px" alt='icon' />
            {/* </IconContainer> */}
            {/* <IconContainer> */}
            <img src={Face} width="40px" alt='icon' />
            {/* </IconContainer> */}
            </IconsContainer>
            <h4> Biometric, OTP, Authenticator recovery </h4>
            </>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            <img src={Heart} width="40px" alt='icon' />
            <img src={Court} width="40px" alt='icon' />
            </IconsContainer>
            <h4>Inheritance features</h4>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>


      <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Plugin} width="70px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary">Programmable plugins</h3>
          <p class="step-description">
          Wallets are extensible via plugins to add desired functionalities.
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
          <FeatureCard >
            <>
          <IconsContainer>
            <img src={Key} width="40px" alt='icon' />
            </IconsContainer>
            <h4>Session keys </h4>
            </>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            
            <img src={Payment} width="40px" alt='icon' />
            </IconsContainer>
            <h4> Subscription auto payments </h4>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>
    </FeaturesContainer>
  );
};
