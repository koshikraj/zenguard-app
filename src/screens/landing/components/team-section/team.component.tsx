// @ts-nocheck
import { SubTitle, Title } from '../common/title/title.component';
import { TeamsCard } from './team-card.component';
import { members } from './team-members';
import { TeamSectionContainer } from './team.component.styles';

export function TeamsSection() {
  return (
    <TeamSectionContainer>
      <Title centered>Our Team</Title>
      <SubTitle centered className="sub-heading">
        We believe people and talent are the real core value of any company and
        our most important asset. Our core team is comprised of financial,
        legal, and blockchain technology connoisseurs and a passionate
        development team with a great amount of time spent on understanding
        issues in the existing infrastructure.
      </SubTitle>
      <div className="team-members">
        {members.map((member, index) => (
          <TeamsCard {...member} key={index} />
        ))}
      </div>
    </TeamSectionContainer>
  );
}
