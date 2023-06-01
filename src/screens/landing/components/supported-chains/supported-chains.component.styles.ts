import styled from "styled-components";

export const BackedByContainer = styled.section`
  width: 100%;
  /* background-color: #181729; */
  margin-top: 80px;
  margin-bottom: 80px;
  h2 {
    text-align: center;
    font-size: 36px;
  }

  p {
    text-align: center;
    margin-bottom: 6rem;
    font-size: 2rem;
    font-weight: 500;
    padding: 0rem 2rem 0rem 2rem;
  }

  .footer-heading {
    color: #fff;
    padding-left: 1rem;
    margin-bottom: 2.4rem;
  }

  .logo-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    column-gap: 40px;
    row-gap: 10px;
    align-self: center;
    img {
      object-fit: cover;
    }
    animation-name: marquee;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;
