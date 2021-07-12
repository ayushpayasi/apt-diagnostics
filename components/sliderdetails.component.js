import React,{useState,useEffect} from 'react'
import CenterMode from "./centermodecarousel.component"
import {Row,Col,Container,List, Link} from "reactstrap"
import "../assets/css/sliderwithdetails.scss"
import Button from '@material-ui/core/Button';

import { CSSTransition ,SwitchTransition } from 'react-transition-group';


export default function SliderDetails() {
    const [currSlide,setCurrSlide] = useState(0);

    const data = [{
        name:"Heart",
        symptoms:"A feeling of indigestion,Anxiety and restlessness,Backache,Difficulty feeding and poor weight gain in infants,Erectile dysfunction,Fatigue,Mild, transient shortness of breath with exertion,Mild weakness and feeling lightheaded,Nausea and vomiting,Pain, numbness, and mild swelling in the feet and ankles,Pale skin with or without sweating,Wet cough",
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
        name:"Liver",
        symptoms:"fever, tiredness or weakness, yellowing of the skin and eyes(known as jaundice) ,dark urine ,pale stool ,nausea and vomiting ,pain under the ribs on the right side of the body",
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
        {name:"Brain",
        symptoms:"headaches, seizures, numbness or tingling in your arms or legs, nausea, vomiting, changes in personality, difficulty with movement or balance, changes in your hearing or speech or vision",
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
        name:"Reproductive System",
        symptoms:"Abdominal or pelvic mild discomfort, Frequent urination, A feeling of urgency to urinate, Feeling of abdominal or pelvic pressure, Tenderness, Intense pain in the bladder or pelvic region",
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
        name:"Lungs",
        symptoms:"Difficulty in Breathing, Stubborn Cough, Breathing Noisily, Lingering Chest Pain, Chronic Mucus, Coughing Up Blood",
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
        name:"kidney",
        symptoms:"Decreased urine output, Fluid retention- causing swelling in your legs or ankles or feet, Shortness of breath, Fatigue, Confusion, Nausea, Weakness, Irregular heartbeat",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"Thyroid Gland",
        symptoms:"High Heart Rate,Excessive Tiredness, Anxiety, Weight Gain or Loss, Body Shakes, Feeling Chilly or Overheated, Trouble Concentrating, Hair Loss",
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
        name:"Allergy",
        symptoms:"Dust and pollen, a blocked or congested nose, itchy eyes and nose, a runny nose, swollen and watery eyes, a cough",
        tests:[
            {
                name:"Lorem ipsum",
            },
            {
                name:"Lorem ipsum",
            },
        ]
    },{
        name:"Vitamins",
        symptoms:"Brittle hair and nails ( vitamin B7 deficiency), Mouth ulcers or cracks in the corners of the mouth( vitamin B deficiency), Bleeding gums( vitamin C deficiency), Poor night vision and white growths on the eyes( vitamin A deficiency), Scaly patches and dandruff Hair loss, Red or white bumps on skin, Restless leg syndrome( iron deficiency)",
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

    const changePage = () => {

    }


    return (
        <div className="sliderwithdetails">
            <Row>
                <Col>
                    <h2 className=" landing-h2 text-center color mt-4 mb-4 iofade">Diagnose For Specific Organ </h2>
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
                    <h4 className="text-center card-title mt-4 mb-4 iofade color">{data[currSlide].name}</h4>
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
                            <h4 className="text-center card-title mt-4 mb-4 iofade color">Symptoms</h4>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="ioleft symptoms-text">
                            {data[currSlide].symptoms.split(",").map( curSymptom => {
                                return (
                                    <List type="unstyled">
                                        <ul>
                                            <li>{curSymptom}</li>
                                        </ul>
                                    </List>
                                )
                            })}
                            
                        </Col>
                    </Row>
                </Col>
                <Col md="6">
                    <Row>
                        <Col>
                            <h4 className="text-center card-title color mt-4 mb-4 iofade">Tests</h4>
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
                <Col className="align-center-column mt-4 mb-4 iofade">
                    <Button color="primary" href={`/diagnostics/${data[currSlide].name.split(" ").join("").toLowerCase()}`} variant="contained" >Want to Know More!</Button>
                </Col>
            </Row>
            {/* </CSSTransition></SwitchTransition> */}
            </Container>
        </div>
    )
}
