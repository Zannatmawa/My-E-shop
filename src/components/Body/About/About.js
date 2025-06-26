import arrow from '../../..//assets/grocery-cart.png'
import surprise from '../../..//assets/surprise.png'
import bathroom from '../../..//assets/bathroom.png'
import './About.css'

const About = () => {
  return (
    <div className='about'>
        <h4>About us</h4>
        <p>Your daily shopping place!</p>
       <div className='aboutUs'>
         <div>
            <div className='circle'><img src={arrow}  width={30}/></div>
            <h5>Large Assortment</h5>
            <span>We offer many different types of products <br/> with fewer variations in each category.</span>
        </div>
        <div>
            <div className='circle'><img src={surprise}  width={30}/></div>
            <h5>Fast & Free Shipping</h5>
            <span>We offer many different types of products <br/> with fewer variations in each category.</span>
        </div>
        <div>
            <div className='circle'><img src={bathroom}  width={30}/></div>
            <h5>24/7 support</h5>
            <span>We offer many different types of products <br/> with fewer variations in each category.</span>
        </div>
       </div>
    </div>
  )
}

export default About