import React from 'react'
import MobileMenu from "../../components/mobilemenu.component"
import {isMobile} from "react-device-detect";
import NavBar from "../../components/navbar.component"
import BreadCrumb from "../../components/breadcrumb.component"

import {Container,Col,Row} from "reactstrap"
import CenterMode from "../../components/centermodecarousel.component"

import "../../assets/css/diagnostics.scss"

export default function Diagnostics() {
    return (
        <React.Fragment>
            <NavBar/>
            <BreadCrumb links={["home","diagnostics"]}/>
            <Container>
                <Row>
                    <Col>
                        <h4 style={{color:"#ff6363",fontWeight:"600",textTransform:"uppercase"}}>Diagnostics</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{color:"grey",margin:0,padding:0}}>Check your Symtopms and find the optimal tests suitable for you!</p>
                        {/* <p style={{margin:0,padding:0}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, enim!</p> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CenterMode/>
                    </Col>
                </Row>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
