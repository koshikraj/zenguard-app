import styled from "styled-components";

export const FeaturesContainer = styled.div`
  margin: 10rem 0;
  h2 {
    text-align: center;
    font-size: 36px;
  }
  @media (max-width: 576px) {
    h2 {
      text-align: center;
      font-size: 2.2rem;
    }
    p {
      font-size: 1.8rem;
    }
  }
`;

export const Steps = styled.div`

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  .section-how {
    padding: 9.6rem 0;
    display: grid;
  }

  .step-number {
    font-size: 4rem;
    font-weight: 600;
    color: #ddd;
    margin-bottom: 1.2rem;
  }

  .heading-tertiary {
    font-size: 3rem;
    font-weight: 600;
    margin-top: 1rem;
    color: #fff;
  }

  .step-img {
    width: 50%;
  }

  .step-description {
    font-size: 1.8rem;
    line-height: 1.8;
    color: #b3b4b7;
    margin-top: 2rem;
  }

  .step-img-box {

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .step-img-box::before,
  .step-img-box::after {
    content: "";
    display: block;
    width: 60%;

    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #fdf2e9;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
  }

  .step-img-box::before {
    width: 60%;
    background-color: #fdf2e9;
    padding-bottom: 60%;
  }

  .step-img-box::after {
    width: 50%;
    background-color: #fae5d3;
    padding-bottom: 50%;
  }

  @media (max-width: 768px) {
    /* grid-template-columns: 1fr; */
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rem;

    .step-cards {
      order: 2;
    }
    .step-text-box {
      order: 1;
      align-self: center;
      display: flex;
      gap: 2rem;
      padding: 4rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    }
  }
  /* mobile-device */
  @media (max-width: 576px) {
    /* grid-template-columns: 1fr; */
  }
`;

export const IconContainer = styled.div`
  box-shadow: 0 0 25px #61FF47;
  background: #293964;
  align-items: center;
  display: inline-flex;
  border-radius: 50%;
  img {
    padding: 2rem;
  }
`;

export const IconsContainer = styled.div`
  justify-content: center;
  display: flex;
  gap: 3rem;
`;

export const FeatureCard = styled.div`
  
  background: #20283D;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 3rem 3rem 2rem 3rem;
  // flex: 0 0 30rem;
  width: 200px;
  height: 200 px;
  transition: box-shadow 0.3s;
  border-radius: 3rem;
  // box-shadow: 0 0 11px #61FF47;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 11px #61FF47;

    border-image-source: linear-gradient(
      89.58deg,
      #44BCF0 -19.85%,
      #818CF8 54.07%,
      #A099FF 120.75%
    );
  }
  @media (max-width: 57.6rem) {
    flex: 0 0 34.4rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
   justify-content: center;
  margin-top: 4rem;

  h4 {
    margin-top: 2rem;
    // color: #9ba9b4;
    color: #fff;
    font-size: 1.7rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 1.5;
  }

  p {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    line-height: 1.4;
    // color: #9ba9b4;
    font-size: 1.6rem;
    font-weight: 400;
  }
  @media (max-width: 57.6rem) {
    justify-content: center;
  }
`;
