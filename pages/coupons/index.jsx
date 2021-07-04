import React from 'react';
// import { useRouter } from 'next/router';
import Navbar from "../../components/navbar.component"
import { Container,Row,Col,ListGroup,ListGroupItem,Button,FormGroup,Label,Input } from 'reactstrap';
import axios from "axios"
import {apiLinks} from "../../connection.config"
import { toast } from 'react-toastify';
import "../../assets/css/coupon.scss"

export async function getServerSideProps(context) {
    try{
    const response = await axios.get(apiLinks.coupon,{params:{couponCode:context.query.couponcode}})
    console.log()
    const {data} = response.data;
    console.log(data)
    return { props: {data} };
    }
    catch(err){
        console.log(err)
        return { props: {} };
    }
  }

export default function UseCoupon(props) {

    const copyHandler = ()=>{
        var copyText = document.getElementById("couponCode");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        toast("Coupon Copied to ClipBoard!")
    }

    if(props.data !== undefined){
        toast("Coupon Code is Valid!")
    }

    return(
        <React.Fragment>
            <Navbar/>
                {props.data !== undefined?
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <h3 className="couponHeader">
                            Congratulations Your Coupon Code is Valid!
                            </h3>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md="5">
                            <Row>
                                <Col>
                                    <h5>Available Tests</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{overflowY:"scroll",maxHeight:"160px",marginBottom:"5px"}}>
                                    <ListGroup flush>
                                        {
                                            props.data.giftedTests.map(item=><ListGroupItem key="item">{item}</ListGroupItem>)
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button style={{border:"none",borderRadius:"5px"}}>Cofirm Appointment Time!</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="2" className="d-flex justify-content-center align-items-center">
                                    <h5>or</h5>
                        </Col>
                        <Col md="5">
                                        <Row>
                                            <Col>
                                            <h5>Reedem Your Coupon!</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="couponPrice">
                                                        Your Coupon is Worth!
                                                    </Label>
                                                    <Input readonly id="couponPrice" value={props.data.couponPrice} style={{borderRadius:"10px",fontWeight:"700",letterSpacing:"2px"}}>
                                                    </Input>
                                                </FormGroup>   
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="couponCode">
                                                        Your Coupon Code is
                                                    </Label>
                                                    <Input onClick={()=>{copyHandler()}} id="couponCode" value={props.data.couponCode} style={{borderRadius:"10px",fontWeight:"700",letterSpacing:"5px"}}>
                                                    </Input>
                                                </FormGroup>   
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Button style={{border:"none",borderRadius:"5px"}}>Use Coupon Instead!</Button>
                                            </Col>
                                        </Row>
                        </Col>
                    </Row>
                </Container>
                :<div className="mt-5">no enjoy</div>}
            
        </React.Fragment>
    )
}

