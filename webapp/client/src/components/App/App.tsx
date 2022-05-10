import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  Theme,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import {bindActionCreators} from "redux";
import autobind from 'autobind-decorator';
import {Link} from "react-router-dom";
import {AppLink} from "./AppLink";
import Logo from '../../img/rebloc_logo.svg';
import ProfileAvatar from '../Profile/ProfileAvatar';
import "./App.scss";

//Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExploreIcon from "@material-ui/icons/Explore";
import ProfileMenu from "./ProfileMenu";
import {updateProfileMenuOpen} from "../../store/app/appActions";
import {appSelector} from "../../store/app/appSelector";
import {getProfile} from "../../store/profile/profileActions";
import {profileSelector} from "../../store/profile/profileSelector";
import AppSideDrawer from "./AppDrawer/AppSideDrawer";

const drawerWidth = 240;

// @ts-ignore
const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#47494d',
  },
  marginLeft50: {
    marginLeft: "50px"
  },
  appLogo: {
    height: '26px'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  avatar: {
    marginRight: "50px"
  },
});

interface AppProps {
  classes: any;
  theme?: any;
  auth: Auth0Authentication;
  profileMenuOpen: boolean;
  profile: any;
  actions: any;
}

class PersistentDrawerLeft extends React.Component <AppProps> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  state = {
    open: false,
    profileMenuOpen: false
  };

  appLinks: AppLink[] = [
    new AppLink('Marketplace', '/marketplace', (<DashboardIcon/>)),
    new AppLink('Data Explorer', '/dataexplorer', (<ExploreIcon/>)),
    new AppLink('Etherscan', 'https://rinkeby.etherscan.io/address/0x49FC8385c3BeA67B84799e4Bde1fAD7B6829526e', (<NotificationsIcon/>), 'global'),
    new AppLink('Order History', '/order/history', <CreditCardIcon/>)
  ];

  userAppLinks: AppLink[] = [
    new AppLink('Profie', '/profile', (<PersonIcon/>)),
  ];

  @autobind
  login() {
    this.props.auth.login();
  }

  @autobind
  logout() {
    this.props.auth.logout();
    //window.location.replace('/home');
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = () => {
    this.props.actions.updateProfileMenuOpen(true);
  };

  componentDidMount(): void {
    if(!this.props.profile) {
      this.props.actions.getProfile();
    }
  }

  @autobind
  handleProfileMenuClickAway(itemPressed) {
    switch(itemPressed) {
      case 'clickAway':
        this.props.actions.updateProfileMenuOpen(false);
        break;
      case 'logout':
        this.logout();
        this.props.actions.updateProfileMenuOpen(false);
        break;
      case 'profile':
        this.props.actions.updateProfileMenuOpen(false);
        break;
    }
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { authenticated } = this.props.auth;
    let profile = localStorage.getItem('profile');
    let profileObj = '';
    let initial = '';

    if (profile !== 'undefined' && profile != null ) {
      profileObj = JSON.parse(profile);
      if(profileObj['first_name']) {
        //@ts-ignore
        initial += profileObj.first_name[0].toUpperCase();
      }

      if(profileObj['last_name']) {
        //@ts-ignore
        initial += profileObj.last_name[0].toUpperCase();
      }
    }

    return (
        <React.Fragment>
          <CssBaseline />
          <AppBar
            className={classes.appBar}
            position={"fixed"}
          >
            <Toolbar disableGutters={!open}>
              {authenticated && (<IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>)}
              <Link to={"/home"}><img src={Logo} className={classes.appLogo + ' ' + (authenticated ? '': classes.marginLeft50)}/></Link>
              <div className={classes.grow}></div>
              { (profileObj !== '' && authenticated) && (<div className={classes.avatar} onClick={this.handleProfileMenuOpen}><ProfileAvatar initial={initial}/></div> )}
            </Toolbar>
            <ProfileMenu
              open={this.props.profileMenuOpen}
              onClickAway={this.handleProfileMenuClickAway}
              profile={profileObj}/>
          </AppBar>
          <AppSideDrawer
            width={240}
            isResponsiveMenuOpen={open}
            onResponsiveMenuClose={this.handleDrawerClose}
            authenticated={authenticated}
          />
        </React.Fragment>
    );
  }
}

function mapStateToProps (state: any) {
  return {
    profileMenuOpen: appSelector(state).profileMenuOpen,
    profile: profileSelector(state)
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({
      getProfile,
      updateProfileMenuOpen
    }, dispatch)
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(PersistentDrawerLeft));

