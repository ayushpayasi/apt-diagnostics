import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {apiLinks} from "../../connection.config"
import {Card,CardBody,CardTitle,Row,Col,FormGroup,Button,Label,Input,ListGroup,ListGroupItem, CardSubtitle} from "reactstrap"
import {toast} from "react-toastify"



export default function AddCouponWindow(props) {
    const [couponList,setCouponList] = useState(null)
    const saveBlogDetails = async ()=>{}

    const addCoupon = async()=>{
        const couponPrice = document.getElementById("couponPrice").value
        const couponCode = document.getElementById("couponCode").value

        const response = await axios.post(apiLinks.postCoupon,{couponPrice,couponCode})
        if(response.status === 200){
            document.getElementById("couponCode").value = ""
            document.getElementById("couponPrice").value = ""
            toast("coupon Added!")
        }
        else{
            toast("failed to add coupon")
        }
    }

    useEffect( async() => {
        const result = await axios.get(apiLinks.getAllCoupons)
        setCouponList(result.data)
    }, [])

    return (    
<>
    <div className="updateWindow">
   <Card className="couponWindow">
            <CardBody>
            <CardTitle><Button onClick={()=>{props.setAddCouponWindow(false)}} close /></CardTitle>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="couponsList">Existing Coupons</Label>
                            <Input type="select" size="sm" id="couponsList" placeholder="CouponList">
                               {couponList?couponList.map(item=><option key={item.couponCode}>CODE = {item.couponCode}: DISCOUNT = {item.couponPrice} %</option>):<React.Fragment/>}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col><FormGroup>
                            <Label for="couponCode">Coupon Code</Label>
                            <Input size="sm" id="couponCode" placeholder="Coupon Code"></Input>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                            <Label for="couponPrice">Coupon Discount %</Label>
                            <Input size="sm" id="couponPrice" placeholder="Discount %"></Input>
                        </FormGroup>
                    </Col>
                    <Col><Button onClick={()=>{addCoupon()}}>Add</Button></Col>
                </Row>

            </CardBody>
        </Card>
    </div>
    </>
    )
}
