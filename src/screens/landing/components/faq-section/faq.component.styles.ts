import styled from 'styled-components';

export const FaqSection = styled.section`
	margin: 2rem auto;
	/* max-width: 90rem; */
	border-radius: 0.5rem;
	cursor: pointer;

	/* mobile-device */
	@media (max-width: 576px) {
		padding: 1rem;
	}
`;

export const FaqContainer = styled.div`
	transition: box-shadow 0.3s;
	border-radius: 0.5rem;
	gap: 2rem;
	border-bottom: 1px solid rgba(132, 154, 170, 0.52);
	&:hover {
		cursor: pointer;
		/* box-shadow: 0 0 12px #5d5dff; */
	}
`;

export const QuestionsContainer = styled.div`
	background: transparent;
	padding: 2rem 0rem;
	font-weight: 500;
	color: #d9e3ea;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: ${(isActive) => (isActive ? 'none' : '1px solid #9ba9b4')};
	.title {
		font-size: 2rem;
		background: linear-gradient(
			89.58deg,
			#44bcf0 -19.85%,
			#818cf8 54.07%,
			#a099ff 120.75%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}

	p {
		font-size: 1.8rem;
	}
	@media (max-width: 57.6rem) {
		padding: 2rem 2rem;
	}
`;

export const AnswersContainer = styled.div`
	padding: 0rem 0rem 2rem 0rem;
	@media (max-width: 57.6rem) {
		padding: 0rem 2rem 2rem 2rem;
		p {
			font-weight: 500;
		}
	}
`;

export const ItemsContainer = styled.div`
	margin: 6rem 0 8rem 0;
	.faq-title {
		margin-bottom: 4rem;
	}
	@media (max-width: 57.6rem) {
		padding: 0 1rem;
		h2 {
			text-align: center;
			line-height: 1.4;
			font-size: 2.2rem;
		}
	}
`;
