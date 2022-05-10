import * as React from 'react';
import { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import App from '../App/App';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { APIKEY, GRAPHQL } from '../ConfigEnv';

export interface DashboardProps {
  auth: Auth0Authentication;
}

type DatasetType = {
    id: string,
    name: string,
    description: string,
    delivery_method: string,
    num_of_records: number,
    state_province: string,
    country: string,
    price_low: number,
    price_high: number,
    date_created: string,
    date_modified: string,
    access_url: string
}
interface DashboardState {
    pendingSearch: boolean,
    selectedSet: DatasetType,
    visible: boolean,
    sortKey: string,
    sortOrder: any,
    sortField: string,
    layout: string,
    datasets: DatasetType[],
    datasetSize: number
}
class DashboardPage extends Component<DashboardProps, DashboardState> {
    constructor (props) {
        super (props);
        this.state = {
                pendingSearch: false,
                selectedSet: null,
                visible: false,
                sortKey: "",
                sortOrder: null,
                sortField: "",
                layout: 'list',
                datasets: [],
                datasetSize: 0
            };
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.setToHid = this.setToHid.bind(this);
    }
    async getDatasets(state) {
        const query =  `
        query {
            marketplace_data_source_detail {
              id
              name
              description
              num_of_records
              date_created
              date_modified
              price_high
              price_low
              country
              state_province
              delivery_method
              access_url
            }
          }`;
        // @ts-ignore
        const client = new GraphQLClient (GRAPHQL, {
            headers: {
            'X-Hasura-Access-Key': APIKEY,
            },
        });
        // @ts-ignore
        let data = await client.request (query);
        // @ts-ignore
        if (data.marketplace_data_source_detail != undefined) {
            // @ts-ignore
            let datasetListItems = data.marketplace_data_source_detail;
            state.datasetSize = datasetListItems.length;
            for (var i=0; i < datasetListItems.length; i++ ) {
                state.datasets.push (datasetListItems[i]);
            }
        }
        this.forceUpdate();
    }
    componentDidMount() {
        this.getDatasets(this.state);
    }

    renderListItem(ds) {
        // console.log(ds)
        if ( ds != null ) {
            return (
                <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">ID:</div>
                            <div className="p-col-10 p-sm-6">{ds.id}</div>

                            <div className="p-col-2 p-sm-6">Name:</div>
                            <div className="p-col-10 p-sm-6">{ds.name}</div>

                            <div className="p-col-2 p-sm-6">Description:</div>
                            <div className="p-col-10 p-sm-6">{ds.description}</div>

                            <div className="p-col-2 p-sm-6">No of Records:</div>
                            <div className="p-col-10 p-sm-6">{ds.num_of_records}</div>

                            <div className="p-col-2 p-sm-6">Region:</div>
                            <div className="p-col-10 p-sm-6">{ds.state_province}</div>

                            <div className="p-col-2 p-sm-6">Country</div>
                            <div className="p-col-10 p-sm-6">{ds.country}</div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedSet: ds, visible: true })}></Button>
                    </div>
                </div>
            );
        } else {
            return ( <div/>);
        }
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1, 
                sortField: value.substring(1, value.length), 
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1, 
                sortField: value, 
                sortKey: value
            });
        }
    }

    renderGridItem(ds) {
        // console.log(ds);
        if (ds != null ) {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={ds.id} style={{ textAlign: 'center' }}>
                        <div className="ddataset-name">{ds.name}</div>
                        <div className="ddataset-detail">{ds.description}</div>
                        <div className="ddataset-records">{ds.num_of_records}</div>
                        <div className="ddataset-region">{ds.state_province}</div>
                        <div className="ddataset-country">{ds.country}</div>
                        <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                        <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedSet: ds, visible: true })}></Button>
                    </Panel>
                </div>
            );
        } else {
            return (<div/>);
        }
    }

    itemTemplate(ds, layout) {
        if (layout === 'grid')
            return this.renderGridItem(ds);
        else 
            return this.renderListItem(ds);
    }   

    renderDatasetDialogContent() {
       // @ts-ignore 
        if (this.state.selectedSet) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>

                    <div className="p-col-4">ID: </div>
                    <div className="p-col-8">{this.state.selectedSet.id}</div>

                    <div className="p-col-4">Name: </div>
                    <div className="p-col-8">{this.state.selectedSet.name}</div>
                        
                    <div className="p-col-4">Delivery Method: </div>
                    <div className="p-col-8">{this.state.selectedSet.delivery_method}</div>
                    
                    <div className="p-col-4">Number of Records: </div>
                    <div className="p-col-8">{this.state.selectedSet.num_of_records}</div>

                    <div className="p-col-4">Region: </div>
                    <div className="p-col-8">{this.state.selectedSet.state_province}</div>

                    <div className="p-col-4">Price Range: </div>
                    <div className="p-col-8">{this.state.selectedSet.price_low} - {this.state.selectedSet.price_high}</div>

                    <div className="p-col-4">Date Created: </div>
                    <div className="p-col-8">{this.state.selectedSet.date_created}</div>
                    
                    <div className="p-col-4">Last Modified Date: </div>
                    <div className="p-col-8">{this.state.selectedSet.date_modified}</div>

                    <div className="p-col-4">Access URL: </div>
                    <div className="p-col-8">{this.state.selectedSet.access_url}</div>
                </div>
            );
        }
        else {
        return (<div> 
                    <h3> No Info </h3>
                </div> 
               );
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!date_created'},
            {label: 'Oldest First', value: 'date_created'},
            {label: 'name', value: 'name'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );
    }

    setToHid ()
    {
        this.setState({visible: false});
    }

    render () {
        const header = this.renderHeader();
        return (
            <div>
                <div>
                    <App auth={this.props.auth} {...this.props} />
                </div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Dataset Listing</h1>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataView value={this.state.datasets} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={5}
                            sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                    <Dialog header="Dataset Details" visible={this.state.visible} modal={true} onHide={this.setToHid}>
                        {this.renderDatasetDialogContent()}
                    </Dialog>
                </div>

            </div>
        );
    }
}

export default DashboardPage;
