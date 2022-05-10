import * as React from "react";
import {withRouter} from "react-router";
import './marketplace.scss';
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import DatasetBuyList from "./DatasetBuyList/DatasetBuyList";
import {
  Fab,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Drawer
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DatasetManagerContainer from '../DatasetManager/DatasetManagerContainer'
import JumboPaper from "../Common/jumboPaper";
import FilterMenu from "../Common/Filter/FIlterMenuV2";
import FilterBreadCrumbs from "../Common/Filter/FilterBreadCrumbs";

interface ComponentProps {
  schemaFilter: string;
  profile: any;
  getProfile: any;
  datasets: any[];
  userDatasets: any[];
  datasetDialog: any
  isProfileSet: boolean;
  history: any;
  confirmDeleteDialog: any;
  marketplace: any;
  actions: any;
  purchasableDatasets: any[];
  purchasedDatasets: any;
  loading: boolean;
}

interface ComponentState {
  purchasedDatasetsRetrieved: boolean;
  filterDrawerOpen: boolean;
  search: string;
  filters: any;
}

class MarketplaceV2 extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      purchasedDatasetsRetrieved: false,
      filterDrawerOpen: false,
      search: '',
      filters: {}
    }
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Buy', 'purchasable'),
    new ToolbarOption('Sell',  'ownedByMe')
  ];

  componentDidMount() {
    this.props.actions.getAllDatasets();
    this.props.actions.getUserDatasets();
  }

  componentWillUnmount(): void {
    this.props.actions.hardReset();
  }

  handleSchemaChange(val) {
    if(val == 'purchased') {
      if(!this.state.purchasedDatasetsRetrieved) {
        this.props.actions.getOrders();
      }
    }
    this.props.actions.updateSchemaFilter(val);
  }

  openDialog() {
    this.props.actions.changeDialogState(true, 'add', undefined);
  }

  handleOnDelete(dataset) {
    this.props.actions.changeConfirmDialogState(true, dataset);
  }

  //Confirm Dialog TODO: Consider moving dialog to seperate component
  onConfirmationClose() {
    this.props.actions.changeConfirmDialogState(false, {name: ''});
  }

  confirmDelete() {
    this.props.actions.deleteDataset(this.props.confirmDeleteDialog.dataset.id);
    this.props.actions.changeConfirmDialogState(false, {name: ''});
  }

  //Filter menu TODO: Possibly Remove This
  onSearchChange(e) {
    this.props.actions.changeSearch(e.target.value);
  }

  renderAddButton() {
    if(!this.props.isProfileSet) {
      return null;
    }
    if((this.props.schemaFilter == 'ownedByMe')) {
      return     <Fab color="secondary" aria-label="add" className={"fab"}  onClick={this.openDialog}>
        <AddIcon />
      </Fab>
    }
    return null;
  }

  onSearchTermChange = (terms) => {
    if(terms.length) {
      this.props.actions.searchDatasets(terms);
    } else {
      this.props.actions.getAllDatasets();
    }
  };

  render() {
    return (
      <div className={"marketplace"}>
        <Drawer
          onClose={()=>{}}
          open={this.state.filterDrawerOpen}
          anchor={'left'}
          variant={"persistent"}
          className={"filter-drawer"}
        >
          <FilterMenu
            onClose={() => this.setState({filterDrawerOpen: false})}
            onSearchTermChange={this.onSearchTermChange}
          />
        </Drawer>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
          toolbarOptions={this.toolbarOptions}
          hasPublish={false}
        />
        <Grid container={true} justify={'center'}>
          <div className={"app-section-wrapper"}>
            <Grid container={true} justify={"flex-start"}>
              {this.renderAddButton()}
              <FilterBreadCrumbs/>
            </Grid>
            <Grid item xs={12} sm={12}>
              {
                this.props.schemaFilter == 'purchasable' &&
                <DatasetBuyList
                  datasets={this.props.purchasableDatasets}
                  history={this.props.history}
                  isUser={false}
                  onFilter={() => this.setState({filterDrawerOpen: true})}
                />
              }
              {(this.props.schemaFilter == 'ownedByMe' && this.props.isProfileSet) &&
                <DatasetBuyList
                  datasets={this.props.userDatasets}
                  history={this.props.history}
                  onFilter={() => {}}
                  isUser={true}
                />
              }
              {(this.props.schemaFilter == 'ownedByMe' && !this.props.isProfileSet) &&
                <JumboPaper
                  title={"Welcome,"}
                  content={"Creating new datasets requires a profile. Please create a profile before continuing"}
                  buttonText={"Create Profile"}
                  handleClick={() => {this.props.history.push('/profile')}}
                />
              }
            </Grid>
            <DatasetManagerContainer/>
            <Dialog open={this.props.confirmDeleteDialog.open} maxWidth={"sm"} fullWidth={true}>
              <DialogTitle>
                {this.props.confirmDeleteDialog.dataset.name}
              </DialogTitle>
              <DialogContent>
                Do you want to delete?
              </DialogContent>
              <DialogActions>
                <Button onClick={this.confirmDelete}>Ok</Button>
                <Button onClick={this.onConfirmationClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </div>
    )
  }
}

export default withRouter(
  // @ts-ignore
  MarketplaceV2
);
