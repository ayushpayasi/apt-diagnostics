import React,{useState, useEffect} from 'react';
import "../assets/css/lightbox.scss";
import { Button,Input,Container,Row,Col,FormGroup,Label } from 'reactstrap';
import {toast} from "react-toastify";
import bcrypt from 'bcryptjs';

const showToast = (message, err = 0) => {
    if(err === 0){
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
    else{
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
};

export default function OtpVerify(props) {

    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(150);
    const [resend, setResend] = useState(false);

    useEffect(() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } 
      else {
        setSeconds(0);
        setResend(true);
      }
    });

    const checkPass = async (code, otpCode) => {
        const isValid = await bcrypt.compare(code, otpCode);
        return (isValid);
    }

    const clickHandler = async () => {
        const data = JSON.parse(sessionStorage.getItem('verificationOtp'));
        if(data === null){
            sessionStorage.removeItem("verificationOtp");
            showToast("Otp Expired, please try again!");
            props.setOtpWindow(false);
        }
        else{
            try{
                const otpCode = data.code;
                const code = otp;
                const contact = data.contact;
                const mobile = props.contact;
                const isValid = await checkPass(code, otpCode);
                if(mobile !== contact){
                    sessionStorage.removeItem("verificationOtp");
                    showToast("Session Expired, please try again!");
                    props.setOtpWindow(false);
                }
                else{
                    if(code === null || code.trim() === ""){
                        showToast("Enter your Otp");
                    }
                    else if(!isValid){
                        showToast("Invalid Otp entered, please try again!");
                    }
                    else{
                        props.setOtpWindow(false);
                        props.verified(true);
                        showToast("OTP successfully verified!", 1);
                        sessionStorage.removeItem("verificationOtp");
                    }
                }
            }
            catch(err){
                console.log(err);
                showToast("Something went wrong, please try again later!");
                sessionStorage.removeItem("verificationOtp");
                props.setOtpWindow(false);
            }
        }
    };

    const resendHandler = () => {
        props.sendOtp(props.contact);
        sessionStorage.removeItem('verificationOtp');
        showToast(`Otp sent successfully`, 1);
        setSeconds(150);
        setResend(false);
    };

    return (
        <>
            <div className="lightbox-cover">
                <div className="lightbox-horizontal_sm d-flex align-items-center justify-content-around flex-column otp-customization">
                    <button className="close" onClick={() => {props.setOtpWindow(false); sessionStorage.removeItem("verificationOtp");}}>&times;</button>
                    <FormGroup>
                        <Label for="otpcheck" style={{fontSize: '1rem'}}> Enter OTP</Label>
                        <Input bsSize="sm" value={otp} autoFocus={true} onChange={event => setOtp(event.target.value)} id="otpcheck" placeholder="OTP" style={{borderRadius: "5px"}} />
                    </FormGroup>
                    <span style={{color:"#0a4275"}}>
                        <Button disabled={!resend} color="link" onClick={()=>{resendHandler()}} style={{cursor:"pointer", textDecoration:"none", color:"#ff6363", fontWeight: 600}}>Resend OTP</Button>
                        {!resend && <span style={{border:" 1px solid #0a4275", padding:"3px 5px", borderRadius: "5px"}}>{seconds} s</span>}
                    </span>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{clickHandler()}} className="anchor_btn" bsSize="sm" outline >Verify</Button>
                        </Col>
                    </Row>
                </div>
            </div>  
        </>
    )
}
