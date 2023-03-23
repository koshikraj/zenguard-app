import React from "react";
import { Container } from "../container/container.component";
import { Navbar } from "../navbar/navbar.component";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Navbar />
      <Container>{children}</Container>
    </React.Fragment>
  );
};
