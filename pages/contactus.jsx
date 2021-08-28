import Head from 'next/head'
import React,{useState} from 'react'
import axios from "axios"
import {apiLinks} from "../connection.config"
import {toast} from "react-toastify"
import { Container,Row,Col,Card,CardBody,CardTitle,FormGroup,Input,Label,Button } from 'reactstrap'
import NavBar from "../components/navbar.component"
import "../assets/css/contactus.scss"

const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList, {params:{coupon:"priceList"}});
        if (response.data[0].code === 200){
            return Object.values(response.data[1]);
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
    
}

export async function getServerSideProps(context) {
    
    try{
        const sec = context.query.sec;
        if(sec !== undefined)
            return { props: {sec, testList: await getTestListData()} };
        else{
            return { props: {testList: await getTestListData()} };
        }    

    }
    catch(err){
        console.log(err);
        return { props: {testList: []} };
    }
  }


export default function Contactus(props) {

    const [attachment, setAttachment] = useState(null);

    const contactusSubmitHandler = async () => {
        try{
            const formData = {
                "name": document.getElementById("contactus_name").value,
                "email": document.getElementById("contactus_email").value,
                "contact": document.getElementById("contactus_contact").value,
                "queryType": document.getElementById("contactus_type").value,
                "queryDescription": document.getElementById("contactus_description").value
            };

            const result = await axios.post(apiLinks.contactus, formData);
            if(result.status === 200){
                toast("Thanks For Your time, We'll contact you soon!");
                document.getElementById("contactus_name").value = "";
                document.getElementById("contactus_email").value = "";
                document.getElementById("contactus_contact").value = "";
                document.getElementById("contactus_description").value = "";
            }
            else if(result.status === 400){
                // console.log(result.data);
                toast("Missing required fields!");
            }
            else{
                toast("Failed to submit your details!");
            }
        }
        catch(err){
            if(JSON.stringify(err).includes('400')){
                toast("Please enter valid text!");
            }
            else{
                toast("Failed to submit your Feedback!");
            }
        }
    }

    const feedbackSubmitHandler = async () => {
        try{
            const formData = new FormData();
            formData.append("name", document.getElementById("feedback_name").value);
            formData.append("email", document.getElementById("feedback_email").value);
            formData.append("type", document.getElementById("feedback_type").value);
            formData.append("contact", document.getElementById("feedback_contact").value);
            formData.append("query", document.getElementById("feedback_query").value);
            if(attachment !== null){
                formData.append("attachment", attachment)
            }

            const result = await axios.post(apiLinks.postFeedback, formData);
            if(result.status === 200){
                toast("Thanks For Your Feedback!");
                document.getElementById("feedback_name").value = "";
                document.getElementById("feedback_email").value = "";
                document.getElementById("feedback_contact").value = "";
                document.getElementById("feedback_query").value = "";
                document.getElementById("feedback_file").value = null;
                setAttachment(null);
            }
            else if(result.status === 400){
                // console.log(result.data);
                toast("Required Fields Missing!");
            }
            else{
                toast("Failed to submit your Feedback!");
            }
        }
        catch(err){
            if(JSON.stringify(err).includes('400')){
                toast("Please enter valid text!");
            }
            else{
                toast("Failed to submit your Feedback!");
            }
        }
    }

    return (
        <>
        
        <Head>
          <title>Contact Us || APT Diagnostics</title>
        </Head>
        <NavBar testList={props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
        <Container className="mt-5">
            <Card id="feedback">
                <CardTitle className="text-center" style={{background:"#0a4275",color:"#fff",padding:"10px",fontSize:"1.2rem"}}>
                    FeedBack / Complaints
                </CardTitle>
                <CardBody>
                    <Container>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="feedback_name">
                                        Name (नाम) <span style={{color: "#f00"}}>*</span>
                                    </Label>
                                    <Input className="feedback_form_input" bsSize="sm" type="text" id="feedback_name" placeholder="Name"></Input>
                                </FormGroup>
                            </Col>

                            <Col md="6">
                                <FormGroup>
                                    <Label for="feedback_email">
                                        Email (ईमेल)
                                    </Label>
                                    <Input className="feedback_form_input" bsSize="sm" type="email" id="feedback_email" placeholder="Email"></Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <Label for="feedback_type">Type (प्रकार) <span style={{color: "#f00"}}>*</span> </Label>
                                <Input className="feedback_form_input" bsSize="sm" type="select" id="feedback_type">
                                    <option>feedback</option>
                                    <option>feedback</option>
                                    <option>feedback</option>
                                    <option>feedback</option>
                                </Input>
                            </Col>

                            <Col md="6">
                                <FormGroup>
                                    <Label for="feedback_phonenumber">
                                        Phone No (फ़ोन नंबर) <span style={{color: "#f00"}}>*</span>
                                    </Label>
                                    <Input className="feedback_form_input" bsSize="sm" type="number" id="feedback_contact" placeholder="Number"></Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="feedback_query">
                                        Query (सवाल) <span style={{color: "#f00"}}>*</span>
                                    </Label>
                                    <Input className="feedback_form_input" bsSize="sm" type="textarea" id="feedback_query" placeholder="Query"></Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="feedback_file">
                                        Attachments
                                    </Label>
                                    <Input onChange={(event)=>{setAttachment(event.target.files[0])}} className="feedback_form_input" bsSize="sm" type="file" id="feedback_file" placeholder="File"></Input>
                                </FormGroup>
                            </Col>

                            <Col className="d-flex align-items-center justify-content-center">
                                <Button className="feedback-button" onClick={()=>{feedbackSubmitHandler()}}>
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
                                    {/* <Col className="">
                                        <h4>Call At</h4>
                                        <h5>+91-7999450582</h5>
                                        <h4>Email</h4>
                                        <h5>ayushpayasi@gmail.com</h5>
                                    </Col> */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="contactus_name">
                                                Name <span style={{color: "#f00"}}>*</span>
                                            </Label>
                                            <Input className="feedback_form_input" bsSize="sm" type="text" id="contactus_name" placeholder="Name"></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="contactus_email">
                                                Email
                                            </Label>
                                            <Input className="feedback_form_input" bsSize="sm" type="email" id="contactus_email" placeholder="Email"></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="contactus_contact">
                                                Contact <span style={{color: "#f00"}}>*</span>
                                            </Label>
                                            <Input className="feedback_form_input" bsSize="sm" type="number" id="contactus_contact" placeholder="contact"></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="contactus_type">
                                                Query Type <span style={{color: "#f00"}}>*</span>
                                            </Label>
                                            <Input className="feedback_form_input" bsSize="sm" type="select" id="contactus_type" placeholder="Query Type">
                                                <option>query1</option>
                                                <option>query1</option>
                                                <option>query1</option>
                                                <option>query1</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="contactus_description">
                                                Query Description <span style={{color: "#f00"}}>*</span>
                                            </Label>
                                            <Input className="feedback_form_input" bsSize="sm" type="textarea" id="contactus_description" placeholder="Description"></Input>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button className="feedback-button" onClick={()=>{contactusSubmitHandler()}}>
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
                        <CardTitle className="text-center no-bottom-margin" style={{background:"#0a4275",color:"#fff",padding:"10px",fontSize:"1.2rem"}}>
                            Corporate Queries
                        </CardTitle>
                        <CardBody className="corporate-queries-body">
                            <div className="corporate-queries-img"></div>
                            <div className="corporate-queries-contacts">
                                <h4>Call At</h4>
                                <h5>+91-7999450582</h5>
                                <h4>Email</h4>
                                <h5>ayushpayasi@gmail.com</h5>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
        <Container>
            <Row className="mt-5 pt-5"></Row>
        </Container>
        </>
    )
}
