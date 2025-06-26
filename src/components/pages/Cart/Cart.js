import './Cart.css'
import NavigationBar from '../../Header/NavigationBar'
import PriceDetails from './PriceDetails'
import { connect } from 'react-redux'
import { removeProducts } from '../../../redux/actionCreators'
import { Link, Navigate } from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
    totalPrice: state.totalPrice,
    cartItems: state.cartItems,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeProducts: (id) => dispatch(removeProducts(id))
  }
}

const Cart = ({ cartItems, removeProducts, totalPrice }) => {
  const handleAdd = () => {
    console.log('first')
  }

  const handleRemove = (id) => {
    removeProducts(id)
    console.log('removed id:' + id)
  }

  return (
    <>
      <NavigationBar />
      <div className='container'>
        <div className='row'>
          <div className='col-md-7 m-auto'>
            {
              cartItems.map((item, id) => (
                <div className='cartDiv' key={id}>
                  <img src={item.image} width={200} />
                  <div className='cartDesc'>
                    <p>Products name:{item.title}</p>
                    <p>Category: {item.category}</p>
                    <p>Price: {item.price}</p>
                    {/* <p>Total Items: {item.quantity}</p>
                    <p>{`Total Price: ${totalPrice = item.quantity * item.price}`}
                    </p> */}
                    <div className='addAndRemove'>
                      <button className='btn btn-outline-dark'>-</button>
                      <input type="text" value={item.quantity} />
                      <button className='btn btn-outline-dark' onClick={() => handleAdd(item.id)}>+</button>
                    </div>

                  </div>
                      {/* <button onClick={() => handleRemove(item.id)} className='btn btn-outline-dark'>Remove</button>                 */}
                 <div className='crossDiv'>
                    <span onClick={() => handleRemove(item.id)}><i className="fa-solid fa-xmark"></i></span>
                  </div>
                </div>              
              ))}
            <div className='placeOrder'>
              <button  className='btn btn-lg btn-outline-dark'><Link to="/place-order" style={{textDecoration:'none',color:'gray'}} >Order Now</Link></button>
            </div>
          </div>
          <div className='col-md-5'>
            <PriceDetails />
          </div>
        </div>

      </div>

    </>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
























