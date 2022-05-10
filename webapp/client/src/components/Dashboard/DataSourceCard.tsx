import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

// @ts-ignore
const DataSourceCard = ( {source} ) => {
    return(
        <Card>
            <CardContent>
                <Typography component="h5">{source.table_name}</Typography>
            </CardContent>
        </Card>
    );
};

export default DataSourceCard;