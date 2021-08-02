import React from 'react'
import NavBar from "../../components/navbar.component"
import { Container,Row,Col } from 'reactstrap'
import CovidSlider from '../../components/covidslider.component'
import { apiLinks } from '../../connection.config'
import axios from "axios"
import "../../assets/css/covid.scss"
import Head from 'next/head'

export async function getServerSideProps(context) {
    try{
    const response = await axios.get(apiLinks.getCovidTests)
    const data = response.data.data
    return { props: {data} };
    }
    catch(err){
        console.log(err)
        return { props: {} };
    }
  }

export default function Index(props) {
    return (
        <>
        
        <Head>
                <title>Covid || APTDiagnostics</title>
            </Head>
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container className="mt-5">
            <Row>
                    <Col>
                        <img src="/images/carouselimgx.jpg" style={{height:"400px",width:"100%"}}></img>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h4>
                            Covid-19 Tests
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CovidSlider updateCartValue={props.updateCartValue} data = {props.data}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
