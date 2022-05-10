import * as React from "react";
import {
  ButtonGroup,
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";

//Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface ComponentProps {
  handleClick: any;
  options: any[];
}

interface ComponentState {
  selectedIndex: number;
  prevOpen: boolean;
  anchorRef: any;
}

class SplitButton extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      prevOpen: false,
      anchorRef: null
    }
  }

  handleToggle = () => {
    this.setState((state) => { return {prevOpen: !state.prevOpen}})
  };

  handleClose = (event) => {
    const {anchorRef} = this.state;
    if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    this.setState({prevOpen: false})
  };

  handleMenuItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
      prevOpen: false
    })
  };

  render() {
    const {options, handleClick} = this.props;
    const {selectedIndex, prevOpen, anchorRef} = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button">
            <Button onClick={() => handleClick(options[selectedIndex])}>{options[selectedIndex]}</Button>
            <Button
              color="secondary"
              size="small"
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper open={prevOpen} anchorEl={anchorRef && anchorRef.current} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={event => this.handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    )
  }

};

export default SplitButton;
