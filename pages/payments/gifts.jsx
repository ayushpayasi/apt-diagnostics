import React,{useState} from 'react'
import Navigation from '../../components/navbar.component'
import OtpVerify from "../../components/otpverify.component"
import { Container,Button,Row,Col,Card,CardTitle,CardBody,FormGroup,Input,Label,InputGroup,InputGroupAddon ,InputGroupButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap'
import "../../assets/css/gift_test.scss"

export default function Gifts(props) {
    const [contactNumberValid,setContactNumberValid] = useState(null)
    const [verified,setVerified] = useState(false)
    const [otpWindow,setOtpWindow] = useState(true)
      
  const handleInputChange = (event)=>{
    var a = /^\d{10}$/;  
      if (a.test(event.target.value)){
        setContactNumberValid(true)
      }   
      else{
        setContactNumberValid(false)
      }
}


    return (
        <>
        {otpWindow?<OtpVerify setOtpWindow={setOtpWindow} />:<React.Fragment/>}
        <Navigation updateCartValue={props.updateCartValue} />
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col md="6">
                    <Card className="gift_tests_cards">
                        <CardBody>
                            <CardTitle><h4>Enter Your Details</h4></CardTitle>
                                <FormGroup>
                                    <Label for="donor_number"> Contact Number</Label>
                                    <InputGroup size="sm">
                                        <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                                        <Input size="sm" id="donor_number"  onChange={(event)=>{handleInputChange(event)}} valid={contactNumberValid} invalid={contactNumberValid=== null ? false:!contactNumberValid} placeholder=""></Input>
                                    </InputGroup>
                                </FormGroup>
                                <Row>
                                {verified?<Col style={{color:"green"}}><p>Verified</p></Col>:<Col style={{color:"red"}}><p>Not Verified</p></Col>}
                                <Col><Button outline size="sm">Verify</Button></Col>
                                </Row>
                                
                                <FormGroup>
                                    <Label for="donor_name">Name</Label>
                                    <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                                        <Input size="sm" id="donor_name"  onChange={(event)=>{handleInputChange(event)}} valid={contactNumberValid} invalid={contactNumberValid=== null ? false:!contactNumberValid} placeholder=""></Input>
                                    </InputGroup>
                                </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}
