import  { Component } from 'react'
import './Categories.css'
import arrow from '../../../assets/right-arrow.png'
import SwiperCarousel from './SwiperCarousel'
import { Link } from 'react-router-dom'

export default class Categories extends Component {
    render() {
        return (
          <>
            <div className="Categories">
                <div className="textDiv">
                    <h3>Explore all the <br />Categories</h3>
                    <p>Easiest way to <br />
                        shop your favourite <br /> products</p>
                    <button style={{
                        backgroundColor: " #00202e",
                            color:'white',
                        marginTop: "10px"
                    }} className='btn mb-5 '><Link style={{textDecoration: 'none',color:'white'}} to="/topcategories">See more<i class="fa-solid fa-arrow-right" style={{marginLeft:'5px',color:' #ffffff'}}></i></Link></button>
                </div>
                <SwiperCarousel/>
            </div>
          </>
        )
    }
}
