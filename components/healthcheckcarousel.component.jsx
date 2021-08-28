import React, {useCallback, useEffect, useState} from 'react'
import Slider from "react-slick";
import {Card,CardImg,CardBody,CardTitle,CardText,Button,CardSubtitle,Row,Col } from 'reactstrap';
import { toast } from 'react-toastify';

export default function HealthCheckCarousel(props) {
    
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);
    }, []);

    const addToCart = useCallback((event, product)=>{
        event.stopPropagation();

        let cartItems = JSON.parse(localStorage.getItem("cart"));
        let existing = cartItems.filter(item => item.testID === product.testID);

        // document.getElementById(`sars-test-${product.testID}`).innerText = 'Added';

        if(existing && existing.length){
            toast.warning('Item already exists in cart 🛒', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
        }else{
              toast.success(`${product.testName} added to Cart!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            cartItems.push(product);
            props.updateCartValue(cartItems.length);
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
        
    }, []);

    const Product3 = {
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const paramsIconGenerator = (data)=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="test-included" src="/svg/aptIcons/light/tests_included.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Tests Includes</h4></Col></Row>
                    <Row><Col ><h5>{data} Parameter</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }

    const idealForIconGenerator = (data)=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Ideal For</h4></Col></Row>
                    <Row><Col ><h5>{data[0]}</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }

    const cardFiller =(data, index)=>{
        return(
            <div key={index}>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card shrink-on-small">
                        <div className="curated-health-image">
                            <CardImg top width="100%" src={data.image} alt="Card image cap" />
                        </div>
                        <CardBody>
                            <CardTitle tag="h5">{data.testName} {` ${index}`}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{data.testAmount}</CardSubtitle>
                            <CardText>{data.description.substring(0,90)}</CardText>
                            {paramsIconGenerator(data.testsIncluded.length)}
                            {idealForIconGenerator(data.idealFor)}
                            <Row>
                                <Col className="align-center-row">
                                    <Button className="curated-health-button" onClick={(event)=>{addToCart(event, data)}} outline >
                                        {/* <span id={`${data.testID}`}> */}
                                            {/* {cart.some(cartItem => cartItem.testID === data.testID) ? 'Added' : 'Book Test'} */}
                                            {/* {console.log(cart)} */}
                                            Book Test
                                        {/* </span> */}
                                    </Button>
                                </Col>
                                <Col className="align-center-row">
                                    <Button className="curated-health-button" onClick={()=>{location.href=`/packages/${data.testName}`}} outline>
                                        Learn More
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
        )
    }

    const arr = [];
    arr.push(...props.data);
    arr.push(...props.data);

    return (
        <>
            <Slider {...Product3} className="health-carousal-items-padding">
                {arr.map((item, index) => cardFiller(item, index))}
                {/* {cardFiller(props.data[0])}
                {cardFiller(props.data[1])}
                {cardFiller(props.data[0])}
                {cardFiller(props.data[1])} */}
            </Slider>        
        </>

    )
}
