import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {Drawer, Grid} from "@material-ui/core";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import "./dataExplorer.scss";
import SchemaFieldTable from "./SchemaFieldTable";
import FilterMenu from '../Common/Filter/FIlterMenuV2';

interface ComponentProps {
  actions: any;
  fields: any[];
  history: any;
  toolbarFilter: string;
  ownedFields: any[];
}

interface ComponentState {
  filterDrawerOpen: boolean;
}

class DataExplorer extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterDrawerOpen: false
    }
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all')
  ];

  componentDidMount(): void {
    //Get all objects
    this.onFilter('');
  }

  componentWillUnmount(): void {
    this.props.actions.hardReset();
  }

  onFilter = (terms) => {
    this.props.actions.schemaSearch(terms);
  };

  changeFilter = (filter) => {
    this.props.actions.changeToolbarFilter(filter);
  };

  render() {
    return (
      <React.Fragment>
        <MarketplaceToolbar
          onSchemaFilterChange={this.changeFilter}
          schemaFilter={this.props.toolbarFilter}
          toolbarOptions={this.toolbarOptions}
          hasPublish={false}
        />
        <Drawer
          onClose={()=>{}}
          open={this.state.filterDrawerOpen}
          anchor={'left'}
          variant={"persistent"}
          className={"filter-drawer"}
        >
          <FilterMenu
            onClose={() => this.setState({filterDrawerOpen: false})}
            onSearchTermChange={this.onFilter}
          />
        </Drawer>
        <Grid container justify={"center"} className={"data-explorer"}>
          <Grid item xs={12} sm={12} className={"page-section"}>
            {
              this.props.toolbarFilter == 'all' &&
                <React.Fragment>
                    <SchemaFieldTable
                      onFilter={() => this.setState({filterDrawerOpen: true})}
                      schemaFields={this.props.fields}
                      history={this.props.history}
                    />
                </React.Fragment>
            }
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

//@ts-ignore
DataExplorer = withSnackbar(DataExplorer);

//@ts-ignore
export default withRouter(DataExplorer);
