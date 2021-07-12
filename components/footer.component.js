import React from 'react'
import "../assets/css/footer.scss"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
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
import {Button} from "reactstrap"


export default function Footer() {
    const shareUrl="abcd.com"
    const title = "abcd"
    return (
        <>
        <div className="footer-holder"><p>Never Miss An Update!</p><Button></Button> </div>
        <div className="footer-end">
            <div>
                <h5>APT Diagnostics</h5>
                <ul>
                    <li>About Us</li>
                    <li></li>
                    <li>Lorem, ipsum.</li>
                </ul>
            </div>
            
            <div>
                <h5>Services</h5>
                <ul>
                    <li>Test Booking</li>
                    <li>Blogs</li>
                    <li>Test Packages</li>
                    <li>Report Download</li>
                </ul>
            </div>
            <div>
                <h5>Support</h5>
                <ul>
                    <li>Help Center</li>
                    <li>Query Resolve</li>
                    <li>Import Links</li>
                    <li>Site Map</li>
                </ul>
            </div>
            <div>
                <h5>Cupiditate, nostrum.</h5>
                <ul>
                    <li style={{color:"#0a4275",fontWeight:"500"}}><LocationOnIcon style={{padding:0,margin:0,color:"#ff6363"}}/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas!</li>
                    <li style={{color:"#0a4275",fontWeight:"500"}}><EmailIcon style={{color:"#ff6363"}}/>support@aptdiagnosstics.com</li>
                    <li style={{color:"#0a4275",fontWeight:"500"}}><CallIcon style={{color:"#ff6363"}}/>Contact Us</li>
                </ul>
                <h5 style={{marginTop:"20px"}}> Follow Us</h5>
                <ul>
                    <li>                     
                    <div className="links ioright">
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
                    </li>
                </ul>
            </div>
            <div>
            <div className="d-flex align-items-center justify-content-between font-weight-bolder">
            <a >Site Map </a>{" - "}<a href="/terms_of_use" > Terms Of Use </a>{" "}-{" "}<a href="/terms_and_condition">Privacy Policy</a>
            </div>
            <p className="text-center" style={{marginTop:"20px"}}> © Copyright APT Diagnostics All Rights Reserved. 2021</p>
            </div>
            
        </div>
        </>
    )
}
