import Logo from '../../assets/online-shopping.png'
import './Footer.css'
const Footer = () => {
    return (
       <>
        <div  className='Footer'>
            <div className='logoDiv'>
                <img className='p-1' src={Logo} alt='shopping-logo' width='60px' />
                <h6>We help you find  <br /> dream plant</h6>
                <ul>
                    <li><a><i className="fa-brands fa-square-facebook fs-2"></i></a></li>
                    <li><a><i className="fa-brands fa-instagram fs-2"></i></a></li>
                    <li><a><i className="fa-brands fa-square-twitter fs-2"></i></a></li>
                </ul>
            </div>
            <div className='rightDIv'>

                <div>
                    <h5>Information</h5>
                    <ul>
                        <li><a>About</a></li>
                        <li><a>Product</a></li>
                        <li><a>Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Company</h5>
                    <ul>
                        <li><a>Community</a></li>
                        <li><a>Career</a></li>
                        <li><a>Our story</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Contact</h5>
                    <ul>
                        <li><a>Email us</a></li>
                        <li><a>Pricing</a></li>
                        <li><a>Resources</a></li>
                    </ul>
                </div>
            </div>
        </div>
       </>
    )
}

export default Footer