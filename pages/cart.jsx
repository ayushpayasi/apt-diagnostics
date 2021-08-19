import Head from 'next/head'
import React,{useEffect,useState} from 'react'
import NavBar from "../components/navbar.component"
import { ListGroup, Container, ListGroupItem, Card, CardBody, CardTitle, Row, Col, InputGroupAddon, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';
import CancelOutlined from "@material-ui/icons/CancelOutlined"
import IconButton from "@material-ui/core/IconButton"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {apiLinks} from "../connection.config"
import axios from "axios"
import {toast} from "react-toastify"

import "../assets/css/payments.scss"

export default function Cart(props) {
    const [cartData,setCartData] = useState([]);
    const [bookingType,setBookingType] = useState("home")
    const [discountedPrice,setDiscountedPrice] = useState(null)
    const [discountPercent,setDiscountPercent] = useState(null)
    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem("cart")))
    }, [])


    const saveCart = (value)=>{
        if(value === null){
            return
        }
        localStorage.setItem("cart",JSON.stringify(value))
        props.updateCartValue(value.length)
    }
    
    const handleRemove = (value)=>{
        let tempCartData = cartData.filter(item=> item.testID !== value)
        setCartData(tempCartData)
        saveCart(tempCartData)
    }

    const fillCart = (obj)=>{
        return(
            <ListGroupItem>
            <Row className="payments-cart-data">
                <Col xs="6">{obj.testName}</Col>
                <Col xs="3">{obj.testAmount}</Col>
                <Col xs="3" ><IconButton style={{color:"#0a4275"}} onClick={()=>{handleRemove(obj.testID)}}><CancelOutlined/></IconButton></Col>
            </Row>
        </ListGroupItem>
        )
    }

    
    const calculateTotal = (obj)=>{
        var total = 0
        obj.map(item=>total+=parseInt(item.testAmount))
        return total
      }
    
    const fillTotal = (obj,discountedPrice)=>{
        const total = calculateTotal(obj)
        return<ListGroupItem>
        <Row className="total-payments-cart-data">
            <Col xs="6" style={{color:"#000"}}>TOTAL PAYABLE </Col>
            <Col xs="3">{discountedPrice === null ?<h6>Rs. {total}</h6>:<span><strike>{total}</strike> Rs. {discountedPrice}</span>}</Col>
        </Row>
    </ListGroupItem>
    }

    const applyCouponHandler = async(obj)=>{
        const coupon = document.getElementById("coupon").value.toLowerCase()
        const result = await axios.get(apiLinks.applyCoupon,{params:{coupon}})
        console.log(result)
        if (result.data.code == "200"){
            setDiscountedPrice(calculateTotal(obj)-(calculateTotal(obj)*(result.data.discount/100)))
            setDiscountPercent(result.data.discount)
            toast(`Hurray You Recieved ${result.data.discount}% Off!`)
        }
        else if(result.data.code == "400"){
            toast("I Afraid That Was An INVALID Coupon!")
        }
        else{
            toast("there was a problem applying coupon!")
        }
      }

    const giftTheseTestHandler = ()=>{
        localStorage.setItem("discountedValue",JSON.stringify({"discount":discountedPrice,"cartLength":cartData.length}));
        location.href="/payments/gifts";
    }

    const proceedToPayHandler = ()=>{
        localStorage.setItem("bookingType",bookingType);
        localStorage.setItem("discountedValue",JSON.stringify({"discount":discountedPrice,"cartLength":cartData.length,discountPercent}))
        if(localStorage.getItem("userDetail") !== null){
            location.href="/payments/confirm";
        }
        else{
            location.href="/register_login"
        }
    }
    

    return (
        <>
        
        <Head>
          <title>Cart || APT Diagnostics</title>
        </Head>
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container><Card className="payment-total-card mt-5">
            <CardBody>
            {cartData === null|| cartData.length === 0 ? <div className="d-flex mb-3 flex-column justify-content-center align-items-center mt-5" style={{width:"100%"}}><img style={{height:"170px",width:"170px"}} src="/images/cart-empty.png" alt="cart-empty"></img><h5 style={{marginTop:"20px"}}>Cart Empty!</h5></div>:<div className="mb-3">
                <CardTitle>
                <h5>Your Selected Items</h5>
                </CardTitle>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center mb-4">
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel className="text-center" style={{color:"#0a4275",fontWeight:"600"}} component="legend">Select Appointment Type</FormLabel>
                            <RadioGroup row onChange={(event)=>{setBookingType(event.target.value)}} aria-label="position" name="position" defaultValue="home">
                                <FormControlLabel
                                value="home"
                                control={<Radio color="secondary" />}
                                label="Home Appointment"
                                labelPlacement="bottom"
                                />
                                <FormControlLabel
                                value="lab"
                                control={<Radio color="secondary" />}
                                label="Lab Appointment"
                                labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    </Col>
                </Row>
                <ListGroup flush>
                    <ListGroupItem>
                    <Row className="payments-cart-data">
                       <Col xs="6">Test/Package Name</Col>
                       <Col xs="3">Price</Col>
                       <Col xs="3">Remove</Col>
                   </Row>
                    </ListGroupItem>
                    {cartData.map(item=>fillCart(item))}
                    {fillTotal(cartData,discountedPrice)}
                </ListGroup>
                <Row>
                    <Col className="d-flex justify-content-end">
                    <FormGroup size="sm">
                        <Label for="coupon">Apply Coupon</Label>
                        <InputGroup size="sm">
                            <Input style={{width:"300px"}}size="sm" id="coupon" placeholder=""></Input>
                            <InputGroupAddon addonType="append"><Button onClick={()=>{applyCouponHandler(cartData)}}  style={{color:"#0a4275"}} outline>Apply</Button></InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    </Col>
                </Row>
                </div>}
                <Row>
                <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{saveCart(cartData);location.href="/"}} style={{color:"#0a4275",borderRadius:"10px"}} outline>{cartData === null|| cartData.length === 0 ?"Find Tests!":"Add More Tests"}</Button>
                </Col>
                {cartData === null|| cartData.length === 0 ?<React.Fragment/>:<> <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{giftTheseTestHandler(discountedPrice)}} style={{color:"#0a4275",borderRadius:"10px"}} outline>Gift These Tests</Button>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{proceedToPayHandler(discountedPrice)}} style={{color:"#0a4275",borderRadius:"10px"}} outline> Proceed To Pay</Button>
                </Col></>}
                </Row>
            </CardBody>
            </Card>
            </Container>
        </>
    )
}
