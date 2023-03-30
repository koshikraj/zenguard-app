/* eslint-disable no-use-before-define */
import {
	Container,
	NavBar,
	HeroSection,
	HowItWorksSection,
	JoinCommunitySection,
	Faq,
	FooterSection,
	TeamsSection,
	BuiltOnSection,
} from './components';
import { LandingPageContainer } from './landing.screen.styles';

export function LandingScreen() {
	return (
		<LandingPageContainer>
			<Container>
				<NavBar />
				<HeroSection />
				<HowItWorksSection />
				<BuiltOnSection />
				<JoinCommunitySection />
				{/* <Faq /> */}
				<FooterSection />
			</Container>
		</LandingPageContainer>
	);
}

export function TeamsScreen() {
	return (
		<LandingPageContainer>
			<Container>
				<NavBar />
				<div className='team-section'>
					<TeamsSection />
					<FooterSection />
				</div>
			</Container>
		</LandingPageContainer>
	);
}
