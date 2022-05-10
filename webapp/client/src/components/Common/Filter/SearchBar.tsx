import * as React from "react";
import {Paper, IconButton, InputBase, Divider} from "@material-ui/core";
//import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "../common.scss";

const SearchBar = ({placeholder, onSearchChange, searchVal, onSearch}) => {
  const handleKeyPress = (e) => {
    if(e.which == 13) {
      onSearch(searchVal);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchVal);
  };

  return(
    <Paper elevation={1} className={"filter-menu"}>
      <InputBase placeholder={placeholder} onChange={onSearchChange} value={searchVal} onKeyPress={handleKeyPress} className={"search"}/>
      <IconButton aria-label="Search" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <Divider />
    </Paper>
  );
};

export default SearchBar;
