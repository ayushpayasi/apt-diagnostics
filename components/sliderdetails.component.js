import React,{useState, useEffect, useCallback} from 'react'
import CenterMode from "./centermodecarousel.component"
import {Row,Col,Container,List, Link} from "reactstrap"
import "../assets/css/sliderwithdetails.scss"
import Button from '@material-ui/core/Button';



export default function SliderDetails(props) {
    const [currSlide,setCurrSlide] = useState(0);
    const [cart, setCart] = useState([]);

    const data = [
        {
        testName:"Allergy",
        symptoms:"Dust and pollen, a blocked or congested nose, itchy eyes and nose, a runny nose, swollen and watery eyes, a cough",
        tests:[]
    },{
        testName:"Brain",
        symptoms:"headaches, seizures, numbness or tingling in your arms or legs, nausea, vomiting, changes in personality, difficulty with movement or balance, changes in your hearing or speech or vision",
        tests:[]
    },{
        testName:"Reproductive System",
        symptoms:"Abdominal or pelvic mild discomfort, Frequent urination, A feeling of urgency to urinate, Feeling of abdominal or pelvic pressure, Tenderness, Intense pain in the bladder or pelvic region",
        tests:[]
    },{
        testName:"Heart",
        symptoms:"A feeling of indigestion,Anxiety and restlessness,Backache,Difficulty feeding and poor weight gain in infants,Erectile dysfunction,Fatigue,Mild, transient shortness of breath with exertion,Mild weakness and feeling lightheaded,Nausea and vomiting,Pain, numbness, and mild swelling in the feet and ankles,Pale skin with or without sweating,Wet cough",
        tests:[]
    },{
        testName:"kidney",
        symptoms:"Decreased urine output, Fluid retention- causing swelling in your legs or ankles or feet, Shortness of breath, Fatigue, Confusion, Nausea, Weakness, Irregular heartbeat",
        tests:[]
    },{
        testName:"Liver",
        symptoms:"fever, tiredness or weakness, yellowing of the skin and eyes(known as jaundice) ,dark urine ,pale stool ,nausea and vomiting ,pain under the ribs on the right side of the body",
        tests:[]
    },{
        testName:"Lungs",
        symptoms:"Difficulty in Breathing, Stubborn Cough, Breathing Noisily, Lingering Chest Pain, Chronic Mucus, Coughing Up Blood",
        tests:[]
    },
    {
        testName:"Vitamins",
        symptoms:"Brittle hair and nails ( vitamin B7 deficiency), Mouth ulcers or cracks in the corners of the mouth( vitamin B deficiency), Bleeding gums( vitamin C deficiency), Poor night vision and white growths on the eyes( vitamin A deficiency), Scaly patches and dandruff Hair loss, Red or white bumps on skin, Restless leg syndrome( iron deficiency)",
        tests:[]
    },
    // {
    //     testName:"Vitamins",
    //     symptoms:"Brittle hair and nails ( vitamin B7 deficiency), Mouth ulcers or cracks in the corners of the mouth( vitamin B deficiency), Bleeding gums( vitamin C deficiency), Poor night vision and white growths on the eyes( vitamin A deficiency), Scaly patches and dandruff Hair loss, Red or white bumps on skin, Restless leg syndrome( iron deficiency)",
    //     tests:[]
    // },
    {
        testName:"Thyroid",
        symptoms:"High Heart Rate,Excessive Tiredness, Anxiety, Weight Gain or Loss, Body Shakes, Feeling Chilly or Overheated, Trouble Concentrating, Hair Loss",
        tests:[]
    }
        ]

    for (var i of props.testList){
        switch (i.testCode){
            case "Allergy":
                data[0].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Brain":
                data[1].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Reproductive System":
                data[2].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Heart":
                data[3].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Kidney":
                data[4].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Liver":
                data[5].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Lungs":
                data[6].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Vitamins":
                data[7].tests.push({testName:`${i.testName}`,data:i})
                break;
            case "Thyroid":
                data[9].tests.push({testName:`${i.testName}`,data:i})
                break;
        }
    }
    
    // console.log(data)

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);
    }, []);

        
    const addToCart = useCallback((event, product)=>{
        event.stopPropagation();
        
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart === null ? [] : cart;
        let existing = cart.filter(item => item.testID === product.testID);

        // document.getElementById(`sars-test-${product.testID}`).innerText = 'Added';

        if(existing && existing.length){
            window.alert('Item Already added to cart!');
        }else{
            cart.push(product);
            props.updateCartValue(cart.length);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

    }, []);

    const cards = (item, index) => {
        return(
                <Col key={index} className="align-center-column mt-1 mb-1" sm="6" md="6">
                    <div className="centermode-testcard">
                        <div>{item.testName}</div>
                        <span onClick={(event)=>{addToCart(event, item)}}>Book</span>
                    </div>
                </Col>
        )
    }

    const changePage = () => {

    }

    return (
        <div className="sliderwithdetails">
            <Row>
                <Col className="diagnose-div-margin">
                    <h2 className=" landing-h2 text-center color mt-4 mb-4 iofade container-card-title">Diagnose For Specific Organ </h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CenterMode setSlide={setCurrSlide}/>            
                </Col>
            </Row>

            <Row>
                <Col >
                    <h4 className="text-center card-title mt-4 mb-4 iofade color">{data[currSlide].testName}</h4>
                </Col>
            </Row>

            <Container className="border mb-4" fluid>
                <Row className="symptoms-container small-size-grow small-size-hide">
                    <Col md="6">
                        <Row>
                            <Col>
                                <h4 className="text-center card-title mt-4 mb-4 iofade color container-card-title">Symptoms</h4>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="ioleft symptoms-text" style={{paddingLeft: "18px"}}>
                                {/* {console.log(data[currSlide])} */}
                                {data[currSlide].symptoms.split(",").map( (curSymptom, index) => {
                                    return (
                                        <List type="unstyled" key={index}>
                                            <ul>
                                                <li>{curSymptom}</li>
                                            </ul>
                                        </List>
                                    );
                                })}
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6" sm="12">
                        <Row>
                            <Col>
                                <h4 className="text-center card-title color mt-4 mb-4 iofade container-card-title">Tests</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ioright symptoms-text">
                                <Row className="tests-view-tablet">
                                {/* {data[currSlide].tests.map(item=>cards(item))} */}
                                {[  {testID: 1, testName: "h1"}, {testID: 2, testName: "h2"}, 
                                    {testID: 1, testName: "h1"}, {testID: 2, testName: "h2"},
                                    {testID: 1, testName: "h1"}, {testID: 2, testName: "h2"},
                                    {testID: 1, testName: "h1"}, {testID: 2, testName: "h2"},
                                    {testID: 1, testName: "h1"}, {testID: 2, testName: "h2"},
                                ].map((item, index) => cards(item, index))}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="big-size-hide">
                    <Col>
                        <Row>
                            <Col>
                                <h4 className="text-center card-title mt-4 mb-4 iofade color container-card-title">Symptoms</h4>
                            </Col>
                        </Row>
                        <Row className="mobile-view-symptoms">
                            <Col className="ioleft symptoms-text" style={{paddingLeft: "18px"}}>
                                {/* {console.log(data[currSlide])} */}
                                {data[currSlide].symptoms.split(",").map( (curSymptom, index) => {
                                    return (
                                        <List type="unstyled" key={index}>
                                            <ul>
                                                <li>{curSymptom}</li>
                                            </ul>
                                        </List>
                                    );
                                })}
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h4 className="text-center card-title color mt-4 mb-4 iofade container-card-title">Tests</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="iofade symptoms-text">
                                <Row>
                                {/* {data[currSlide].tests.map(item=>cards(item))} */}
                                {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((item, index) => cards(item, index))}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="align-center-column mt-4 mb-4 iofade">
                        <Button style={{background : "#175d9c", color:"#fff"}} href={`/diagnostics/${data[currSlide].testName.split(" ").join("").toLowerCase()}`} variant="contained" >Want to Know More!</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
