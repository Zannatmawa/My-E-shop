import './HeroSection.css'
import img from '../../../assets/women3.jpg'
import Search from '../../../assets/search.png'

const HeroSection = () => {
    return (
        <div className='carouselDiv'>
            <div className='carousel'>
                <div className='headingDiv'>
                    <h5>Shop Now<div className='line'></div></h5>
                    <h1>Latest Arrivals</h1>
                    <div className='searchBar'>
                        <input placeholder='  What are you looking for?' />
                        <img src={Search} />
                    </div>
                </div>
                <div className='ImgDiv'>
                    <img src={img} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection