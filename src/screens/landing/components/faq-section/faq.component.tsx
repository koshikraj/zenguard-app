// @ts-nocheck

import React, { useState } from 'react';
import { Paragraph, SubTitle, Title } from '../common/title/title.component';
import {
  FaqContainer,
  QuestionsContainer,
  AnswersContainer,
  FaqSection,
  ItemsContainer,
} from './faq.component.styles';

interface FaqComponentProps {
  title: string;
  children: React.ReactNode;
}

export const Item: React.FC<FaqComponentProps> = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <FaqSection>
      <FaqContainer>
        <QuestionsContainer
          isActive
          onClick={() => setIsActive((show) => !show)}
        >
          <SubTitle className="title">{title}</SubTitle>
          <p>{isActive ? '-' : '+'}</p>
        </QuestionsContainer>
        {isActive && (
          <AnswersContainer isActive>
            <Paragraph>{children}</Paragraph>
          </AnswersContainer>
        )}
      </FaqContainer>
    </FaqSection>
  );
};

export function Faq() {
  return (
    <ItemsContainer>
      <Title centered className="faq-title">
        Frequently asked Questions
      </Title>
      <Item title="What is ZenGuard?">
        ZenGuard is a plug and play smart contract wallet solution for DApps and existing wallet providers.
      </Item>
      <Item title="How is ZenGuard different?">
        ZenGuard makes the wallet onboarding seamless with existing social logins, email, phone etc and providing the secure recovery solutions with inheritance features.
      </Item>
      <Item title="Who can use ZenGuard?">
        ZenGuard wallet solutions can be integrated with existing DApp with our SDKs. Existing Safe users can also leverage recovery and inheritance features.
      </Item>
      <Item title="What else does ZenGuard provide?">
        ZenGuard uses extensible smart contract wallet solution of Safe. So, any additional programmable feautures can be added to the wallet such as session keys, granular access control etc.
      </Item>
      <Item title="Does ZenGuard use Account Abstraction?">
         Yes, ZenGuard leverages Account Abstraction for smart contract wallet to provide seamless account creation, gas sponsorship, recovery features and much more.
      </Item>
    </ItemsContainer>
  );
}
