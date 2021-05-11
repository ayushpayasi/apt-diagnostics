import React from 'react'
import {isMobile} from "react-device-detect";
import NavBar from "../../components/navbar.component"
import BreadCrumb from "../../components/breadcrumb.component"
import ReportSlider from "../../components/slider.component"
import {Container,Row,Col} from "reactstrap"
import MobileMenu from "../../components/mobilemenu.component"
import "../../assets/css/tests.scss"
// import "slick-carousel/slick/slick.scss"; 
// import "slick-carousel/slick/slick-theme.scss";

export default function Tests() {
    return (
        <React.Fragment>
            <NavBar/>
            <BreadCrumb links={["home","tests"]}/>
            <Container >
                <Row>
                    <Col>
                        <h4 style={{color:"#ff6363",fontWeight:"600",textTransform:"uppercase"}}>Tests</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, doloribus! ipsum dolor sit amet consectetur adipisicing elit. Ullam quibusdam maxime repudiandae officiis velit at exercitationem animi, odit quos nemo.</p>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4" fluid style={{background:"rgba(9,66,117,0.3)"}}>
                <Row>
                    <Col className="mt-2">
                        <h5 style={{color:"#094275",textAlign:"center"}}>Popular Tests</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{color:"grey",textAlign:"center"}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, soluta. </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReportSlider/>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h5 className="text-center">Lorem, ipsum dolor.</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quo inventore architecto! Totam cum perferendis a iure vitae! Fuga maiores repellendus ab? Recusandae earum tenetur labore nam aperiam commodi suscipit, cumque consequuntur autem eaque laboriosam pariatur facere laborum et, dolor tempore repudiandae? Soluta ducimus totam quasi aliquam fugiat hic.</p>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4" fluid style={{background:"rgba(9,66,117,0.3)"}}>
                <Row>
                    <Col className="mt-2">
                        <h5 style={{color:"#094275",textAlign:"center"}}>Popular Tests</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{color:"grey",textAlign:"center"}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, soluta. </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReportSlider/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="mt-2">
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus saepe similique eligendi officia eius, fuga animi consectetur consequatur tenetur quasi dolore blanditiis accusantium voluptate doloremque, aliquid vitae temporibus dolorum magnam. ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quo inventore architecto! Totam cum perferendis a iure vitae! Fuga maiores repellendus ab? Recusandae earum tenetur labore nam aperiam commodi suscipit, cumque consequuntur autem eaque laboriosam pariatur facere laborum et, dolor tempore repudiandae? Soluta ducimus totam quasi aliquam fugiat hic.</p>
                    </Col>
                </Row>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
