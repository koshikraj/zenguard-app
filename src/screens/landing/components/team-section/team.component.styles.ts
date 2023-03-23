
import styled from "styled-components";

export const TeamSectionContainer = styled.section`
  .sub-heading {
    margin-top: 1.6rem;
  }

  .team-members {
    display: flex;
    gap: 4rem;
    flex-wrap: wrap;
    margin-top: 4rem;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 576px) {
    padding: 2rem;
  }
`
