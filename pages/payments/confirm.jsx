import React,{useState,useEffect} from 'react'
import {Container,Col,Row,Card,ListGroup,ListGroupItem,CardBody,Collapse,CardTitle,FormGroup,Label,Input,InputGroup,InputGroupAddon} from "reactstrap"
import NavBar from "../../components/navbar.component"
import IconButton from "@material-ui/core/IconButton"
import CancelOutlined from "@material-ui/icons/CancelOutlined"
import Loading from "../../components/loading.component"
import "../../assets/css/payments.scss"
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Button } from 'reactstrap'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MobileStepper from "@material-ui/core/MobileStepper"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {isMobile} from "react-device-detect";
import MobileMenu from "../../components/mobilemenu.component"
import axios from 'axios'
import {apiLinks} from "../../connection.config"
import { toast } from 'react-toastify'

var tempData = []

export default function Confirm(props) {
    const [cartData,setCartData] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [activeStep, setActiveStep] = React.useState(0);
    const steps=["Fill Details","Book Slot"]
    const [skipped, setSkipped] = React.useState(new Set());
    const [showCalender,setShowCalender] = useState(true);
    const [finalPrice,setFinalPrice] = useState();
    const [isOpen,setIsOpen] = useState(false)
    const [currentAvailableSlots,setCurrentAvailableSlots] = useState([])
    const [selectedTimeSlot,setSelectedTimeSlot] = useState(null)
    const [contactIsValidated,setContactIsValidated] = useState(null)
    const [emailIsValidated,setEmailIsValidated] = useState(null)
    const [nameIsValidated,setNameIsValidated] = useState(null)


    const isStepOptional = (step) => {
        return step === 1;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
          },(err)=>{console.log(err)});
        } else { 
          console.log("not active")
        }
      }  

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep==0?prevActiveStep:prevActiveStep - 1);
      };

    const handlePayment = ()=>{
      document.getElementById("")
    }

    const applyCoupon = ()=>{
      setCartData()
    }

    const toggle =()=>{
      setIsOpen(!isOpen)
    }

    const disableAll = (obj)=>{
      for(var i of obj){
      document.getElementById(`slot${i}`).style.background = "white"
      document.getElementById(`slot${i}`).style.color = "#000"
    }
    }

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


      function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (<Card className="payment-total-card">
            <CardBody>
              <CardTitle><h5>Fill Information</h5></CardTitle>
               <Row>
                <Col>
                <FormGroup size="sm">
                        <Label for="contact">Contact <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                        <Input onChange={(event)=>{validateContact(event)}} valid={contactIsValidated} invalid={contactIsValidated=== null ? false:!contactIsValidated} id="contact" placeholder="Contact Number"></Input>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                <FormGroup size="sm">
                        <Label for="email">Email</Label>
                        <Input size="sm" id="email" onChange={(event)=>{validateEmail(event)}} valid={emailIsValidated} invalid={emailIsValidated=== null ? false:!emailIsValidated} placeholder="Email"></Input>
                    </FormGroup>
                </Col>
              </Row>
            <Row>
                <Col sm="7">
                    <FormGroup size="sm">
                        <Label for="name">Full Name  <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                        <Input id="name"onChange={(event)=>{validateName(event)}} valid={nameIsValidated} invalid={nameIsValidated=== null ? false:!nameIsValidated} placeholder="Full Name"></Input>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col sm="5">
                    <FormGroup size="sm">
                        <Label for ="dob"> DOB <span style={{color:"#ff6363"}}> *</span> </Label>
                    <Datetime disableClock={true} timeFormat={false} inputProps={{
                    placeholder:"Select Your Date Of Birth",
                    id:"dob",
                    size:"small",
                    autocomplete:"false",
                    className:"form-control-sm form-control"
                    }}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="address">Address <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                        <Input id="address" placeholder="Address"></Input>
                        <InputGroupAddon addonType="append">
                        <Button size="sm" onClick={()=>{getLocation()}} id="locate"><MyLocationIcon/></Button>
                        </InputGroupAddon>
                    </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                <FormGroup>
                    <Label for="gender">Gender <span style={{color:"#ff6363"}}> *</span></Label>
                    <Input size="sm" type="select" name="select" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                    </Input>
                </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup size="sm">
                        <Label for="age">Age <span style={{color:"#ff6363"}}> *</span></Label>
                        <Input size="sm" id="age" placeholder="Age"></Input>
                    </FormGroup>
                </Col>
            </Row>
             
            <Row>
                <Col sm="4">
                <h7 onClick={toggle} style={{ marginBottom: '1rem',fontWeight:"500",fontSize:"0.9rem",color:"#f63636",cursor:"pointer" }}>Booking For Someone else?</h7>
                  <Collapse isOpen={isOpen}>
                  <FormGroup size="sm">
                      <Label for="savedFamilyMembers">Saved Family Members!</Label>
                      <Input type="select" name="select" id="savedFamilyMembers">
                        <option>Member 1</option>
                        <option>Member 2</option>
                        <option>Create A member!</option>
                      </Input>
                    </FormGroup>
                  </Collapse>
                </Col>
              </Row>
            </CardBody>
            </Card>)
          case 1:
            return (<Card>
              <CardBody>
               <CardTitle><h5>Fill Slots</h5></CardTitle>
                <Row>
                  <Col><FormGroup size="sm">
                    <Label for="slotdate">Select Date</Label>
                  <Datetime disableClock={true} onChange={handleDateTimeChange} timeFormat={false} inputProps={{id:"slotdate",placeholder:"Select date",autocomplete:"off"}} closeOnSelect />
                  </FormGroup>
                  </Col>
                </Row>
                {currentAvailableSlots.length === 0 ?<React.Fragment/>:<Row><Col>Available Slots</Col></Row>}
                <Row>
                  {currentAvailableSlots.map(item=><Col sm="4" md="2" key={item}><Card onClick={(event)=>{disableAll(currentAvailableSlots);document.getElementById(`slot${item}`).style.background="rgba(10, 66, 117,255)";document.getElementById(`slot${item}`).style.color="#fff"; setSelectedTimeSlot(item)}} id={`slot${item}`} className="slot-card"><CardBody className="text-center">{item}:00-{item+1}:00</CardBody></Card></Col>)}
                </Row>
                </CardBody>
              </Card>);
          
          default:
            return (<Card><Row>
                <Col>
                  <Button>Pay</Button>
                </Col>
                </Row></Card>
            );
        }
    }  

    const handleNext = () => {
        if(nameIsValidated && emailIsValidated && contactIsValidated && document.getElementById("address").value.trim() !== "" && document.getElementById("dob").value.trim() !== "" && document.getElementById("gender").value.trim() !== "" ){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);}
        else{
          toast("required Fields are missing!")
        }
        
      };
    
    const handleDateTimeChange = async (date) => {
        const result = await axios.post(apiLinks.availableSlots,{"slot":date._d})
        const fleboResult = await axios.get(apiLinks.getFlebo)
        const slotsKey = {slot1:7,slot2:8,slot3:9,slot4:10,slot5:11,slot6:12,slot7:13,slot8:14,slot9:15,slot10:16,slot11:17,slot12:18,slot13:19,slot14:20,slot15:21}
        let availableSlots =[] 
        for (var key of Object.keys(result.data)){
            if(result.data[key] <parseInt(fleboResult.data.flebo)){
              availableSlots.push(slotsKey[key])
            }
        }
        setCurrentAvailableSlots(availableSlots)
    };

    useEffect(() => {
    if(sessionStorage.getItem("directBooking") !== null){
      tempData = [JSON.parse(sessionStorage.getItem("directBooking")).test]
      setCartData(tempData)
    }
    else if(sessionStorage.getItem("cart") !== null){
        setCartData([JSON.parse(sessionStorage.getItem("cart")).test])
    }
    else{
      setCartData([])
    }
    }, [])

    const handleRemove = (value)=>{
        let tempCartData = cartData.filter(item=> item.id !== value)
        setCartData(tempCartData)
    }

    const fillCart = (obj)=>{
        return(
            <ListGroupItem>
            <Row className="payments-cart-data">
                <Col xs="6">{obj.testName}</Col>
                <Col xs="3">{obj.testAmount}</Col>
                <Col xs="3" ><IconButton style={{color:"#0a4275"}} onClick={()=>{handleRemove(obj.id)}}><CancelOutlined/></IconButton></Col>
            </Row>
        </ListGroupItem>
        )
    }


    const fillTotal = (obj)=>{
        const total = calculateTotal(obj)
        return<ListGroupItem>
        <Row className="total-payments-cart-data">
            <Col xs="6" style={{color:"#000"}}>TOTAL PAYABLE </Col>
            <Col xs="3">{total}</Col>
        </Row>
    </ListGroupItem>
    }

    
    return (
        <>
        <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>


        {cartData === null ? <Loading/>: cartData.length === 0 ? <Container>
          <Row>
            <Col className="mt-5">
              <h4 className="text-center">Your Cart is empty!</h4>
            </Col>
          </Row>
          </Container>:
         <Container>
             <Row className="mt-3">
                 <Col>
                 
        <div>
          {isMobile?
        <MobileStepper 
          style={{ background:"transparent"}}
          activeStep={activeStep} 
          steps={steps.length} 
          position="static" 
          nextButton={<IconButton 
                      disabled={activeStep === steps.length } 
                      onClick={handleNext}><NavigateNextIcon/></IconButton>} 
          backButton={<IconButton 
                      disabled={activeStep === 0} 
                      onClick={handleBack}><NavigateBeforeIcon/></IconButton>}>
        </MobileStepper>
      :<Stepper  
          activeStep={activeStep}>
          {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>} 
      <div>
            <div id="stepperData" style={{minHeight:"60vh"}}>
                {getStepContent(activeStep)}
            <div>
            {isMobile?<React.Fragment/>:<Row className="mt-4">
                <Col className="align-center-row">
                    <Button className="button" onClick={handleBack} > Back</Button>
                </Col>
                <Col className="align-center-row">
                <Button className="button" onClick={activeStep === steps.length - 1 ?handlePayment:handleNext}> {activeStep === steps.length - 1 ? 'Pay' : 'Proceed'}</Button>
                </Col>
            </Row>}
            
            </div>
          </div>
      </div>
    </div>


                 </Col>
             </Row>
         </Container>}
         {isMobile?<MobileMenu/>:<React.Fragment/>}
         </>

        
    )
}

