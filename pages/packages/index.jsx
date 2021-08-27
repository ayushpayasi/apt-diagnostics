import React,{useState} from 'react';
import NavBar from "../../components/navbar.component";
import {Container, Row, Col, Button, Input, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle} from "reactstrap";
import HealthCheckCarousel from '../../components/healthcheckcarousel.component';
import "../../assets/css/packages.scss";
import Head from "next/head";
import ImgCarousel from '../../components/carousel.component';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from "axios";
import {apiLinks} from "../../connection.config";
import Slider from 'react-slick';

const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}});
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
        const testList = await getTestListData();
        const response = await getPackagesData();
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
        return { props: {packages, testList}}
    }
    catch(err){
        console.log(err)
        return { props: {packages:[],covidTests:[],testList:[]} };
    }
  }


export default function Index(props) {
    // console.log(props.packages['Health Package'])
    const [value, setValue] = useState(0);
    const [packages,setPackages] = useState(props.packages);

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

    const cardFiller = (data, index) => {
        // console.log(data)
        return(
            // <div key={index}>
            //     <div style={{padding:"10px !important"}}>
            //         <Card className="packages-card">
            //             <CardImg top width="100%" src={data.image} alt="Card image cap" />
            //             <CardBody>
            //                 <CardTitle tag="h5">{data.testName}</CardTitle>
            //                 <CardSubtitle tag="h5" className="mb-2 text-muted">{data.testAmount}</CardSubtitle>
            //                 <CardText>{data.description.substring(0,90)}</CardText>
            //                 {paramsIconGenerator(data.testsIncluded.length)}
            //                 {idealForIconGenerator(data.idealFor)}
            //                 <Row>
            //                     <Col><Button onClick={(event)=>{addToCart(event,data)}} outline>Book Now</Button></Col>
            //                     <Col><Button onClick={()=>{location.href=`/packages/${data.testName}`}} outline>Learn More</Button></Col>
            //                 </Row>
            //             </CardBody>
            //         </Card>
            //     </div>
            // </div>
            <div key={index}>
                <div style={{padding:"10px !important"}}>
                    <Card className="packages-card shrink-on-small">
                        <div className="curated-health-image">
                            <CardImg top width="100%" src={data.image} alt="Card image cap" />
                        </div>
                        <CardBody>
                            <CardTitle tag="h5" className="card-title">{data.testName} {` ${index}`}</CardTitle>
                            <CardSubtitle tag="h5" className="mb-2 text-muted">{data.testAmount}</CardSubtitle>
                            <CardText>{data.description.substring(0,90)}</CardText>
                            {paramsIconGenerator(data.testsIncluded.length)}
                            {idealForIconGenerator(data.idealFor)}
                            <Row>
                                <Col className="align-center-row">
                                    <Button className="curated-health-button" onClick={(event)=>{addToCart(event, data)}} outline >
                                        {/* <span id={`${data.testID}`}> */}
                                            {/* {cart.some(cartItem => cartItem.testID === data.testID) ? 'Added' : 'Book Test'} */}
                                            {/* {console.log(cart)} */}
                                            Book Test
                                        {/* </span> */}
                                    </Button>
                                </Col>
                                <Col className="align-center-row">
                                    <Button className="curated-health-button" onClick={()=>{location.href=`/packages/${data.testName}`}} outline>
                                        Learn More
                                    </Button>
                                </Col>
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
        let cart = JSON.parse(localStorage.getItem("cart"))
        if(cart !== null){
        if(cart.length === 0){localStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            props.updateCartValue(cart.length)
            localStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        localStorage.setItem("cart",JSON.stringify([item]))
    }
    }

    return (
        <>
            <Head>PACKAGES || APT DIAGNOSTICS </Head>

            <NavBar testList={props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>

            <Container className=" mt-5">
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

                {packages["Diabities"].length === 0 ? <React.Fragment/> : 
                    <Container>
                        <Row className="mt-3 mb-4">
                            <Col>
                                <h2 style={{color:"#0a4275"}} className="text-center">Diabetes</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                            </Col>
                        </Row>
                        <Row className="horizontal-scroll">
                            {packages["Diabities"].map((item, index) => <Col md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                        </Row>
                    </Container>
                }
               
                {packages["Pregnancy"].length === 0 ? <React.Fragment/>:   
                    <Container>
                        <Row className="mt-5 mb-4">
                            <Col>
                                <h2 style={{color:"#0a4275"}} className="text-center">Pregnancy</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                            </Col>
                        </Row>
                        <Row className="horizontal-scroll">
                            {packages["Pregnancy"].map((item, index) => <Col md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                        </Row>
                    </Container>
                }
            
               
            {packages["General Wellness"].length === 0 ? <React.Fragment/>:
                <Container>
                    <Row className="mt-5 mb-4">
                        <Col>
                            <h2 style={{color:"#0a4275"}} className="text-center">General Wellness</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                        </Col>
                    </Row>
                    <Row className="horizontal-scroll">
                        {packages["General Wellness"].map((item, index) => <Col md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                    </Row>
                </Container>
            }

            {packages["Health"].length === 0 ?<React.Fragment/>: 
                <Container>
                    <Row className="mt-5 mb-4">
                        <Col>
                            <h2 style={{color:"#0a4275"}} className="text-center">Health Packages</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                        </Col>
                    </Row>
                    <Row className="horizontal-scroll">
                        {packages["Health"].map((item, index) => <Col sm="12" md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                    </Row>
                </Container>
            }
            
            
            {packages["Body Building"].length === 0 ?<React.Fragment/>:
                <Container>
                    <Row className="mt-5 mb-4">
                        <Col>
                            <h2 style={{color:"#0a4275"}} className="text-center">Body Building Packages</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                        </Col>
                    </Row>
                    <Row className="horizontal-scroll">
                        {packages["Body Building"].map((item, index) => <Col md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                    </Row>
                </Container>
            }

            {packages["Flu"].length === 0 ?<React.Fragment/>:
                <Container>
                    <Row className="mt-5 mb-4">
                        <Col>
                            <h2 style={{color:"#0a4275"}} className="text-center">Health Packages</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="pb-3" style={{textAlign: 'right'}}>Scroll For More <ArrowRightAltIcon /> </h5>
                        </Col>
                    </Row>
                    <Row className="horizontal-scroll">
                        {packages["Flu"].map((item, index) => <Col md="6" lg="4" key={index}>{cardFiller(item, index)}</Col>)}
                    </Row>
                </Container>
            }
            <Container>
                <Row className="mt-5 mb-5"></Row>
            </Container>

        </>

    )
}
