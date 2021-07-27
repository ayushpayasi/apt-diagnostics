import React,{useState,useEffect} from 'react'
import "../assets/css/lightbox.scss"
import { Button,Input,Container,Row,Col,FormGroup,Label } from 'reactstrap'
import {toast} from "react-toastify"
export default function OtpVerify(props) {
    const [seconds, setSeconds] = React.useState(30);
    const [resend,setResend] = useState(false)
    React.useEffect(() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(0);
        setResend(true)
      }
    });


    const clickHandler= ()=>{
        if("123" === document.getElementById("otpcheck").value){
            props.verified(true)
        props.setOtpWindow(false)
        }
        else{
            toast("otp invalid!")
        }
    }




    const resendHandler =()=>{
        toast("clicked!")
        setSeconds(30)
        setResend(false)
    }
    return (
        <>
          <div className="lightbox-cover">
                <div className="lightbox-horizontal_sm d-flex align-items-center justify-content-around flex-column">
                <button className="close" onClick={()=>props.setOtpWindow(false)}>&times;</button>
                <FormGroup>
                    <Label for="otpcheck"> Enter OTP</Label>
                    <Input size="sm" id="otpcheck" placeholder="OTP"></Input>
                </FormGroup>
                <span style={{color:"#0a4275"}}><Button disabled={!resend} color="link" onClick={()=>{resendHandler()}} style={{cursor:"pointer",textDecoration:"none",color:"#ff6363"}}>Resend OTP</Button><span style={{border:" 1px solid #0a4275",padding:"5px"}}>{seconds}</span></span>
                    <Row><Col className="d-flex align-items-center justify-content-center">
                    <Button onClick={()=>{clickHandler()}} size="sm" outline >Verify</Button>
                    </Col></Row>
                </div>
            </div>  
        </>
    )
}
