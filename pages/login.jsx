import Head from 'next/head'
import React from 'react'
import SmallNavbar from "../components/smallnavbar.component"
import {Row,Col,Container,Card,CardBody,CardTitle, Input,FormGroup,Label,Button, CardText} from "reactstrap"
export default function Login() {
    const handleLogin = ()=>{

    }

    return (
        <>
        
        <Head>
          <title>Login || APT Diagnostics</title>
        </Head>
        <div className="login-banner">
        <SmallNavbar color="white" />
            <Container fluid className="grid-bg">
            <Row>
                {/* <Col>
                </Col> */}
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
            <Row className="mt-5 pt-5 pb-5" style={{backgroundColor: "#0a4275", color: "#fff", fontWeight: 800}}>
                <Col>
                    <h1 style={{fontWeight: 900, fontSize: "5rem", letterSpacing: ".5rem"}}>APT FOR YOU</h1>
                </Col>
            </Row>
            </Container>
        </div>
        </>
    )
}
