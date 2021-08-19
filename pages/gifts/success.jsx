import Head from 'next/head'
import React,{useEffect,useState} from 'react'
import { Container,CardBody,Card,CardTitle,Row,Col } from 'reactstrap'
import Navigation from '../../components/navbar.component'
import "../../assets/css/gifts.scss"
import {
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share"

export default function Success(props) {
    const [couponCode,setCouponCode] = useState("")
    const [shareUrl,setShareUrl] = useState("")
    const title = "coupon|| APT DIagnostics"
    useEffect(()=>{
        setCouponCode(localStorage.getItem("couponCode") === null?"":localStorage.getItem("couponCode"))
        setShareUrl(`www.aptdiagnostics.com/coupons/${localStorage.getItem("couponCode") === null?"":localStorage.getItem("couponCode")}`)
    },[])
    return (
        <>
        
        <Head>
                <title>Your Coupon code  || APTDiagnostics</title>
            </Head>
        <Navigation cartValue={props.cartValue} updateCartValue={props.updateCartValue} />
        <Container className="d-flex mt-5 justify-content-center align-items-center">
          <Card className="gift-card">
              <CardBody>
                <CardTitle></CardTitle>
                <Row>
                    <Col className="text-center">
                       <h5> Your Coupon Code is </h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-2 ">
                        <h4>{couponCode.toUpperCase()}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="share-column">
                    
                    <h5> Share Your Coupon</h5>                     
                    <span>
                        <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="shareButton"
                        >
                            <FacebookIcon size={25} round />
                        </FacebookShareButton>
                    </span>
                    <span>
                        <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TwitterIcon size={25} round />
                        </TwitterShareButton>
                    </span>
                    <span>
                        <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TelegramIcon size={25} round />
                        </TelegramShareButton>
                    </span>
                    <span>
                        <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="shareButton"
                        >
                            <WhatsappIcon size={25} round />
                        </WhatsappShareButton>
                    </span>
                    <span>
                        <PinterestShareButton
                        className="shareButton"
                        >
                            <PinterestIcon size={25} round />
                        </PinterestShareButton>
                    </span>
                    </Col>
                </Row>
              </CardBody>
        </Card>  
        </Container>
        </>
    )
}
