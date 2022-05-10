import * as React from "react";
import OrderList from "./OrderList";
import {withRouter} from "react-router";
import MarketplaceToolbar from '../Marketplace/MarketplaceToolbar';
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import SendEmailDialog from "../DatasetInfo/SendEmailDialog";
import {DatasetInquiryPayload} from "../../services/payloads/EmailPayload";
import {withSnackbar} from "notistack";

interface ComponentProps {
  actions: any;
  orders: any;
  history: any;
  profile: any;
  state: ComponentState;
  enqueueSnackbar: any;
}

interface ComponentState {
  filter: string;
  isSendEmailOpen: boolean;
  selectedOrder: any;
}

class OrderHistory extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.setState({
      filter: 'bought',
      isSendEmailOpen: false
    });

    this.onToolbarChange = this.onToolbarChange.bind(this);
    this.onSendEmailSubmit = this.onSendEmailSubmit.bind(this);
    this.onSendEmail = this.onSendEmail.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Purchased', 'bought'),
    new ToolbarOption('Sold',  'sold')
  ];

  onToolbarChange(filter) {
    this.setState({
      filter
    });
  }

  async onSendEmailSubmit(values) {
    await this.props.actions.sendEmail(
      new DatasetInquiryPayload(
        this.state.selectedOrder.seller_id,
        this.props.profile.primary_email,
        values.subject,
        values.message,
        this.state.selectedOrder.dataset_id,
        this.state.selectedOrder.dataset_name),
      this.props.enqueueSnackbar);

    await this.setState({
      isSendEmailOpen: false
    });
  }

  onSendEmail(order) {
    this.setState({
      selectedOrder: order,
      isSendEmailOpen: true
    });
  }

  componentDidMount(): void {
    this.props.actions.getOrders();
  }

  render() {
    return (
      <React.Fragment>
        <MarketplaceToolbar
          schemaFilter={this.state && this.state.filter}
          hasPublish={false}
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onToolbarChange}
        />
        <div className={"order-container"}>
          <OrderList
            orders={this.props.orders[this.state && this.state.filter || 'bought']}
            history={this.props.history}
            filter={this.state && this.state.filter || 'bought'}
            onSendEmail={this.onSendEmail}
          />
        </div>
        <SendEmailDialog
          isOpen={this.state && this.state.isSendEmailOpen || false}
          onCancel={() => {this.setState({isSendEmailOpen: false})}}
          onSendEmail={() => {this.props.actions.submit('sendEmail')}}
          onSubmit={this.onSendEmailSubmit}
        />
      </React.Fragment>
    )
  }
}

//@ts-ignore
OrderHistory = withSnackbar(OrderHistory);

//@ts-ignore
export default withRouter(OrderHistory);
