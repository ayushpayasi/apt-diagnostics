import React, {useState} from "react"
import {Row,Col,Container,Collapse,CardTitle,CardBody,CardFooter} from "reactstrap"
import SmallNavbar from "../../components/smallnavbar.component"
import "../../assets/css/tests.scss"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded"
import Card from "@material-ui/core/Card"
import {apiLinks} from "../../connection.config"
import ReportSlider from "../../components/slider.component"
import axios from "axios"

let dataLi=[]


export const getStaticPaths = async () =>{
    try{
    const response = await axios.get(apiLinks.getAllFeaturedTests)
    dataLi =[]
    if(response.data.code === 200){
        dataLi = response.data.data
    }
    const paths = dataLi.map(item=>{
        return{
            params:{name:item.testName}
        }
    })
    return{
        paths,
        fallback:false
    }
}
    catch(err){
        return {
            paths:[],
            fallback:false
                }       
                }
    }

export const getStaticProps = async (context)=>{
    try{
    const name = context.params.name
    let data = {}
    const response = await axios.get(apiLinks.getAllFeaturedTests)
    dataLi =[]
    if(response.data.code === 200){
        dataLi = response.data.data
    }
    for(let i of dataLi){
        if (i.testName == name){
            data = i
            break
        }
    }

    return{
        props:{details:data}
    }
    }catch(e){console.log(e)}
}

export default function Details({details}){
    const [isOpen,setIsOpen] = useState(false);
    const fillFaq = ()=>{
        return details.faq.map((item)=>{
           const s = Object.keys(item)[0].replace(/([A-Z])/g, ' $1').trim() +"?"
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
                <Row className="mt-5">
                    <Col className="border p-2">
                        <Row>
                            <Col sm="2" className="align-center-row"><h2 style={{margin:0,padding:0}}>FAQ's</h2></Col>
                            <Col sm="1" className="align-center-column"><IconButton style={{boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.5)"}} onClick={toggle}><ArrowDownwardRounded style={{height:"25px",width:"25px",color:"#0a4275"}}/></IconButton></Col>
                        </Row>
                        <Collapse isOpen={isOpen}>
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
        <ReportSlider data={dataLi}/>
        </Container>
    </>
)
}