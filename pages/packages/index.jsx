import React,{useState} from 'react'
import {isMobile} from "react-device-detect";
import NavBar from "../../components/navbar.component"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box"
import SearchIcon from '@material-ui/icons/Search';
import {Container,Row,Col,Button,Input,Card,CardImg,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap"
import MobileMenu from "../../components/mobilemenu.component"
import HealthCheckCarousel from "../../components/healthcheckcarousel.component"
import "../../assets/css/packages.scss"
import PackageSlider from "../../components/packageslider.component"
import IconButton from "@material-ui/core/IconButton"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Index() {
    const [value, setValue] = useState(0);


    const paramsIconGenerator = ()=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img src="/svg/apartment.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Tests Includes</h4></Col></Row>
                    <Row><Col ><h5>25 Parameter</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const idealForIconGenerator = ()=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img src="/svg/diamond.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Ideal For</h4></Col></Row>
                    <Row><Col ><h5>Male/Female below 30 Years</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const cardFiller =()=>{
        return(
            <div>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card">
                    <CardImg top width="100%" src="/images/bgcheck3.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Package Name</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">2000</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        {paramsIconGenerator()}
                        {idealForIconGenerator()}
                        <Row>
                            <Col><Button outline>Book Now</Button></Col>
                            <Col><Button outline>Learn More</Button></Col>
                        </Row>
                    </CardBody>
                    </Card>
                    </div>
                </div>
            
        )
    }

    return (
        <>
            <NavBar/>
            {/* <BreadCrumb links={["home","tests"]}/> */}
            {/* <Card > */}
            <Container className="package-banner-container-holder">
                
            <Row className="test-banner card">
                    <Col>
                {/* <PackageSlider/> */}
                <img src="/images/carouselimgx.jpg"></img>
                <IconButton className="prev-btn"><NavigateBeforeIcon style={{color:"#0a4275",width:"30px",height:"30px"}}/></IconButton>
                <IconButton className="next-btn"><NavigateNextIcon style={{color:"#0a4275",width:"30px",height:"30px"}}/></IconButton>
                {/* <img className="leftArrow" src=""></img>
                <img className="leftArrow" scr=""></img> */}
                </Col>
                </Row>
            </Container>
            {/* </Card> */}
            <Container >
                
                <Row>
                    <Col className="mt-5">
                        <h1 style={{color:"#0a4275",fontWeight:"700"}} className="text-center">Stay Fit With APT Packages</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, doloribus! ipsum dolor sit amet consectetur adipisicing elit. Ullam quibusdam maxime repudiandae officiis velit at exercitationem animi, odit quos nemo.</p>
                    </Col>
                </Row>
               </Container>           
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 className="text-center">Diabaties</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        {cardFiller()}
                    </Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                </Row>
            </Container>

               
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 className="text-center">Pregnency</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        {cardFiller()}
                    </Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                </Row>
            </Container>
            
               
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 className="text-center">General Wellness</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        {cardFiller()}
                    </Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                </Row>
            </Container>
            
               
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 className="text-center">Health Packages</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        {cardFiller()}
                    </Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                </Row>
            </Container>
            
               
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 className="text-center">Body Building Packages</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                    <Col md="4">{cardFiller()}</Col>
                </Row>
            </Container>
        </>

    )
}
