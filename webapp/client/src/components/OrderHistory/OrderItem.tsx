import * as React from "react";
import {
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import './orderItem.scss';

const goToDataset = (history, datasetId)=> {
  history.push(`/dataset/${datasetId}`);
};

const convertNumToFixedNum = (num) => {
  if(!num) {
    return '';
  }
  return `$${num.toFixed(2)}`;
};

const OrderItem = ({order, history, filter, onSendEmail}) => {
  return(
    <Grid container className={"order-item-container"}>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid xs={12} item className={"title-container"}>
            {filter === 'bought' && <Typography variant={"h6"}>Purchased {order['order_timestamp']} </Typography>}
            {filter === 'sold' && <Typography variant={"h6"}>Sold {order['order_timestamp']} </Typography>}
          </Grid>
          <Grid xs={10} item>
            <Typography
              className={"app-link"}
              onClick={() => goToDataset(history, order['dataset_id'])}
            >
              {order['dataset_name']}
            </Typography>
            <Typography>{order['dataset_description']}</Typography>
            <Typography className={"price-text"}>{convertNumToFixedNum(order.trade)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {filter === 'bought' &&
        <Button
          className="order-cta"
          variant={"outlined"}
          onClick={() => onSendEmail(order)}
        >
          Ask Product Question
        </Button>}
        <Button
          className="order-cta"
          variant={"outlined"}
          onClick={() =>goToDataset(history, order['dataset_id'])}
        >
          View Dataset
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
