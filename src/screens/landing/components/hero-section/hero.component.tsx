// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSectionContainer, useStyles } from "./hero.component.styles";
import HeroImage from "../../assets/images/zen-hero.png";
import { StyledSpan } from "../common/span/span.component";
import { Button } from "../common/button/button.component";
import { WaitListForm } from "./mailchimp";
import { RoutePath } from "../../../../navigation/route-path";

import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData } from '@safe-global/auth-kit'

export function HeroSection({}) {

  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 400px)");

  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<SafeAuthSignInData | null>(
		null
	  )
	  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
	  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)

  const navigate = useNavigate();


  return (
    <HeroSectionContainer>
      <div className="hero">
        <div className="hero-form">
          <h1>
          Own a  <StyledSpan> wallet </StyledSpan> that <br/> you can   
            <StyledSpan> never  </StyledSpan>{" "}  lose
          </h1>
          <p className="sub-heading">
          First ever  smart contract wallet SDK to provide  <br/>  wallet recovery using biometrics. <p> Powered by <StyledSpan> Safe </StyledSpan> , enabled by  <StyledSpan> Account Abstraction </StyledSpan> 🛡️ </p>
          </p>
          <div className="form-group">
            {/* <input
              type="text"
              placeholder="Enter an email where we can reach you ✉️"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "} */}
            <Button onClick={ ()=>navigate(RoutePath.login)}>Try Demo</Button>
            <Modal
              size={isMobile ? "350px" : "600px"}
              padding="40px"
              centered
              opened={opened}
              onClose={() => setOpened(false)}
              classNames={{
                modal: classes.modal,
                title: classes.title,
              }}
              withCloseButton={false}
            >
              <div className="waitlist-form">
                <WaitListForm email={email} />
              </div>
            </Modal>
            ;
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Person with voucher" />
        </div>
      </div>
    </HeroSectionContainer>
  );
}
