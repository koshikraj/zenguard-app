import styled from "styled-components";

export const CardsContainer = styled.div`
  flex: 0 0 344px;

  .heading {
    color: #fff;
    margin-top: 2rem;
  }
  .description {
    margin-top: 0.8rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    flex: 0;
  }
  @media (max-width: 576px) {
    flex: 0;
  }
`;
