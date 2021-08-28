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


const showToast = (message, err = 0) => {
    if(err === 0){
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
};

export async function getServerSideProps(context) {
    try{
    return { props: {
            testList: await getTestListData()} 
        };
    }
    catch(err){
        console.log(err);
        return { props: {testList:[]} };
    }
};

export default function Cart(props) {
    const [cartData, setCartData] = useState([]);
    const [radioValue, setRadioValue] = useState(null);
    var price = 0;

    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem("cart")));
    }, []);

    const saveCart = (value) => {
        if(value === null){
            return;
        }
        localStorage.setItem("cart", JSON.stringify(value));
        props.updateCartValue(value.length);
    };
    
    const handleRemove = (value) => {
        let tempCartData = cartData.filter(item => item.testID !== value);
        setCartData(tempCartData);
        saveCart(tempCartData);
    };

    const fillCart = (obj) => {
        return(
            <ListGroupItem key={obj.testID}>
                <Row className="payments-cart-data">
                    <Col xs="6">{obj.testName}</Col>
                    <Col xs="3">{obj.testAmount}</Col>
                    <Col xs="3" >
                        <IconButton style={{color:"#0a4275"}} onClick={()=>{handleRemove(obj.testID)}}>
                            <CancelOutlined/>
                        </IconButton>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    };

    const priceHandler = (amount) => {
        price = amount;
    }

    const calculateTotal = (obj) => {
        let total = 0;
        obj.map(item => total += parseInt(item.testAmount));
        priceHandler(total);
    };
    
    const fillTotal = (obj) => {
        calculateTotal(obj);
        return(
            <ListGroupItem>
                <Row className="total-payments-cart-data">
                    <Col xs="6" style={{color:"#000"}}>TOTAL PAYABLE </Col>
                    <Col xs="3">
                        <h6>{price} </h6>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    };

    // const applyCouponHandler = async(obj)=>{
    //     const coupon = document.getElementById("coupon").value.toLowerCase()
    //     const result = await axios.get(apiLinks.applyCoupon,{params:{coupon}})
    //     console.log(result)
    //     if (result.data.code == "200"){
    //         setDiscountedPrice(calculateTotal(obj)-(calculateTotal(obj)*(result.data.discount/100)))
    //         setDiscountPercent(result.data.discount)
    //         toast(`Hurray You Recieved ${result.data.discount}% Off!`)
    //     }
    //     else if(result.data.code == "400"){
    //         toast("I Afraid That Was An INVALID Coupon!")
    //     }
    //     else{
    //         toast("there was a problem applying coupon!")
    //     }
    //   }

    const giftTheseTestHandler = () => {
        if(radioValue === null || radioValue === ""){
            showToast("Select Appointment Type First!");
        }
        else{
            sessionStorage.setItem("payDetails", JSON.stringify({
                type: radioValue,
                price,
                "cartLength": cartData.length
            }));
            location.href="/payments/gifts";
        }
    }

    const proceedToPayHandler = () => {
        if(radioValue === null || radioValue === ""){
            showToast("Select Appointment Type First!");
        }
        else if(localStorage.getItem("cart") === null || localStorage.getItem("cart").length === 0){
            showToast("Cart is Empty, Please add atleast one test!");
        }
        else{
            sessionStorage.setItem("payDetails", JSON.stringify({
                type: radioValue,
                price,
                "cartLength": cartData.length
            }));
            if(sessionStorage.getItem("userDetail") !== null){
                location.href="/payments/confirm";
            }
            else{
                location.href="/register_login"
            }
        }
    }
    

    return (

        <>
            <Head>
                <title>Cart || APT Diagnostics</title>
            </Head>
            <NavBar testList={props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container>
                <Card className="payment-total-card mt-5">
                    <CardBody>
                        {cartData === null|| cartData.length === 0 ? 
                            <div className="d-flex mb-3 flex-column justify-content-center align-items-center mt-5" style={{width:"100%"}}>
                                <img style={{height:"170px",width:"170px"}} src="/images/cart-empty.png" alt="cart-empty" />
                                <h5 style={{marginTop:"20px"}}>Cart Empty!</h5>
                            </div> : 
                            <div className="mb-3">
                                <CardTitle>
                                    <h5>Your Selected Items</h5>
                                </CardTitle>
                                <Row className="mt-4 pt-3">
                                    <Col className="d-flex align-items-center justify-content-center mb-4">
                                        <div style={{textAlign: "center"}}>
                                            <FormControl component="fieldset">
                                                {/* <RadioGroup row onChange={(event)=>{setBookingType(event.target.value)}} aria-label="position" name="position" style={{flexDirection: "row", flexWrap: "nowrap"}} defaultValue="home">
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
                                                </RadioGroup> */}
                                                <Row>
                                                    <FormLabel className="text-center" style={{color:"#0a4275",fontWeight:"600"}} component="legend">Select Appointment Type</FormLabel>
                                                </Row>
                                                <RadioGroup>
                                                    <Row>
                                                        <Col xs="6">
                                                            <FormControlLabel
                                                                value="home"
                                                                control={<Radio onChange={(event)=>{setRadioValue(event.target.value)}} />}
                                                                style={{textAlign:"center",color:"#0a4275",fontWeight:"700"}}
                                                                label="Home Appointment"
                                                                name="appointmentType"
                                                                labelPlacement="bottom"
                                                            />
                                                        </Col>
                                                        <Col xs="6">
                                                            <FormControlLabel
                                                                value="lab"
                                                                control={<Radio onChange={(event)=>{setRadioValue(event.target.value)}} />}
                                                                style={{textAlign:"center",color:"#0a4275"}}
                                                                label="Lab Appointment"
                                                                name="appointmentType"
                                                                labelPlacement="bottom"
                                                            />
                                                        </Col>
                                                    </Row>
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

                                    {cartData.map(item => fillCart(item))}
                                    {fillTotal(cartData)}
                                </ListGroup>
                                {/* <Row className="mt-4">
                                    <Col className="d-flex justify-content-end">
                                    <FormGroup size="sm" style={{width: "300px"}}>
                                        <Label for="coupon">Apply Coupon</Label>
                                        <InputGroup size="sm">
                                            <Input style={{ borderRadius: "5px"}} size="sm" id="coupon" placeholder="Enter Coupon Code"></Input>
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={()=>{applyCouponHandler(cartData)}}  className="ml-1 cart-button" outline>Apply</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    </Col>
                                </Row> */}
                            </div>
                        }
                        <Row className="cart-button-container">
                            <Col xs="6" sm="4" className="d-flex align-items-center justify-content-center mt-3">
                                    <Button onClick={() => {saveCart(cartData); location.href="/"}} className="cart-button" outline>{cartData === null|| cartData.length === 0 ?"Find Tests!": "Add More Tests"}</Button>
                            </Col>
                            {cartData === null|| cartData.length === 0 ?
                                <React.Fragment/> :
                                <> 
                                    <Col xs="6" sm="4" className="d-flex align-items-center justify-content-center mt-3">
                                        <Button onClick={giftTheseTestHandler} className="cart-button" outline>Gift These Tests</Button>
                                    </Col>
                                    <Col xs="6" sm="4" className="d-flex align-items-center justify-content-center mt-3">
                                            <Button onClick={proceedToPayHandler} className="cart-button" outline> Proceed To Pay</Button>
                                    </Col>
                                </>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Container>
            <Container>
                <Row className="mt-5 pb-5"></Row>
            </Container>
        </>
    )
};
