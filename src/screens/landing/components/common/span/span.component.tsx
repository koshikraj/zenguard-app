import React from 'react';
import styled from 'styled-components';

export const SpanContainer = styled.span`
	background: linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`;

export interface SpanComponentProps {
  children: React.ReactNode;
}

export const StyledSpan: React.FC<SpanComponentProps> = ({ children }) => (
  <SpanContainer>{children}</SpanContainer>
);
