// @ts-nocheck
import { BackedByContainer } from "./supported-chains.component.styles";
import { SubTitle, Title } from "../common/title/title.component";
import Base from "../../assets/images/base.png";
import BNB from "../../assets/images/bnb.svg";
import ETH from "../../assets/images/eth.svg";
import Gnosis from "../../assets/images/gno.svg";
import Avax from "../../assets/images/avax.svg";
import Matic from "../../assets/images/matic.svg";

export const SupportedChains = () => {
  return (
    <BackedByContainer>
       <SubTitle centered className='footer-heading'>Available on EVM blockchains </SubTitle>

      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
        quis!
      </p> */}

      <div className="logo-container">
      <img src={Base} width='64px' alt="base" />
        <img src={Gnosis} width='64px' alt="gnosis" />
        <img src={ETH} width='64px' alt="eth" />
        <img src={Matic} width='64px' alt="polygon" />
        <img src={BNB} width='64px' alt="bnb" />
        <img src={Avax} width='64px' alt="avax" />
      </div>
    </BackedByContainer>
  );
};
