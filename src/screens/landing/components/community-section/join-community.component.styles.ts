import styled from "styled-components";
// @ts-ignore
import pattern from "./pattern-01.svg";

export const CommunityContainer = styled.section`
  max-width: 1278px;
  border: 1px solid rgba(132, 154, 170, 0.52);
  border-radius: 8px;
  margin: 10rem 2rem 0px 2rem;
  background-color: rgba(42, 43, 49, 0.41);
  background: url(${pattern}) no-repeat center;
  .title {
    margin-bottom: 2rem;
  }
  .container {
    max-width: 1057px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 7.8rem;
    /* mobile-device */
    @media (max-width: 576px) {
      padding: 2rem;
      .title {
        font-size: 2.4rem;
        line-height: 3.6rem;
      }
    }
  }
`;
