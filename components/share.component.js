import React from 'react'
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
import "../assets/css/share.scss"

export default function Share() {
    const shareUrl="abcd.com"
    const title = "abcd"
    return ( 
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

    )
}
