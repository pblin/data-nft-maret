export enum ORDER_ACTIONS {
  GET_ORDERS = "GET_ORDERS",
  SET_ORDERS = "SET_ORDERS"
}

export function getOrders() {
  return {type: ORDER_ACTIONS.GET_ORDERS};
}

export function setOrders(orders) {
  return {type: ORDER_ACTIONS.SET_ORDERS, orders};
}
