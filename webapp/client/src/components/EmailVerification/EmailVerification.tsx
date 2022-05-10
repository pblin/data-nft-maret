import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import queryString from "query-string";
import JumboPaper from "../Common/jumboPaper";
import {PROFILE_STATUS} from "../../store/profile/profileSelector";

interface ComponentProps {
  location: any;
  actions: any;
  enqueueSnackbar: any;
  profileStatus: string;
  history: any;
}

interface ComponentState {}

class EmailVerification extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  componentDidMount(): void {
    const queryParams = queryString.parse(this.props.location.search);
    const {email} = queryParams;
    this.props.actions.checkProfile(email);
  }

  verifyEmail(email, code) {
    if(code && email) {
      this.props.actions.verifyEmail(email, code, this.props.enqueueSnackbar);
    }
  }

  render() {
    const queryParams = queryString.parse(this.props.location.search);
    const {email, code} = queryParams;

    return (
      <React.Fragment>
        {this.props.profileStatus == PROFILE_STATUS.NOT_VERIFIED &&
          <JumboPaper
            title={"Email Verification"}
            content={`Please verify the following email address ${email}`}
            buttonText={"Verify"}
            handleClick={() => this.verifyEmail(email, code)}
          />
        }
        {this.props.profileStatus == PROFILE_STATUS.ALREADY_VERIFIED &&
          <JumboPaper
            title={"Email Already Verified"}
            content={`The email ${email} has already been verified.`}
            buttonText={"Go To Marketplace"}
            handleClick={() => {this.props.history.push('/marketplace')}}
          />
        }
        {this.props.profileStatus == PROFILE_STATUS.NOT_CREATED &&
          <JumboPaper
            title={"Account not found"}
            content={`Please register the email ${email}`}
            buttonText={"Register"}
            handleClick={() => {this.props.history.push('/')}}
          />
        }
        {this.props.profileStatus == PROFILE_STATUS.VERIFIED &&
        <JumboPaper
          title={"Email Verification Complete"}
          content={`${email} has been verified`}
          buttonText={"Go To Marketplace"}
          handleClick={() => {this.props.history.push('/marketplace')}}
        />
        }
      </React.Fragment>
    )
  }
}

//@ts-ignore
EmailVerification = withSnackbar(EmailVerification);

//@ts-ignore
export default withRouter(EmailVerification);
