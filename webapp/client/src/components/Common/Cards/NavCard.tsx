import * as React from "react";

import {
  Card,
  CardContent,
  Icon,
  Typography,
  withStyles
} from "@material-ui/core";
import AppVars from "../../../styles/appVars";
import {withRouter} from "react-router";

const styles = (theme) => ({
  navCard: {
    marginTop: 20,
    minWidth: 300,
    width: 300,
    marginRight: 10,
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${AppVars.reblocOrange}`
    }
  },
  titleIcon: {
    fontSize: "10px",
    "& svg": {
      fontSize: 20,
      marginRight: 5,
      color: AppVars.lightGray
    },
    "&.hovered": {
      "& svg": {
        color: `${AppVars.reblocOrange}`
      }
    }
  },
  title: {
    marginBottom: 5,
    display: 'inline-block',
    position: 'relative' as 'relative',
    bottom: '2px'
  },
  contentIconContainer: {
    height: 125
  },
  contentIcon: {
    marginLeft: 100,
    "& svg": {
      fontSize: "80px",
      marginTop: 20,
      color: AppVars.lightGray
    },
    "&.hovered": {
      "& svg": {
        color: `${AppVars.reblocOrange}`
      }
    }
  },
  content: {
    color: AppVars.primaryLight
  }
});

interface componentProps {
  title: string,
  TitleIcon: any,
  classes: any,
  content: string,
  ContentIcon: any,
  history: any,
  navTo: string
}

interface componentState {
  hovered: boolean;
}
class NavCard extends React.Component <componentProps, componentState> {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
  }
  render() {
    const {classes, history, navTo, TitleIcon, ContentIcon, title, content} = this.props;

    return (
      <Card
        className={classes.navCard}
        onClick={() => history.push(navTo)}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
      >
        <CardContent>
          <Icon classes={{root: `${classes.titleIcon} ${this.state.hovered ? 'hovered': ''}`}} fontSize={"inherit"}>{TitleIcon}</Icon>
          <div className={classes.title}>
            <Typography>
              <span>{title}</span>
            </Typography>
          </div>
          <div className={classes.contentIconContainer}>
            <Icon classes={{root: `${classes.contentIcon} ${this.state.hovered ? 'hovered': ''}`}} fontSize={"inherit"}>
              {ContentIcon}
            </Icon>
          </div>
          <Typography className={classes.content}>{content}</Typography>
        </CardContent>
      </Card>);
  }
}

// @ts-ignore
export default withRouter(
  // @ts-ignore
    withStyles(styles)(NavCard)
  );
