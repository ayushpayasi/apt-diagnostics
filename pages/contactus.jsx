import Head from 'next/head'
import React,{useState} from 'react'
import axios from "axios"
import {apiLinks} from "../connection.config"
import {toast} from "react-toastify"
import { Container,Row,Col,Card,CardBody,CardTitle,FormGroup,Input,Label,Button } from 'reactstrap'
import NavBar from "../components/navbar.component"
import "../assets/css/contactus.scss"


export function getServerSideProps(context) {
    
    const sec = context.query.sec
    if(sec !== undefined)
    return { props: {sec} };
    else{
        return { props: {} };
    }
  }


export default function Contactus(props) {
    const [attachment,setAttachment] = useState(null)

    const contactusSubmitHandler = async ()=>{
        try{
            const formData = {
                "name":document.getElementById("contactus_name").value,
                "email":document.getElementById("contactus_email").value,
                "contact":document.getElementById("contactus_contact").value,
                "queryType":document.getElementById("contactus_type").value,
                "queryDescription":document.getElementById("contactus_description").value
            }

            const result = await axios.post(apiLinks.contactus,formData)
            if(result.status === 200){
                toast("Thanks For Contacting Us!")
            }
            else{
                toast("Failed to submit your Contact Request!")
            }

        }catch(err){
            console.log(err)
            toast("Failed to submit your Contact Request!")
        }
    }

    const feedbackSubmitHandler = async ()=>{
        try{
            let formData = new FormData()
            formData.append("name",document.getElementById("feedback_name").value)
            formData.append("email",document.getElementById("feedback_email").value)
            formData.append("type",document.getElementById("feedback_type").value)
            formData.append("contact",document.getElementById("feedback_contact").value)
            formData.append("query",document.getElementById("feedback_query").value)
            if(attachment !== null){formData.append("attachment",attachment)}
            
            const result = await axios.post(apiLinks.postFeedback,formData)
            if(result.status === 200){
                toast("Thanks For Your Feedback!")
            }
            else{
                toast("Failed to submit your Feedback!")
            }
        }catch(err){
            console.log(err)
            toast("Failed to submit your Feedback!")
        }
    }

    return (
        <>
        
        <Head>
          <title>Contact Us || APT Diagnostics</title>
        </Head>
        <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
        <Container className="mt-5">
            <Card id="feedback">
                <CardTitle className="text-center" style={{background:"#0a4275",color:"#fff",padding:"10px",fontSize:"1.2rem"}}>
                    FeedBack / Complaints
                </CardTitle>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                
                        <FormGroup>
                            <Label for="feedback_name">
                                Name (नाम)
                            </Label>
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_name" placeholder="Name"></Input>
                        </FormGroup>
                            </Col>
                            <Col>
                            
                        <FormGroup>
                            <Label for="feedback_email">
                                Email (ईमेल)
                            </Label>
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_email" placeholder="Email"></Input>
                        </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4">
                                <Label for="feedback_type">Type (प्रकार)</Label>
                                <Input className="feedback_form_input" size="sm" type="select" id="feedback_type">
                                    <option>feedback</option>
                                    <option>feedback</option>
                                    <option>feedback</option>
                                    <option>feedback</option>
                                </Input>
                            </Col>
                            <Col xs="8">
                            <FormGroup>
                            <Label for="feedback_phonenumber">
                                Phone No (फ़ोन नंबर)
                            </Label>
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_contact" placeholder="Number"></Input>
                        </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                <Label for="feedback_query">
                                    Query(सवाल)
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="textarea" id="feedback_query" placeholder="Query"></Input>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Label for="feedback_file">
                                    Attachments
                                </Label>
                                <Input onChange={(event)=>{setAttachment(event.target.files[0])}} className="feedback_form_input" size="sm" type="file" id="feedback_file" placeholder="File"></Input>
                            </FormGroup>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-center">
                                <Button onClick={()=>{feedbackSubmitHandler()}}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
            <Row  id="contact_us">
                <Col>
                    <Card>
                        <CardTitle className="text-center" style={{background:"#0a4275",color:"#fff",padding:"10px",fontSize:"1.2rem"}}>
                                    Contact Us
                        </CardTitle>
                        <CardBody>
                            <Container>
                                <Row>
                            <Col className="">
                            <h4>Call At</h4>
                            <h5>+91-7999450582</h5>
                            <h4>Email</h4>
                            <h5>ayushpayasi@gmail.com</h5>
                            </Col>
                            <Col>
                                <FormGroup>
                                <Label for="contactus_name">
                                    Name
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="text" id="contactus_name" placeholder="Name"></Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="contactus_email">
                                    Email
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="text" id="contactus_email" placeholder="Email"></Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="contactus_contact">
                                    Contact
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="text" id="contactus_contact" placeholder="contact"></Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="contactus_type">
                                    Query Type
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="select" id="contactus_type" placeholder="Query Type">
                                    <option>query1</option>
                                    <option>query1</option>
                                    <option>query1</option>
                                    <option>query1</option>
                                </Input>
                                </FormGroup>
                                <FormGroup>
                                <Label for="contactus_description">
                                    Query Description
                                </Label>
                                <Input className="feedback_form_input" size="sm" type="textarea" id="contactus_description" placeholder="Description"></Input>
                                </FormGroup>
                                <div className="text-center">
                                <Button onClick={()=>{contactusSubmitHandler()}}>
                                    Submit
                                </Button>
                                </div>
                                </Col>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row id="corporate_query">
            <Col>
                <Card>
                    <CardTitle className="text-center" style={{background:"#0a4275",color:"#fff",padding:"10px",fontSize:"1.2rem"}}>
                        Corporate Queries
                    </CardTitle>
                    <CardBody>
                        <h4>Call At</h4>
                        <h5>+91-7999450582</h5>
                        <h4>Email</h4>
                        <h5>ayushpayasi@gmail.com</h5>
                    </CardBody>
                </Card>
                </Col>
            </Row>

        </Container>
        </>
    )
}
