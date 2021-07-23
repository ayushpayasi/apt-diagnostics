import React,{useEffect} from 'react'
import NavBar from "../../components/navbar.component"
import {Container,Row,Col} from "reactstrap"
import Tab from "../../components/abouttab.component"
import "../../assets/css/about.scss"
import BreadCrumb from "../../components/breadcrumb.component"
import {isMobile} from "react-device-detect";
import MobileMenu from "../../components/mobilemenu.component"

export default function About(props) {
    return (
        <React.Fragment>
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <BreadCrumb links={["home","about"]}/>
            <Container>
                <Row>
                    <Col>
                        <Tab/>
                    </Col>
                </Row>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
