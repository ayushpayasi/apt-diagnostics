import React, { Fragment } from "react";
import Slider from "react-slick";
import {Container ,Col ,Row ,Card,CardTitle,CardBody,CardFooter,Button} from "reactstrap";

const ReportSlider = () => {
    const item =
    {
        head:"lorem ipsum",
        price:" ₹ 2000",
        body:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias repellendus labore id ea minus cupiditate rem, officia exercitationem debitis officiis."}
   

    
const Slider4 = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 586,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

    return (
        <Container>
                            <Slider {...Slider4} >
                                <div className="align-center-column">
                                <Card className="test-carousel-card text-center">
                                    <CardTitle className="text-center card-title">{item.head}</CardTitle>
                                    {/* <h5 className="text-left" style={{color:"grey"}}>{item.price}</h5> */}
                                    <CardBody><p>{item.body}</p></CardBody>
                                    <Button className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                                <div>
                                <Card className="test-carousel-card text-center">
                                    <CardTitle className="text-center card-title">{item.head}</CardTitle>
                                    {/* <h5 className="text-left" style={{color:"grey"}}>{item.price}</h5> */}
                                    <CardBody><p>{item.body}</p></CardBody>
                                    <Button className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                                <div>
                                <Card className="test-carousel-card text-center">
                                    <CardTitle className="text-center card-title">{item.head}</CardTitle>
                                    {/* <h5 className="text-left" style={{color:"grey"}}>{item.price}</h5> */}
                                    <CardBody><p>{item.body}</p></CardBody>
                                    <Button className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                                <div>
                                <Card className="test-carousel-card text-center">
                                    <CardTitle className="text-center card-title">{item.head}</CardTitle>
                                    {/* <h5 className="text-left" style={{color:"grey"}}>{item.price}</h5> */}
                                    <CardBody><p>{item.body}</p></CardBody>
                                    <Button className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                                <div>
                                <Card className="test-carousel-card text-center">
                                    <CardTitle className="text-center card-title">{item.head}</CardTitle>
                                    {/* <h5 className="text-left" style={{color:"grey"}}>{item.price}</h5> */}
                                    <CardBody><p>{item.body}</p></CardBody>
                                    <Button className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                            </Slider>
        </Container>
    );

}

export default ReportSlider;


