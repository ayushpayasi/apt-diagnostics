import React from 'react'
import "../assets/css/blogcomp.scss"
import {Col} from "reactstrap"
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

export default function BigBlog() {
    const shareUrl="abcd.com"
    const title = "abcd"
    return (
        <>
            <Col sm="4" className="blog-col iofade">
                    <img className="ioleft" src="images/bgcheck2.jpeg" alt="profile"/>
                </Col>
                <Col sm="8">
                    <h5 className="ioright">Lorem ipsum dolor sit.</h5>
                    <p className="ioright">labore officia tempora impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, impedit. Culpa nisi harum a dignissimos neque quia dolores dolorem illum sequi ab. amet consectetur adipisicing elit. Veritatis, eligendi perspiciatis? Magni, nulla fuga sed expedita ipsa est eum veniam!</p>
                    <div className="links iofade">
                        <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="shareButton"
                        >
                            <FacebookIcon size={25} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TwitterIcon size={25} round />
                        </TwitterShareButton>
                        <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="shareButton"
                        >
                            <TelegramIcon size={25} round />
                        </TelegramShareButton>
                        <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="shareButton"
                        >
                            <WhatsappIcon size={25} round />
                        </WhatsappShareButton>
                        <PinterestShareButton
                        // url={String(window.location)}
                        // media={`${String(window.location)}/${exampleImage}`}
                        className="shareButton"
                        >
                            <PinterestIcon size={25} round />
                        </PinterestShareButton>
            </div>
       
                </Col>
        </>
    )
}
