import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../../../redux/actionCreators'
import Spinner from '../../Spinner/Spinner'
import NavigationBar from '../../Header/NavigationBar'

const mapStateToProps = state => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token: state.token,
    userId: state.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token,userId) => dispatch(fetchOrders(token,userId)),
  }
}
class order extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token,this.props.userId)
  }
  componentDidUpdate() {
    console.log(this.props)
  }
  render() {
    let orders = null;
    if (this.props.orderErr) {
      orders = <p style={
        {
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px",
          marginRight: "10px"
        }}>Sorry Failed to Load Orders!</p>
    } else {
      if (this.props.orders.length === 0) {
        orders = <p style={
          {
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "5px",
            marginRight: "10px"
          }}>Currently You have no orders!</p>
      } else {
        orders = this.props.orders.map(singleOrder => {
          return  <div className='col-md-6  m-auto' style={{
            border: "1px solid gray",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
        }}>
            <p>Order Number: {singleOrder.id}</p>
            <p>Delivery Address: {singleOrder.customer.deliveryAddress}</p>
            <hr />
            <p>Total:  {singleOrder.Total_price} BDT</p>
            <p>Order Time:  {singleOrder.orderTime} </p>
        </div>
        })
      }
    }
    //Spinner not working
    return (
      <div>
        <NavigationBar />
          {this.props.isLoading ? <Spinner /> : orders}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(order)