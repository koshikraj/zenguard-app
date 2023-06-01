import styled from "styled-components";

import { createStyles } from "@mantine/core";
import { Button } from "../common/button/button.component";

export const useStyles = createStyles((theme) => ({
  modal: {
    background: "#182635",
  },
  title: {
    color: "#fff",
    fontWeight: 500,
    textAlign: "center",
    fontFamily: "Inter",
  },
  label: {
    color: "#fff",
    fontWeight: 500,
    fontFamily: "Inter",
  },
}));

export const HeroSectionContainer = styled.section`
  height: 50vh;
  img {
    width: 80%;
  }
  .mantine-Modal-body {
    background-color: red !important;
  }
  .hero {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
    margin: 10rem auto;
    gap: 4rem;
  }
  .hero-form {
    justify-self: start;
    h1 {
      font-weight: 600;
      font-size: 48px;
      line-height: 60px;
      color: #fff;
      margin-top: 4rem;
      margin-bottom: 4rem;
    }
    .form-group {
      display: flex;
      gap: 1.8rem;
    }
    .sub-heading {
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: #b3b4b7;
      margin-bottom: 3rem;
    }
    p {
      margin-top: 2rem;
      font-size: 16px;
      color: #fff;
    }
    input {
      min-width: 381.86px;
      height: 46.08px;
      background: #f0f2f7;
      border-radius: 5px;
      font-size: 1.6rem;
      padding: 1rem;
    }
  }
  .hero-image {
    align-items: flex-end;
    img {
      width: 80%;
    }
  }
  @media (max-width: 768px) {
    margin-bottom: 0rem;
    .hero-image {
      visibility: hidden;
      align-items: flex-end;
      img {
        width: 80%;
      }
    .hero {
      padding: 4rem;
      grid-template-columns: 1fr;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }
  }
  /* mobile-device */
  @media (max-width: 576px) {
    margin-bottom: 0rem;
    .hero {
      grid-template-columns: 1fr;
      padding: 2rem;
      text-align: center;
      margin-top: -0.5rem;
      h1 {
        font-weight: 600;
        font-size: 4rem;
        line-height: 50px;
        margin-bottom: 4rem;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
      }
      .sub-heading {
        text-align: center;
        margin-top: -2rem;
      }
      input {
        min-width: 3rem !important;
      }
      p {
        margin-top: 0rem;
      }
    }
  }
`;

export const StyledInput = styled.input`
  min-width: 381.86px;
  width: 100%;
  height: 46.08px;
  background: #f0f2f7;
  border-radius: 5px;
  font-size: 1.6rem;
  padding: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    min-width: 320px !important;
  }
`;

export const StyledForm = styled.div`
  display: inline-block;
  text-align: center;
  color: #fff;
  font-weight: 500;
  font-size: 1.6rem;
  width: 45rem;
  .waitlist-heading {
    margin-bottom: 2rem;
    text-align: left;
  }
  .checkbox {
    color: #fff;
  }
  .response {
    margin-top: 2rem;
  }
  .sending {
    margin-top: 2rem;
  }
  .error {
    color: "red";
  }
  .success {
    color: #2c7a7b;
  }
  @media (max-width: 576px) {
    width: 32rem;
  }
`;

export const WaitlistFormContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 2rem;
  width: 100%;
`;

export const SubscriptionSuccess = styled.div`
  padding: 2rem;
  i {
    color: #2c7a7b;
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  .sub-title {
    margin-top: 2rem;
  }
  .solution {
    margin-top: 3rem;
  }
  .solutions {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;
  }
  .solutions-heading {
    font-size: 2rem;
    margin-top: 5rem;
  }
  img {
    width: 26px;
  }
  a {
    text-decoration: none;
    &:hover {
      color: #6663fd;
    }
  }
  .hidden {
    display: none;
  }
`;
