import { Component } from 'react'
import './Body.css'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import arrow from '../../assets/right-arrow.png'
import Categories from './Categories/Categories'
import Footer from '../Footer/Footer'
import { Link, Navigate } from 'react-router-dom'
import { fetchProducts } from "../../redux/actionCreators";
import { connect } from 'react-redux';
import About from './About/About'
import Subscribe from './Subscribe/Subscribe'
import NavigationBar from '../Header/NavigationBar'
import HeroSection from '../Header/HeroSection/HeroSection'


const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
    }
}

class Body extends Component {
    state = {
        toDetails: false,
    }

    componentDidMount() {
        this.props.fetchProducts();
    }
    goToDetails = () => {
        this.setState({
            toDetails: true
        })
    }
    render() {
        return (
            <>
                <div className='body' style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div className='products'>
                        <h3>Best Selling Products</h3>
                        <p>Easiest way to
                            shop your favourite <br /> products</p>
                        <button style={{
                            backgroundColor: " #00202e",
                            color:'white',
                            marginTop: "10px"
                        }} className='btn'>See more <i class="fa-solid fa-arrow-right" style={{marginLeft:'5px',color:' #ffffff'}}></i></button>
                    </div>
                    {this.props.products.slice(0, 3).map(product => {
                        return (
                            <div className="cardDiv">
                                <div
                                    key={product.id}
                                    style={{
                                        display: 'flex',
                                    }}>
                                    <Card className="card">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <CardBody>
                                            <CardTitle className="CardTitle" tag="h6">
                                                {product.title.slice(0, 30)}...
                                            </CardTitle>
                                            <p>{product.category}</p>
                                            <CardText>
                                                ${product.price}  </CardText>
                                            <button className="btn btn-outline-secondary" style={{ padding: "5px 10px", marginTop: "10px" }}><Link to={`/productDetails/${product.id}`} style={{ textDecoration: "none", color: 'black' }}>
                                                See Details
                                            </Link></button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        )
                    })}
                    {this.state.toDetails ? <Navigate to='' /> : null}
                </div>
                <About />
                <Categories />
                <Subscribe />
                <Footer />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)

