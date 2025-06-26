import { Component } from 'react'
import './ProductDetails.css'
import img1 from '../../../assets/pic1.jpg'
import { connect } from 'react-redux';
import { withParams } from "./withParams";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProducts } from '../../../redux/actionCreators';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavigationBar from '../../Header/NavigationBar';


const mapStateToProps = (state) => {
  return {
    products: state.products,
    totalPrice: state.totalPrice,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addProducts: (product) => dispatch(addProducts(product))

  }
}

class ProductDetails extends Component {
  state = {
    goToHome: false,
  }
  goToHome = () => {
    this.setState({
      goToHome: true,
    })
  }

  handleAddToCart = (product) => {
    this.props.addProducts(product);
  }
 
  render() {
    const { products, params } = this.props;
    const productId = Number(params.id);
    const product = products.find(p => p.id === productId);

    if (!product) return <p>Product not found or still loading...</p>;

    return (
      <>
        <NavigationBar />
        <div className='productDetails'>
          <div className='leftDiv'>
            <img src={product.image} width={300} />
            <div className='btnDiv'>
              <button onClick={() => {
                this.handleAddToCart(product);
              }} className='btn btn-outline-dark'>
                <Link to={`/cart`} style={{ textDecoration: "none", color: 'black' }}>
                  Add to Cart
                </Link></button>
              <button onClick={this.goToHome} className='btn btn-outline-dark'>Cancel</button>
            </div>
          </div>
          <div className='rightDiv'>
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>
            <h5>{product.description}</h5>
            <h5>{product.category}</h5>
            <h5>{product.rating.rate}</h5>
          </div>
        </div>

        {this.state.goToHome ? <Navigate to='/' /> : null}

      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withParams(ProductDetails));

