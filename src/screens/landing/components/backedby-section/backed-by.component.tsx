// @ts-nocheck
import { BackedByContainer } from "./backed-by.component.styles";
import { SubTitle, Title } from "../common/title/title.component";
import Graph from "../../assets/logo/graph.svg";
import Polygon from "../../assets/logo/polygon.svg";
import Zilliqa from "../../assets/logo/zilliqa.svg";
import Huobi from "../../assets/logo/huobi.svg";
import Foundership from "../../assets/logo/foundership.svg";
import Together from "../../assets/logo/together.svg";

export const BackedBy = () => {
  return (
    <BackedByContainer>
       <Title centered>Advised and Backed By </Title>

      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
        quis!
      </p> */}

      <div className="logo-container">
        <img src={Polygon} alt="polygon" />
        <img src={Graph} alt="graph" />
        <img src={Zilliqa} alt="zilliqa" />
        <img src={Huobi} alt="huobi" />
        <img src={Foundership}alt="foundership" />
        <img src={Together} alt="together" />
      </div>
    </BackedByContainer>
  );
};
