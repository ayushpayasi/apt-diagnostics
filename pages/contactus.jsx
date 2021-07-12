import React from 'react'
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
    
    // useEffect(() => {
    //     if(props.sec)    
    // }, [])

    return (
        <>
        <NavBar/>
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
                                Name
                            </Label>
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_name" placeholder="Name"></Input>
                        </FormGroup>
                            </Col>
                            <Col>
                            
                        <FormGroup>
                            <Label for="feedback_email">
                                Email
                            </Label>
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_email" placeholder="Email"></Input>
                        </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4">
                                <Label for="feedback_type">Type</Label>
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
                            <Input className="feedback_form_input" size="sm" type="text" id="feedback_phonenumber" placeholder="Number"></Input>
                        </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                <Label for="feedback_query">
                                    Query
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
                                <Input className="feedback_form_input" size="sm" type="file" id="feedback_file" placeholder="File"></Input>
                            </FormGroup>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-center">
                                <Button>
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
                                <Button>
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
