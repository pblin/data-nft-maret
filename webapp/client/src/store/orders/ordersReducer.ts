import {ORDER_ACTIONS} from "./orderActions";

interface OrderState {
  orders: any
}

const defaultState: OrderState = {
  orders: []
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case ORDER_ACTIONS.SET_ORDERS:
      newState.orders = action.orders;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
