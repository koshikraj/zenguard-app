import styled from "styled-components";

export const HowItWorksContainer = styled.section`
  .sub-heading {
    margin-top: 1rem;
    padding: 2rem;
  }
  .steps {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin: 8rem 2rem 0rem 2rem;
  }

  @media (max-width: 768px) {
    margin-top: 6rem;
    .steps {
      flex-direction: column;
      margin-top: 4rem;
    }
  }
  /* mobile-device */
  @media (max-width: 576px) {
    padding: 2rem;
    text-align: center;
    .sub-heading {
      margin-top: 1.2rem;
    }
    .steps {
      flex-direction: column;
      margin-top: 4rem;
    }
  }
`;

export const Steps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
    width: 30%;
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

    .step-img-box {
      order: 1;
    }
    .step-text-box {
      order: 2;
    }
  }
  /* mobile-device */
  @media (max-width: 576px) {
    /* grid-template-columns: 1fr; */
  }
`;
