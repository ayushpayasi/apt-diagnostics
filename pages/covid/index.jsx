import React from 'react'
import NavBar from "../../components/navbar.component"
import { Container,Row,Col } from 'reactstrap'
import CovidSlider from '../../components/covidslider.component'
import { apiLinks } from '../../connection.config'
import axios from "axios"
import "../../assets/css/covid.scss"
import Head from 'next/head'

const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList, {params:{coupon:"priceList"}});
        if (response.data[0].code === 200){
            return Object.values(response.data[1]);
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}

const getCovidTestData = async () => {
    try{
        const covidTestsResponse = await axios.get(apiLinks.getCovidTests);
        if(covidTestsResponse.data.code === 200){
            return covidTestsResponse.data.data;
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function getServerSideProps(context) {
    try{
    return { props: {
                        data: await getCovidTestData(),
                        testList: await getTestListData()
                    } 
        };
    }
    catch(err){
        console.log(err);
        return { props: { data:[], testList:[] } };
    }
}

export default function Index(props) {
    console.log(props.data);
    return (
        <>
        
        <Head>
                <title>Covid || APTDiagnostics</title>
            </Head>
            <NavBar testList = {props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container className="mt-3 mb-4">
                <Row className="mt-5">
                    <Col className="covid-image-box">
                        <img src="/images/carouselimgx.jpg" ></img>
                    </Col>
                </Row>
            </Container>

            <Container className="mb-5">
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4">
                            Covid-19 Tests
                        </h2>
                    </Col>
                </Row>
                <Container>
                    <Row style={{justifyContent: 'center'}}>
                        <Col xs='12' sm='12' lg="12">
                            <CovidSlider updateCartValue={props.updateCartValue} data = {props.data}/>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container className="mt-5 pb-5">

            </Container>
        </>
    )
}
