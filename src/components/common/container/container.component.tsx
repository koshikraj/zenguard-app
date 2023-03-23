import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    max-width: "100%";
  }
`;

interface ContainerComponentProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerComponentProps> = (props) => {
  const { children } = props;
  return <StyledContainer>{children}</StyledContainer>;
};
