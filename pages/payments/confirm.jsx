import Head from 'next/head'
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
    const [cartData,setCartData] = useState(null);
    const [finalData,setFinalData] = useState(null);
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
    const [bookingFailed,setBookingFailed] = useState(false);
    const [step1Data,setStep1Data] = useState(null);
    const [memberData,setMemberData] = useState(null);
    const [isLogin,setIsLogin] = useState(false)
    const [familyId,setFamilyId] = useState(null)
    const [userData,setUserData] = useState(null)
    const [memberDetails,setMemberDetails] = useState(null);
    const [newMemberCreate,setNewMemberCreate] = useState(false)
    const [bookingForSelf , setBookingForSelf] = useState(false)

    const handleAppointmentBook = async (response,data)=>{
      try{
      if (localStorage.getItem("cart") === null){
        toast("Failed To Book Appointment!")
        alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
      }
      else{
        data["billDetails"].testList = JSON.parse(localStorage.getItem("cart"))
      }
      const bookingType = localStorage.getItem("bookingType")

      if(bookingType === "lab"){
        const response = await axios.post(apiLinks.bookLabAppointment,data)
        if(response.data.code === 200){
          localStorage.removeItem("cart")
          localStorage.removeItem("bookingType")
          localStorage.removeItem("discountedValue")
          location.href = "/success"
        }
        else{
          toast("Failed To Book Appointment!")
          alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
        }
      }
      else{
        const response = await axios.post(apiLinks.bookHomeAppointment,data)
        if(response.data.code === 200){
          localStorage.removeItem("cart")
          localStorage.removeItem("bookingType")
          localStorage.removeItem("discountedValue")
          location.href = "/success"
        }
        else{
          toast("Failed To Book Appointment!")
          alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
        }
      }
    }catch(err){console.log(err)}
    }

    const handlerFillDetails = (event,userData)=>{
      if(event.target.value === "self"){
        let a = []
        a.push(userData)
        fillDetails(a)
        setNewMemberCreate(false)
        setBookingForSelf(true)
      }
      else if(event.target.value === "new"){
        document.getElementById("contact").value = userData.contact
        document.getElementById("email").value = userData.email  
        setNewMemberCreate(true)
        setBookingForSelf(false)
      }
      else{
      fillDetails(memberDetails.filter(item=>item.userName === event.target.value))
      setNewMemberCreate(false)
        setBookingForSelf(false)
    }
    }

    const fillDetails = (datai)=>{ 
      const data = datai[0]
      console.log(data.dob)
      document.getElementById("contact").value = userData.contact
      document.getElementById("email").value = userData.email
      document.getElementById("name").value = data.userName
      document.getElementById("gender").value = data.gender
      document.getElementById("address").value = data.address
      document.getElementById("dob").value = data.dob+""
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


    if(localStorage.getItem("discountedValue") == null){
      for (var i of JSON.parse(localStorage.getItem("cart"))){
          payableAmount +=parseFloat(i.testAmount)
      }
  }
  else{
      if(JSON.parse(localStorage.getItem("cart")).length === JSON.parse(localStorage.getItem("discountedValue")).cartLength){
          if(JSON.parse(localStorage.getItem("discountedValue")).discount == null){
              for (var i of JSON.parse(localStorage.getItem("cart"))){
                payableAmount +=parseFloat(i.testAmount)
              }    
          }
          else{
              payableAmount =parseFloat(JSON.parse(localStorage.getItem("discountedValue")).discount)
          }
      }
      else{
          for (var i of JSON.parse(localStorage.getItem("cart"))){
            payableAmount +=parseFloat(i.testAmount)
          }
      }
      
  }

    if (localStorage.getItem("bookingType") !== null){
      bookingType = localStorage.getItem("bookingType")
    }
    else{
      toast("cant proceed to pay!")
      location.href("/")
    }

    for (var i of JSON.parse(localStorage.getItem("cart"))){
      amount +=parseFloat(i.testAmount)
    }
    
    if(localStorage.getItem("discountedValue") == null){
      discountAmount = 0
    }
    else{
      discountAmount -= (amount - JSON.parse(localStorage.getItem("discountedValue")).discount)
    }
    if(bookingType === "lab"){
      if(bookingForSelf){
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
    }}else{
      appointmentData = {
        "slotTime":generatePublishedDate(),
        "isMember":true,
        "familyId":userData.familyId,
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
    }}}
    else{
      if(bookingForSelf){
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
      else{       
      appointmentData={
        "slotTime":generatePublishedDate(),
        "isMember":true,
        "familyId":userData.familyId,
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
    }}}


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
          name: userData.fullName,
          email: userData.email,
          phone_number: userData.mobile
        },
        "theme": {
            "color": "rgba(10, 66, 117,0.9)",
            "background":"rgba(10, 66, 117,0.9)",
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    
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

 

    const handleNext = () => {
        if(newMemberCreate){
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
      }
      else{
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


    const getMemberDetails = async(familyId)=>{
      try{
        const result = await axios.post(apiLinks.getMemberDetails,{familyId})
        if(result.data.code === 200){
          console.log(result.data.data)
          setMemberDetails(result.data.data)
        }
        else if (result.data.code === 202){
          setMemberDetails([])
        }
        else{
          toast("cant fetch member details!")
        }
      }
      catch(err){
        toast("cant fetch member deatils!")
      }
    }

    useEffect(() => {
    if(localStorage.getItem("directBooking") !== null){
      tempData = [JSON.parse(localStorage.getItem("directBooking")).test]
      setCartData(tempData)
    }
    else if(localStorage.getItem("cart") !== null){
        setCartData([JSON.parse(localStorage.getItem("cart")).test])
    }
    else{
      setCartData([])
    }
    if(localStorage.getItem("userDetail") !== null){
      console.log("loaded")
      const userData = JSON.parse(localStorage.getItem("userDetail"))
      setUserData(userData)
      getMemberDetails(userData.familyId)
      setIsLogin(true)
  }

    }, [])

    return (
        <>
        <Head>
          <title>Confirm Payment || APT Diagnostics</title>
        </Head>
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
                {activeStep===0?<Card className="payment-total-card">
            <CardBody>
              <CardTitle><h5>Fill Information</h5></CardTitle>
              <Row>
                <Col>
                <h6 onClick={toggle} style={{ marginBottom: '1rem',fontWeight:"500",fontSize:"0.9rem",color:"#f63636",cursor:"pointer" }}>Booking For? ( आप किसके लिए बुकिंग कर रहे हैं )</h6>
                </Col>
              </Row>
              <Row><Col>
                  <FormGroup >
                      <Label for="savedFamilyMembers">Select One Of the Following ( निम्न में से एक का चयन करें )</Label>
                      <Input size="sm" onChange={(event)=>{handlerFillDetails(event,userData)}} type="select" name="select" id="savedFamilyMembers">
                      <option value="-">-</option>
                      <option value="self">self ( अपने आप के लिए )</option>
                        {memberDetails !== null ?memberDetails.map(item=><option value={item.userName} key={item.userName}>{item.userName}</option>):<React.Fragment/>}
                        <option value="new">Create A member! ( नया व्यक्ति जोड़ें )</option>
                      </Input>
                    </FormGroup>
                </Col></Row>
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
                        <Input disabled size="sm" id="email" onChange={(event)=>{validateEmail(event)}} valid={emailIsValidated} invalid={emailIsValidated=== null ? false:!emailIsValidated} placeholder="Email"></Input>
                    </FormGroup>
                </Col>
              </Row>
            <Row>
                <Col sm="7">
                    <FormGroup size="sm">
                        <Label for="name">Full Name ( नाम ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input disabled={!newMemberCreate} id="prefix-name" type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                        <Input disabled={!newMemberCreate} id="name"onChange={(event)=>{validateName(event)}} valid={nameIsValidated} invalid={nameIsValidated=== null ? false:!nameIsValidated} placeholder="Full Name"></Input>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col sm="5">
                    <FormGroup size="sm">
                        <Label for ="dob"> DOB ( जन्म तिथि )<span style={{color:"#ff6363"}}> *</span> </Label>
                        <Input type="date" placeholder="Select Your Date Of Birth" className="form-control-sm form-control" disabled={!newMemberCreate} id="dob"></Input>
                    
                    </FormGroup>
                </Col>
            </Row>
            
            <Row>
                <Col>
                <FormGroup>
                    <Label for="gender">Gender  (लिंग) <span style={{color:"#ff6363"}}> *</span></Label>
                    <Input disabled={!newMemberCreate} size="sm" type="select" name="select" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                    </Input>
                </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup size="sm">
                        <Label for="age">Age ( उम्र ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <Input disabled={!newMemberCreate} size="sm" id="age" placeholder="Age"></Input>
                    </FormGroup>
                </Col>
            </Row>
              <Row>
                <Col>
                    <FormGroup>
                        <Label for="address">Address  ( पता ) <span style={{color:"#ff6363"}}> *</span></Label>
                        <InputGroup size="sm">
                        <Input disabled={!newMemberCreate} id="address" placeholder="Address"></Input>
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
         </Container>}
         </>

        
    )
}

// {
//   detailsContact,detailsEmail,detailsName,detailsAge,detailsGender,detailsAddress,detailsDOB
// },{
//   setDetailsAddress,setDetailsAge,setDetailsContact,setDetailsDOB,setDetailsEmail,setDetailsGender,setDetailsName
// }