import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Component } from 'react';
import DataSourceCard from './DataSourceCard';

// @ts-ignore
const styles = theme => ({
    root: {
      width: 300,
      left: 400,
      backgroundColor: 'lightblue'
    }
  });
type datasetNameType = {
    table_name: string;
};
interface DataListProps {
    datasetNames: datasetNameType [];
}
class DatasetList extends Component<DataListProps> {

render() {
        
    return (
    // @ts-ignore
    <div>
        <Grid container spacing={8} justify={'flex-start'} direction={'row'}>
             { (this.props.datasetNames[0].table_name !== '') && this.props.datasetNames.map( 
                 (source) => 
                    <Grid item xs={6} key={source.table_name}>
                        <DataSourceCard source={source}></DataSourceCard>
                    </Grid>) }
        </Grid>
    </div>
    
    );
}

}
// @ts-ignore
export default withStyles(styles)(DatasetList);