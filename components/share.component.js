import React from 'react'
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share"
import "../assets/css/share.scss"

export default function Share() {
    const shareUrl="abcd.com"
    const title = "abcd"
    return ( 
        <div className="links">
            <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="shareButton"
            >
                <FacebookIcon size={30} round />
            </FacebookShareButton>
            
            <TelegramShareButton
            url={shareUrl}
            title={title}
            className="shareButton"
            >
                <TelegramIcon size={30} round />
            </TelegramShareButton>
            
            <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="shareButton"
            >
                <WhatsappIcon size={30} round />
            </WhatsappShareButton>
        </div>
    )
}
