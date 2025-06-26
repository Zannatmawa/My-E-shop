import { Swiper, SwiperSlide } from 'swiper/react';
import top from '../../../assets/top.jpg'
import jeans from '../../../assets/jeans.jpg'
import dress from '../../../assets/dress.jpg'
import man1 from '../../../assets/man1.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { connect } from 'react-redux';
import { Component } from 'react';

const images = [
    top, jeans, dress,man1,jeans,dress
];

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}
class App extends Component {
    render(){
 return (
        <>
            <Swiper
                slidesPerView={3}
                modules={[Pagination]}
                spaceBetween={20}              
                className="mySwiper"
                pagination={{
                    clickable: true,
                }}
                style={{ paddingBottom: "50px" }}
                breakpoints={{
                    0: {slidesPerView: 1},
                    640: { slidesPerView: 1},
                    1024: {slidesPerView: 3}
                }}>
                {images.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
    }
   
}
export default  connect (mapStateToProps)(App)