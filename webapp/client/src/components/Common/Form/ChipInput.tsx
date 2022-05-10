import * as React from "react";
import {Chip, Theme, withStyles} from "@material-ui/core";
import appVars from "../../../styles/appVars";


//icons
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

interface ComponentProps {
  classes: any;
  onChange: any;
};

interface ComponentState {
  chips: any[], //TODO: Give this a type
  showPlaceholder: boolean,
  input: string
};

const styles = (theme: Theme) => ({
  chipInputContainer: {
    borderRadius: '4px',
    boxShadow: appVars.inputBoxShadow,
    padding: '5px 0px 5px 20px',
    display: 'flex',
    alignItems: 'stretch'
  },
  placeholder: {
    fontSize: '16px',
    fontFamily: appVars.mainFont,
    height: '40px',
    width: '100%',
    color: '#a2a2a2',
    '& span' : {
      lineHeight: '40px'
    },
    '&:hover': {
      cursor: 'text'
    }
  },
  input: {
    height: '40px',
    border: 'none',
    width: '15%',
    marginLeft: '5px',
    '&:focus': {
      border: 'none',
      outline: 'none'
    }
  },
  chip: {
    marginLeft: '5px',
    marginBottom: '5px'
  },
  actionContainer: {
    width: '10%',
    display: 'flex',
    borderLeft: '1px solid #a2a2a2',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      color: '#a2a2a2',
      cursor: 'pointer',
      '&:hover': {
        color: 'black'
      }
    }
  },
  contentContainer: {
    width: '90%',
    display: 'inline-block'
  }
});

class ChipInput extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      chips: [],
      showPlaceholder: true,
      input: ''
    }
  }

  onPlaceholderClick = () => {
     this.setState({
       showPlaceholder: false
     });
  };

  onInputBlur = () => {
    this.setState((state, props) => {
      if(state.chips.length == 0) {
        return {
          showPlaceholder: true
        }
      }
    });
  };

  onInputKeypress = (e) => {
    if(e.which == 13) {
      this.setState((state) => {
        if(state.input != '') {
          const chips = [...state.chips, state.input];
          this.props.onChange(chips);
          return {
            chips,
            input: ''
          }
        }
      });
    }
  };

  onChipDelete = (index) => {
    this.setState((state) => {
      const chips = [...state.chips];
      chips.splice(index, 1);
      this.props.onChange(chips);
      return {
        chips,
        showPlaceholder: (chips.length == 0)
      }
    });
  };

  removeAllChips = () => {
    this.props.onChange([]);
    this.setState({
      chips: [],
      input: '',
      showPlaceholder: true
    })
  };

  renderChips() {
    return (
      <React.Fragment>
        {this.state.chips.map((chip, index) => (
          <Chip className={this.props.classes.chip} label={chip} onDelete={() => this.onChipDelete(index)}/>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const {classes} = this.props;
    const {showPlaceholder, chips, input} = this.state;

    return (<div className={classes.chipInputContainer}>
      <div className={classes.contentContainer}>
        { showPlaceholder &&
            <div
              className={classes.placeholder}
              onClick={this.onPlaceholderClick}>
                <span>Add Search Terms</span>
            </div>
        }
        { (chips.length > 0) && this.renderChips() }
        { !showPlaceholder &&
            <input
              className={classes.input}
              autoFocus={true}
              onBlur={this.onInputBlur}
              value={input}
              onChange={(e) => {this.setState({input: e.target.value})}}
              onKeyPress={this.onInputKeypress}
            />
        }
      </div>
      {(chips.length > 0) &&
        <div className={classes.actionContainer}>
          <CloseIcon onClick={this.removeAllChips}/>
        </div>
      }
      {(chips.length == 0) &&
        <div className={classes.actionContainer}>
          <SearchIcon/>
        </div>
      }
    </div>);
  }
}

export default withStyles(styles)(ChipInput);
