import {connect} from "react-redux";
import OrderHistory from "./OrderHistory";
import {bindActionCreators} from "redux";
import {getOrders} from "../../store/orders/orderActions";
import {getFilteredOrders} from "../../store/orders/orderSelectors";
import {submit} from 'redux-form';
import {profileSelector} from "../../store/profile/profileSelector";
import {sendEmail} from "../../store/datasetInfo/datasetInfoActions";

const mapStateToProps = (state: any) => {
  return {
    orders: getFilteredOrders(state),
    profile: profileSelector(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getOrders,
        sendEmail,
        submit
      },
      dispatch
    )
  }
};


const OrderHistoryPage = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

export default OrderHistoryPage;
