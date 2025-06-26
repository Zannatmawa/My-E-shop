import * as actionTypes from './actionTypes'
import axios from 'axios'


export const loadProducts = (products) => {
  return {
    type: actionTypes.LOAD_PRODUCTS,
    payload: products
  }
}
export const addProducts = (products) => {
  return {
    type: actionTypes.ADD_PRODUCTS,
    payload: { ...products, quantity: 1 }
  }
}
export const removeProducts = (id) => {
  return {
    type: actionTypes.REMOVE_PRODUCTS,
    payload: id,
  }
}
// total price
export const setTotalPrice = (totalPrice) => {
  return {
    type: actionTypes.SET_TOTAL_PRICE,
    payload: totalPrice,
  }
}



export const fetchProducts = () => {
  return (dispatch) => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        dispatch(loadProducts(res.data)); // dispatch to reducer
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };
}
export const loadOrder = (cartItems) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: cartItems,
    }
}
// fetch orders from firebase 
export const fetchOrders = (token,userId) => dispatch => {
  const queryParam = '&orderBy="userId"&equalTo="' + userId + '"'
  axios.get("https://e-commerce-95c7b-default-rtdb.firebaseio.com/order.json?auth="+ token+queryParam)
    .then((res) => {
      dispatch(loadOrder(res.data))
      console.log(res)
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    });
}

