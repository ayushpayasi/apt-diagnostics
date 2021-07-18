import React,{useState} from "react"
import { apiLinks } from "../../connection.config"
import axios from "axios"
import {Row,Col,Container,Collapse,CardTitle,CardBody,Card,CardText} from "reactstrap"
import SmallNavbar from "../../components/smallnavbar.component"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded"
import "../../assets/css/tests.scss"

export const getStaticPaths = async ()=>{
    try{
    const result = await axios.get(apiLinks.getCovidTests)
    const paths = result.data.data.map(item=>{
        return{
            params:{id:String(item.testID)}
        }
    })
    return{
        paths,
        fallback:false
    }
}

    catch(err){
        console.log(err)
    }
}

export const getStaticProps = async (context)=>{
    const currId = context.params.id
    const result = await axios.get(apiLinks.getCovidTests)
    let dataLi = {}
    const data = result.data.data
    for(let i of result.data.data){
        if (i.testID == currId){
            dataLi = i
            break
        }
    }

    return{
        props:{details:dataLi,data}
    }
}


export default function Page(props){
    const [isOpen,setIsOpen] = useState(false);

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
    
const toggle =()=>{
    setIsOpen(!isOpen)
}
    const details = props.details
    return(
        <>
        <SmallNavbar/>
        <Container className="mt-4">
            <Row>
                <Col>
                <Row>
                    <Col className="mt-5" >
                        <h1 className="h1">{details.testName}</h1>
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
                                <h6>{details.testName} </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ml-1">
                                <p>{details.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="m-2"><h4>₹ {details.testAmount} </h4></Col>
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
                            {/* {fillFaq()}
                            {fillFaq()} */}
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
                {props.data === null ? <React.Fragment/> : props.data.map(item=><Col key={item.testID}>
                    <Card onClick={()=>{location.href=`/covid/${item.testID}`}} className="test-card">
                            <CardTitle className="text-center card-title mt-1">{item.testName}</CardTitle>
                            <CardBody >
                                <CardText className="body-text">{item.details}</CardText>
                            <div className="align-center-row "><Button onClick={(event)=>{addToCart(event,item)}} variant="outlined" className="test-card-button">Book Test</Button></div></CardBody>
                            
                        </Card>
                    </Col>)}
                </Row>
                </Container>
                </div>
    </>
        )
}