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
            <Container></Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
