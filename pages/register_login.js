import Head from 'next/head'
import React,{useState} from 'react'
import { Container,Row,Col,Card,CardText,FormGroup,Label,Input,CardBody,CardTitle,Button,InputGroup,InputGroupAddon } from 'reactstrap'
import Datetime from 'react-datetime';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Navigation from '../components/navbar.component';
import {apiLinks} from "../connection.config"
import axios from "axios"
import { toast } from 'react-toastify';
import OtpVerify from '../components/otpverify.component';

export default function Register(props) {
    const [nameIsValidated,setNameIsValidated] = useState(null)
    const [emailIsValidated,setEmailIsValidated] = useState(null)
    const [contactIsValidated,setContactIsValidated] = useState(null)
    const [otpWindow,setOtpWindow] = useState(false)
    const [verified,setVerified] = useState(false)

    const validateName = (event)=>{
        var regName = /^[a-zA-Z]+ [a-zA-Z]+/;
        var name = event.target.value;
        setNameIsValidated(regName.test(name))
      }

    const validateEmail = (event)=>{
        setEmailIsValidated(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value))
    }

    const validateContact =(event)=>{
    var a = /^\d{10}$/;  
    setContactIsValidated(a.test(event.target.value))
    }

    const handleLogin = async()=>{
        const contact = document.getElementById("username").value.trim()
        const password = document.getElementById("password").value.trim()
        const result = await axios.post(apiLinks.loginUser,{contact,password})
        if(result.data.code === 200){
            localStorage.setItem("userDetail",JSON.stringify(result.data.data))
            location.href="/payments/confirm"
        }
        else{
            toast("Invalid UserName or Password!")
        }

    }

    const handleOtpVerify = ()=>{
        if(contactIsValidated){setOtpWindow(true)}
        else{toast("Contact number is not valid!")}
    }

    const handleRegister = async()=>{

        const data = {
            "mobile": document.getElementById("register_contact").value,
          "email": document.getElementById("register_email").value,
          "fullName": document.getElementById("register_name").value,
          "gender": document.getElementById("register_gender").value,
          "area": document.getElementById("register_address").value,
          "dob": document.getElementById("register_dob").value
        }



        const result = await axios.post(apiLinks.registerUser,data)
        if(result.data.code === 200){
            localStorage.setItem("userDetail",JSON.stringify(result.data.data))
            location.href="/payments/confirm"
        }
        else if(result.data.code === 202){
            toast("user Already Exists!")
        }
        else{
            toast("cant register New User !")
        }
    }

    return (
        <>
        
        <Head>
          <title>Register Login || APT Diagnostics</title>
        </Head>
        <Navigation cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
        {otpWindow?<OtpVerify verified={setVerified} setOtpWindow={setOtpWindow}/>:<React.Fragment/>}
        <Container className="mt-3">
          <Row>
            <Col md="4">
           <Card className="login-card" >
                    <CardBody>
                        <CardTitle ><h4 className="text-center"> Login</h4></CardTitle>
                        <FormGroup>
                            <Label for="username">Contact ( फ़ोन नंबर )</Label>
                            <Input style={{borderRadius:"10px"}} aria-label="User Name" id ="username" placeholder="Username"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password ( पासवर्ड )</Label>
                            <Input style={{borderRadius:"10px"}} aria-label="Password" id ="password" placeholder="Password"></Input>
                        </FormGroup>
                        <CardText><a style={{fontSize:"0.8rem"}}>Forgot Password</a></CardText>
                        <CardText style={{color:"#ff6363"}}>Note: Your One time password is a combination of your firstname and YOB Example - <span style={{color:"black"}}>"ayush1999".</span></CardText>
                        <FormGroup className="text-center">
                            <Button style={{borderRadius:"20px",padding:"8px 30px"}} onClick={()=>{handleLogin()}}>Login</Button>
                        </FormGroup>

                    </CardBody>
                </Card>
                </Col>
                <Col md="8">
                  <Card className="register-card">
                  <CardBody>
                        <CardTitle ><h4 className="text-center">Register And Book</h4></CardTitle>
                        <Row>
            <Col>
            <FormGroup size="sm">
                    <Label for="register_contact">Contact ( फ़ोन नंबर ) <span style={{color:"#ff6363"}}> *</span></Label>
                    <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                    <Input id="register_contact" onChange={(event)=>{validateContact(event)}} valid={contactIsValidated} invalid={contactIsValidated=== null ? false:!contactIsValidated}  placeholder="Contact Number"></Input>
                    <InputGroupAddon addonType="append"><Button onClick={()=>{handleOtpVerify()}} style={{background:"#0a4275", letterSpacing:"1px"}}>Verify Your Contact</Button></InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Col>
          </Row>
        <Row>
            <Col >
                <FormGroup size="sm">
                    <Label for="register_name">Full Name ( नाम ) <span style={{color:"#ff6363"}}> *</span></Label>
                    <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend"><Input id="prefix-name" type="select" disabled={!verified} size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                    <Input disabled={!verified} id="register_name"onChange={(event)=>{validateName(event)}} valid={nameIsValidated} invalid={nameIsValidated=== null ? false:!nameIsValidated} placeholder="Full Name"></Input>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col>
            <FormGroup size="sm">
                    <Label for="register_email">Email ( ईमेल )</Label>
                    <Input disabled={!verified} size="sm" id="register_email" onChange={(event)=>{validateEmail(event)}} valid={emailIsValidated} invalid={emailIsValidated=== null ? false:!emailIsValidated} placeholder="Email"></Input>
                </FormGroup>
            </Col>
        </Row>
        
        <Row>
            <Col>
            <FormGroup>
                <Label for="register_gender">Gender ( लिंग )<span style={{color:"#ff6363"}}> *</span></Label>
                <Input disabled={!verified} size="sm" type="select" name="select" id="register_gender">
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
                </Input>
            </FormGroup>
            </Col>
            <Col>
                <FormGroup size="sm">
                    <Label for ="register_dob"> DOB ( जन्म तिथि ) <span style={{color:"#ff6363"}}> *</span> </Label>
                <Datetime dateFormat='YYYY-MM-DD' disableClock={true} timeFormat={false} inputProps={{
                placeholder:"Select Your Date Of Birth",
                id:"register_dob",
                size:"small",
                disabled:!verified,
                autocomplete:"false",
                className:"form-control-sm form-control"
                }}/>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup size="sm">
                    <Label for="register_age">Age ( उम्र ) <span style={{color:"#ff6363"}}> *</span></Label>
                    <Input disabled={!verified} size="sm" id="register_age" placeholder="Age"></Input>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup>
                    <Label for="register_address">Address ( पता ) <span style={{color:"#ff6363"}}> *</span></Label>
                    <InputGroup size="sm">
                    <Input disabled={!verified} id="register_address" placeholder="Address"></Input>
                </InputGroup>
                </FormGroup>
            </Col>
        </Row>
        <Row><Col className="text-center">
        <FormGroup className="text-center">
                            <Button style={{borderRadius:"20px",padding:"8px 30px"}} onClick={()=>{handleRegister()}}>Register</Button>
                        </FormGroup>
          </Col></Row>
       
                    </CardBody>
                  </Card>
                </Col>
                </Row>
        </Container>
    </>
    )
}
