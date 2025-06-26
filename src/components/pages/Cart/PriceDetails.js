import { Component } from 'react'
import { connect } from 'react-redux'
import { setTotalPrice } from '../../../redux/actionCreators'


const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        platformFee: state.platformFee,
        deliveryCharges: state.deliveryCharges,
        totalPrice: state.totalPrice
        }
}
const mapDispatchToProps = (dispatch) => ({
  setTotalPrice: (totalPrice) => dispatch(setTotalPrice(totalPrice)),
});

class PriceDetails extends Component {
    render() {
        const { cartItems, platformFee, deliveryCharges } = this.props;
       
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalProductPrice = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const totalPrice = totalProductPrice + platformFee + deliveryCharges;
           this.props.setTotalPrice(totalPrice); 


console.log(totalPrice)
        return (
            <>             
                <div className='priceDetails'>
                    <h3>Price details</h3>
                    <hr />
                    <div className='items'>
                        <div className='nameDiv'>
                            <p>Total Items</p>
                            <p>platform Fee</p>
                            <p>Delivery Charges</p>
                        </div>
                        <div className='priceDiv'>                            
                            <p>{totalItems}</p>
                            <p>{this.props.platformFee} BDT</p>
                            <p>{this.props.deliveryCharges} BDT</p>
                        </div>
                    </div>
                    <hr />
                    <div className='totalPrice'>
                        <h4>Total Amount</h4>
                        <h6>{totalPrice}</h6>
                    </div>
                </div>
            </>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriceDetails)