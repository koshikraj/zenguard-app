// @ts-nocheck
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Checkbox } from "@mantine/core";

import { Paragraph, SubTitle } from "../common/title/title.component";
import {
  StyledInput,
  StyledForm,
  WaitlistFormContainer,
  useStyles,
  StyledButton,
  SubscriptionSuccess,
} from "./hero.component.styles";
import Wallet from "../../assets/logo/wallet.svg";
import SafientProtocol from "../../assets/logo/safient.svg";

function CustomForm({ status, message, onValidated, email }) {
  const [_email, setEmail] = useState(email);
  const [discordId, setDiscordId] = useState("");
  const [newsletter, setNewsLetter] = useState("No");

  const { classes } = useStyles();

  const submit = () => {
    onValidated({
      EMAIL: _email,
      MERGE1: discordId.replace("#", "-"),
      MERGE2: newsletter,
    });
  };

  return (
    <StyledForm>
      <SubTitle
        className={status === "success" ? "hidden" : "waitlist-heading"}
      >
        Join the waitlist to get early access 🚀
      </SubTitle>

      {!(status === "success") && (
        <div>
          {" "}
          <StyledInput
            value={_email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
          />
          <StyledInput
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            type="text"
            placeholder="Your Discord username (optional)"
          />
          <Checkbox
            color="green"
            label="Subscribe to newsletter"
            onChange={(value) => {
              setNewsLetter(value.target.checked ? "Yes" : "No");
            }}
            classNames={{
              label: classes.label,
            }}
          />
          <StyledButton onClick={submit}>Get Early Access</StyledButton>
        </div>
      )}

      <div className="response">
        {status === "sending" && <div className="sending">Submitting...</div>}
        {status === "error" && (
          <div
            className="error"
            style={{ color: "#ff0000" }}
            dangerouslySetInnerHTML={{
              __html: "Something went wrong, please try again!",
            }}
          />
        )}
        {status === "success" && (
          <SubscriptionSuccess>
            <i className="fa-solid fa-circle-check" />
            <div
              className="success"
              style={{ color: "#2C7A7B" }}
              dangerouslySetInnerHTML={{
                __html: "Thanks for registering. We will get back to you soon!",
              }}
            />

            <Paragraph className="sub-title solutions-heading">
              {" "}
              Mean while you can check
            </Paragraph>

            <div className="solutions">
              <div className="solution">
                <div className="background">
                  <img src={SafientProtocol} alt="safient" />
                  <a href="https://safient.io/" target="_next">
                    <Paragraph className="sub-title">
                      Safient Protocol
                    </Paragraph>
                  </a>
                </div>
              </div>
              <div className="solution">
                <div className="background">
                  <img src={Wallet} alt="wallet" className="wallet" />
                </div>
                <a href="https://wallet.safient.io/gm" target="_next">
                  <Paragraph className="sub-title">Safient Wallet</Paragraph>
                </a>
              </div>
            </div>
          </SubscriptionSuccess>
        )}
      </div>
    </StyledForm>
  );
}

export function WaitListForm({ email }) {
  const url = process.env.REACT_APP_MAILCHIMP_URL;

  return (
    <WaitlistFormContainer>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            email={email}
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </WaitlistFormContainer>
  );
}
