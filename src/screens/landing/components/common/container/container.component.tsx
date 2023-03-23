import styled from 'styled-components';

export const StyledContainer = styled.div`
	max-width: 1281px;
	margin: 0 auto;
	padding: 0 0.1rem;
`;

export interface ContainerComponentProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerComponentProps> = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);
