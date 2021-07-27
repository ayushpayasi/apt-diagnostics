import React from 'react'
import SmallNavbar from "../components/smallnavbar.component"
import {Row,Col,Container,Card,CardBody,CardTitle, Input,FormGroup,Label,Button, CardText} from "reactstrap"
export default function Login() {
    const handleLogin = ()=>{

    }

    return (
        <>
        <div className="login-banner">
        <SmallNavbar color="white" />
            <Container fluid className="grid-bg">
            <Row>
                <Col>
                </Col>
                <Col className="d-flex justify-content-around align-items-center">
                    <Card className="login-card" >
                        <CardBody>
                            <CardTitle ><h4 className="text-center"> Login</h4></CardTitle>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input style={{borderRadius:"10px"}} aria-label="User Name" id ="username" placeholder="Username"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input style={{borderRadius:"10px"}} aria-label="Password" id ="password" placeholder="Password"></Input>
                            </FormGroup>
                            <CardText><a style={{fontSize:"0.8rem"}}>Forgot Password</a></CardText>
                            <FormGroup className="text-center">
                                <Button style={{borderRadius:"20px",padding:"8px 30px"}} onClick={()=>{handleLogin()}}>Login</Button>
                            </FormGroup>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
        </>
    )
}
