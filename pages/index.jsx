import React,{useEffect,useState, useRef} from 'react'
import{Container,
    Col,
    Row,
    Card,
    CardTitle,
    CardBody,
    CardText,
    CardFooter,
    FormGroup,
    Input,
    CardSubtitle,
    Label} from "reactstrap"
import ImgCarousel from "../components/carousel.component"
import "../assets/css/index.scss"
import NavBar from "../components/navbar.component"
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import SliderDetails from "../components/sliderdetails.component"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button  from "@material-ui/core/Button"
import "../assets/css/animate.scss";
import Blog from "../components/blog.component"
import HealthCheckCarousel from "../components/healthcheckcarousel.component"
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from "../components/footer.component"
import {apiLinks} from "../connection.config"
import axios from 'axios'
import {useRouter} from "next/router"
import 'reactjs-popup/dist/index.css';




const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}})
        if (response.data[0].code === 200){
            return Object.values(response.data[1])
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
    }
}

const getCovidTestData = async ()=>{
    try{
        const covidTestsResponse = await axios.get(apiLinks.getCovidTests)
    if(covidTestsResponse.data.code === 200){
        return covidTestsResponse.data.data
    }
    else{
        return []
    }
    }
    catch(err){
        console.log(err)
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

export async function getServerSideProps(context) {
    try{
    return { props: {packages: await getPackagesData(),covidTests: await getCovidTestData(),testList: await getTestListData()} };
    }
    catch(err){
        console.log(err)
        return { props: {packages:[],covidTests:[],testList:[]} };
    }
  }





export default function Home(props) {
    let navRef = useRef(null);
    const [testList,setTestList] = useState(props.testList)
    const [radioValue,setRadioValue] = useState(null);
    const [selectedTest,setSelectedTest] = useState(null);
    const [otpVerification,setOtpVerification] = useState(false);
    const [mobile,setMobile] = useState(null)
    const [downloadReport,setDownloadReport] = useState(true)
    const [covidTests,setCovidTests] = useState(props.covidTests)
    const [packages,setPackages] = useState(props.packages)
    const router = useRouter()

    
    const handleMouseOver =(event,num)=>{
        document.getElementById("flipcard2")
        switch (num){
            case 1:
                event.target.innerHTML = `<CardBody className="text-center"><CardText className="features-body-text">APT Diagnostics with its in house industry leading infrastructure provides the reports, you can truly count upon.</CardText></CardBody>`
                document.getElementById("flipcard2").innerHTML = `<CardBody className="text-center"><CardTitle>24/7 Processing</CardTitle><CardText className="features-body-text">Because your time is important to us</CardText></CardBody>`
                document.getElementById("flipcard3").innerHTML = `<CardBody className="text-center"><CardTitle>Easy Appointment Scheduling</CardTitle><CardText className="features-body-text">Quality Experience That Lasts</CardText></CardBody>`
                break;
            case 2:
                document.getElementById("flipcard1").innerHTML = `<CardBody className="text-center"><CardTitle>Best in class testing</CardTitle><CardText className="features-body-text">Reports you can count upon</CardText></CardBody>`
                event.target.innerHTML = `<CardBody className="text-center"></CardBody>`
                document.getElementById("flipcard3").innerHTML = `<CardBody className="text-center"><CardTitle>Easy Appointment Scheduling</CardTitle><CardText className="features-body-text">Quality Experience That Lasts</CardText></CardBody>`
                break;
            case 3:
                document.getElementById("flipcard1").innerHTML = `<CardBody className="text-center"><CardTitle>Best in class testing</CardTitle><CardText className="features-body-text">Reports you can count upon</CardText></CardBody>`
                document.getElementById("flipcard2").innerHTML = `<CardBody className="text-center"><CardTitle>24/7 Processing</CardTitle><CardText className="features-body-text">Because your time is important to us</CardText></CardBody>`
                event.target.innerHTML = ``
                break;
        }
    }    

    const retryOTPHandler = ()=>{

    }

    const handleOTPVerification =()=>{
        setOtpVerification(false)
        router.push("/payments/confirm")
    }

    const bookAppointmentHandler = ()=>{
        const mobile = document.getElementById("appointmentBookingMobilenumber").value
        setMobile(mobile)
        sessionStorage.setItem("directBooking",`${JSON.stringify({
            appointmentType : radioValue,
            test:selectedTest,
            contact:mobile
        })}`)
        
        setOtpVerification(true)
    }

    
const items = [
    {
      src: "images/packages/corporate.jpg",
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: "images/packages/body_building.jpg",
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: "images/packages/diabetes.jpg",
      altText: 'Slide 3',
      caption: 'Slide 3'
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
      src: "images/packages/pregnancy.jpg",
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
  


    useEffect(() => {

        // getData()

        const fadeInLeft = document.querySelectorAll(".ioleft")
        const fadeInRight = document.querySelectorAll(".ioright")
        const fade = document.querySelectorAll(".iofade")
        const observer1 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ?item.target.style.animation = `fadeInLeft 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        const observer2 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ?item.target.style.animation = `fadeInRight 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        const observer3 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ?item.target.style.animation = `fadeIn 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        
        
        
            fadeInLeft.forEach(item=>observer1.observe(item))
            fadeInRight.forEach(item=>observer2.observe(item))
            fade.forEach(item=>observer3.observe(item))
        

    },[])
    
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


    return (<React.Fragment>

                <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
{/* otp window */}
                {otpVerification?<div className="otp-verification-window"><Card className="otp-verification-card">
                        <CardBody>
                            <CardTitle className="text-center">Verify OTP</CardTitle>
                            <CardText>An OTP has been sent to {mobile} !</CardText> 
                            <FormGroup>
                                <Label for="otpField">Please Enter Your OTP</Label>
                                <Input id="otpFiled" type="text" />
                            </FormGroup>
                            <CardSubtitle>Not Recieved an OTP <span onClick={()=>{retryOTPHandler()}}>Retry! </span> </CardSubtitle>
                            <div className="text-center"><Button onClick={()=>{handleOTPVerification()}} variant="outlined" style={{color:"rgba(18, 73, 124,1)",margin:"5px",fontWeight:"600",fontSize:"0.9rem",borderColor:"rgba(18, 73, 124,1)"}}>Verify</Button></div>
                        </CardBody>
                    </Card></div>:<React.Fragment/>}
{/* carousel and instant schedule part */}
                <div className="carousel-index-container">
                <Container className="mt-3" >
                    <Row>
                        <Col md="12" lg="8" className="mt-4 mb-4 ioleft">
                            <ImgCarousel data={items}/>
                        </Col>
                        <Col lg="4" md="0" className="mt-4 mb-4">
                        <Row className="ml-1 mr-1"><Col>
                            <Card className="indexCarouselCard ioright">
                            {testList === null ?<div className="align-center-column" style={{height:"100%"}}><CircularProgress color="secondary" /></div>: <CardBody>
                                <Row>
                                    <Col>
                                        <h4 className="text-center mt-1 report-heading">Book An Appointment</h4>
                                    </Col>
                                </Row>
                                
                                <RadioGroup>
                                <Row>
                                    <Col xs="6">
                                        <FormControlLabel
                                        value="home"
                                        control={<Radio onChange={(event)=>{setRadioValue(event.target.value)}} />}
                                        style={{textAlign:"center",color:"#0a4275",fontWeight:"700"}}
                                        label="Home Appointment"
                                        name="appointmentType"
                                        labelPlacement="bottom"
                                        
                                        />
                                    </Col>
                                    <Col xs="6">
                                        <FormControlLabel
                                        value="lab"
                                        control={<Radio onChange={(event)=>{setRadioValue(event.target.value)}} />}
                                        style={{textAlign:"center",color:"#0a4275"}}
                                        label="Lab Appointment"
                                        name="appointmentType"
                                        labelPlacement="bottom"
                                        />
                                    </Col>
                                </Row>
                                </RadioGroup>
                                <Row  className="ml-1 mr-1 mt-2 mb-3" >
                                    <Col className="division">
                                    </Col>
                                </Row>
                                <Row  className="ml-1 mr-1 mt-2" >
                                    <Col md="2" className="align-center-column">
                                            <img style={{color:"#094275",height:"2.7rem",width:"2.7rem",padding:0,margin:0}} src="images/tests_icon.svg"/>
                                    </Col>
                                    <Col className="search-widget" md="10">
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={testList}
                                            getOptionLabel={(option) => option["testName"]}
                                            style={{ width: "100%"}}
                                            onChange = {(event,value)=>{setSelectedTest(value)}}
                                            renderInput={(params) => <TextField {...params} placeholder="Find Your Test" size="small" variant="outlined" />}
                                            />
                                        <div className="results">
                                            
                                        </div>
                                    </Col>
                                </Row>
                                <Row  className="ml-1 mr-1 mt-2 mb-3" >
                                    <Col className="division">
                                    </Col>
                                </Row>
                                <Row  className="ml-1 mr-1 mt-2" >
                                    <Col md="2" className="align-center-column">
                                    {/* <CallIcon style={{color:"#ff6363",height:"2.7rem",width:"2.7rem",padding:0,margin:0}}/> */}
                                    <img style={{color:"#094275",height:"2.7rem",width:"2.7rem",padding:0,margin:0}} src="images/phonenumber_icon.svg"/>
                                    </Col>
                                    <Col md="10"><TextField id="appointmentBookingMobilenumber" type="number" size="small" pattern="[0-9]{10}" placeholder="Your Contact Number!" variant="outlined" /></Col>
                                </Row>
                                <Row  className="ml-1 mr-1 mt-2 mb-3" >
                                    <Col className="division">
                                    </Col>
                                </Row>
                                <Row  className="ml-1 mr-1 mt-2 mb-1" >
                                    <Col className="align-center-column">
                                <Button onClick={()=>{bookAppointmentHandler()}} variant="contained" style={{width:"100%",color:"#fff !important",background:"linear-gradient(to right, #8faec9, #175d9c, #3375b0, #8faec9) !important"}} >Book Now</Button>
                                    </Col>
                                </Row>
                                {/* background:"#ababab" ,color:"white"*/}
                            </CardBody>

                            }</Card>
                            </Col></Row>

                        </Col>

                    </Row>
                </Container>
                </div>     
{/* Our features card */}
            <Container>
                    <Row>
                    <Col><Card className="features-card">
                        <Row><Col className="landing-h2 iofade">Our Features</Col></Row>
                        <Row>
                            <Col md="4">
                            <div className="card_flip">
                            <div className="card__inner">
                                <div className="card__content card_content--front">
                                <CardTitle style={{color:"#fff"}}>Best in class testing</CardTitle><CardText className="features-body-text">Reports you can count upon</CardText>
                                </div>
                                <div className="card__content card__content--back">
                                <CardText className="features-body-text">APT Diagnostics with its in house industry leading infrastructure provides the reports, you can truly count upon.</CardText>
                                </div>
                            </div>
                            </div>
                            </Col>
                            <Col md="4">
                            <div className="card_flip">
                            <div className="card__inner">
                                <div className="card__content card_content--front">
                                <CardTitle  style={{color:"#fff"}}>24/7 Processing</CardTitle><CardText className="features-body-text">Because your time is important to us</CardText>
                                </div>
                                <div className="card__content card__content--back">
                                <CardText className="features-body-text">With our testing facilities running 24/7, we process the reports throughout the day so that you get your results on time.</CardText>
                                </div>
                            </div>
                            </div>
                            </Col>
                            <Col md="4">
                            <div className="card_flip">
                            <div className="card__inner">
                                <div className="card__content card_content--front">
                                <CardTitle  style={{color:"#fff"}}>Easy Appointment Scheduling</CardTitle><CardText className="features-body-text">Quality Experience That Lasts</CardText>
                                </div>
                                <div className="card__content card__content--back">
                                <h2><CardText className="features-body-text">Booking appointments before hand for home collections and walk in is as easy as marking the date on the calendar with our seamless and highly scalable booking platform.</CardText></h2>
                                </div>
                            </div>
                            </div>
                            </Col>
                            {/* <Col md="4"><Card id="flipcard1" onMouseOver={(event)=>{handleMouseOver(event,1)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col>
                            <Col md="4"><Card id="flipcard2" onMouseOver={(event)=>{handleMouseOver(event,2)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col>
                            <Col md="4"><Card id="flipcard3" onMouseOver={(event)=>{handleMouseOver(event,3)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col> */}

                        </Row>
                        </Card>
                    </Col>
                    </Row>
                </Container>

{/* covid 19 cards */}
                <Container style={{overflowX:"hidden"}}>
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4 iofade">
                            SARS-CoV-2 Tests
                        </h2>
                    </Col>
                </Row>
                <Row className="ml-2 mr-2"> 
                {covidTests === null ? <React.Fragment/> : covidTests.map(item=><Col key={item.testID}>
                        <Card onClick={()=>{location.href=`/covid/${item.testID}`}} className="test-card">
                            <CardTitle className="text-center card-title mt-1">{item.testName}</CardTitle>
                            <CardBody >
                                <CardText className="body-text">{item.details}</CardText>
                            <div className="align-center-row "><Button onClick={(event)=>{addToCart(event,item)}} variant="outlined" className="test-card-button">Book Test</Button></div></CardBody>
                            
                        </Card>
                    </Col>)}
                </Row>
                </Container>
{/* organ slider */}
                <Container>
                    <SliderDetails updateCartValue={props.updateCartValue} testList={testList}/>
                </Container>
{/* packages carousel */}
                <Container>
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4 iofade">
                            Our Curated Heath Packages
                        </h2>
                    </Col>
                </Row>
                    {packages === null? React.Fragment :<HealthCheckCarousel updateCartValue={props.updateCartValue}  data={packages}/>}
                </Container>
{/* accreditations */}
                {/* <div className="accreditations">
                <Container fluid>
                    <Row>
                        <Col className="text-center iofade mt-4">
                                <img style={{height:"50px",width:"50px",borderRadius:"50%",background:"#fff",padding:"5px"}} src="svg/diamond.svg" alt="icon" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <h2 className="iofade mb-3 mt-1">
                            Accreditations
                        </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <Row className="accreditations-container">
                                <Col>
                                    <img className="ioleft" src="images/accreditation.png"></img>
                                </Col>
                                <Col>
                                    <img className="iofade" src="images/accreditation.png"></img>
                                </Col>
                                <Col>
                                    <img className="ioright" src="images/accreditation.png"></img>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                </div> */}
{/* reviews */}
                {/* <Container className="reviews-container">
                    <Row>
                        <Col>
                            <h2 className=" landing-h2-dark mt-4 mb-5 iofade">
                                Testimonials
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <Row>
                                    <Col md="3">
                                    <h1 className="ioleft color">“</h1>
                                    </Col>
                                    <Col md="9">
                                        <p className="ioleft symptoms-text text-right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius incidunt recusandae quidem ut soluta, minima alias eum illum suscipit quis cum doloribus beatae, enim ipsum, porro rem inventore debitis quaerat nisi odio earum reprehenderit sit molestiae? Quia est odio ipsum!</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="align-center-row">
                                        <h5 className="ioright card-title">Lorem ipsum dolar, FOUNDER</h5>
                                    </Col>
                                </Row>
                        </Col>
                        <Col>
                                <Row>
                                    <Col md="9">
                                        <p className="ioright symptoms-text text-left">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consequatur cupiditate laboriosam assumenda porro neque ratione recusandae earum fugiat suscipit quos, aliquid, velit dicta repellendus aut tempora perferendis. Voluptatibus totam quas fugit unde, repudiandae, quaerat corporis sed dolorem laudantium maiores iusto hic neque aperiam voluptas, nulla exercitationem excepturi optio non.
                                        </p>
                                    </Col>
                                    <Col md="3">
                                    <h1 className="ioright color">”</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="align-center-row">
                                        <h5 className="ioright card-title">Lorem ipsum ipsum.CUSTOMER</h5>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Container> */}
{/*blogs*/}
                <div className="blogs-holder">
                <Container className="blogs-container">
                    <Row>
                        <Col>
                            <h4 className="text-center mt-3 mb-3 blog-heading">Blogs</h4>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                                <Blog bgcolor="#0a4275" color="#fff"/>
                        </Col>
                        <Col>
                                <Blog bgcolor="#0a4275" color="#fff"/>
                        </Col>
                        <Col>
                                <Blog bgcolor="#0a4275" color="#fff"/>
                        </Col>
                    </Row>
                </Container>
                </div>
{/* footer */}
                <div style={{height:"100vh"}}>
                    <Footer/>
                </div>

            </React.Fragment>
    )
}



            //     {/* <Container>
            //     <Row>
            //         <Col>
            //             <Card className="our_features_card">
            //                 <h4 className="text-center">Our Features</h4>
            //                 <Row>
            //                     <Col md="4">
            //                         {/* <img src="/svg/aptIcons/light/Healthy_Notification.svg"/> */}
            //                         <h5 style={{color:"#0a4275"}} className="text-center">Best in class testing</h5>
            //                         {/* <img src="/images/download_icon.svg" /> */}
            //                         <h6 className="text-center" style={{color:"#0a4275"}}>Reports you can count upon</h6>
            //                         <p style={{fontSize:"0.9rem",fontWeight:"700",textAlign:"center",lineHeight:"17px",color:"#000"}}>
            //                         APT Diagnostics with its in house industry leading infrastructure provides the reports, you can truly count upon.
            //                         </p>
            //                     </Col>
            //                     <Col md="4">
            //                         {/* <img src="/svg/aptIcons/light/Healthy_Notification.svg"/> */}
            //                         <h5 style={{color:"#0a4275"}} className="text-center">24/7 Processing</h5>
            //                         {/* <img src="/images/download_icon.svg" /> */}
            //                         <h6 className="text-center" style={{color:"#0a4275"}}>Because your time is important to us</h6>
            //                         <p style={{fontSize:"0.9rem",fontWeight:"700",textAlign:"center",lineHeight:"17px",color:"#000"}}>
            //                         With our testing facilities running 24/7, we process the reports throughout the day so that you get your results on time.
            //                         </p>
            //                     </Col>
            //                     <Col md="4">
            //                         {/* <img src="/svg/aptIcons/light/Healthy_Notification.svg"/> */}
            //                         <h5 style={{color:"#0a4275"}} className="text-center">Easy Appointment Scheduling</h5>
            //                         {/* <img src="/images/download_icon.svg" /> */}
            //                         <h6 className="text-center" style={{color:"#0a4275"}}>Quality Experience That Lasts</h6>
            //                         <p style={{fontSize:"0.9rem",fontWeight:"700",textAlign:"center",lineHeight:"17px",color:"#000"}}>
            //                         Booking appointments before hand is as easy as marking the date on the calendar with our seamless booking platform.
            //                         </p>
            //                     </Col>
            //                 </Row>
            //             </Card>
            //         </Col>
            //     </Row>
            // </Container> */}