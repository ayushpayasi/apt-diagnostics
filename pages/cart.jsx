import React,{useEffect,useState} from 'react'
import NavBar from "../components/navbar.component"
import { ListGroup, Container, ListGroupItem, Card, CardBody, CardTitle, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import CancelOutlined from "@material-ui/icons/CancelOutlined"
import IconButton from "@material-ui/core/IconButton"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import "../assets/css/payments.scss"

export default function Cart(props) {
    const [cartData,setCartData] = useState(null);
    useEffect(() => {
        setCartData(JSON.parse(sessionStorage.getItem("cart")))
    }, [])


    const saveCart = (value)=>{
        sessionStorage.setItem("cart",JSON.stringify(value))
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
                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
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
                </ListGroup>
                </div>}
                <Row>
                <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{saveCart(cartData);location.href="/"}} style={{color:"#0a4275",borderRadius:"10px"}} outline>{cartData === null|| cartData.length === 0 ?"Find Tests!":"Add More Tests"}</Button>
                </Col>
                {cartData === null|| cartData.length === 0 ?<React.Fragment/>:<> <Col className="d-flex align-items-center justify-content-center">
                        <Button style={{color:"#0a4275",borderRadius:"10px"}} outline>Gift These Tests</Button>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={()=>{location.href="/payments/gifts"}} style={{color:"#0a4275",borderRadius:"10px"}} outline> Proceed To Pay</Button>
                </Col></>}
                </Row>
            </CardBody>
            </Card>
            </Container>
        </>
    )
}
