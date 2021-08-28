import React, { Fragment, useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import {Container ,Col ,Row ,Card,CardTitle,CardBody,CardFooter,Button} from "reactstrap";

const ReportSlider = (props) => {
    const testList = props.data;

    const [cart, setCart] = useState([]);

    useEffect(() => {
        
        let cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);
        
    }, []);
        
    const addToCart = useCallback((event, product)=>{
        event.stopPropagation();

        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart === null ? [] : cart;
        let existing = cart.filter(item => item.testID === product.testID);

        // document.getElementById(`sars-test-${product.testID}`).innerText = 'Added';

        if(existing && existing.length){
            window.alert('Item Already added to cart!');
        }else{
            cart.push(product);
            props.updateCartValue(cart.length);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

    }, []);


    const Slider4 = {
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
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
                {testList.map(test => 
                    <div key={test.testID} className="align-center-column">
                        <Card onClick={(event)=>{location.href=`tests/${test.testName}`}} className="test-carousel-card text-center">
                            <CardBody style={{marginBottom: '0px'}}>
                                <CardTitle className="text-center card-title">{test.testName}</CardTitle>
                                <h6 className="text-right" style={{color:"grey"}}>₹ {test.testAmount}</h6>
                                <p className="mt-4" style={{maxHeight: '8.5vh', overflowY: 'scroll'}}>{test.details}</p>
                            </CardBody>
                            <Button onClick={(event)=>{addToCart(event, test)}} className="test-card-button">Book Test</Button>
                        </Card>
                    </div>
                )}
            </Slider>
        </Container>
    );

}

export default ReportSlider;


