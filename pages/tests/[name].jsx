import React, {useState} from "react"
import {isMobile} from "react-device-detect";
import MobileMenu from "../../components/mobilemenu.component"
import {Row,Col,Container,Collapse,CardTitle,CardBody,CardFooter} from "reactstrap"
import SmallNavbar from "../../components/smallnavbar.component"
import "../../assets/css/tests.scss"
import Button from "@material-ui/core/Button"
// import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton"
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded"
import Card from "@material-ui/core/Card"

const dataLi =[
    {
        testId:"1",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    },
    {
        testId:"2",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    },
    {
        testId:"3",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    },
    {
        testId:"4",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    },
    {
        testId:"5",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    },
    {
        testId:"6",
        name:"Test Name",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.",
        imageLink:"images/bgcheck2.jpeg",
        sampleReportImage:"images/bgcheck3.jpg",
        price:"200",
        faq:[
            {whyThisTest:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            {isThisTestForYou:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam"},
            ]
    }
    
]

export const getStaticPaths = async () =>{
    
    const paths = dataLi.map(item=>{
        return{
            params:{name:item.testId}
        }
    })
    return{
        paths,
        fallback:false
    }
}

export const getStaticProps = async (context)=>{
    const id = context.params.name
    let data = {}
    for(let i of dataLi){
        if (i.testId == id){
            data = i
            break
        }
    }

    return{
        props:{details:data}
    }
}

export default function Details({details}){
    const [isOpen,setIsOpen] = useState(false);
    const fillFaq = ()=>{
        return details.faq.map((item)=>{
           const s = Object.keys(item)[0].replace(/([A-Z])/g, ' $1').trim() +"?"
            // newValue = Regex.Replace(, "([a-z])([A-Z])", "$1 $2");
            // console.log(s)
            return(
                <span className="border">
            <Row>
            <Col>
                <h4 style={{color:"#0a4275 "}}>{s}</h4>
            </Col>
            </Row>
            <Row>
                <Col>
                <p>{Object.values(item)[0]}</p>
                </Col>
            </Row>
            </span>
            )
        })
    }
const toggle =()=>{
    setIsOpen(!isOpen)
}
return(
    <>
    {/* <div className="details-screen"> */}
        <SmallNavbar/>
        {/* <div className="rightimage"> */}
        {/* <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 700" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#ff6900ff"></stop><stop offset="95%" stop-color="#fcb900ff"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,350 0,350 C 113.89285714285714,412.7142857142857 227.78571428571428,475.42857142857144 339,462 C 450.2142857142857,448.57142857142856 558.75,358.99999999999994 678,313 C 797.25,267.00000000000006 927.2142857142858,264.5714285714286 1056,278 C 1184.7857142857142,291.4285714285714 1312.392857142857,320.71428571428567 1440,350 C 1440,350 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 350)"></path></svg> */}
        {/* </div> */}
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
                            {details.details}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="testdetails-button"> Book Now</Button>
                    </Col>
                </Row>
                </Col>
                <Col>
                </Col>
                <Row>
                    <Col>
                <Row className="mt-5">
                    <Col>
                        <h5 className="text-left ml-2">Test Details</h5>
                    </Col>
                </Row>
                <Card className="mt-3 detail-card">
                <Row>
                    <Col sm="4">
                        <img className="" src="/images/bgcheck2.jpeg"/>
                    </Col>
                    <Col sm="8" >
                        <Row>
                            <Col className="ml-1">
                                <h6>{details.name} </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ml-1">
                                <p>{details.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="m-2"><h4>₹ {details.price} </h4></Col>
                        </Row>
                        <Row>
                            <Col className="ml-1"><Button variant="outlined">BOOK NOW</Button></Col>
                            <Col><Button variant="outlined">ADD TO CART</Button></Col>
                        </Row>
                        </Col>
                </Row>
                </Card> 
                <Row className="icons-holder">
                            <Col>
                            <Row>
                                <Col sm="2"><img src="/svg/diamond.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            <Col>
                            <Row>
                                <Col sm="2"><img src="/svg/diamond.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            
                            <Col>
                            <Row>
                                <Col sm="2"><img src="/svg/diamond.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                            
                            <Col>
                            <Row>
                                <Col sm="2"><img src="/svg/diamond.svg"></img></Col>
                                <Col sm="10"><p>Lorem ipsum dolor sit amet.</p></Col>
                            </Row>
                            </Col>
                        </Row>
                        
                <Row className="mt-5">
                    <Col className="border p-2">
                        <Row>
                            <Col sm="2" className="align-center-row"><h2 style={{margin:0,padding:0}}>FAQ's</h2></Col>
                            <Col sm="1" className="align-center-column"><IconButton style={{boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.5)"}} onClick={toggle}><ArrowDownwardRounded style={{height:"25px",width:"25px",color:"#0a4275"}}/></IconButton></Col>
                        </Row>
                        <Collapse isOpen={isOpen}>
                            {fillFaq()}
                            {fillFaq()}
                        </Collapse>
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
            {/* <Row>
                <Col sm="6">
                   <h2 className="h2"> {details.description} </h2>
                </Col>
            </Row> */}
            
        </Container>
        <div className="colored-container">
                <Container >
                <Row>
                    <Col className="mt-4">
                        <h2 className="text-center mt-2 mb-4 iofade">
                            Popular Tests
                        </h2>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                    <p className="container-p text-center iofade"> Browse through our most popular tests that ensure your good health!</p>
                    </Col>
                </Row>
                <Row className="ml-2 mr-2"> 
                    <Col>
                        <Card className="test-card ioleft">
                            <CardTitle className="text-center card-title mt-1">Covid 19 RT-PCR Test</CardTitle>
                            <CardBody className="body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio et vel quisquam! Sit mollitia voluptatem labore voluptatibus, velit alias dicta! doloribus odio quisquam</CardBody>
                            <CardFooter className="align-center-row"><Button color="primary" variant="contained" className="test-card-button">Book Test</Button></CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioleft">
                            <CardTitle className="text-center card-title mt-1">D-Dimer Test</CardTitle>
                            <CardBody className="body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardBody>
                            <CardFooter className="align-center-row"><Button color="primary" variant="contained" className="test-card-button">Book Test</Button></CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioright">
                            <CardTitle className="text-center card-title mt-1">COVID Antibody Test</CardTitle>
                            <CardBody className="body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardBody>
                            <CardFooter className="align-center-row"><Button color="primary" variant="contained" className="test-card-button">Book Test</Button></CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioright">
                            <CardTitle className="text-center card-title mt-1">CoviProfile Test</CardTitle>
                            <CardBody className="body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardBody>
                            <CardFooter className="align-center-row"><Button color="primary" variant="contained" className="test-card-button">Book Test</Button></CardFooter>
                        </Card>
                    </Col>
                </Row>
                </Container>
                </div>
    {/* </div> */}
    {isMobile?<MobileMenu/>:<React.Fragment/>}
    </>
)
}