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
      <Item title="Who should use Safient voucher?">
        Are you looking to gift crypto assets to someone? Do you want to send
        crypto to someone but don't have their wallet address?
        {' '}
        <br />
        We got you covered 🤗. Safient Voucher can do it with ease and safety.
      </Item>
      <Item title="How is it different than other Crypto voucher services?">
        Many available crypto vouchers are custodial. Safient voucher is a
        non-custodial voucher without going through any intermediary before
        someone redeems it.
      </Item>
      <Item title="Does the voucher have expiry date?">
        Yes, but it's entirely up to the voucher creator to set all the
        restrictions of voucher redemption. We provide plenty of options to
        choose from.
      </Item>
      <Item title="What happens after I redeem the voucher?">
        The voucher redemption gives access to the crypto and they can spend
        however they wish. But for better management, we will also provide
        several integrations to other services.
      </Item>
      <Item title="Why is there an early access program?">
        Although we want everyone to access it soon, we want to make sure we
        give out the best version to everyone by inviting a few people to access
        it first.
      </Item>
    </ItemsContainer>
  );
}
