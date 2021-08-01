import React,{useState,useEffect} from 'react'
import {Container,Col,Row,Card,CardText,ListGroup,ListGroupItem,CardBody,Collapse,CardTitle,FormGroup,Label,Input,InputGroup,InputGroupAddon} from "reactstrap"
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
import axios from 'axios'
import {apiLinks} from "../../connection.config"
import { toast } from 'react-toastify'

var tempData = []

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export default function Confirm(props) {
    const [finalData,setFinalData] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps=["Fill Details","Book Slot"]
    const [currentAvailableSlots,setCurrentAvailableSlots] = useState([])
    const [selectedTimeSlot,setSelectedTimeSlot] = useState(null)
    const [contactIsValidated,setContactIsValidated] = useState(null)
    const [emailIsValidated,setEmailIsValidated] = useState(null)
    const [nameIsValidated,setNameIsValidated] = useState(null)
    const [userData,setUserData] = useState(null)

    const handleAppointmentBook = async (response,data)=>{
      try{
      if (sessionStorage.getItem("cart") === null){
        toast("Failed To Book Appointment!")
        alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
      }
      else{
        data["billDetails"].testList = JSON.parse(sessionStorage.getItem("cart"))
      }
      const bookingType = sessionStorage.getItem("bookingType")

      if(bookingType === "lab"){
        const result = await axios.post(apiLinks.bookLabAppointment,data)
        if(result.data.code === 200){
          sessionStorage.removeItem("cart")
          sessionStorage.removeItem("bookingType")
          sessionStorage.removeItem("discountedValue")
          sessionStorage.removeItem("userDetail")
          location.href = "/success"
        }
        else{
          toast("Failed To Book Appointment!")
          alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
        }
      }
      else{
        const result = await axios.post(apiLinks.bookHomeAppointment,data)
        if(result.data.code === 200){
          sessionStorage.removeItem("cart")
          sessionStorage.removeItem("bookingType")
          sessionStorage.removeItem("discountedValue")
          location.href = "/success"
        }
        else{
          toast("Failed To Book Appointment!")
          alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
        }
      }
    }catch(err){console.log(err)}
    }

    const datetoday = (date) =>{
      return date.getFullYear()+"/"+(parseInt(date.getMonth())+1)+"/"+date.getDate()
    }
    const datetimeNow = (date) =>{
       return ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes();
    }

    const handlePayment = async ()=>{
      const generateDate = (val=0)=>{
        const date = new Date(document.getElementById("slotdate").value+" "+`${selectedTimeSlot+val}:00:00`)
        var year=date.getFullYear();
        var month=date.getMonth()+1 ;
        var day=date.getDate();
        var hours = date.getHours();
        return year+"-"+month+"-"+day+"T"+hours+":00:00z"
      }

      const generatePublishedDate = (val=0)=>{
        const date = new Date(document.getElementById("slotdate").value+" "+`${selectedTimeSlot+val}:00:00`)
        return datetoday(date)+" "+datetimeNow(date)
      }

    let appointmentData = {}
    let amount = 0
    let bookingType = ""
    let discountAmount = 0
    let payableAmount = 0


    if(sessionStorage.getItem("discountedValue") == null){
      for (var i of JSON.parse(sessionStorage.getItem("cart"))){
          payableAmount +=parseFloat(i.testAmount)
      }
  }
  else{
      if(JSON.parse(sessionStorage.getItem("cart")).length === JSON.parse(sessionStorage.getItem("discountedValue")).cartLength){
          if(JSON.parse(sessionStorage.getItem("discountedValue")).discount == null){
              for (var i of JSON.parse(sessionStorage.getItem("cart"))){
                payableAmount +=parseFloat(i.testAmount)
              }    
          }
          else{
              payableAmount =parseFloat(JSON.parse(sessionStorage.getItem("discountedValue")).discount)
          }
      }
      else{
          for (var i of JSON.parse(sessionStorage.getItem("cart"))){
            payableAmount +=parseFloat(i.testAmount)
          }
      }
      
  }

    if (sessionStorage.getItem("bookingType") !== null){
      bookingType = sessionStorage.getItem("bookingType")
    }
    else{
      toast("cant proceed to pay!")
      location.href("/")
    }

    for (var i of JSON.parse(sessionStorage.getItem("cart"))){
      amount +=parseFloat(i.testAmount)
    }
    
    if(sessionStorage.getItem("discountedValue") == null){
      discountAmount = 0
    }
    else{
      discountAmount -= (amount - JSON.parse(sessionStorage.getItem("discountedValue")).discount)
    }
    if(bookingType === "lab"){
      appointmentData = {
        "slotTime":generatePublishedDate(),
        "isMember":false,
        "mobile":finalData.mobile,
        "email": finalData.email,
        "designation": finalData.designation,
        "fullName": finalData.fullName,
        "age": finalData.age,
        "gender": finalData.gender,
        "area": finalData.area,
        "city": "",
        "patientType": "IP",
        "labPatientId": "",
        "pincode": "",
        "patientId": "",
        "dob": finalData.dob,
        "passportNo": "",
        "panNumber": "",
        "aadharNumber": "",
        "insuranceNo": "",
        "nationality": "Indian",
        "ethnicity": "",
        "nationalIdentityNumber": "",
        "workerCode": "",
        "doctorCode": "",
        "isAppointmentRequest": 1,
        "startDate": generateDate(),  
        "endDate": generateDate(1),   
        "billDetails": {
            "emergencyFlag": "0",
            "totalAmount": "0",        
            "advance": amount,           //required
            "billDate": "",             //required
            "paymentType": "Razorpay",   
            "referralName": "",
            "otherReferral": "",
            "sampleId": "",
            "orderNumber": "",
            "referralIdLH": "",
            "organisationName": "",
            "additionalAmount": discountAmount,         //required
            "organizationIdLH": "249952",
            "comments": "",         //required
            "testList": [],
            "paymentList": [
                {
                    "paymentType": "Razorpay",
                    "paymentAmount": amount-discountAmount,               //required
                    "issueBank": "ICICI"
                }
            ]
        }
    }}
    else{
        appointmentData={
          "slotTime":generatePublishedDate(),
          "isMember":false,
          "mobile":finalData.mobile,
        "email": finalData.email,
        "designation": finalData.designation,
        "fullName": finalData.fullName,
        "age": finalData.age,
        "gender": finalData.gender,
        "area": finalData.area,
          "city": "",
          "patientType": "IP",
          "labPatientId": "",
          "pincode": "",
          "patientId": "",
          "dob": finalData.dob,
          "passportNo": "",
          "panNumber": "",
          "aadharNumber": "",
          "insuranceNo": "",
          "nationality": "Indian",
          "ethnicity": "",
          "nationalIdentityNumber": "",
          "workerCode": "",
          "doctorCode": "",
          "isHomecollection": 1,
          "homeCollectionDateTime": generateDate(),
          "location": "",
          "address": finalData.area,
          "billDetails": {
              "emergencyFlag": "0",
              "totalAmount": "",
              "advance": amount,  
              "billDate": "",
              "paymentType": "razorpay",
              "referralName": "",
              "otherReferral": "",
              "sampleId": "",
              "orderNumber": "",
              "referralIdLH": "",
              "organisationName": "",
              "additionalAmount": discountAmount,    //required
              "organizationIdLH": 249952,
              "comments": "", 
              "testList": [],
              "paymentList": [
                  {
                      "paymentType": "Cash",
                      "paymentAmount": amount-discountAmount, 
                      "issueBank": ""
                  }
              ]
          }
      }}


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Please Check your Internet Connection!')
			return
		}

        const response = await axios.post(apiLinks.paymentRazorpay,{"amount":payableAmount})
        const data = response.data
        const options = {
          key:"rzp_test_HfoOyFfzSafqJd",
          currency: data.currency,
          amount: data.amount.toString(),
          order_id: data.id,
          name: "APT Diagnostics",
          description: 'Thankyou For your Purchase with APT Diagnostics',
          image: '/images/bacteria.png',
          handler: (response)=>handleAppointmentBook(response,appointmentData),
          prefill: {
          name: finalData.fullName,
          email: finalData.email,
          phone_number: finalData.mobile
        },
        "theme": {
            "color": "#0a4275"
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    
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

 

    const handleNext = () => {
          
        if(nameIsValidated && document.getElementById("address").value.trim() !== "" && document.getElementById("dob").value.trim() !== "" && document.getElementById("gender").value.trim() !== "" ){
          setFinalData({
            "mobile": document.getElementById("contact").value,
            "email": document.getElementById("email").value,
            "designation": document.getElementById("prefix-name").value,
            "fullName": document.getElementById("name").value,
            "age": document.getElementById("age").value,
            "gender": document.getElementById("gender").value,
            "area": document.getElementById("address").value,
            "dob": document.getElementById("dob").value
          })
        }
        else{
          toast("required Fields are missing!")
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } 
    

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep==0?prevActiveStep:prevActiveStep - 1);
    };
  
    const handleDateTimeChange = async (date) => {
        console.log(new Date(date._d))
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
    if(sessionStorage.getItem("userDetail") !== null){
      console.log("loaded")
      const userData = JSON.parse(sessionStorage.getItem("userDetail"))
      setUserData(userData)
      document.getElementById("contact").value = userData.contact
  }

    }, [])

    return (
        <>
        <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
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
                {activeStep===0?<Card className="payment-total-card">
            <CardBody>
              <CardTitle><h5>Fill Information</h5></CardTitle>
              <Row>
                <Col>
                <FormGroup size="sm">
                        <Label for="contact">Contact ( फ़ोन नंबर ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                        <Input disabled id="contact" onChange={(event)=>{validateContact(event)}} valid={contactIsValidated} invalid={contactIsValidated=== null ? false:!contactIsValidated}  placeholder="Contact Number"></Input>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                <FormGroup size="sm">
                        <Label for="email">Email ( ईमेल )</Label>
                        <Input size="sm" id="email" onChange={(event)=>{validateEmail(event)}} valid={emailIsValidated} invalid={emailIsValidated=== null ? false:!emailIsValidated} placeholder="Email"></Input>
                    </FormGroup>
                </Col>
              </Row>
            <Row>
                <Col sm="7">
                    <FormGroup size="sm">
                        <Label for="name">Full Name ( नाम ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input  id="prefix-name" type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                        <Input  id="name"onChange={(event)=>{validateName(event)}} valid={nameIsValidated} invalid={nameIsValidated=== null ? false:!nameIsValidated} placeholder="Full Name"></Input>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col sm="5">
                    <FormGroup size="sm">
                        <Label for ="dob"> DOB ( जन्म तिथि )<span style={{color:"#ff6363"}}> *</span> </Label>
                        <Input type="date" placeholder="Select Your Date Of Birth" className="form-control-sm form-control"  id="dob"></Input>
                    
                    </FormGroup>
                </Col>
            </Row>
            
            <Row>
                <Col>
                <FormGroup>
                    <Label for="gender">Gender  (लिंग) <span style={{color:"#ff6363"}}> *</span></Label>
                    <Input  size="sm" type="select" name="select" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                    </Input>
                </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup size="sm">
                        <Label for="age">Age ( उम्र ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <Input  size="sm" id="age" placeholder="Age"></Input>
                    </FormGroup>
                </Col>
            </Row>
              <Row>
                <Col>
                    <FormGroup>
                        <Label for="address">Address  ( पता ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                        <Input  id="address" placeholder="Address"></Input>
                    </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            </CardBody>
            </Card>:<React.Fragment/>}
            {activeStep ===1?<Card>
              <CardBody>
               <CardTitle><h5>Fill Slots</h5></CardTitle>
                <Row>
                  <Col><FormGroup size="sm">
                    <Label for="slotdate">Select Date</Label>
                  <Datetime utc={true} disableClock={true} onChange={handleDateTimeChange} timeFormat={false} inputProps={{id:"slotdate",placeholder:"Select date",autocomplete:"off"}} closeOnSelect />
                  </FormGroup>
                  </Col>
                </Row>
                {currentAvailableSlots.length === 0 ?<React.Fragment/>:<Row><Col>Available Slots</Col></Row>}
                <Row>
                  {currentAvailableSlots.map(item=><Col sm="4" md="2" key={item}><Card onClick={(event)=>{disableAll(currentAvailableSlots);document.getElementById(`slot${item}`).style.background="rgba(10, 66, 117,255)";document.getElementById(`slot${item}`).style.color="#fff"; setSelectedTimeSlot(item)}} id={`slot${item}`} className="slot-card"><CardBody className="text-center">{item}:00-{item+1}:00</CardBody></Card></Col>)}
                </Row>
                </CardBody>
              </Card>:<React.Fragment/>}
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
         </Container>
         </>

        
    )
}
