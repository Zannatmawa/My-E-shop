import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import './Header.css'
import Cart from '../../assets/shopping-cart.png'
import { connect } from 'react-redux'
import { useState } from 'react'

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    let links = null;
    if (props.token === null) {
        links = <nav>
            <NavItem className='item'>
                <NavLink className='NavLink text-dark' to='/login'>Login</NavLink>
            </NavItem>
        </nav>
    }
    else {
        links = <>
            <NavbarToggler onClick={toggle}><i class="fa-solid fa-bars"></i></NavbarToggler>
            <Collapse isOpen={isOpen} navbar className='navBar'>
                <Nav className='mr-md-5 Nav'>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark' to='/'>Home</NavLink>
                    </NavItem>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark ' to='/topcategories'>All Products</NavLink>
                    </NavItem>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark ' to='/contacts'>Contacts</NavLink>
                    </NavItem>
                </Nav>
                <Nav className='mr-md-5 Nav'>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark' to='/cart'><img src={Cart} alt='cart' width='25px' /></NavLink>
                    </NavItem>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark' to='/order'> Orders
                        </NavLink>
                    </NavItem>
                    <NavItem className='item'>
                        <NavLink className='NavLink text-dark' to='/logout'>Logout
                        </NavLink>
                    </NavItem>
                  
                </Nav>
            </Collapse>
        </>
    }
    return (
        <>
            <Navbar className='Header' expand="md">
                <NavbarBrand href='/' className='mr-auto ml-md-5 Brand logo'><span>My Shop</span></NavbarBrand>
                {links}
            </Navbar>
                 
        </>
    )
}

export default connect(mapStateToProps)(NavigationBar)