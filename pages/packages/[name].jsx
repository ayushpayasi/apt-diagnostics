import React,{useState} from 'react'
import SmallNavbar from "../../components/smallnavbar.component"
import "../../assets/css/tests.scss"
import "../../assets/css/packages.scss"
import {Container,Col,Row,Card,Button,Collapse,ListGroup,ListGroupItem,CardBody,CardTitle,CardText, CardSubtitle} from "reactstrap"
import IconButton from "@material-ui/core/IconButton"
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded"
import NavBar from "../../components/navbar.component"
import axios from 'axios'
import {apiLinks} from "../../connection.config"

export const getStaticPaths = async ()=>{
    const result = await axios.get(apiLinks.getPackages)
    const paths = result.data.data.map(item=>{
        return{
            params:{name:item.name}
        }
    })
    return{
        paths,
        fallback:false
    }
}

export const getStaticProps = async (context)=>{
    const result = await axios.get(apiLinks.getPackages)
    const currName = context.params.name
    let dataLi = {}
    for(let i of result.data.data){
        if (i.name == currName){
            dataLi = i
            break
        }
    }

    return{
        props:{details:dataLi}
    }
}

export default function Display({details}) {

        
    const addToCart = (event,item)=>{
        event.stopPropagation();
        let cart = JSON.parse(sessionStorage.getItem("cart"))

        if(cart !== null){
        if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            sessionStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        sessionStorage.setItem("cart",JSON.stringify([item]))
    }
    }


    const fillIncludedTests = ()=>{
        return details.testsIncluded.map((item,index)=>{
            return(
                <ListGroupItem><span style={{fontWeight:"700",fontSize:"1.5rem"}}>{(index+1)}</span>{". "+ item}</ListGroupItem>
            )
        })
    }
    const fillPreRequisites =() =>{
        return details.preRequisites.map(item=>{
            return(
                <ListGroupItem><span style={{fontWeight:"700",fontSize:"1.5rem"}}>{"-"}</span>{item}</ListGroupItem>
            )
        })
    }
    const idealForIconGenerator = ()=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg"  alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Report Avialability</h4></Col></Row>
                    <Row><Col ><h5>Next Day</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const paramsIconGenerator = (data)=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className = "test-included" src="/svg/aptIcons/light/tests_included.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Tests Includes</h4></Col></Row>
                    <Row><Col ><h5>{data} Parameter</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }

    return (
        <>
        {/* <SmallNavbar/> */}
        <NavBar/>
        <Container className="mt-4">
            <Row>
                <Col>
                <Row>
                    <Col className="mt-5" >
                        <h1 className="h1">{details.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="p">
                            {details.description}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={(event)=>{addToCart(event,details)}} className="testdetails-button"> Book Now</Button>
                    </Col>
                </Row>
                </Col>
                <Col >
                <Row>
                    <Col className="mt-5">
                        <Card className="price-detail-card">
                            <CardBody>
                                <CardTitle>{"₹ " +details.packagePrice}</CardTitle>
                                <CardSubtitle>Package Ideal For</CardSubtitle>
                                <CardText>
                                    <ListGroup>
                                        {details.idealFor.map(item=><ListGroupItem>{"- "+item}</ListGroupItem>)}
                                    </ListGroup>
                                </CardText>
                                <Row>
                                    <Col>{idealForIconGenerator()}</Col>
                                    <Col>{paramsIconGenerator(details.testsIncluded.length)}</Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Col>
                <Row>
                    <Col>
                <Row className="mt-5">
                    <Col>
                        <h5 className="text-left ml-2">Package Details</h5>
                    </Col>
                </Row>
                <Card className="mt-3 detail-card">
                    <CardBody>
                        <CardTitle>Pre Requisites</CardTitle>
                        <ListGroup flush>
                            {fillPreRequisites()}    
                        </ListGroup>
                    </CardBody>
                </Card>
                <Card className="mt-3 detail-card">
                    <CardBody>
                        <CardTitle>Tests Included</CardTitle>
                    <ListGroup flush>
                        {fillIncludedTests()}
                    </ListGroup>
                </CardBody>
                </Card> 
                <Row className="icons-holder">
                            <Col>
                            <Row>
                                <Col sm="2"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            <Col>
                            <Row>
                                <Col sm="2"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            
                            <Col>
                            <Row>
                                <Col sm="2"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            
                            <Col>
                            <Row>
                                <Col sm="2"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5 className="mt-5">Sample Report</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <img className="sampleReport mt-3" src="/images/report.jpg" alt="sample" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
            
        </Container>
      
        </>
    )
}
