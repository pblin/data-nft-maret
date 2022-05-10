import {config} from "./ServiceConfig";
import {OrderPayload} from "./payloads/OrderPayload";

class OrderService {
  baseUrl: string;
  constructor() {
      this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async getOrderHistory(userId: any) {
      const results = await fetch(`${config.serverBase}/marketplace/order/list/${userId}`);
      if(results.status !== 200) {
        return [];
      } else {
        return results.json();
      }
  }

  async postOrder(order: OrderPayload) {
      const {dataset_id, buyer_id, order_timestamp, payment_txn_ref, pricing_unit, trade, dataset_name} = order;

      const body = {
          dataset_id,
          dataset_name,
          buyer_id,
          order_timestamp,
          payment_txn_ref,
          pricing_unit,
          trade
      };

      const results = await fetch(`${config.serverBase}/marketplace/order/submit`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      });
      if(results.status !== 200) {
          return [];
      } else {
          return results;
      }
  }
}


export default new OrderService();
