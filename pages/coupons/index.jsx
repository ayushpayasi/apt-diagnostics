import React from 'react';
import Navbar from "../../components/navbar.component"
import { Container,Row,Col,ListGroup,ListGroupItem,Button,FormGroup,Label,Input} from 'reactstrap';
import axios from "axios"
import {apiLinks} from "../../connection.config"
import { toast } from 'react-toastify';
import "../../assets/css/coupon.scss"
import Head from 'next/head'


const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}})
        if (response.data[0].code === 200){
            return Object.values(response.data[1])
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
    }
}



export async function getServerSideProps(context) {
    try{
    const response = await axios.post(apiLinks.checkCoupon,{coupon:context.query.couponcode})
    let data = null
    if(response.data.code === 200){
        data = response.data.data;
    }
    else{
        data = null;
    }
    return { props: {data,testList: await getTestListData()} };
    }
    catch(err){
        return { props: {data:null,testList:[]} };
    }
  }

export default function UseCoupon(props) {
        console.log(props.testList)
        const filteredArray = props.testList.filter(value => props.data.giftedTestList.includes(""+value.testID));
        console.log(filteredArray)
    const copyHandler = ()=>{
        var copyText = document.getElementById("couponCode");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        toast("Coupon Copied to ClipBoard!")
    }

    const handleDirectCouponUse = async()=>{
        try{
            sessionStorage.setItem("insertedGiftCoupon",document.getElementById("couponCode").value)
            if(sessionStorage.getItem("userDetail") !== null){
                
            }
            else{

            }
        }catch(err){}
    }
    return(
        <React.Fragment>
            <Head>
                <title>Coupons || APTDiagnostics</title>
            </Head>
            <Navbar updateCartValue={props.updateCartValue} cartValue={props.cartValue} />
                {props.data !== null?
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
                                    <h5>Associated Tests</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{overflowY:"scroll",maxHeight:"160px",marginBottom:"5px"}}>
                                    <ListGroup flush>
                                        {
                                            filteredArray.map(item=><ListGroupItem key="item">{item.testName} - Rs.{item.testAmount}</ListGroupItem>)
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button onClick={()=>{handleDirectCouponUse()}} outline style={{borderRadius:"5px"}}>Book These Tests!</Button>
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
                                                    <Input readonly id="couponPrice" value={props.data.couponAmount} style={{borderRadius:"10px",fontWeight:"700",letterSpacing:"2px"}}>
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
                :<Container className="mt-5">
                    <Row>
                        <Col className="mt-4">
                            <h4 className="text-center">Gift Coupon is Invalid!</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className=" text-center mt-4">
                            <Button outline onClick={()=>{location.href="/"}}>Go Back To Home Page</Button>
                        </Col>
                    </Row>
                    </Container>}
            
        </React.Fragment>
    )
}

