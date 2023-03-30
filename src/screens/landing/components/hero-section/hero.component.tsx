// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSectionContainer, useStyles } from "./hero.component.styles";
import HeroImage from "../../assets/images/zen-safe.svg";
import { StyledSpan } from "../common/span/span.component";
import { Button } from "../common/button/button.component";
import { WaitListForm } from "./mailchimp";
import { RoutePath } from "../../../../navigation/route-path";

import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData } from '@safe-global/auth-kit'
import SafeServiceClient from '@safe-global/safe-service-client'
import EthersAdapter from '@safe-global/safe-ethers-lib'

const RPC_URL='https://restless-young-layer.base-goerli.discover.quiknode.pro/3860a9e7a99900628604b143682330d4cec99db0'


const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'


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

  useEffect(() => {
		;(async () => {
		  setSafeAuth(
			await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
			  
			  chainId: "0x14A33",
			  txServiceUrl: txServiceUrl, // Optional. Only if want to retrieve related safes
			  authProviderConfig: {
				rpcTarget: RPC_URL,
				clientId: 'BAcCop_qaWVfw15peOnVq8xd8KefD3UvZ-3bKip0RNy0w1J0Z8ZKNNzWiFW97a66S-UGr-oZpzdk1hE8SwWmy00',
				network: 'testnet',
				theme: 'dark'
			  }
			})
		  )
		})()
	  }, [])

	  const handleLogin = async () => {
		if (!safeAuth) return
	
	
	
		const response = await safeAuth.signIn()
		console.log('SIGN IN RESPONSE: ', response)
		// console.log(await safeService.getSafesByOwner('0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943'))
	
		console.log(response)
		setSafeAuthSignInResponse(response)
		setProvider(safeAuth.getProvider() as SafeEventEmitterProvider)
	  }


  return (
    <HeroSectionContainer>
      <div className="hero">
        <div className="hero-form">
          <h1>
          Own a  <StyledSpan> wallet </StyledSpan> that <br/> you can   
            <StyledSpan> never  </StyledSpan>{" "}  lose
          </h1>
          <p className="sub-heading">
            Get your ZenGuard now🛡️
          </p>
          <div className="form-group">
            {/* <input
              type="text"
              placeholder="Enter an email where we can reach you ✉️"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "} */}
            <Button onClick={ ()=>navigate(RoutePath.login)}>Get started now</Button>
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
