import React, {useEffect, useState, useCallback} from 'react'
import Slider from "react-slick";
import {Card, CardBody, CardTitle, CardText, Button, Row, Col} from 'reactstrap';

export default function CovidCarousel(props) {

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

    const Product3 = {
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        pauseOnHover: true,
        swipeToSlide: true,
        arrows:false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const cardFiller =(item)=>{
        return(
            <Col key={item.testID} sm="12" md="12">
                <Card onClick={()=>{location.href=`/covid/${item.testID}`}} className="test-card">
                    <CardTitle className="text-center card--title mt-1">{item.testName}</CardTitle>
                    <CardBody >
                        <CardText className="body-text">{item.details}</CardText>
                        <div className="align-center-row ">
                            <Button 
                                onClick={(event)=>{addToCart(event, item)}} variant="outlined" 
                                className="test-card-button"
                                id={`sars-test-button-${item.testID}`}  
                            >
                                <span id={`sars-test-${item.testID}`}>
                                    Book Test
                                </span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }
    return (
        <>
            <Slider {...Product3}>
                {props.data === null ? <React.Fragment /> : props.data.map(item => cardFiller(item))}
            </Slider>
        </>

    )
}
