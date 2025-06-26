import Header from './Header/Header'
import { Link, Route, Routes } from 'react-router-dom'
import Body from './Body/Body'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import TopCategories from './pages/TopCategories/TopCategories'
import LoginForm from './pages/Form/LoginForm'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Component } from 'react'
import { authCheck } from '../redux/authActionCreators'
import Logout from './pages/Form/Logout'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Orders from './pages/Cart/Orders'
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const mapStateToProps = state => {
  return {
    token: state.token,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(authCheck())
  }
}
class Main extends Component {
  componentDidMount() {
    this.props.authCheck()
  }
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    }
    else {
      routes = <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Body />
          </>
        } />
        <Route path='/topcategories' element={<TopCategories />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/productDetails/:id' element={<ProductDetails />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Orders />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    }


    return (
      <>
        <div >
        {this.props.token === null ? (  <Navbar className='Header' expand="md">
                <NavbarBrand href='/' className='mr-auto ml-md-5 Brand logo'><span>My Shop</span></NavbarBrand>
              <Link to="/login"  style={{textDecoration:'none',color:'black'}}>Login</Link>
            </Navbar>) : null}
          {routes}
        </div>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)