import * as React from "react";
import {
  Grid,
  Paper
} from "@material-ui/core";
import './orderItem.scss';
import OrderItem from './OrderItem';

const OrderList = ({orders, history, filter, onSendEmail}) => {
  return(
    <Grid container justify={"center"}>
      {orders.map((order) => (
        <Grid item xs={8} spacing={8} className={"order-item"}>
          <Paper>
            <OrderItem order={order} history={history} filter={filter} onSendEmail={onSendEmail}></OrderItem>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderList;
