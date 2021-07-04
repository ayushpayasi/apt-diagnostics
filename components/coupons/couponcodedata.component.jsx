import React, {useState, useEffect} from "react";
import axios from 'axios'
import {Card,CardBody,FormGroup,Label,Input,Button,Badge} from "reactstrap"
import {apiLinks} from "../../connection.config"
import { toast } from "react-toastify";

const CouponCodeData = (props) => {
    const [giftedTest, setGiftedTest] = useState();
    const getCouponData = async(couponCode) => {
        try {
            console.log(couponCode)
            const giftedTestData =  await axios.get(apiLinks.coupon,{params:{couponCode}})
            console.log(giftedTestData)
            if(giftedTestData.status === 200) {
                setGiftedTest(giftedTestData.data)
            }
        }
        catch(err) {
            toast("Coupon is not Valid!")
        }
        
    }

    useEffect(() => {
            getCouponData(props.couponCode);
    }, [])

    return(
        <React.Fragment>
            {
                giftedTest ? 
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="giftedTest">Choose Your Test</Label>
                            <Input type="select" name="select" id="giftedTest">
                                {/* {giftedTestData.giftedTests.map} */}
                            </Input>
                            <Badge color="094275">{}</Badge>
                            <Button>Proceed</Button>
                        </FormGroup>
                    </CardBody>
                </Card>
                :
                <Card>
                     <CardBody>
                        <Button>Go to Homepage!!</Button>
                    </CardBody>
                </Card>
            }
        </React.Fragment>
    )



}

export default CouponCodeData;