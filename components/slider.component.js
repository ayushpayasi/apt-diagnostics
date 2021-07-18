import React, { Fragment } from "react";
import Slider from "react-slick";
import {Container ,Col ,Row ,Card,CardTitle,CardBody,CardFooter,Button} from "reactstrap";

const ReportSlider = (props) => {
const testList = props.data

    
const addToCart = (event,item)=>{
    event.stopPropagation();
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    if(cart !== null){
    if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
    else{
        cart.push(item)
        props.updateCartValue(cart.length)
        sessionStorage.setItem("cart",JSON.stringify(cart))
    }
}else{
    sessionStorage.setItem("cart",JSON.stringify([item]))
}
}


const Slider4 = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    cssEase: "ease-out",
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
                                {testList.map(test=><div key={test.testID} className="align-center-column">
                                <Card className="test-carousel-card text-center">
                                    <CardBody>
                                        <CardTitle className="text-center card-title">{test.testName}</CardTitle>
                                        <h6 className="text-left" style={{color:"grey"}}>₹ {test.testAmount}</h6>
                                        <p className="mt-4">{test.details.substring(0,80)}</p>
                                    </CardBody>
                                    <Button onClick={(event)=>{addToCart(event,test)}} className="test-card-button">Book Test</Button>
                                </Card>
                                </div>
                                )}
                            </Slider>
        </Container>
    );

}

export default ReportSlider;


