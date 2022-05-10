import * as React from "react";
import {
  Chip,
  Grid,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Theme,
  withStyles, TablePagination
} from "@material-ui/core";
import TypographyList from "./TypographyList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterIcon from "@material-ui/icons/FilterList";
//import TrashIcon from "@material-ui/icons/Delete";
import Moment from 'moment';
import appVars from "../../../styles/appVars";
import DatasetTypography from "./DatasetTypography";
import Loader from "../../Common/Loader/Loader";

const styles = (theme: Theme) => ({
  headerPanel: {
    border: 'none',
    boxShadow: 'none'
  },
  summaryPanel: {
    '&:hover': {
      cursor: 'default'
    },
    cursor: 'default !important'
  },
  title: {
    fontWeight: 'bold' as 'bold'
  },
  btn: {
    marginTop: '0px'
  },
  filter: {
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  price: {
    color: appVars.dollarBill,
    fontWeight: 'bold' as 'bold'
  },
  header: {
    display: 'inline-block',
    paddingRight: '5px',
    fontWeight: 'bold' as 'bold'
  },
  panelHeader: {
    fontWeight: 'bold' as 'bold',
    fontSize: '15px'
  }
});

interface ComponentProps {
  datasets: any[];
  history: any;
  onFilter: any;
  classes: any;
  isUser: boolean;
}
interface ComponentState {
  pageNumber: number;
  rowsPerPage: number;
}

class DatasetBuyList extends React.Component<ComponentProps, ComponentState>{

  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      rowsPerPage: 10
    }
  }

  handleClick = (dataset) => {
    this.props.history.push(`/dataset/${dataset.id}`);
  };

  handleChangePage = (event: unknown, newPage: number) => {
    this.setState({
      pageNumber: newPage
    })
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({
      pageNumber: 0,
      rowsPerPage: +event.target.value
    })
  };

  renderChips = (dataset) => {
    if(dataset.stage == 2) {
      return <Chip label={"Saved"} className={"save-chip"}/>;
    } else if(dataset.stage == 3) {
      return <Chip label={"Published"} className={"published-chip"} />  ;
    }
  };

  render() {
    const {datasets, onFilter, classes, isUser} = this.props;
    const {pageNumber, rowsPerPage} = this.state;

    return(
      <div>
        <React.Fragment>
          <ExpansionPanel expanded={false} className={classes.headerPanel}>
            <ExpansionPanelSummary
              className={classes.summaryPanel}
              expandIcon={!isUser ? <FilterIcon onClick={onFilter} className={classes.filter}/> : <React.Fragment/>}
            >
              <Grid container>
                <Grid item xs={6} className={classes.panelHeader}>Dataset Name</Grid>
                <Grid item xs={3} className={classes.panelHeader}>Tags</Grid>
                <Grid item xs={3} className={classes.panelHeader}>Categories</Grid>
              </Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          {datasets
            .slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage)
            .map((dataset, index) => (
            <ExpansionPanel key={`schema${index}`} className={"schema-panel"}>
              <ExpansionPanelSummary className={"schema-list"} expandIcon={<ExpandMoreIcon/>}>
                <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
                  <Grid item xs={6}>
                    <Typography className={classes.header} variant={"subtitle1"}>{dataset.name}</Typography>
                    {isUser && this.renderChips(dataset)}
                  </Grid>
                  <Grid item xs={3}>
                    <TypographyList limit={3} terms={dataset['search_terms']}/>
                  </Grid>
                  <Grid item xs={3}>
                      <TypographyList limit={3} terms={dataset['topic']}/>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  <Grid item xs={3}><Typography className={classes.title}>Asking Price</Typography></Grid>
                  <Grid item xs={9}>
                    <DatasetTypography className={classes.price} text={dataset['price_high']} pre={'$'}/>
                  </Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Description</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset.description}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Delivery Method</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset.delivery_method}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Number Of Records</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset['num_of_records']}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Country</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset.country}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>State/Province</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset['state_province']}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>City</Typography></Grid>
                  <Grid item xs={9}><DatasetTypography text={dataset.city}/></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Date Created</Typography></Grid>
                  <Grid item xs={9}><Typography>{Moment(dataset['date_created']).format('MMMM Do YYYY')}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Date Modified</Typography></Grid>
                  <Grid item xs={9}><Typography>{Moment(dataset['date_modified']).format('MMMM Do YYYY')}</Typography></Grid>
                </Grid>
              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Grid container justify={'flex-start'}>
                  <Button
                    color={"secondary"}
                    variant={"text"}
                    className={classes.btn}
                    onClick={() => this.handleClick(dataset)}
                  >
                    {!isUser && <React.Fragment>View Dataset</React.Fragment>}
                    {isUser && <React.Fragment>Manage Dataset</React.Fragment>}
                  </Button>
                </Grid>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
        </React.Fragment>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={datasets.length}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }

}

export default Loader(withStyles(styles)(DatasetBuyList));
