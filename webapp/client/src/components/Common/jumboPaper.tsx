import * as React from "react";
import "./common.scss";
import {Grid, Typography, Paper, Button} from "@material-ui/core";

//TODO: Create Jumbo Button Component
//TODO: Create Jumbo Content Component
const JumboPaper = ({title, content, buttonText = '', handleClick = () => {}, hideCta = false}) => {
  return(
    <Grid container={true} justify={"center"}>
      <Paper className={"jumbo-paper"} elevation={1}>
        <Grid item xs={12}>
          <Typography variant="h4" className={"jumbo-title"}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={"jumbo-title"}>{content}</Typography>
        </Grid>
        {!hideCta &&
          <Button className={"jumbo-button"} onClick={handleClick}>{buttonText}</Button>
        }
      </Paper>
    </Grid>
  );
};

export default JumboPaper;
