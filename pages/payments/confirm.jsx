import React,{useState,useEffect} from 'react'
import {Container,Col,Row,Card,ListGroup,ListGroupItem,CardBody,CardTitle,FormGroup,Label,Input,InputGroup,InputGroupAddon} from "reactstrap"
import NavBar from "../../components/navbar.component"
import IconButton from "@material-ui/core/IconButton"
import CancelOutlined from "@material-ui/icons/CancelOutlined"
import Loading from "../../components/loading.component"
import "../../assets/css/payments.scss"
// import DateTimePicker from 'react-datetime-picker';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Button } from 'reactstrap'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from "@material-ui/core/Typography"
import MyLocationIcon from '@material-ui/icons/MyLocation';

const tempData = [{
    id:"0",
    name:"package 1",
    price:200,
},{
    id:"1",
    name:"package 2",
    price:200,
},{
    id:"2",
    name:"package 3",
    price:200,
},{
    id:"3",
    name:"package 4",
    price:200,
}]

export default function Confirm() {
    const [cartData,setCartData] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [activeStep, setActiveStep] = React.useState(0);
    const steps=["Review Your Items","Fill Details","Book Slot","Confirm Payment"]
    const [skipped, setSkipped] = React.useState(new Set());
    const isStepOptional = (step) => {
        return step === 1;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
          },(err)=>{console.log(err)});
        } else { 
          console.log("not active")
        }
      }  


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };


      function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
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
                </ListGroup>
            </CardBody>
            </Card>)
          case 1:
            return (
                <Container>
                <Row>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="fname">First Name</Label>
                            <Input id="fname" placeholder="First Name"></Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lname">Last Name</Label>
                            <Input id="lname" placeholder="Last Name"></Input>
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
                    <Col xs="4">
                        <FormGroup>
                            <Label for ="dob"> DOB </Label>
                        <Datetime disableClock={true} timeFormat={false} inputProps={{
                        placeholder:"Select Your Date Of Birth",
                        id:"dob"
                        }}/>
                        </FormGroup>
                    </Col>
                </Row>
                </Container>
            )
          case 2:
            return 'This is the bit I really care about!';
          default:
            return 'Unknown stepIndex';
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
        setCartData(tempData)
    }, [])

    const handleRemove = (value)=>{
        let tempCartData = cartData.filter(item=> item.id !== value)
        setCartData(tempCartData)
    }

    const fillCart = (obj)=>{
        return(
            <ListGroupItem>
            <Row className="payments-cart-data">
                <Col xs="6">{obj.name}</Col>
                <Col xs="3">{obj.price}</Col>
                <Col xs="3" ><IconButton style={{color:"#0a4275"}} onClick={()=>{handleRemove(obj.id)}}><CancelOutlined/></IconButton></Col>
            </Row>
        </ListGroupItem>
        )
    }

    const fillTotal = (obj)=>{
        var total =0
        obj.map(item=>total+=parseInt(item.price))
        return<ListGroupItem>
        <Row className="total-payments-cart-data">
            <Col xs="6" style={{color:"#000"}}>TOTAL PAYABLE </Col>
            <Col xs="3">{total}</Col>
        </Row>
    </ListGroupItem>
    }

    return (
        <>
        <NavBar/>


        {cartData === null ? <Loading/>:
         <Container>
             <Row className="mt-5">
                 <Col>
                 
        <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >
              All steps completed - you&apos;re finished
            </Typography>
            <Button className="button" onClick={handleReset} >
              Reset
            </Button>
          </div>
        ) : (
            <div id="stepperData">
                {getStepContent(activeStep)}
            <div>

            <Row>
                <Col className="align-center-row">
                    <Button className="button" onClick={handleBack} > Back</Button>
                </Col>
                <Col className="align-center-row">
                <Button className="button" onClick={handleNext}> {activeStep === steps.length - 1 ? 'Confirm' : 'Proceed'}</Button>
                </Col>
            </Row>
            </div>
          </div>
        )}
      </div>
    </div>


                 </Col>
             </Row>
         </Container>}
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
