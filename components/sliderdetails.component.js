import React,{useState,useEffect} from 'react'
import CenterMode from "./centermodecarousel.component"
import {Row,Col,Container} from "reactstrap"
import "../assets/css/sliderwithdetails.scss"
import Button from '@material-ui/core/Button';

import { CSSTransition ,SwitchTransition } from 'react-transition-group';


export default function SliderDetails() {
    const [currSlide,setCurrSlide] = useState(0);

    const data = [{
        name:"lorem",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"ipsum",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing  ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },,
            {
                name:"Lorem ipsum",
            },
        ]
    },
        {name:"lorem",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"lorem",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"dolar",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },,
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"sit",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"amet",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },,
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"lorem",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"ipsum",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },,
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"dolor",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"sit",
        symptoms:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ipsam dolore aspernatur facilis neque aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, minus? Molestiae illo inventore, consectetur voluptatibus molestias tempora porro dolorem sed nostrum at veniam dolor nam, facilis id architecto ipsum, animi totam! Aliquid, magni deserunt. Molestiae, nihil qui laborum sunt ab dignissimos, voluptates fugiat voluptate, ",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },{
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    }]

    const cards = (item)=>{

        return(
            <Row>
                <Col className="align-center-column mt-1 mb-1 ioright">
                <div className="centermode-testcard">
                    <div>{item.name}</div>
                    <span onClick={()=>{}}>Book</span>
                </div>
                </Col>
                <Col className="align-center-column mt-1 mb-1 ioright">
                <div className="centermode-testcard">
                    <div>{item.name}</div>
                    <span onClick={()=>{}}>Book</span>
                </div>
                </Col>
            </Row>
            
        )
    }


    return (
        <div className="sliderwithdetails">
            <Row>
                <Col>
                    <h4 className="text-center color mt-2 iofade">Diagnose For Specific Organ </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CenterMode setSlide={setCurrSlide}/>            
                </Col>
            </Row>
            {/* <SwitchTransition>
          <CSSTransition
            key={currSlide}
            timeout={500}
            classNames="messagefade"
          > */}
            <Row>
                <Col >
                    <h4 className="text-center iofade color">{data[currSlide].name}</h4>
                </Col>
            </Row>
            {/* </CSSTransition></SwitchTransition> */}
            <Container className="border mb-4" fluid>
            {/* <SwitchTransition>
          <CSSTransition
            key={currSlide}
            timeout={500}
            classNames="messagefade"
          > */}
            
            <Row >
                <Col md="6">
                    <Row>
                        <Col>
                            <h5 className="text-center iofade color">Symptoms</h5>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="ioleft" style={{overflow:"hidden",height:"250px"}}>
                            {data[currSlide].symptoms}
                            
                        </Col>
                    </Row>
                </Col>
                <Col md="6">
                    <Row>
                        <Col>
                            <h5 className="text-center color iofade">Tests</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        
                        {data[currSlide].tests.map(item=>cards(item))}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* </CSSTransition> */}
            
            {/* </CSSTransition></SwitchTransition> */}
              
            {/* <SwitchTransition>
          <CSSTransition
            key={currSlide}
            timeout={500}
            classNames="messagefade"
          > */}
            <Row>
                <Col className="align-center-column mt-2 mb-1 iofade">
                    <Button color="primary" onClick={()=>{}} variant="contained" >Want to Know More!</Button>
                </Col>
            </Row>
            {/* </CSSTransition></SwitchTransition> */}
            </Container>
        </div>
    )
}
