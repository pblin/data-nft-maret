import * as React from "react";
import {Chip, Paper, Typography} from "@material-ui/core";

export const TermList = ({terms, onDelete, emptyText = 'No Search Terms Applied', name='Terms'}) => {
  return (
    <Paper className={"term-list"}>
      {terms.length == 0 && <Typography variant={"subtitle1"}>{emptyText}</Typography>}
      {terms.length > 0 && <Typography variant={"subtitle1"}>{name}</Typography>}
      {terms.map((term) =>
        <Chip
          label={`${term}`}
          variant={"outlined"}
          color={"primary"}
          className={"term-item"}
          onDelete={() => onDelete(term)}
        />
      )}
    </Paper>
  )
};
