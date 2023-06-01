/* eslint-disable no-use-before-define */
import {
	Container,
	NavBar,
	HeroSection,
	HowItWorksSection,
	JoinCommunitySection,
	BuiltFor,
	Faq,
	FooterSection,
	TeamsSection,
	BackedBy,
	PoweredBy,
	SupportedChains,
	Features
} from './components';
import { LandingPageContainer } from './landing.screen.styles';

export function LandingScreen() {
	return (
		<LandingPageContainer>
			<Container>
				<NavBar />
				<HeroSection />
				<SupportedChains />
				<Features />
				<HowItWorksSection />
				<BuiltFor />
				<PoweredBy />
				<JoinCommunitySection />
				<BackedBy />
				<Faq />
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
