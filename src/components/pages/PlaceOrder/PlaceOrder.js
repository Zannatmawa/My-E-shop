import axios from 'axios'
import React, { Component } from 'react'
import Spinner from '../../Spinner/Spinner'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody } from 'reactstrap'
import { Formik } from 'formik'
import { Navigate } from 'react-router-dom'

const mapStatetoProps = (state) => {
  return {
    totalPrice: state.totalPrice,
    token:state.token,
    userId: state.userId,
    cartItems: state.cartItems,
  }
}

class PlaceOrder extends Component {
  state = {
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
    goBack: false,
  }
 goBack = () => {
    this.setState({
      goBack: true,
    })
  };
  submitHandler = (values) => {
    this.setState({ isLoading: true })
    const order = {
      cartItems:this.props.cartItems,
      customer: values,
      Total_price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId
    }
    axios.post("https://e-commerce-95c7b-default-rtdb.firebaseio.com/order.json?auth=" +this.props.token ,order)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order Placed Successfully!"
          })
          // this.props.resetIngredient();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something Went Wrong! Order Again!"
          })
        }
      })
      .catch((err) => this.setState({
        isLoading: false,
        isModalOpen: true,
        modalMsg: "Something Went Wrong! Order Again!"
      }))
    console.log(this.state.values)
  }
  render() {
    let form = null;
    if(this.state.isLoading){
      form = <Spinner />
    }
    else{
        form = <div>
        <h4 style={{
          border: '1px solid gray',
          boxShadow: "1px 1px #888888",
          borderRadius: "5px",
          padding: "20px"
        }} >Payment: {this.props.totalPrice.toFixed(2)} BDT</h4>
        <Formik
          initialValues={{
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
          }}
          validate={values => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values) => { this.submitHandler(values) }}

        >
          {(({values,errors, touched, handleChange, handleBlur, handleSubmit}) => (
             <form style={{
                border: '1px solid gray',
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
              }} onSubmit={handleSubmit}>             
                <textarea name='deliveryAddress'
                  id='deliveryAddress'
                  value={values.deliveryAddress}
                  onBlur={handleBlur}
                  onChange={handleChange} className='form-control' placeholder='Enter your address'></textarea>
                   <span>{errors.deliveryAddress && touched.deliveryAddress && errors.deliveryAddress}</span>
                <br />
                <input name='phone' value={values.phone} className='form-control' placeholder='Enter your number' onBlur={handleBlur}
                  onChange={handleChange} />
                <br />
                <select name='paymentType' className='form-control' value={values.paymentType} onBlur={handleBlur}
                  onChange={handleChange}>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button type='submit' style={{ backgroundColor: "black", marginRight: '10px' }} className='mr-auto'>Place Order</Button>
                <Button color="secondary" onClick={this.goBack}>Cancel</Button>
              </form>
          )
           
          )}
        </Formik>
        {/* formik */}
      </div>
    }
    return (
      <div className='container mt-5'>
        
        {form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody><p>{this.state.modalMsg}</p></ModalBody>
        </Modal> 
         {this.state.goBack && <Navigate to="/"  replace={true}/>}
      </div>
    )
  }
}

export default connect(mapStatetoProps)(PlaceOrder);