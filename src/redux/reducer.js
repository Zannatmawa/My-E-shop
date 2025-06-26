import * as actionTypes from './actionTypes';
const categories = {
  electronics: "electronics",
  jewelery: "jewelery",
  mens: "men's clothing",
  womens: "women's clothing"

}
const INITIAL_STATE = {
  products: [],
  platformFee: 120,
  deliveryCharges: 30,
  totalPrice: 0,
  cartItems: [],
    orders:[],
  orderLoading: true,
  orderErr: false,
  token: null,
  userId: null,
  authLoading: false,
  authFailedMsg: "",
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    // add products
    case actionTypes.ADD_PRODUCTS:
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    // remove products
    case actionTypes.REMOVE_PRODUCTS:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      }
    // total price
    case actionTypes.SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      }
    // load cartitems in orders
 case actionTypes.LOAD_ORDERS:
      let orders = []
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
        })
      }
      console.log(orders)
      return {
        ...state,
        orders: orders,
        orderLoading: false,
      }
    // auth 
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    // auth logout
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }
    // auth Loader
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      }
    // auth failed msg
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authFailedMsg: action.payload,
      }
    default:
      return state;
  }
};
