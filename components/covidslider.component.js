import React from 'react'
import Slider from "react-slick";
import {Card,CardBody,CardTitle,CardText,Button} from 'reactstrap';

export default function CovidCarousel(props) {
    const addToCart = (event,item)=>{
        event.stopPropagation();
        let cart = JSON.parse(sessionStorage.getItem("cart"))
        if(cart !== null){
        if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            sessionStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        sessionStorage.setItem("cart",JSON.stringify([item]))
    }
    }

    const Product3 = {
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                    slidesToShow:3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow:2,
                    slidesToScroll: 2
                }
            }
        ]
    }
    const cardFiller =(item)=>{
        return(
            <div key={item.testId}>
                <div style={{padding:"10px !important"}}>
                    <Card onClick={()=>{location.href=`/covid/${item.testId}`}} className="test-card">
                            <CardTitle className="text-center card-title mt-1">{item.name}</CardTitle>
                            <CardBody >
                                <CardText className="body-text">{item.details}</CardText>
                            <div className="align-center-row "><Button onClick={(event)=>{addToCart(event,item)}} variant="outlined" className="test-card-button">Book Test</Button></div></CardBody>
                        </Card>
                    </div>
                </div>
            
        )
    }
    return (
        <>
            <Slider {...Product3}>
                {props.data.map(item=>cardFiller(item))}
                </Slider>        
        </>

    )
}
