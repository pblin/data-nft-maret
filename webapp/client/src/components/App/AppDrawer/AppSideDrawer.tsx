import * as React from "react";
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  withStyles,
  Theme,
  List,
  ListItem
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Logo from "../../../img/rebloc_logo.svg";
import {AppLink} from "../AppLink";
import {withRouter} from "react-router";
import cx from "classnames";

//ICONS
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExploreIcon from "@material-ui/icons/Explore";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface AppProps {
  width: number;
  isResponsiveMenuOpen: boolean;
  onResponsiveMenuClose: any;
  classes?: any;
  history?: any;
  authenticated: boolean;
}

class AppSideDrawer extends React.Component <AppProps> {
  classes: any;

  appLinks: AppLink[] = [
    new AppLink('Home', '/', (<HomeIcon/>)),
    new AppLink('Marketplace', '/marketplace', (<DashboardIcon/>)),
    new AppLink('Data Explorer', '/dataexplorer', (<ExploreIcon/>)),
    new AppLink('Etherscan', 'https://rinkeby.etherscan.io/address/0x49FC8385c3BeA67B84799e4Bde1fAD7B6829526e', (<NotificationsIcon/>), 'global'),
    new AppLink('Order History', '/order/history', <CreditCardIcon/>),
    new AppLink('Profie', '/profile', (<PersonIcon/>)),
  ];

  constructor(props) {
    super(props);

    props.history.listen(() => {
      console.log("ROUTE CHANGED");
      this.forceUpdate();
    })
  }

  renderLinks(props) {
    const pathname = this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.pathname;

    return (
      <List>
        {this.appLinks.map((link, index) => {

          const classNames = cx({
            [props.classes.linkListItem]: true,
            [props.classes.activeLinkItem]: (pathname == link.url)
          });

          return (
            <div key={`app-link${index}`}>
              {link.type == 'app' &&
              <ListItem button key={`link-item${index}`} className={pathname == link.url ? props.classes.borderLinkItem : ''}>
                <Link to={link.url}>
                  <div className={classNames}>{link.title}</div>
                </Link>
              </ListItem>
              }
              {link.type == 'global' &&
              <ListItem button key={`link-item${index}`}>
                <a href={link.url}>
                  <div className={classNames}>{link.title}</div>
                </a>
              </ListItem>
              }
            </div>
          )})}
      </List>
    )
  }

  renderLogos(props) {
    const pathname = this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.pathname;

    return (
      <List>
        {this.appLinks.map((link, index) => {
          const classNames = cx({
            [props.classes.iconListItem]: true,
            [props.classes.activeIconItem]: (pathname == link.url)
          });

          return (
            <ListItem alignItems={"center"} key={`icon${index}`} className={classNames}>
              <div>{link.icon}</div>
            </ListItem>
          )})}
      </List>
    )
  }

  render() {
    const styles = (theme: Theme) => ({
      toolbar: {
        ...theme.mixins.toolbar,
        padding: "10px 0 0 40px",
        backgroundColor: theme.palette.primary.main
      },
      drawerPaper: {
        width: this.props.width,
        overflow: "hidden"
      },
      drawer: {
        width: this.props.width,
        flexShrink: 0,
      },
      logo: {
        height: 30,
        marginTop: '7px',
        marginLeft: '15px'
      },
      appLinkLogoContainer: {
      },
      logoContainer: {
        width: 40,
        borderRight: "1px solid black",
      },
      drawerContainer: {
        display: "flex",
        flexDirection: "row" as "row",
        height: "100%",
        minHeight: "100%"
      },
      iconListItem: {
        paddingLeft: 7,
        paddingRight: 0,
        color: theme.palette.primary.light
      },
      activeIconItem: {
        color: "#f05e2a", //TODO: theme it
      },
      linkListItem: {
        lineHeight: "30px",
        display: "inline-block",
        position: "relative" as "relative",
        bottom: 2,
        fontSize: 18,
        color: theme.palette.primary.light
      },
      activeLinkItem: {
        color: "#f05e2a" //TODO: theme it
      },
      borderLinkItem: {
        borderLeft: "3px solid #f05e2a" //TODO: Theme it
      }
    });

    const content = (props) => {
      if(this.props.authenticated) {
        return (
          <React.Fragment>
            <Hidden xsDown>
              <Drawer
                open={true}
                variant="permanent"
                anchor="left"
                classes={{
                  paper: props.classes.drawerPaper || ''
                }}
                className={props.classes.drawer || ''}
              >
                <div className={props.classes.toolbar || ''}>
                  <Link to={"/home"}><img src={Logo} className={props.classes.logo}/></Link>
                </div>
                <Divider/>

                <div className={props.classes.drawerContainer}>
                  <div className={props.classes.logoContainer}>
                    {this.renderLogos(props)}
                  </div>
                  <div className={props.classes.linkContainer}>
                    {this.renderLinks(props)}
                  </div>
                </div>
              </Drawer>
            </Hidden>
            <Hidden smUp>
              <Drawer
                open={this.props.isResponsiveMenuOpen}
                variant="temporary"
                anchor="left"
                classes={{
                  paper: props.classes.drawerPaper || ''
                }}
                className={props.classes.drawer || ''}
              >
                <div>
                  <IconButton onClick={this.props.onResponsiveMenuClose}>
                    <ChevronLeftIcon/>
                  </IconButton>
                </div>
                <Divider/>
                <div className={props.classes.drawerContainer}>
                  <div className={props.classes.logoContainer}>
                    {this.renderLogos(props)}
                  </div>
                  <div className={props.classes.linkContainer}>
                    {this.renderLinks(props)}
                  </div>
                </div>
              </Drawer>
            </Hidden>
          </React.Fragment>
        )
      } else {
         return <React.Fragment />;
      }
   };

    const StyledComponent = withStyles(styles)(content);

    return (
      <StyledComponent/>
    )
  }
}

//@ts-ignore
export default withRouter(AppSideDrawer);
