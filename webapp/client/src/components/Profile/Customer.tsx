import * as React from 'react';
import PropTypes from 'prop-types';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Theme, withStyles, createStyles} from '@material-ui/core/styles';
import { Redirect } from 'auth0-js';
import 'graphql-request';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import CustomerForm from "./CustomerForm";
import {getProfile, updateProfile} from "../../store/profile/profileActions";
import {emailSelector, profileSelector} from "../../store/profile/profileSelector";
import {Grid, Typography, Divider} from "@material-ui/core";
import {withSnackbar} from "notistack";

// @ts-ignore
const styles = (theme: Theme ) => createStyles ({
  container: {
    display: 'flex',
    width: '80%',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  wrapper: {
    width: "80%",
    display: 'flex',

  }
});

interface Props {
  classes?: any;
  theme?: any;
  auth: Auth0Authentication;
  getProfile: any;
  profile: any;
  email: string;
  submitProfileForm: any;
  updateProfile: any;
  enqueueSnackbar: any;
}

class Customer extends React.Component<Props> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  constructor(props: any) {
    super(props);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }

  componentDidMount() {
    if(!this.props.profile) {
      this.props.getProfile();
    }
  }

  handleProfileSubmit(values) {
    this.props.updateProfile(
      this.props.email,
      Object.assign({}, values, {id: this.props.profile && this.props.profile.id }),
      this.props.enqueueSnackbar
    );
  }

  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.auth;
    if ( authenticated) {
      return (
          <div className={"content-container"}>
            <Typography variant={"h4"}>Manage Your Profile</Typography>
            <Divider/>
            <Grid container={true} justify={'center'}>
              <div className={classes.container}>
                <CustomerForm onSubmit={this.handleProfileSubmit}/>
                <Grid item xs={12}>
                  <Button color="secondary"
                          className={classes.button}
                          variant={"contained"}
                          onClick={this.props.submitProfileForm}>
                    Save
                  </Button>
                </Grid>
              </div>
            </Grid>
          </div>
      );
    } else {
        // @ts-ignore
        return <Redirect to = "/home" />;
    }
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    profile: profileSelector(state),
    email: emailSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getProfile: () => dispatch(getProfile()),
    updateProfile: (email, profile, notify) => dispatch(updateProfile(email, profile, notify)),
    submitProfileForm: () => dispatch(submit('profile')),
  };
}

//@ts-ignore
Customer = withSnackbar(Customer);
export default withStyles ( styles, { withTheme: true } ) (connect(mapStateToProps, mapDispatchToProps)(Customer));
