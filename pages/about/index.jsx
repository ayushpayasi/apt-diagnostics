import React from 'react'
import NavBar from "../../components/navbar.component"
import {Container,Row,Col} from "reactstrap"
import Tab from "../../components/abouttab.component"
import "../../assets/css/about.scss"
import Head from 'next/head'

export default function About(props) {
    return (
        <React.Fragment>
            <Head>
                <title>About || APTDiagnostics</title>
            </Head>
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container>
                <Row>
                    <Col>
                        <Tab/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
