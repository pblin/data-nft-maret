import * as React from "react";
import {Button, Collapse, Theme, Typography, withStyles} from "@material-ui/core";

interface ComponentProps {
  terms: any[];
  limit: number;
  classes: any;
}

interface ComponentState {
  remainderOpened: boolean
}

const styles = (theme: Theme) => ({
  moreButton: {
    padding: 0
  },
  searchTag: {
    marginBottom: "0px",
    fontWeight: "bolder" as "bolder",
    color: theme.palette.secondary.main,
    lineHeight: "16px",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

class TypographyList  extends React.Component<ComponentProps, ComponentState>{
  constructor(props) {
    super(props);
    this.state = {
      remainderOpened: false
    }
  }

  renderTerm(term) {
    return (
      <Typography
        className={this.props.classes.searchTag}
        variant={"body2"}>{term}
      </Typography>
    )
  }

  render() {
    const {limit, terms, classes} = this.props;
    const {remainderOpened} = this.state;

    if(terms && terms.length > limit) {
      const copy = [...terms];
      const remainingLength = copy.length - limit;
      const lower = copy.splice(0, limit);

      return (
        <React.Fragment>
          {lower.map((term, index) =>(
            <React.Fragment key={`tag-${term}-${index * Math.random()}`}>{this.renderTerm(term)}</React.Fragment>
          ))}
          {!remainderOpened &&
            <Button
              onClick={(e) => {e.stopPropagation(); this.setState({remainderOpened: true})}}
              className={"search-tag " + classes.moreButton }
            >
              {`...${remainingLength} more`}
            </Button>
          }
          <Collapse in={remainderOpened}>
            {copy.map((term, index) =>(
              <React.Fragment key={`tag-${term}-${index * Math.random()}`}>{this.renderTerm(term)}</React.Fragment>
            ))}
          </Collapse>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {terms && terms.map((term, index) =>(
          <React.Fragment key={`tag-${term}-${index * Math.random()}`}>{this.renderTerm(term)}</React.Fragment>
        ))}
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(TypographyList);
