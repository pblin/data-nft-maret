import * as React from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import '../common.scss';
import Downloader from '../File/Downloader';

const renderTableCells = (row, objProps) => {
  return <TableRow>
    {objProps.map((prop) => (
      <TableCell>
        <Typography>{row[prop] && row[prop].toString()}</Typography>
      </TableCell>
    ))}
  </TableRow>;
};

const renderToolbar = (data) => {
  return <Toolbar className={"dynamic-toolbar"}>
    <div className={"title-container"}>
      <Typography variant={"subtitle1"}><strong>Sample Data</strong></Typography>
    </div>
    <div>
      <Button
        variant={"outlined"}
        color={"secondary"}
        onClick={() => {Downloader.downloadFile('sample.json', data)}}
      >
        Download JSON
      </Button>
      <Button
        variant={"outlined"}
        color={"secondary"}
        onClick={() => {Downloader.downloadFileAsCSV('sample.csv', data)}}
      >
        Download CSV
      </Button>
    </div>
  </Toolbar>
};

const DynamicTable = ({data}) => {
  const dataProps = Downloader.extractFieldsFromData(data);
  return(
    <Grid container={true} justify={"center"}>
      {data.length &&
        <Paper className={"scroll-paper"}>
          {renderToolbar(data)}
          <Table className={"common-table"}>
            <TableHead>
              <TableRow>
                {dataProps.map((prop) => (
                  <TableCell><Typography>{prop}</Typography></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <React.Fragment>
                  {renderTableCells(row, dataProps)}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
      }
    </Grid>
  );
};

export default DynamicTable;
