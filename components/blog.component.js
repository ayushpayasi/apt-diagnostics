import React from 'react'
import {Row,Col, CardImg,CardBody,Card,CardTitle} from "reactstrap"
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

import "../assets/css/blogcomp.scss"
export default function Blog(props) {
    const shareUrl="abcd.com"
    const title = "abcd"
    // style={{background:props.bgcolor,color:props.color}}
    return (
        <>
            <Card className="blog-row iofade">

                <CardImg className="ioleft" src="images/profile3.jpg" alt="profile"></CardImg>
                    
                <CardBody>
                    <h5 className="ioright">Lorem ipsum</h5>
                   
                    <p className="ioright">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, eligendi perspiciatis? Magni, nulla fuga sed expedita ipsa est eum veniam!</p>

                     
                    <div className="links ioright" style={{textAlign: 'center'}}>
                        <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="shareButton"
                        >
                            <FacebookIcon size={35} round />
                        </FacebookShareButton>
                        {/* <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TwitterIcon size={35} round />
                        </TwitterShareButton> */}
                        <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TelegramIcon size={35} round />
                        </TelegramShareButton>
                        <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="shareButton"
                        >
                            <WhatsappIcon size={35} round />
                        </WhatsappShareButton>
                        {/* <PinterestShareButton
                        // url={String(window.location)}
                        // media={`${String(window.location)}/${exampleImage}`}
                        className="shareButton"
                        >
                            <PinterestIcon size={35} round />
                        </PinterestShareButton> */}
            </div>
                    
                </CardBody> 
            </Card>
            </>
    )
}
