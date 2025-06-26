import React, { Component } from 'react'
import Fashion from '../../../assets/bathroom.png'
import Electronic from '../../../assets/electronic-health.png'
import Cars from '../../../assets/electric-car.png'
import Home from '../../../assets/eco-house.png'
import Gifts from '../../../assets/surprise.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../redux/actionCreators'
import NavigationBar from '../../Header/NavigationBar'
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './TopCategories.css'


const mapStateToProps = state => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

class Categories extends Component {
  state = {
    selectedCategory: null,
  };
  componentDidMount() {
    this.props.fetchProducts();
  }

  handleCat = (cat) => {
    this.setState({ selectedCategory: cat });
  };
  render() {
    const { products } = this.props;
    const { selectedCategory } = this.state;

    let item = null;
    item = <div className="cardDiv">
      {this.props.products.map((product) => (
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
      ))}
    </div>

    const filteredProducts = selectedCategory
      ? products.filter(p => p.category === selectedCategory)
      : [];

    return (
      <>
        <NavigationBar />
        <div className='categories-section'>
          <div><img src={Fashion} /><Link  onClick={() => this.handleCat("women's clothing")} to="#">Women's</Link></div>
          <div><img src={Home} /><Link onClick={() => this.handleCat("men's clothing")} to="#">Men's</Link></div>
          <div><img src={Electronic} /><Link onClick={() => this.handleCat("electronics")} to="#">Electronic</Link></div>
          <div><img src={Gifts} /><Link onClick={() => this.handleCat("jewelery")} to="#">Gifts</Link></div>
          <div><img src={Cars} /><Link to="#">Cars</Link></div>
        </div>
        {this.state.selectedCategory === null ? item : <div  className='filtered-products'>
          {filteredProducts.map(product => (
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
                    <button className="btn btn-outline-secondary" style={{     padding: "5px 10px", marginTop: "10px" }}><Link to={`/productDetails/${product.id}`} style={{ textDecoration: "none", color: 'black' }}>
                See Details
              </Link></button>
                  </CardBody>
                </Card>
              </div>
            </div>
          ))}
        </div>}

      </>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)




