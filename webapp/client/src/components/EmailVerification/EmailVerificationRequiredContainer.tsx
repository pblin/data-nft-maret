import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withSnackbar} from "notistack";
import EmailVerificationRequired from './EmailVerificationRequired';
import {profileSelector, wasVerificationSent} from "../../store/profile/profileSelector";
import {resendVerification} from "../../store/profile/profileActions";

const mapStateToProps = (state: any) => {
  return {
    profile: profileSelector(state),
    wasVerificationSent: wasVerificationSent(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        resendVerification
      },
      dispatch
    )
  }
};


//@ts-ignore
//EmailVerificationRequired = withSnackbar(EmailVerificationRequired);

let EmailVerificationRequiredContainer=
  connect(mapStateToProps, mapDispatchToProps)(EmailVerificationRequired);

//@ts-ignore
EmailVerificationRequiredContainer = withSnackbar(EmailVerificationRequiredContainer);

export default EmailVerificationRequiredContainer;
