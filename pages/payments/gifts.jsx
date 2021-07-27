import React,{useState} from 'react'
import Navigation from '../../components/navbar.component'
import OtpVerify from "../../components/otpverify.component"
import axios from "axios"
import {apiLinks} from "../../connection.config"
import { Container,Button,Row,Col,Card,CardTitle,CardBody,FormGroup,Input,Label,InputGroup,InputGroupAddon ,InputGroupButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap'
import "../../assets/css/gift_test.scss"
import { toast } from 'react-toastify'

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




export default function Gifts(props) {
    const [contactNumberValid,setContactNumberValid] = useState(null)
    const [verified,setVerified] = useState(false)
    const [otpWindow,setOtpWindow] = useState(false)
    const [doneeCard,setDoneeCard] = useState(false)
    const [doneeContactNumberValid,setDoneeContactNumberValid] = useState(null)
    const [doneeName,setDoneeName] = useState(null)
    const [donorName,setDonorName] = useState(null)
    const [doneeEmail,setDoneeEmail] = useState(null)
    const [donorEmail,setDonorEmail] = useState(null)

    

    const handleInputChange = (event)=>{
    var a = /^\d{10}$/;  
      if (a.test(event.target.value)){
        setContactNumberValid(true)
      }   
      else{
        setContactNumberValid(false)
      }
    }
    const handleInputChange2 =(event)=>{
        var a = /^\d{10}$/;  
        if (a.test(event.target.value)){
          setDoneeContactNumberValid(true)
        }   
        else{
          setDoneeContactNumberValid(false)
        } 
    }
    const validateDoneeName = (event)=>{
        var regName = /^[a-zA-Z]+ [a-zA-Z]+/;
        var name = event.target.value;
        setDoneeName(regName.test(name))
    }
    const validateDonorName = (event)=>{
        var regName = /^[a-zA-Z]+ [a-zA-Z]+/;
        var name = event.target.value;
        setDonorName(regName.test(name))
    }
    const validateDonorEmail = (event)=>{
        setDonorEmail(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value))
    }
    const validateDoneeEmail = (event)=>{
        setDoneeEmail(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value))
    }
    



    const verifyAndProceed =()=>{
        if(verified){
            setDoneeCard(true)
        }
    }

    const HandleCallBack = async (response,donor_name,donor_email,donor_contact,donee_contact,donee_email,donee_name,amount,giftedTestList)=>{
        try{
        console.log(response)
        const generateRandomString = (length=12)=>Math.random().toString(20).substr(2, length)
        const couponCode = generateRandomString()
        const result = await axios.post(apiLinks.confirmGiftPayment,
            {
                userName:donor_name,
                userEmail:donor_email,
                userContact:donor_contact,
                recieverName:donee_name,
                recieverContact:donee_contact,
                recieverEmail:donee_email,
                couponCode,
                couponAmount:amount,
                giftedTestList
            })
        if(result.data.code === 200){
            sessionStorage.setItem("couponCode",couponCode)
            sessionStorage.setItem("cart",JSON.stringify([]))
            sessionStorage.setItem("cart",JSON.stringify([]))
            location.href="/gifts/success"
        }
        else{
            toast("payment failed!")
        }}catch(err){console.log(err)}
    }

    const proceedToPay = async ()=>{
        if(doneeName && doneeEmail && donorName && donorEmail && contactNumberValid && doneeContactNumberValid){
        }else{
            toast("Mandatory Fileds are missing!")
            return
        }

        const donor_name = document.getElementById("donor_name").value
        const donor_email = document.getElementById("donor_email").value
        const donor_contact = document.getElementById("donor_contact").value
        const donee_contact = document.getElementById("donee_contact").value
        const donee_email = document.getElementById("donee_email").value
        const donee_name = document.getElementById("donee_name").value
        const gift_message = document.getElementById("donee_message").value
        let amount = 0
        let giftedTestList = []
        console.log(sessionStorage.getItem("discountedValue"))
        if(sessionStorage.getItem("discountedValue") == null){
            for (var i of JSON.parse(sessionStorage.getItem("cart"))){
                amount +=parseFloat(i.testAmount)
                giftedTestList.push(i.testID)
            }
        }
        else{
            if(JSON.parse(sessionStorage.getItem("cart")).length === JSON.parse(sessionStorage.getItem("discountedValue")).cartLength){
                if(JSON.parse(sessionStorage.getItem("discountedValue")).discount == null){
                    for (var i of JSON.parse(sessionStorage.getItem("cart"))){
                        amount +=parseFloat(i.testAmount)
                        giftedTestList.push(i.testID)
                    }    
                }
                else{
                    for (var i of JSON.parse(sessionStorage.getItem("cart"))){
                        giftedTestList.push(i.testID)
                    }
                    amount =parseFloat(JSON.parse(sessionStorage.getItem("discountedValue")).discount)
                }
            }
            else{
                for (var i of JSON.parse(sessionStorage.getItem("cart"))){
                    amount +=parseFloat(i.testAmount)
                    giftedTestList.push(i.testID)
                }
            }
            
        }
        

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Please Check your Internet Connection!')
			return
		}

        const response = await axios.post(apiLinks.paymentRazorpay,{amount})
        const data = response.data
        console.log(response.data)

        const options = {
			key:"rzp_test_9bojDOyI4haZxv",
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: "APT Diagnostics",
			description: 'Thankyou For your Purchase with APT Diagnostics',
			image: '/images/bacteria.png',
			handler: (response)=>HandleCallBack(response,donor_name,donor_email,donor_contact,donee_contact,donee_email,donee_name,data.amount.toString(),giftedTestList),
			prefill: {
				name: donor_name,
				email: donor_email,
				phone_number: donor_contact
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()

    }

    return (
        <>
        {otpWindow?<OtpVerify  verified={setVerified} setOtpWindow={setOtpWindow} />:<React.Fragment/>}
        <Navigation updateCartValue={props.updateCartValue} />
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col md="6">
                    <Card className="gift_tests_cards">
                        <CardBody>
                            <CardTitle><h4>Enter Your Details</h4></CardTitle>
                                <FormGroup>
                                    <Label for="donor_contact"> Contact Number<span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup size="sm">
                                        <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                                        <Input size="sm" id="donor_contact"  onChange={(event)=>{handleInputChange(event)}} valid={contactNumberValid} invalid={contactNumberValid=== null ? false:!contactNumberValid} placeholder=""></Input>
                                    </InputGroup>
                                </FormGroup>
                                <Row>
                                {verified?<Col style={{color:"green"}}><p>Verified</p></Col>:<Col style={{color:"red"}}><p>Not Verified</p></Col>}
                                <Col><Button disabled={verified} onClick={()=>{setOtpWindow(true)}} outline size="sm">Verify</Button></Col>
                                </Row>
                                
                                <FormGroup>
                                    <Label for="donor_name">Name<span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input disabled={!verified} type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                                        <Input disabled={!verified} size="sm" onChange={(event)=>{validateDonorName(event)}} id="donor_name" valid={donorName} invalid={donorName=== null ? false:!donorName}  placeholder="Name"></Input>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="donor_email">Email</Label>
                                        <Input onChange={(event)=>{validateDonorEmail(event)}} disabled={!verified} size="sm" id="donor_email" valid={donorEmail} invalid={donorEmail=== null ? false:!donorEmail}  placeholder="Email"></Input>
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <Button outline onClick={()=>{location.href="/cart"}}>Return To Cart</Button>
                                    </Col>
                                    <Col className="text-right">
                                        <Button outline onClick={()=>{verifyAndProceed()}}>Proceed</Button>
                                    </Col>
                                </Row>

                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className="gift_tests_cards">
                        <CardBody>
                            <CardTitle><h4>Enter Donee Details</h4></CardTitle>
                                <FormGroup>
                                    <Label for="donee_contact"> Contact Number<span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup size="sm">
                                        <InputGroupAddon addonType="prepend">+91</InputGroupAddon>
                                        <Input disabled={!doneeCard} size="sm" id="donee_contact"  onChange={(event)=>{handleInputChange2(event)}} valid={doneeContactNumberValid} invalid={doneeContactNumberValid=== null ? false:!doneeContactNumberValid} placeholder=""></Input>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="donee_name">Name<span style={{color:"#ff6363"}}> *</span></Label>
                                    <InputGroup size="sm">
                                    <InputGroupAddon addonType="prepend"><Input disabled={!doneeCard} type="select" size="sm" ><option>Mr</option><option>Mrs</option><option>Master</option><option>Miss</option><option>Dr</option></Input></InputGroupAddon>
                                        <Input onChange={(event)=>{validateDoneeName(event)}} disabled={!doneeCard} size="sm" valid={doneeName} invalid={doneeName=== null ? false:!doneeName} id="donee_name"  placeholder="Name"></Input>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="donee_email">Email</Label>
                                        <Input onChange={(event)=>{validateDoneeEmail(event)}} size="sm" disabled={!doneeCard} size="sm" id="donee_email" valid={doneeEmail} invalid={doneeEmail=== null ? false:!doneeEmail}  placeholder="Name"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="donee_message">Gift Message</Label>
                                        <Input type="area" disabled={!doneeCard} size="sm" id="donee_message"  placeholder="Name"></Input>
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <Button outline onClick={()=>{proceedToPay()}}>Pay</Button>
                                    </Col>
                                </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}
