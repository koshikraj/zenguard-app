// @ts-nocheck
import styled from "styled-components";
import { Paragraph, SubTitle } from "../common/title/title.component";

export const TeamCardContainer = styled.div`
  background: rgba(42, 43, 49, 0.41);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  max-width: 60rem;
  // border: 1px solid rgba(132, 154, 170, 0.52);
  align-self: flex-start;

  .name {
    color: #fff;
  }

  .description {
    margin-top: 1.8rem;
  }

  .profile {
    margin-top: 0.4rem;
    color: #6663fd;
  }

  .social-icons {
    fill: green;
  }

  img {
    border-radius: 8px;
    min-width: 20rem;
    height: 20rem;
    object-fit: cover;
  }

  ul {
    display: flex;
    color: #fff;
    margin-top: 2rem;
    gap: 2rem;
    cursor: pointer;
  }

  i {
    font-size: 2.4rem;
    &:hover {
      color: #6663fd;
    }
  }
  a {
    color: #fff;
  }

  @media (max-width: 576px) {
    flex-direction: column;

    img {
      object-fit: cover;
      min-height: 300px;
    }
  }
`;

interface TeamCardProps {
  profileAvatar: string;
  name: string;
  designation: string;
  description: string;
  socialLinks: any;
}

export const TeamsCard: React.FC<TeamCardProps> = (props) => {
  const { profileAvatar, name, description, designation, socialLinks } = props;

  return (
    <TeamCardContainer>
      <img src={profileAvatar} alt="avatar" />

      <div>
        <SubTitle className="name">{name}</SubTitle>
        <Paragraph className="profile">{designation}</Paragraph>

        <Paragraph className="description">{description}</Paragraph>

        <ul>
          {socialLinks.gitHub && (
            <li>
              <a href={socialLinks.gitHub} target="_next">
                <i className="fa-brands fa-square-github" />
              </a>
            </li>
          )}
          {socialLinks.linkedIn && (
            <li>
              <a href={socialLinks.linkedIn} target="_next">
                <i className="fa-brands fa-linkedin" />
              </a>
            </li>
          )}
          {socialLinks.twitter && (
            <li>
              <a href={socialLinks.twitter}>
                <i className="fa-brands fa-square-twitter" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </TeamCardContainer>
  );

// import styled from 'styled-components';
// import { Paragraph, SubTitle } from '../common/title/title.component';

// export const TeamCardContainer = styled.div`
// 	background: rgba(42, 43, 49, 0.41);
// 	border-radius: 8px;
// 	padding: 1rem;
// 	display: flex;
// 	gap: 2rem;
// 	max-width: 60rem;
// 	// border: 1px solid rgba(132, 154, 170, 0.52);

// 	.name {
// 		color: #fff;
// 	}

// 	.description {
// 		margin-top: 1.8rem;
// 	}

// 	.profile {
// 		margin-top: 0.4rem;
// 		color: #6663fd;
// 	}

// 	.social-icons {
// 		fill: green;
// 	}

// 	img {
// 		border-radius: 8px;
// 		min-width: 20rem;
// 		height: 20rem;
// 		object-fit: cover;
// 	}

// 	ul {
// 		display: flex;
// 		color: #fff;
// 		margin-top: 2rem;
// 		gap: 2rem;
// 		cursor: pointer;
// 	}

// 	i {
// 		font-size: 2.4rem;
// 		&:hover {
// 			color: #6663fd;
// 		}
// 	}
// 	a {
// 		color: #fff;
// 	}

// 	@media (max-width: 576px) {
// 		flex-direction: column;
// 		padding: 0rem;
// 		img {
// 			object-fit: cover;
// 			min-height: 300px;
// 		}
// 	}
// `;

// interface TeamCardProps {
// 	profileAvatar: string;
// 	name: string;
// 	designation: string;
// 	description: string;
// 	socialLinks: any;
// }

// export const TeamsCard: React.FC<TeamCardProps> = (props) => {
// 	const { profileAvatar, name, description, designation, socialLinks } = props;

// 	return (
// 		<TeamCardContainer>
// 			<img src={profileAvatar} alt='avatar' />

// 			<div className='team-description'>
// 				<SubTitle className='name'>{name}</SubTitle>
// 				<Paragraph className='profile'>{designation}</Paragraph>

// 				<Paragraph className='description'>{description}</Paragraph>

// 				<ul>
// 					{socialLinks.gitHub && (
// 						<li>
// 							<a href={socialLinks.gitHub} target='_next'>
// 								<i className='fa-brands fa-square-github' />
// 							</a>
// 						</li>
// 					)}
// 					{socialLinks.linkedIn && (
// 						<li>
// 							<a href={socialLinks.linkedIn} target='_next'>
// 								<i className='fa-brands fa-linkedin' />
// 							</a>
// 						</li>
// 					)}
// 					{socialLinks.twitter && (
// 						<li>
// 							<a href={socialLinks.twitter}>
// 								<i className='fa-brands fa-square-twitter' />
// 							</a>
// 						</li>
// 					)}
// 				</ul>
// 			</div>
// 		</TeamCardContainer>
// 	);

};
