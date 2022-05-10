import * as React from "react";
import JumboPaper from "../Common/jumboPaper";

const EmailVerificationRequired = ({profile, actions, wasVerificationSent}) => {
  console.log('Is the email verified');
  console.log(profile);
  return(
    <React.Fragment>
      {wasVerificationSent == false &&
        <JumboPaper
          title={"Verify Your Email Address"}
          content={`
            We now need to verify your email address. We've sent an email to
            ${profile && profile['primary_email'] || ''}
            to verify your address. Please click the link in the email to continue.
          `}
          buttonText={"Resend Email"}
          handleClick={() => actions.resendVerification(profile['primary_email'])}
        />
      }
      {wasVerificationSent == true &&
      <JumboPaper
        title={"Verification Email Sent"}
        content={`
            Please click the link in the email to continue.
          `}
        hideCta={true}
      />
      }
    </React.Fragment>
  );
};

export default EmailVerificationRequired;
