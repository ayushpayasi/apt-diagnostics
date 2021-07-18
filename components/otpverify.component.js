import React from 'react'
import "../assets/css/lightbox.scss"

export default function OtpVerify(props) {
    return (
        <>
          <div className="lightbox-cover">
                <div className="lightbox-horizontal_sm">
                <button className="close" onClick={()=>props.setOtpWindow(false)}>&times;</button>
                </div>
            </div>  
        </>
    )
}
