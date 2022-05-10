import * as React from "react";
import {Theme, Typography, withStyles} from "@material-ui/core";
import appVars from "../../../styles/appVars";

const styles = (theme: Theme) => ({
  non: {
    color: appVars.lightGray
  }
});

const DatasetTypography = ({text, className = '', classes, pre = ''}) => {
  return (
    <Typography className={text ? className: classes.non }>
      { (text) && <React.Fragment>{pre}{text}</React.Fragment>}
      { !text && <React.Fragment>{'Data not available'}</React.Fragment> }
    </Typography>
  )
};

export default withStyles(styles)(DatasetTypography);
