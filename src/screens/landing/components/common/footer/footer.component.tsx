import { Link } from "react-router-dom";
import { Paragraph, SubTitle } from "../title/title.component";
import { FooterSectionContainer } from "./footer.component.styles";

export function FooterSection() {
  return (
    <FooterSectionContainer>
      <div className="footer-content">
        <ul>
          <SubTitle className="footer-heading">About </SubTitle>
          <li>
            {" "}
            <Link to="/">Team</Link>
          </li>
        </ul>
        <ul>
          <SubTitle className="footer-heading">Developer Resources</SubTitle>
          <li>
            <a href="https://github.com/zenguardxyz" target="_next">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://docs.zenguard.xyz" target="_next">
              Documentation
            </a>
          </li>
        </ul>

        <ul>
          <SubTitle className="footer-heading">Community</SubTitle>
          <li>
            <a href="https://twitter.com/zenguardxyz" target="_next">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://discord.safient.io/" target="_next">
              Discord
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copy">
        <Paragraph centered>
          {" "}
          &copy; {new Date().getFullYear()} - Crafted with ❤️ by ZenGuard.{" "}
        </Paragraph>
      </div>
    </FooterSectionContainer>
  );
}
