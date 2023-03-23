// @ts-nocheck
import { Paragraph, SubTitle } from '../title/title.component';
import { CardsContainer } from './card.component.styles';

const icons = {
  create: require('../../../assets/icons/create.svg').default,
  redeem: require('../../../assets/icons/redeem.svg').default,
  transfer: require('../../../assets/icons/transfer.svg').default,
};

interface CardComponentProps {
  iconName: keyof typeof Icons;
  heading: string;
  description: string;
}

export const Card: React.FC<CardComponentProps> = ({
  iconName,
  heading,
  description,
}) => (
  <CardsContainer>
    <div className="icon">
      <img src={icons[iconName]} alt="icon" />
    </div>
    <SubTitle className="heading">{heading}</SubTitle>
    <Paragraph className="description">{description}</Paragraph>
  </CardsContainer>
);
