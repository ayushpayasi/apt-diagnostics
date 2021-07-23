import React,{useState} from 'react'
import NavBar from "../../components/navbar.component"
import {Container,Row,Col,Button,Input,Card,CardImg,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap"
import "../../assets/css/packages.scss"
import Head from "next/head"
import ImgCarousel from '../../components/carousel.component';
import axios from "axios"
import {apiLinks} from "../../connection.config"


const getPackagesData = async()=>{
    try{
        const packagesResponse = await axios.get(apiLinks.getPackages)
        if(packagesResponse.data.code === 200){
            return packagesResponse.data.data
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
    }
}

// for adding additional packages
export async function getServerSideProps(context) {
    try{
        const response = await getPackagesData()
        let packages ={
            "Diabities":[],
            "General Wellness":[],
            "Health":[],
            "Body Building":[],
            "Pregnancy":[],
            "Flu":[],
        }
        for (var i of response){
            switch(i.type){
                case "Diabities":
                    packages["Diabities"].push(i)
                    break;
                case "General Wellness":
                    packages["General Wellness"].push(i)
                    break;
                case "Health":
                    packages["Health"].push(i)
                    break;
                case "Body Building":
                    packages["Body Building"].push(i)
                    break;
                case "Pregnancy":
                    packages["Pregnancy"].push(i)
                    break;
                case "Flu":
                    packages["Flu"].push(i)
                    break;
            }
        }
    return { props: {packages}}
    }
    catch(err){
        console.log(err)
        return { props: {packages:[],covidTests:[],testList:[]} };
    }
  }


export default function Index(props) {
    console.log(props.packages)
    const [value, setValue] = useState(0);
    const [packages,setPackages] = useState(props.packages)

    const paramsIconGenerator = (data)=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="test-included" src="/svg/aptIcons/light/tests_included.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Tests Includes</h4></Col></Row>
                    <Row><Col ><h5>{data} Parameter</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const idealForIconGenerator = (data)=>{
        return (
            <div className="iconGenerator">
                <Row>
                    <Col xs="3"><img className="ideal-for" src="/svg/aptIcons/light/ideal_for.svg" alt="icon"/></Col>
                    <Col xs="9">
                    <Row><Col ><h4>Ideal For</h4></Col></Row>
                    <Row><Col ><h5>{data[0]}</h5></Col></Row>
                    </Col>
                </Row>
            </div>
        )
    }
    const cardFiller =(data)=>{
        console.log(data)
        return(
            <div>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card">
                    <CardImg top width="100%" src={data.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{data.testName}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{data.testAmount}</CardSubtitle>
                        <CardText>{data.description.substring(0,90)}</CardText>
                        {paramsIconGenerator(data.testsIncluded.length)}
                        {idealForIconGenerator(data.idealFor)}
                        <Row>
                            <Col><Button onClick={(event)=>{addToCart(event,data)}} outline>Book Now</Button></Col>
                            <Col><Button onClick={()=>{location.href=`/packages/${data.testName}`}} outline>Learn More</Button></Col>
                        </Row>
                    </CardBody>
                    </Card>
                    </div>
                </div>
            
        )
    }
    
        
const items = [
    {
      src: "images/packages/corporate.jpg",
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: "images/packages/flu.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: "images/packages/frontline_workers.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: "images/packages/home.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: "images/packages/test.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: "images/packages/womanhood.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
  ];
  

    
    const addToCart = (event,item)=>{
        event.stopPropagation();
        let cart = JSON.parse(sessionStorage.getItem("cart"))
        if(cart !== null){
        if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            props.updateCartValue(cart.length)
            sessionStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        sessionStorage.setItem("cart",JSON.stringify([item]))
    }
    }

    return (
        <>
        <Head>APT DIAGNOSTICS | PACKAGES</Head>
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container fluid className="package-banner-container-holder mt-5">
            <ImgCarousel data={items} style={{height:"400px"}}/>
            </Container>
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
               {packages["Diabities"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">Diabetes</h4>
                    </Col>
                </Row>
                <Row>{packages["Diabities"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>
            }
               
               {packages["Pregnancy"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">Pregnancy</h4>
                    </Col>
                </Row>
                <Row>
                {packages["Pregnancy"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>
            }
            
               
            {packages["General Wellness"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">General Wellness</h4>
                    </Col>
                </Row>
                <Row>
                {packages["General Wellness"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>
            }
            
               
            {packages["Health"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">Health Packages</h4>
                    </Col>
                </Row>
                <Row>
                {packages["Health"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>}
            
               
            {packages["Body Building"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">Body Building Packages</h4>
                    </Col>
                </Row>
                <Row>{packages["Body Building"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>
            }

            {packages["Flu"].length === 0 ?<React.Fragment/>:   <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <h4 style={{color:"#0a4275"}} className="text-center">Health Packages</h4>
                    </Col>
                </Row>
                <Row>
                {packages["Flu"].map(item=><Col md="4">{cardFiller(item)}</Col>)}
                </Row>
            </Container>}

        </>

    )
}
