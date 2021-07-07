import React from 'react'
import NavBar from "../../components/navbar.component"
import { Container,Row,Col } from 'reactstrap'
import CovidSlider from '../../components/covidslider.component'
export default function Index() {
    return (
        <>
            <NavBar/>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h4>
                            Covid-19 Tests
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CovidSlider/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
