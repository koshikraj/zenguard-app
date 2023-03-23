import styled from "styled-components";

export const StyledTitle = styled.h3`
  letter-spacing: -0.96px;
  font-weight: 600;
  font-size: 3.6rem;
  line-height: 5rem;
  color: #fff;
  text-align: ${({ centered }: any) => (centered ? "center" : "none")};
  @media (max-width: 576px) {
    font-size: 2.4rem;

    margin-top: 4rem;
  }
`;

export const StyledSubTitle = styled.p`
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  color: #b3b4b7;
  text-align: ${({ centered }: any) => (centered ? "center" : "none")};
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

export const StyledParagraph = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: #b3b4b7;
  text-align: ${({ centered }: any) => (centered ? "center" : "none")};
`;

export interface TitleComponentProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const Title: React.FC<TitleComponentProps> = ({ children, ...rest }) => (
  <StyledTitle {...rest}>{children}</StyledTitle>
);

export const SubTitle: React.FC<TitleComponentProps> = ({
  children,
  ...rest
}) => <StyledSubTitle {...rest}>{children}</StyledSubTitle>;

export const Paragraph: React.FC<TitleComponentProps> = ({
  children,
  ...rest
}) => <StyledParagraph {...rest}>{children}</StyledParagraph>;
