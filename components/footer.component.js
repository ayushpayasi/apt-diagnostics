import React from 'react'
import "../assets/css/footer.scss"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon
} from "react-share"
import {Button, Row, Col} from "reactstrap"
import Subscribe from "./subscribe.component.js"


export default function Footer() {
    const shareUrl="abcd.com";
    const title = "abcd";
    return (
        <>
        <div className="footer-holder">
            <div className="subscriber-footer-component"><Subscribe/></div>
        </div>
        <div className="footer-end">
            <Row className="footer-content-boxes">
                <Col md='3' xs='6' className="space-at-top">
                    <div className="footer-box-center">
                        {/* <h5 className="footer-heading">APT Diagnostics</h5> */}
                        <h5 className="footer-heading">Support</h5>
                        <ul>
                            <li>About Us</li>
                            <li>Help Center</li>
                            <li>Query Resolve</li>
                            {/* <li>Import Links</li> */}
                            {/* <li>Site Map</li> */}
                            <li>Lorem, ipsum.</li>
                        </ul>
                    </div>
                </Col>
                <Col md='3' xs='6' className="space-at-top">
                    <div className="footer-box-center">
                        <h5 className="footer-heading">Services</h5>
                        <ul>
                            <li>Test Booking</li>
                            <li>Blogs</li>
                            <li>Test Packages</li>
                            <li>Report Download</li>
                        </ul>
                    </div>
                </Col>
                <Col md='6' xs='10' className="space-at-top">
                    <div className="overflown-text footer-box-center">
                        <h5 className="footer-heading">Cupiditate, nostrum.</h5>
                        <ul>
                            <li style={{fontWeight:"500"}}><LocationOnIcon style={{padding:0,margin:0,color:"#ff6363"}}/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas!</li>
                            <li style={{fontWeight:"500"}} title="support@aptdiagnosstics.com"><EmailIcon style={{color:"#ff6363"}}/>support@aptdiagnosstics.com</li>
                            <li style={{fontWeight:"500"}}><CallIcon style={{color:"#ff6363"}}/>Contact Us</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            
        </div>
        <div className="footer-end-bottom d-flex justify-content-center align-items-center flex-column text-center">
        <h5 style={{marginTop:"10px"}}> Follow Us</h5>
                <ul>
                    <li>                     
                    <div className="links ioright">

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
                        url={String(window.location)}
                        media={`${String(window.location)}/${exampleImage}`}
                        className="shareButton"
                        >
                            <PinterestIcon size={35} round />
                        </PinterestShareButton> */}
            </div>
                    </li>
                </ul>
            
        </div>
        <div className="footer-end-bottom">
            <div className="d-flex align-items-center justify-content-center font-weight-bolder" style={{textAlign: 'center'}}>
            <a href="/sitemap" >Site Map </a>&nbsp;{"/"}&nbsp;
            <a href="/terms_of_use" > Terms Of Use </a>&nbsp;{"/"}&nbsp;
            <a href="/terms_and_condition">Privacy Policy</a>
            </div>
            <p className="text-center padding-for-bottom-navbar" style={{marginTop:"20px"}}> &copy; Copyright APT Diagnostics All Rights Reserved. {(new Date()).getFullYear()}</p>
        </div>
        </>
    )
}
