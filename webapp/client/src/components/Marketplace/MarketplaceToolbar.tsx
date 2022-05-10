import * as React from "react";
import {Button, FormControl, Hidden, MenuItem, Select, Theme, Toolbar, withStyles} from "@material-ui/core";
import appVars from "../../styles/appVars";

const styles = (theme: Theme) => ({
  highlight: {
    color: theme.palette.primary.dark,
    background: appVars.faintGray
  },
  option: {
    color: theme.palette.primary.light
  }
});

const MarketplaceToolbar = (
  {
    onSchemaFilterChange,
    classes,
    schemaFilter,
    toolbarOptions,
    hasPublish,
    onSave = () => {},
    onPublish = () => {},
    unPublish = () => {},
    canPublish = false,
    isPublished = false
  }) => {

  const handleSchemaChange = (event) => {
    onSchemaFilterChange(event.target.value);
  };

  const handleButtonClick = (val) => {
    onSchemaFilterChange(val);
  };

  return(
    <Toolbar className="marketplace-toolbar">
      <Hidden xsDown>
        <div className={`filter-container`}>
          {toolbarOptions.map((option, index) => (
            <Button
              onClick={() => handleButtonClick(option.value)} key={`toolbarOption${index}`}
              className={schemaFilter == option.value ? classes.highlight: ''}
            >
              {schemaFilter == option.value && <strong className={classes.highlight}>{option.label}</strong>}
              {schemaFilter != option.value && <span className={classes.option}>{option.label}</span>}
            </Button>
          ))}
        </div>
      </Hidden>
      <Hidden smUp>
        <FormControl className={"filter-container"}>
          <Select value={schemaFilter} onChange={handleSchemaChange}>
            {toolbarOptions.map((option, index) => (
              <MenuItem key={`toolbarSelectOption${index}`} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Hidden>
      {(hasPublish && !isPublished) &&  <>
        <Button className={"toolbar-btn"} variant={"outlined"} color={"secondary"} onClick={onSave}>Save</Button>
        <Button
          className={"toolbar-btn"}
          variant={"contained"}
          color={"secondary"}
          disabled={!canPublish}
          onClick={onPublish}>Publish</Button>
      </>}
      {(hasPublish && isPublished) && <>
        <Button className={"toolbar-btn"} variant="contained" color={"secondary"} onClick={unPublish}>UnPublish</Button>
      </>}
    </Toolbar>
  );
};

export default withStyles(styles)(MarketplaceToolbar);
