import styled from "styled-components";

export const FooterSectionContainer = styled.footer`
  .footer-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10rem;
  }
  .footer-heading {
    color: #fff;
    border-left: 2px solid #60a7f4;
    padding-left: 1rem;
    margin-bottom: 2.4rem;
  }
  ul > li {
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    color: #b3b4b7;
    margin-top: 1.4rem;
    padding-left: 1rem;
    text-decoration: none;
    &:hover {
      color: #a099ff;
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
    font-size: 1.6rem;
    color: #b3b4b7;
    padding-left: 1rem;
    &:hover {
      color: #a099ff;
      cursor: pointer;
    }
  }
  .footer-copy {
    border-top: 1px solid rgba(132, 154, 170, 0.52);
    margin-top: 3rem;
    padding: 3rem 0;
  }
  span {
    margin-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    background: #02b07c;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
  @media (max-width: 768px) {
    padding: 2rem;
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 5rem;
    }
  }
  /* mobile-device */
  @media (max-width: 576px) {
    padding: 2rem;
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 5rem;
    }
  }
`;
