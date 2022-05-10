import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import EmailVerification from './EmailVerification';
import {verifyEmail, checkProfile} from "../../store/profile/profileActions";
import {getProfileStatus} from "../../store/profile/profileSelector";

const mapStateToProps = (state: any) => {
  return {
    profileStatus: getProfileStatus(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        verifyEmail,
        checkProfile
      },
      dispatch
    )
  }
};

const EmailVerificationPage = connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

export default EmailVerificationPage;
