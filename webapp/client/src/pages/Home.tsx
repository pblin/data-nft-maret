import autobind from 'autobind-decorator';
import React from 'react';
import { Auth0Authentication } from '..//auth/Auth0Authentication';
import {TimelineMax, Linear} from 'greensock';
import './main.css';
import JumboPaper from "../components/Common/jumboPaper";
import history from "../utils/history";
import {connect} from "react-redux";
import {isProfileSet, profileSelector} from "../store/profile/profileSelector";
import {getProfile} from "../store/profile/profileActions";
import {Divider, Grid, Hidden, Typography} from "@material-ui/core";
import NavCard from "../components/Common/Cards/NavCard";

//Icons
//import LockIcon from "@material-ui/icons/Lock";
import StoreIcon from "@material-ui/icons/Store";
import PageViewIcon from "@material-ui/icons/PageviewOutlined";
//import AddIcon from "@material-ui/icons/AddCircleOutline";
import StorageIcon from "@material-ui/icons/Storage";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";

interface HomeProps {
  auth: Auth0Authentication;
  getProfile: any;
  profile: any;
  isProfileSet: boolean;
}

class Home extends React.Component<HomeProps> {
  @autobind
  login() {
    this.props.auth.login();
  }
  @autobind
  logout() {
    this.props.auth.logout();
  }

  componentWillMount(): void {
    this.props.getProfile();
  }

  componentDidMount(): void {
    init();
  }

  navToProfile() {
    history.push('/profile');
  }

  navToMarketplace() {
    history.push('/marketplace');
  }

  renderNavCards() {
    return (
      <React.Fragment>
        {/*<NavCard
          title={"SECURELY CONNECT YOUR DATA"}
          TitleIcon={<LockIcon/>}
          content={'Rebloc will index your existing data without requiring it to be uploaded'}
          ContentIcon={<AddIcon/>}
          navTo={'/connections'}
        />*/}
        <NavCard
          title={"BROWSE THE MARKETPLACE"}
          TitleIcon={<StoreIcon/>}
          content={'Rebloc provides a marketplace to browse and sell datasets'}
          ContentIcon={<PageViewIcon/>}
          navTo={'/marketplace'}
        />
        <NavCard
          title={"EXPLORE YOUR DATA"}
          TitleIcon={<StorageIcon/>}
          content={'Combine your own data with other schemas, and explore the possibilities'}
          ContentIcon={<ExploreIcon/>}
          navTo={'/dataexplorer'}
        />
      </React.Fragment>
    )
  }

  //TODO: Profile Not Set
  renderJumboPaper() {
    if(!this.props.isProfileSet && this.props.auth.authenticated) {
      return (
        <React.Fragment>
          <JumboPaper
            title={"Data NFT Market Place,"}
            content={"Please create a profile to continue."}
            handleClick={this.navToProfile}
            buttonText={"Create Profile"}/>
        </React.Fragment>
      )
    } else if(this.props.isProfileSet && this.props.auth.authenticated) {
       return (
         <React.Fragment>
           <Typography variant={"h4"}>{`Welcome back, ${this.props.profile['first_name']} ${this.props.profile['last_name']}`}</Typography>
           <Divider/>
           <Hidden xsDown>
             <Grid container spacing={2} justify={"flex-start"}>
               {this.renderNavCards()}
             </Grid>
           </Hidden>
           <Hidden smUp>
             <Grid container spacing={2} justify={"center"}>
               {this.renderNavCards()}
             </Grid>
           </Hidden>
         </React.Fragment>
       )
    }

  }

  render() {
    const { authenticated } = this.props.auth;
    return (
      <div className={`${authenticated ? 'content-container': ''}`}>
        {!authenticated && (
        <section className="top">

          <div className="h-animation">
            <div className="cover" style={{background: "../img/city_background_op.jpg"}}></div>
            <div className="outlines" id="glow" style={{visibility: "hidden"}}></div>
          </div>

          <div className="container">

            <div className="row">

              <div className="col-md-12 text-center wow fadeInUp">

                <h1 className="text-center">Democratizing Real Estate Data</h1>
                <h3 className="text-center">A marketplace for all stakeholders to seamlessly and securely buy and sell
                  data.</h3>
                <a href="#problem" className="btn btn-orange" onClick={this.login}>Login</a>
              </div>

            </div>

          </div>

        </section>)}
        {this.renderJumboPaper()}
      </div>
    );
  }
}


function init() {

  var tl = new TimelineMax({repeat: -1, delay: 3, repeatDelay: 4});

  tl.from(".outlines", 4, {width: "0px", height: "0px", autoAlpha: 0, ease: Linear.easeNone})
    .to(".outlines", 4, {autoAlpha: 0, ease: Linear.easeNone});

  var buildingsTL = new TimelineMax({repeat: -1, repeatDelay: 0});

  buildingsTL.to(".h-animation", 24, {x: "-250px", y: "-350px", force3D: true, rotation: 0.01, ease: Linear.easeNone})
    .to(".h-animation", 24, {x: "0px", y: "0px", force3D: true, rotation: 0.01, ease: Linear.easeNone});

  function coverup() {
    if (window.innerWidth > 991) {
      tl.restart();
      //buildingsTL.restart();
    } else {
      tl.kill();
      //buildingsTL.kill();
    }
  }

  coverup();

  window.addEventListener("resize", coverup, false)
}

function mapStateToProps(state) {
    return {
      profile: profileSelector(state),
      isProfileSet: isProfileSet(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getProfile: () => dispatch(getProfile())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
