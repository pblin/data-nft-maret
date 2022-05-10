export class OrderPayload {
    buyer_id: number;
    dataset_id: string;
    dataset_name: string;
    trade: number;
    pricing_unit: string;
    payment_txn_ref: string;
    order_timestamp: any;

    constructor(
        buyer_id: number,
        dataset_id: string,
        dataset_name: string,
        trade: number,
        pricing_unit: string,
        payment_txn_ref: string,
        order_timestamp: any
    ) {
        this.buyer_id = buyer_id;
        this.dataset_id = dataset_id;
        this.dataset_name = dataset_name;
        this.trade = trade;
        this.pricing_unit = pricing_unit;
        this.payment_txn_ref = payment_txn_ref;
        this.order_timestamp = new Date(order_timestamp * 1000); //Converting seconds to milliseconds
    }
}

