import React from 'react'
import Slider from "react-slick";
import {Card,CardImg,CardBody,CardTitle,CardText,Button,CardSubtitle,Row,Col } from 'reactstrap';

export default function HealthCheckCarousel() {
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
    const paramsIconGenerator = ()=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="test-included" src="/svg/aptIcons/light/tests_included.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Tests Includes</h4></Col></Row>
                    <Row><Col ><h5>25 Parameter</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const idealForIconGenerator = ()=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Ideal For</h4></Col></Row>
                    <Row><Col ><h5>Male/Female below 30 Years</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const cardFiller =()=>{
        return(
            <div>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card">
                    <CardImg top width="100%" src="/images/bgcheck3.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Package Name</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">2000</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        {paramsIconGenerator()}
                        {idealForIconGenerator()}
                        <Row>
                            <Col><Button outline>Book Now</Button></Col>
                            <Col><Button outline>Learn More</Button></Col>
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
                {cardFiller()}
                {cardFiller()}
                {cardFiller()}
                {cardFiller()}
                {cardFiller()}
                </Slider>        
        </>

    )
}
