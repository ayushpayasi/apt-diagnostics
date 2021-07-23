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
var tempData = []

export default function Confirm(props) {
    const [cartData,setCartData] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [activeStep, setActiveStep] = React.useState(0);
    const steps=["Fill Details","Review Your Items","Book Slot"]
    const [skipped, setSkipped] = React.useState(new Set());
    const [showCalender,setShowCalender] = useState(true);
    const [finalPrice,setFinalPrice] = useState();
    const [isOpen,setIsOpen] = useState(false)
 

    const applyCouponHandler = async()=>{
      const coupon = document.getElementById("coupon").value
      const response = await axios.get(apiLinks.priceList,{params:{coupon:coupon}})
      if (response.data[0].code == "200"){
        let list = []
        cartData.forEach(item=>list.push(item.testID))
        setCartData(response.data[1].filter((item)=>list.includes(item.testID)))
      }
    }

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
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    const handlePayment = ()=>{

    }

    const applyCoupon = ()=>{
      setCartData()
    }

    const toggle =()=>{
      setIsOpen(!isOpen)
    }

      function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (<Card className="payment-total-card">
            <CardBody>
              <CardTitle><h5>Fill Information</h5></CardTitle>
              <Row>
                <Col sm="4">
                <h7 onClick={toggle} style={{ marginBottom: '1rem',fontWeight:"500",fontSize:"0.9rem",color:"#f63636",cursor:"pointer" }}>Booking For Someone else?</h7>
                  <Collapse isOpen={isOpen}>
                  <FormGroup>
                      <Label for="savedFamilyMembers">Saved Family Members!</Label>
                      <Input type="select" name="select" id="savedFamilyMembers">
                        <option>Member 1</option>
                        <option>Member 2</option>
                        <option>Member 3</option>
                      </Input>
                    </FormGroup>
                  </Collapse>
                </Col>
              </Row>
            <Row>
                <Col sm="7">
                    <FormGroup>
                        <Label for="name">Full Name</Label>
                        <Input id="name" placeholder="Full Name"></Input>
                    </FormGroup>
                </Col>
                <Col sm="5">
                    <FormGroup>
                        <Label for ="dob"> DOB </Label>
                    <Datetime disableClock={true} timeFormat={false} inputProps={{
                    placeholder:"Select Your Date Of Birth",
                    id:"dob",
                    autocomplete:"false"
                    }}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <InputGroup>
                        <Input id="address" placeholder="Address"></Input>
                        <InputGroupAddon addonType="append">
                        <Button onClick={()=>{getLocation()}} id="locate"><MyLocationIcon/></Button>
                        </InputGroupAddon>
                    </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="select" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                    </Input>
                </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label for="age">Age</Label>
                        <Input id="age" placeholder="Age"></Input>
                    </FormGroup>
                </Col>
            </Row>
            </CardBody>
            </Card>)
          case 1:
            return (<Card className="payment-total-card">
            <CardBody>
                <CardTitle>
                <h5>Your Selected Items</h5>
                </CardTitle>
                <ListGroup flush>
                    <ListGroupItem>
                    <Row className="payments-cart-data">
                       <Col xs="6">Test/Package Name</Col>
                       <Col xs="3">Price</Col>
                       <Col xs="3">Remove</Col>
                   </Row>
                    </ListGroupItem>
                    {cartData.map(item=>fillCart(item))}
                    {fillTotal(cartData)}
                    <Row><Col></Col><Col><Row><Col md="6"><FormGroup><Label for="coupon"><h7>Got A Coupon Code?</h7></Label><Input type="text" id="coupon" placeholder="Coupon"></Input></FormGroup></Col><Col md="6" className="align-center-column"><Button onClick={()=>{applyCouponHandler()}}>Apply</Button></Col></Row></Col></Row>
                </ListGroup>
            </CardBody>
            </Card>)
          case 2:
            return (<Card>
              <CardBody>
               <CardTitle><h5>Fill Slots</h5></CardTitle>
                <Row>
                  <Col><FormGroup>
                    <Label for="slotdate">Select Date</Label>
                  <Datetime disableClock={true} timeFormat={false} inputProps={{id:"slotdate",autocomplete:"off"}} closeOnSelect />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="slotdate">Select Time Slot</Label>
                    <Datetime disableCalender={true} dateFormat={false} inputProps={{id:"slot-start-time",autocomplete:"off"}} closeOnSelect />
                  </FormGroup>
                </Col>
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
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
    
    const handleDateTimeChange = (date) => {
        setSelectedDate(date);
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

    const calculateTotal = (obj)=>{
      var total = 0
      obj.map(item=>total+=parseInt(item.testAmount))
      return total
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





{/* <Card className="submission-card">
<CardBody>
    <CardTitle>
       <h5>Fill Appointment Details</h5>
       <Row>
       <Col className="align-center-row mt-5">
           
       </Col>
       </Row>
      
    </CardTitle>
</CardBody>
</Card> */}
