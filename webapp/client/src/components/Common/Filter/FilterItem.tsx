import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import appVars from "../../../styles/appVars";


const styles = (theme: Theme) => ({
   checkbox: {
     padding: '0 9px 0 9px',
     '& svg': {
       color: appVars.reblocOrange
     }
   },
   control: {
     width: '100%',
   },
   controlLabel: {
     fontWeight: 'bold' as 'bold',
     color: 'black'
   },
   no: {
     color: appVars.lightGray,
     fontWeight: 'bold' as 'bold'
   }
});

const capitalizeWords = (word) => {
  let words = word.split(' ');
  words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
  return words.join(' ');
};

const FilterItem = ({title, options, selected, onSelect, objProp = "", classes}) => {
  return (
    <div>
      <FormControl>
        <FormLabel component={"legend"} className={classes.controlLabel}>{title}</FormLabel>
        <FormGroup>
          <Collapse in={options && options.length > 0}>
            {options && options.map((option, index) => {
            return <FormControlLabel
                    className={classes.control}
                    key={`filter-item${(Math.floor(Math.random() * index * 1000))}`}
                    control={<Checkbox
                    className={classes.checkbox}
                    checked={option[objProp] == selected}
                    onChange={() => onSelect(option)}
                    />}
                    label={`${capitalizeWords(option[objProp])} (${option.count})`}
                  />
            })}
          </Collapse>
          {!options && <Typography className={classes.no}>No options available</Typography>}

        </FormGroup>
      </FormControl>
    </div>);
};

export default withStyles(styles)(FilterItem);
