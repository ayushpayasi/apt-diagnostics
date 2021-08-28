import Head from 'next/head'
import React,{useState, useEffect} from 'react';
import {Container,Col,Row,Card,CardText,ListGroup,ListGroupItem,CardBody,Collapse,CardTitle,FormGroup,Label,Input,InputGroup,InputGroupAddon, CardSubtitle} from "reactstrap"
import NavBar from "../../components/navbar.component";
import "../../assets/css/payments.scss"
import "react-datetime/css/react-datetime.css";
import { Button } from 'reactstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MobileStepper from "@material-ui/core/MobileStepper"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {useRouter} from "next/router";
import {isMobile} from "react-device-detect";
import { useHistory } from 'react-router';
import { RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import {apiLinks} from "../../connection.config";
import { toast } from 'react-toastify';

const getTestListData = async () => {
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
  return { props: {
          testList: await getTestListData()
          } 
        };
  }
  catch(err){
      console.log(err);
      return { props: {testList : []} };
  }
}


// var tempData = [];

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
    script.id = "payment-container";
		script.onload = () => {
			resolve(true);
		}
		script.onerror = () => {
			resolve(false);
		}
		document.body.appendChild(script);
	});
};

export default function Confirm(props) {


  const testList = props.testList;
  const steps = ["Fill Details", "Book Slot"];

  const [activeStep, setActiveStep] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [radioVal, setRadioVal] = useState('paynow');
  const [couponCode, setCouponCode] = useState('');
  const [finalCoupon, setFinalCoupon] = useState('');

  const [currentAvailableSlots, setCurrentAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [today, setToday] = useState('');

  const [appointDate, setAppointDate] = useState('');
  const [contactIsValidated, setContactIsValidated] = useState(null);
  const [emailIsValidated, setEmailIsValidated] = useState(null);
  const [nameIsValidated, setNameIsValidated] = useState(null);

  const [userData, setUserData] = useState(null);

  const [finalData, setFinalData] = useState(null);

  const showToast = async (message, error=1) => {
    if(error){
      toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
      });
    }  
    else{
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }

  const updatePayment = () => {
    setShowPayment(true);
  }

  // const success = () => {
  //   history.push('/success');
  //   console.log("hello");
  // }

  const handleAppointmentBook = async (response, data, paymentType, supportingData) => {
    // console.log(response);
    // console.log(data);
    try{
      // if (localStorage.getItem("cart") === null){
      //   toast("Failed To Book Appointment!")
      //   alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
      // }
      // else{
      //   data["billDetails"].testList = JSON.parse(localStorage.getItem("cart"))
      // }
      // let bookingData = {};
      // if(sessionStorage.getItem("directBooking") !== null){
      //   bookingData = JSON.parse(sessionStorage.getItem("directBooking"));
      //   const testDetails = testList.find(test => test.testID === bookingData.test);
      //   data['billDetails'].testList.push(testDetails);
      // }
      // else{
      //   toast("Failed To Book Appointment!");
      //   alert(`If payment is deducted, Please note your appointment Id ${response.razorpay_order_id} and contact APTDiagnostics for help!`);
      //   return;
      // }
      // console.log(data);
      // console.log(supportingData);
      const bookingType = supportingData.bookingType;
      // console.log(typeof(data));
      // console.log(data);

      if(bookingType === "lab"){
        // console.log("LAB APPOINTMENT---------------");
        const result = await axios.post(apiLinks.bookLabAppointment, {data, supportingData});
        // console.log("received data--------------");
        // console.log(result.data);
        if(result.data.code === 200){
          sessionStorage.removeItem("directBooking");
          // localStorage.removeItem("cart")
          // localStorage.removeItem("discountedValue")
          // localStorage.removeItem("userDetail")
          showToast("Booking successfully done!", 0);

          // success();
          // location.href = "/success";
        }
        else{
          showToast("Failed To Book Appointment!");
          if(paymentType === "paynow")
            alert(`If payment is deducted, Please note your appointment Id ${response.razorpay_order_id} and contact APTDiagnostics for help!`);
        // alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
          throw result.data;
        }
      }
      else{
        const result = await axios.post(apiLinks.bookHomeAppointment, {data, supportingData})
        if(result.data.code === 200){
          sessionStorage.removeItem("directBooking");
          // localStorage.removeItem("cart")
          // localStorage.removeItem("bookingType")
          // localStorage.removeItem("discountedValue")
          showToast("Booking successfully done!", 0);
          () => {location.href("/")};
          // location.href = "/success"
        }
        else{
          showToast("Failed To Book Appointment!");
          if(paymentType === "paynow")
            alert(`If payment is deducted, Please note your appointment Id ${response.razorpay_order_id} and contact APTDiagnostics for help!`);
        // alert(`If payment is deducted ,Please note your appointment Id ${response.razorpay_order_id} and contact aptDiagnostics for help!`)
          throw result.data;
        }
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const datetoday = (date) =>{
    return date.getFullYear()+"/"+(parseInt(date.getMonth())+1)+"/"+date.getDate()
  }
  const datetimeNow = (date) =>{
      return ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes();
  }

  const handlePayment = async () => {

    try{
        const generateDate = (val = 0) => {
          const date = new Date(document.getElementById("appointment-date").value+" "+`${selectedTimeSlot+val}:00:00`);
          const year = date.getFullYear();
          let month = date.getMonth()+1 ;
          let day = date.getDate();
          let hours = date.getHours();
          if(month < 10) month = `0${month}`;
          if(day < 10) day = `0${day}`;
          if(hours < 10) hours = `0${hours}`;
          return year+"-"+month+"-"+day+"T"+hours+":00:00Z";
        }
    
        const generateTime = (val = 0) => {
          const date = new Date(document.getElementById("appointment-date").value+" "+`${selectedTimeSlot+val}:00:00`);
          return datetoday(date)+" "+datetimeNow(date);
        }
    
        let appointmentData = {};
        let amount = 0;
        let bookingType = "";
        let discountAmount = 0;
        let payableAmount = 0;
        let testName = '';
        let testCode = '';
        let testID = '';
        let testDetails = {};
        let paymentType = '';
        let coupon = '';
        let labData = {};
    
        if(sessionStorage.getItem("paymentDetails") !== null){
          const payDetails = JSON.parse(sessionStorage.getItem("paymentDetails"));
          paymentType = payDetails.type;
          coupon = payDetails.finalCoupon;
          discountAmount = parseFloat(payDetails.discountAmount);
          sessionStorage.removeItem("paymentDetails");
        }
        else{
          throw {message: "Couldn't find the payment mode, please try again", code: 404};
        }
    
        // if(localStorage.getItem("discountedValue") === null){
        //   for (var i of JSON.parse(localStorage.getItem("cart"))){
        //       payableAmount +=parseFloat(i.testAmount);
        //   }
        // }
        // else{
        // if(JSON.parse(localStorage.getItem("cart")).length === JSON.parse(localStorage.getItem("discountedValue")).cartLength){
        //     if(JSON.parse(localStorage.getItem("discountedValue")).discount == null){
        //         for (var i of JSON.parse(localStorage.getItem("cart"))){
        //           payableAmount +=parseFloat(i.testAmount)
        //         }    
        //     }
        //     else{
        //         payableAmount =parseFloat(JSON.parse(localStorage.getItem("discountedValue")).discount)
        //     }
        // }
        // else{
        //     for (var i of JSON.parse(localStorage.getItem("cart"))){
        //       payableAmount +=parseFloat(i.testAmount)
        //     }
        // }
        // }
    
        if (sessionStorage.getItem("directBooking") !== null){
          const bookingData = JSON.parse(sessionStorage.getItem("directBooking"));    
    
          bookingType = bookingData.appointmentType;
          testDetails = bookingData.test;
          testName = bookingData.test.testName;
          testCode = bookingData.test.testCode;
          testID = bookingData.test.testID;
          amount = parseFloat(bookingData.test.testAmount);
          // console.log(amount, discountAmount);
          // console.log(typeof(amount), typeof(discountAmount));
          payableAmount = amount - discountAmount;
          // console.log(payableAmount);
        }
        else{
          throw {message: "Booking details not found, please try again!", code: 404};
        }
    
        // for (var i of JSON.parse(localStorage.getItem("cart"))){
        //   amount +=parseFloat(i.testAmount)
        // }
        
        // if(localStorage.getItem("discountedValue") == null){
        //   discountAmount = 0
        // }
        // else{
        //   discountAmount -= (amount - JSON.parse(localStorage.getItem("discountedValue")).discount)
        // }
        // console.log(finalData);
        // console.log(paymentType);

        if(bookingType === "lab"){
          labData = {
            "mobile": finalData.mobile,
            "email": finalData.email,
            "designation": finalData.designation,
            "fullName": finalData.fullname,
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
              "totalAmount": paymentType === "paynow" ? payableAmount.toString() : "0",
              "advance": paymentType === "paynow" ? payableAmount.toString() : "0",
              "billDate": "",
              "paymentType": paymentType === "paynow" ? "RazorPay" : "Cash",
              "referralName": "",
              "otherReferral": "",
              "sampleId": "",
              "orderNumber": "",
              "organisationName": "",
              "additionalAmount": (-discountAmount).toString(),
              "organizationIdLH": 249952,
              "referralIdLH": "",
              "comments": "Patient Lab Registration",
              "testList": [
                {
                    "testID": testID,
                    "testCode": testCode.toString(),
                    "integrationCode": "",
                    "dictionaryId": ""
                }
              ],
              "paymentList": [
                {
                    "paymentType": paymentType === "paynow" ? "RazorPay" : "Cash",
                    "paymentAmount": paymentType === "paynow" ? payableAmount.toString() : "0",
                    "issueBank": paymentType === "paynow" ? "ICICI" : "SELF"
                }
              ]
            }
          };
        }

        else{
          labData = {
            "mobile": finalData.mobile,
            "email": finalData.email,
            "designation": finalData.designation,
            "fullName": finalData.fullname,
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
              "totalAmount": paymentType === "paynow" ? payableAmount.toString() : "0",
              "advance": paymentType === "paynow" ? payableAmount.toString() : "0",
              "billDate": "",
              "paymentType": paymentType === "paynow" ? "RazorPay" : "Cash",
              "referralName": "",
              "otherReferral": "",
              "sampleId": "",
              "orderNumber": "",
              "organisationName": "",
              "additionalAmount": (-discountAmount).toString(),
              "organizationIdLH": 249952,
              "referralIdLH": "",
              "comments": "Patient Home Registration",
              "testList": [
                {
                    "testID": testID,
                    "testCode": testCode.toString(),
                    "integrationCode": "",
                    "dictionaryId": ""
                }
              ],
              "paymentList": [
                {
                    "paymentType": paymentType === "paynow" ? "RazorPay" : "Cash",
                    "paymentAmount":paymentType === "paynow" ? payableAmount.toString() : "0",
                    "issueBank": paymentType === "paynow" ? "ICICI" : "SELF"
                }
              ]
            }
          };
        }

        const supportingData = {
          "slotTime": generateTime(),
          "slotDate": generateDate(),
          "isMember": false,
          "familyId": null,
          "fullName": finalData.fullname,
          "email": finalData.email,
          "dob": finalData.dob,
          "area": finalData.area,
          "gender": finalData.gender,
          "mobile": finalData.mobile,
          bookingType
        };

        // console.log(labData);

        // if(bookingType === "lab"){
        //   appointmentData = {
        //     "slotTime": generateTime(),
        //     "isMember": false,
        //     "familyId": null,
        //     "mobile": finalData.mobile,
        //     "email": finalData.email,
        //     "designation": finalData.designation,
        //     "fullName": finalData.fullname,
        //     "age": parseInt(finalData.age),
        //     "gender": finalData.gender,
        //     "area": finalData.area,
        //     "city": "",
        //     "patientType": "IP",
        //     "labPatientId": "",
        //     "pincode": "",
        //     "patientId": "",
        //     "dob": finalData.dob,
        //     "passportNo": "",
        //     "panNumber": "",
        //     "aadharNumber": "",
        //     "insuranceNo": "",
        //     "nationality": "Indian",
        //     "ethnicity": "",
        //     "nationalIdentityNumber": "",
        //     "workerCode": "",
        //     "doctorCode": "",
        //     "isAppointmentRequest": 1,
        //     "startDate": generateDate(),  
        //     "endDate": generateDate(1),   
        //     "billDetails": {
        //         "emergencyFlag": "0",
        //         "totalAmount": `${payableAmount}`,        
        //         "advance": paymentType === 'paylater' ? "0" : `${payableAmount}`,           //required
        //         "billDate": "",             //required 
        //         "referralName": "",
        //         "otherReferral": "",
        //         "sampleId": "",
        //         "orderNumber": "",
        //         "referralIdLH": "",
        //         "organisationName": "",
        //         "additionalAmount": `${discountAmount}`,         //required
        //         "organizationIdLH": 249952,
        //         "comments": "New Patient Booking Registration",         //required
        //         "testList": [
        //           {
        //             "testID": `${testID}`,
        //             "testCode": testCode,
        //             "integrationCode": "",
        //             "dictionaryId": ""
        //           }
        //         ],
        //         "paymentList": [
        //             {
        //                 "paymentType": paymentType === 'paylater' ? "Cash" : "Razorpay",
        //                 "paymentAmount": `${payableAmount}`,               //required
        //                 "issueBank": paymentType === 'paylater' ? "" : "ICICI"
        //             }
        //         ]
        //     }
        //   }
        // }
    
        // else{
        //   appointmentData = {
        //     "slotTime":generateTime(),
        //     "isMember":false,
        //     "familyId": null,
        //     "mobile": finalData.mobile,
        //     "email": finalData.email,
        //     "designation": finalData.designation,
        //     "fullName": finalData.fullName,
        //     "age": finalData.age,
        //     "gender": finalData.gender,
        //     "area": finalData.area,
        //     "city": "",
        //     "patientType": "IP",
        //     "labPatientId": "",
        //     "pincode": "",
        //     "patientId": "",
        //     "dob": finalData.dob,
        //     "passportNo": "",
        //     "panNumber": "",
        //     "aadharNumber": "",
        //     "insuranceNo": "",
        //     "nationality": "Indian",
        //     "ethnicity": "",
        //     "nationalIdentityNumber": "",
        //     "workerCode": "",
        //     "doctorCode": "",
        //     "isHomecollection": 1,
        //     "type": bookingType,
        //     "homeCollectionDateTime": generateDate(),
        //     "location": "",
        //     "address": finalData.area,
        //     "billDetails": {
        //       "emergencyFlag": "0",
        //       "totalAmount": amount,
        //       "advance": amount,  
        //       "billDate": (new Date()),
        //       "paymentType": "Razorpay",
        //       "referralName": "",
        //       "otherReferral": "",
        //       "sampleId": "",
        //       "orderNumber": "",
        //       "referralIdLH": "",
        //       "organisationName": "",
        //       "additionalAmount": discountAmount,    //required
        //       "organizationIdLH": 249952,
        //       "comments": "", 
        //       "testList": [
        //         testDetails
        //       ],
        //       "paymentList": [
        //           {
        //             "paymentType": "Cash",
        //             "paymentAmount": amount-discountAmount, 
        //             "issueBank": ""
        //           }
        //       ]
        //     }
        //   }
        // }
        // console.log(labData);

        if(paymentType === "paylater"){
          handleAppointmentBook(null, labData, paymentType, supportingData);
        }
        else{
          const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      
          if (!res) {
            // alert('Please Check your Internet Connection!');
            // return;
            throw {code: 500, message: "Please Check your Internet Connection!"};
          }
          // console.log(appointmentData);
      
          const response = await axios.post(apiLinks.paymentRazorpay, {"amount" : payableAmount});
          const data = response.data;
      
          console.log(data);
      
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: "APT Diagnostics",
            description: 'Thank you For your Purchase with APT Diagnostics',
            image: '/images/logotype2.jpg',
            handler: (response) => handleAppointmentBook(response, labData, paymentType, supportingData),
            prefill: {
              name: finalData.fullName,
              email: finalData.email,
              phone_number: finalData.mobile
            },
            theme: {
                "color": "#0a4275"
            }
          }
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
    
    }
    catch(err){
      console.log(err);
      showToast(err.message);
    }
  }

  const disableAll = (obj)=>{
    for(var i of obj){
      document.getElementById(`slot${i.key}`).style.background = "white"
      document.getElementById(`slot${i.key}`).style.color = "#000"
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

  const handleNext = () => { 
    if( document.getElementById("name").value && 
        document.getElementById("address").value && 
        document.getElementById("dob").value && 
        document.getElementById("gender").value && 
        document.getElementById("age").value && 
        document.getElementById("prefix-name").value ){
          setFinalData({
            mobile:       document.getElementById("contact").value,
            email:        document.getElementById("email").value,
            designation:  document.getElementById("prefix-name").value,
            fullname:     document.getElementById("name").value,
            age:          document.getElementById("age").value,
            gender:       document.getElementById("gender").value,
            area:         document.getElementById("address").value,
            dob:          document.getElementById("dob").value
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else{
      showToast("Required Fields are missing!");
    }
  } 
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep == 0 ? prevActiveStep : prevActiveStep - 1);
    setEmailIsValidated(null);
    setNameIsValidated(null);
    setSelectedTimeSlot(null);
  };

  const handleDateTimeChange = async () => {
    try{
      const date = document.getElementById("appointment-date").value;
      setAppointDate(date);
      const result = await axios.get(apiLinks.availableSlots, {params: {"slot" : date}});
      const fleboResult = await axios.get(apiLinks.getFlebo);
      const slotsKey = {slot1:7, slot2:8, slot3:9, slot4:10, slot5:11, slot6:12, slot7:13, slot8:14,
                        slot9:15, slot10:16, slot11:17, slot12:18, slot13:19, slot14:20, slot15:21};
      let availableSlots = [];
      
      let DATE = new Date();
      let currentDate = DATE.getDate();
      let currentHour = DATE.getHours();
      let formDate = date.split("-");
      formDate = parseInt(formDate[2]);

      for (let key of Object.keys(result.data)){
        if(key === undefined || key === null) { console.log('key is null or undefined') }
        else if(currentDate === formDate && result.data[key] < parseInt(fleboResult.data.flebo)){
          if(currentHour < slotsKey[key]){
            availableSlots.push({ key: slotsKey[key] });
          }
        }
        else if(result.data[key] < parseInt(fleboResult.data.flebo)){
          availableSlots.push({ key: slotsKey[key] });
        }
      }
      setCurrentAvailableSlots(availableSlots);

    }
    catch(err){
      console.log(err);
      setCurrentAvailableSlots([]);
      showToast('Something went wrong, please try again');
    }
  };

  const verifyCoupon = async () => {
    // setFinalCoupon(couponCode); showToast(`"${couponCode}" code applied Successfully!`
    try{
      // console.log(couponCode);
      if(couponCode === '' || couponCode === null){
        throw {message: "Please enter coupon code", code: 404};
      }
      const result = await axios.get(apiLinks.applyCoupon, {params: {coupon: couponCode}});
      // console.log(result.data);
      if(result.data.code === 200){
        sessionStorage.setItem("discountedPrice", result.data.discount);
        showToast(result.data.message, 0);
        setFinalCoupon(couponCode);
      }
      else{
        setCouponCode('');
        setFinalCoupon('');
        sessionStorage.setItem("discountedPrice", 0);
        throw result.data;
      }
    }
    catch(err){
      showToast(err.message);
    }
  }

  const getContact = () => {
    try{
      const result = sessionStorage.getItem("directBooking");
      if(result === null)
        throw 404;
      return(JSON.parse(sessionStorage.getItem('directBooking')).contact);
    }
    catch(err){
      showToast('Something went wrong, couldn\'t find contact number');
      return null;
    }
  }

  const handlePaymentTypeCoupon = () => {
    try{
      setShowPayment(false);
      let discountAmount = 0;
      if(sessionStorage.getItem("discountedPrice") !== null){
        discountAmount = JSON.parse(sessionStorage.getItem("discountedPrice"));
        sessionStorage.removeItem("discountedPrice");
      }
      const paymentDetails = JSON.stringify({
        type: radioVal,
        finalCoupon,
        discountAmount
      });
      sessionStorage.setItem('paymentDetails', paymentDetails);
      handlePayment();
    }
    catch(err){
      showToast(err);
    }
  }

  useEffect(() => {
    const today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let year = today.getFullYear();
    if(month < 10)
      month = '0' + month.toString();
    if(date < 10)
      date = '0' + date.toString();
    
    const minDate = year + '-' + month + '-' + date;

    setToday(minDate);

    if(sessionStorage.getItem("directBooking") !== null){
      console.log("loaded");
      const userData = JSON.parse(sessionStorage.getItem("directBooking"));
      setUserData(userData);
      document.getElementById("contact").innerText = userData.contact;
    }

  }, []);

    return (
        <>
          <Head>
            <title>Confirm Payment || APT Diagnostics</title>
          </Head>
          <NavBar testList={testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>

          {showPayment &&
            <div className="show-payment-container">
              <Card className="payment-box">
                <CardBody>
                  <div className='verify-cancel-button'> 
                      <span style={{cursor: 'pointer'}} onClick={() => {setRadioVal(null); setShowPayment(false); sessionStorage.removeItem('paymentDetails');}}>
                        <CancelIcon />
                      </span> 
                  </div>
                  <Row>
                    <Col>
                        <h4 className="text-center mt-1">Select Payment Type</h4>
                    </Col>
                  </Row>

                    <RadioGroup className="mt-3" value={radioVal} onChange={event => setRadioVal(event.target.value)}>
                      <Row>
                        <Col style={{textAlign: "right"}}>
                          <FormControlLabel
                            value="paynow"
                            control={ <Radio /> }
                            style={{textAlign:"center",color:"#0a4275"}}
                            label="Pay Now"
                            name="payment-type"
                            labelPlacement="end"
                          />
                        </Col>
                        <Col>
                          <FormControlLabel
                            value="paylater"
                            control={ <Radio /> }
                            style={{textAlign:"center",color:"#0a4275",fontWeight:"700"}}
                            label="Pay Later"
                            name="payment-type"
                            labelPlacement="end"
                          />
                        </Col>
                      </Row>
                    </RadioGroup>

                  <Row className="mb-4">
                    <Col xs="8" className="pt-2">
                      <TextField label="Add Coupon Code" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="Add Coupon Code" 
                        title='Add Coupon Code' size="small" variant="outlined" />
                    </Col>
                    <Col xs="4" className="pt-2" style={{textAlign: "center"}}>
                      <Button variant="contained" style={{ color:"#fff", background:"#175d9c", borderRadius: '5px'}}
                        onClick={verifyCoupon}
                      >
                        Apply 
                      </Button>
                    </Col>
                  </Row>
                  
                  <Row className="mt-2" >
                    <Col style={{textAlign: "center"}}>
                      <Button onClick={handlePaymentTypeCoupon} 
                        variant="contained" style={{width:"100%", height : "45px", color:"#fff",background:"#175d9c", borderRadius: '5px'}}>
                          Book Now
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          }

          <Container>
            <Row className="mt-3">
              <Col>
                <div>
                  {/* { isMobile ?
                    <MobileStepper 
                      style={{ background:"transparent"}}
                      activeStep={activeStep} 
                      steps={steps.length} 
                      position="static" 
                      nextButton={<IconButton disabled={ activeStep === steps.length } 
                                    onClick={handleNext}>
                                    <NavigateNextIcon/>
                                  </IconButton>} 
                      backButton={<IconButton disabled={activeStep === 0} 
                                    onClick={handleBack}>
                                    <NavigateBeforeIcon/>
                                  </IconButton>}>
                    </MobileStepper> : 
                    <Stepper  
                      activeStep={activeStep}>
                      {steps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper> }  */}

                    <Stepper  
                      activeStep={activeStep}>
                      {steps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>

                    <div className="form-container">
                      <div id="stepperData" style={{minHeight:"60vh"}}>
                        {activeStep === 0 ? 
                          <Card className="payment-total-card">
                            <CardBody>
                              <CardTitle><h5>Fill Information</h5></CardTitle>

                              <Row>
                                <Col sm="6" xs="12">
                                  <FormGroup size="sm">
                                    <Label for="contact">Contact ( फ़ोन नंबर ) <span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                                      <Input disabled id="contact" value={getContact()} placeholder="Contact Number" />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col>
                                  <FormGroup>
                                    <Label for="email">Email ( ईमेल )</Label>
                                    <Input bsSize="sm" id="email" onChange={(event)=>{validateEmail(event)}}
                                      invalid={emailIsValidated === null ? false : !emailIsValidated} 
                                      placeholder="Email" />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col sm="7">
                                  <FormGroup bsSize="sm">
                                    <Label for="name">Full Name ( नाम ) <span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup bsSize="sm">
                                      <InputGroupAddon addonType="prepend">
                                        <Input  id="prefix-name" type="select" bsSize="sm" >
                                          <option>Mr</option>
                                          <option>Mrs</option>
                                          <option>Master</option>
                                          <option>Miss</option>
                                          <option>Dr</option>
                                        </Input>
                                      </InputGroupAddon>
                                      <Input bsSize="sm" id="name" onChange={(event)=>{validateName(event)}} 
                                        invalid={nameIsValidated === null ? false : !nameIsValidated} 
                                        placeholder="Full Name" />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col sm="5">
                                  <FormGroup bsSize="sm">
                                      <Label for ="dob"> DOB ( जन्म तिथि )<span style={{color:"#ff6363"}}> *</span> </Label>
                                      <Input type="date" placeholder="Select Your Date Of Birth" max={today}
                                        className="form-control-sm form-control" id="dob" />
                                  </FormGroup>
                                </Col>
                              </Row>
                
                              <Row>
                                <Col>
                                  <FormGroup>
                                      <Label for="gender">Gender  (लिंग) <span style={{color:"#ff6363"}}> *</span></Label>
                                      <Input  bsSize="sm" type="select" name="select" id="gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                      </Input>
                                  </FormGroup>
                                </Col>
                                <Col>
                                  <FormGroup bsSize="sm">
                                    <Label for="age">Age ( उम्र ) <span style={{color:"#ff6363"}}> *</span></Label>
                                    <Input  bsSize="sm" id="age" placeholder="Age" />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                    <FormGroup>
                                      <Label for="address">Address  ( पता ) <span style={{color:"#ff6363"}}> *</span></Label>
                                      <InputGroup bsSize="sm">
                                        <Input  id="address" placeholder="Address" />
                                      </InputGroup>
                                    </FormGroup>
                                </Col>
                              </Row>

                            </CardBody>
                          </Card> : <React.Fragment/>
                        }
                        {activeStep === 1 ? 
                          <Card>
                            <CardBody>
                              <CardTitle style={{textAlign: 'center'}}><h4>Fill Slots</h4></CardTitle>
                                
                              <Row>
                                <Col>
                                  <FormGroup bsSize="sm">
                                    <Label for="appointment-date">Select Date</Label>
                                      <Input type="date" placeholder="Select Your Appointment Date" 
                                        min={today} onChange={handleDateTimeChange} value={appointDate}
                                        className="form-control-sm form-control" id="appointment-date" 
                                      />
                                  </FormGroup>
                                </Col>
                              </Row>
                              {currentAvailableSlots.length === 0 ? 
                                document.getElementById("appointment-date") === null || document.getElementById("appointment-date").value === null 
                                ? <React.Fragment/> : 
                                  <Row>
                                    <Col style={{color: "red", textAlign: 'center'}}>All Slots are already booked!</Col>
                                  </Row>  
                                :
                                <Row className="mt-2 mb-2">
                                  <Col>Available Slots</Col>
                                </Row>
                              }
                              
                              <Row>
                                {currentAvailableSlots.length !== 0 && currentAvailableSlots.map(item => 
                                  <Col xs="6" sm="4" md="3" key={item.key}>
                                    <Card 
                                        id={`slot${item.key}`} className="slot-card"
                                        onClick={() => { 
                                                        disableAll(currentAvailableSlots);
                                                        document.getElementById(`slot${item.key}`).style.background="rgba(10, 66, 117,255)";
                                                        document.getElementById(`slot${item.key}`).style.color="#fff"; 
                                                        setSelectedTimeSlot(item.key)
                                                      }
                                                  }
                                    >
                                      <CardBody className="text-center">
                                        <CardText>{item.key}:00 - {(item.key)+1}:00</CardText>
                                      </CardBody>
                                    </Card>
                                  </Col>)
                                }
                              </Row>
                            </CardBody>
                          </Card> : <React.Fragment/>
                        }
                        <div style={{overflow: "hidden"}}>
                          <Row className="mt-4">
                            <Col className="align-center-row">
                                <Button className="button quickconfirm-button" 
                                  onClick={handleBack} disabled={activeStep === 0} > Back</Button>
                            </Col>
                            <Col className="align-center-row">
                              <Button className="button quickconfirm-button" 
                                onClick={activeStep === steps.length - 1 ? updatePayment : handleNext } disabled={activeStep === steps.length - 1 && !selectedTimeSlot}> 
                                {activeStep === steps.length - 1 ? 'Pay' : 'Proceed'}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            <Row className="mt-5 mb-5 pb-5"></Row>
          </Container>
        </>

        
    )
}
