import React from 'react'
import Slider from "react-slick";
import {Card,CardImg,CardBody,CardTitle,CardText,Button,CardSubtitle,Row,Col } from 'reactstrap';

export default function HealthCheckCarousel(props) {

        
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


    const Product3 = {
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows:false,
        autoplaySpeed: 5000,
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
                    slidesToShow:2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow:1,
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
    const cardFiller =(data)=>{
        return(
            <div>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card">
                    <CardImg top width="100%" src={data.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{data.testName}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{data.testAmount}</CardSubtitle>
                        <CardText>{data.description.substring(0,90)}</CardText>
                        {paramsIconGenerator(data.testsIncluded.length)}
                        {idealForIconGenerator(data.idealFor)}
                        <Row>
                            <Col><Button onClick={(event)=>{addToCart(event,data)}} outline>Book Now</Button></Col>
                            <Col><Button onClick={()=>{location.href=`/packages/${data.testName}`}} outline>Learn More</Button></Col>
                        </Row>
                    </CardBody>
                    </Card>
                    </div>
                </div>
            
        )
    }
    return (
        <>
            <Slider {...Product3}>
                {props.data.map(item=>cardFiller(item))}
                {cardFiller(props.data[0])}
                {cardFiller(props.data[1])}
                {cardFiller(props.data[0])}
                {cardFiller(props.data[1])}
                </Slider>        
        </>

    )
}
