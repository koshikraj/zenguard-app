// @ts-nocheck
import { Button } from '../common/button/button.component';
import { Title } from '../common/title/title.component';
import { CommunityContainer } from './join-community.component.styles';

export function JoinCommunitySection() {
  return (
    <CommunityContainer>
      <div className="container">
        <Title centered className="title">
          Join us on Discord to stay on top of our developments and community
          updates
        </Title>

        <Button
          onClick={() => {
            window.location.href = 'https://discord.safient.io';
          }}
        >
          Join Now
        </Button>
      </div>
    </CommunityContainer>
  );
}
