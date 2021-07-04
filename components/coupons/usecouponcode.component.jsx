import React, {useRef, useState, useEffect} from "react";
import {Card,CardBody,FormGroup,Label,Input,Button,Badge} from "reactstrap"
import CouponCodeData from "./couponCodeData.component";

const UseCouponCode = (props) => {

    const[couponCode, setCouponCode] = useState(props.couponCode)
    const inputCouponRef = useRef();

    console.log(couponCode)

    // useEffect(() => {
    //     // console.log(props.couponCode)
    //     if(props.couponCode) {
    //         setCouponCode(+props.couponCode);
    //     }
    // }, []);

    const submitCouponHandler = () => {
        setCouponCode(inputCouponRef.current.value);
    }

    return(
        <React.Fragment>
            {couponCode ?
            <CouponCodeData couponCode={couponCode}/>
            :
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="couponCode">Enter Your Coupon Code</Label>
                        <input ref={inputCouponRef} type="text" name="couponCode" id="couponCode"/>
                        <button onClick={submitCouponHandler}>Submit</button>
                    </FormGroup>
                </CardBody>
            </Card>           
            }
            
        </React.Fragment>
    )
}

export default UseCouponCode;