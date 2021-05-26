import Slider from "react-slick";
import{Row,Col,Container} from "reactstrap"

export default function PackageSlider(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    return (
      <div>
        <Slider {...settings}>
          <div>
                <img style={{width:"100px",height:"100px"}} src="/images/carouselimgx.jpg"></img>
          </div>
          <div>
                <img style={{width:"100px",height:"100px"}} src="/images/carouselimgx.jpg"></img>
          </div>
          <div>
            <img style={{width:"100%",height:"100%"}} src="/images/carouselimgx.jpg"></img>
          </div>
        </Slider>
      </div>
    );
  }