import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";
import moment from "moment";

export const ordersSelector = (state) => state.OrderState.orders;

export const getFilteredOrders = createSelector(
  profileSelector,
  ordersSelector,
  (profile = {}, orders = []) => {
    const sold = [], bought = [];

    //Filter Orders
    orders.forEach((order) => {
      //TODO: Create a service for this
      const momentDate = moment(order.order_timestamp);
      const isToday = momentDate.isSame(moment(), 'day');
      const isYesterday = momentDate.isSame(moment().subtract(1, 'days'), 'day');

      if(isToday) {
        order.order_timestamp = 'Today';
      } else if(isYesterday) {
        order.order_timestamp = 'Yesterday';
      } else {
        order.order_timestamp = moment(order.order_timestamp).format('MMMM Do YYYY');
      }

      if(profile.id == order.seller_id) {
        sold.push(order);
      } else {
        bought.push(order);
      }
    });

    return {
      sold,
      bought
    }
  }
);
