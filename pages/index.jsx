import Head from 'next/head'
import React,{useEffect,useState, useRef, useCallback} from 'react';
import{ Container, Col, Row, Card, CardTitle, CardBody, CardText, 
        CardFooter, FormGroup, Input, CardSubtitle, Label} from "reactstrap";
import axios from 'axios';
import {useRouter} from "next/router";
import 'reactjs-popup/dist/index.css';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

import RadioGroup from          '@material-ui/core/RadioGroup';
import Radio from               "@material-ui/core/Radio";
import FormControlLabel from    "@material-ui/core/FormControlLabel";
import TextField from           '@material-ui/core/TextField';
import Button  from             "@material-ui/core/Button";
import CircularProgress from    '@material-ui/core/CircularProgress';
import Autocomplete from        '@material-ui/lab/Autocomplete';
import CancelIcon from          '@material-ui/icons/Cancel';

import ImgCarousel from "../components/carousel.component";
import NavBar from "../components/navbar.component";
import SliderDetails from "../components/sliderdetails.component";
import Blog from "../components/blog.component"
import HealthCheckCarousel from "../components/healthcheckcarousel.component";
import Footer from "../components/footer.component";

import "../assets/css/index.scss";
import "../assets/css/animate.scss";

import {apiLinks} from "../connection.config";


const removeOtp = () => {
    sessionStorage.removeItem('verificationOtp');
}

const sendOtp = async (mobile) => {
    try{
        const response = await axios.get(apiLinks.sendUserOtp, {params: {mobile: `${mobile}`}});
        const data = response.data;
        if(!data.isValidPhone){
            toast.error('Enter a valid 10 digit contact number', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        else{
            sessionStorage.setItem('verificationOtp', JSON.stringify({code: data.codeData, contact: data.mobile}));
            setTimeout(removeOtp, 150000);
        }
    }catch(err){
        console.log(err);
        toast.error('Something went wrong, try again!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
}

const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList, {params:{coupon:"priceList"}});
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

const getCovidTestData = async () => {
    try{
        const covidTestsResponse = await axios.get(apiLinks.getCovidTests);
        if(covidTestsResponse.data.code === 200){
            return covidTestsResponse.data.data;
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}

const getPackagesData = async () => {
    try{
        const packagesResponse = await axios.get(apiLinks.getPackages);
        if(packagesResponse.data.code === 200){
            return packagesResponse.data.data;
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function getServerSideProps(context) {
    try{
    return { props: {packages: await getPackagesData(), 
            covidTests: await getCovidTestData(),
            testList: await getTestListData()} 
        };
    }
    catch(err){
        console.log(err);
        return { props: {packages:[], covidTests:[], testList:[]} };
    }
}

export default function Home(props) {

    let navRef = useRef(null);

    const [covidTests, setCovidTests] = useState(props.covidTests);
    const [packages, setPackages] = useState(props.packages);
    const [testList, setTestList] = useState(props.testList);

    const [radioValue, setRadioValue] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [mobile, setMobile] = useState(null);

    const [otpVerification, setOtpVerification] = useState(false);
    const [downloadReport, setDownloadReport] = useState(true);

    const [cart, setCart] = useState([]);

    const router = useRouter();

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

    const checkPass = async (code, otpCode) => {
        const isValid = await bcrypt.compare(code, otpCode);
        // console.log(isValid);
        return (isValid);
    }

    const showRetryOtp = () => {
        document.getElementById('otpTimerShow') && (document.getElementById('otpTimerShow').style.visibility = 'visible');
    }

    const retryOTPHandler = () => {
        const mobile = document.getElementById("appointmentBookingMobilenumber").value;
        if(mobile.length !== 10) {
            toast.error('Enter a valid 10 digit contact number', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        else{
            document.getElementById('otpTimerShow') && (document.getElementById('otpTimerShow').style.visibility = 'hidden');
            sendOtp(mobile);
        }
    }

    const handleOTPVerification = async () =>{
        const data = JSON.parse(sessionStorage.getItem('verificationOtp'));
        if(data === null){
            sessionStorage.removeItem('verificationOtp');
            toast.error('Otp Expired, please try again !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            setOtpVerification(false);
        }else{
            try{
                const otpCode = data.code;
                const contact = data.contact;
                const code = document.getElementById('otpField').value;
                const isValid = await checkPass(code, otpCode);
                if(contact !== mobile){
                    sessionStorage.removeItem('verificationOtp');
                    toast.error('Session Expired, please try again', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                    setOtpVerification(false);
                }
                else{
                    if(code === null || code === ''){
                        toast.error('Enter your OTP', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                    }
                    else if(!isValid){
                        // console.log(otpCode, code);
                        // console.log(typeof(otpCode), typeof(code));
                        toast.error('Invalid Otp entered, please try again', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                    }
                    else{
                        setOtpVerification(false);            
                        const data = JSON.stringify({
                            appointmentType : radioValue,
                            test : selectedTest.testID,
                            contact : mobile
                        });
                        sessionStorage.setItem("directBooking", data);
                        sessionStorage.removeItem("verificationOtp");
                        router.push("/payments/quickconfirm");
                    }
                }
            }catch(err){
                console.log(err);
                toast.error('Something went wrong, please try again', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                setOtpVerification(false);
            }
        }
    }

    const bookAppointmentHandler = ()=>{
        const mobile = document.getElementById("appointmentBookingMobilenumber").value;
        if(radioValue === null) {
            toast.error('Select appointment type', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        else if(selectedTest === null || selectedTest.length === 0) {
            toast.error('Select a test', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        else if(mobile.length !== 10){
            toast.error('Enter a valid 10 digit Contact Number', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        else{
            setMobile(mobile);
            sendOtp(mobile);
            setOtpVerification(true);
            setTimeout(showRetryOtp, 120000);
        }
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
        altText: 'Slide 4',
        caption: 'Slide 4'
        },
        {
        src: "images/packages/frontline_workers.jpg",
        altText: 'Slide 5',
        caption: 'Slide 5'
        },
        {
        src: "images/packages/home.jpg",
        altText: 'Slide 6',
        caption: 'Slide 6'
        },
        {
        src: "images/packages/pregnancy.jpg",
        altText: 'Slide 7',
        caption: 'Slide 7'
        },
        {
        src: "images/packages/test.jpg",
        altText: 'Slide 8',
        caption: 'Slide 8'
        },
        {
        src: "images/packages/womanhood.jpg",
        altText: 'Slide 9',
        caption: 'Slide 9'
        }
    ];

    useEffect(() => {
        const fadeInLeft = document.querySelectorAll(".ioleft")
        const fadeInRight = document.querySelectorAll(".ioright")
        const fade = document.querySelectorAll(".iofade")
        const observer1 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ? item.target.style.animation = `fadeInLeft 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        const observer2 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ? item.target.style.animation = `fadeInRight 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        const observer3 = new IntersectionObserver((items)=>{
            items.forEach(item=> item.intersectionRatio >= 0.4 ? item.target.style.animation = `fadeIn 0.75s forwards`:item.target.style.animation = `none`)},{threshold:0.4})
        
            fadeInLeft.forEach(item=>observer1.observe(item))
            fadeInRight.forEach(item=>observer2.observe(item))
            fade.forEach(item=>observer3.observe(item))
        
        let cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);

    },[]);

    const addToCart = useCallback((event, product)=>{
        event.stopPropagation();

        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart === null ? [] : cart;
        let existing = cart.filter(item => item.testID === product.testID);

        // document.getElementById(`sars-test-${product.testID}`).innerText = 'Added';

        if(existing && existing.length){
            toast.warning('Item already exists in cart 🛒', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }else{
            cart.push(product);
            props.updateCartValue(cart.length);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

    }, []);

    const featurefunction = {
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        swipeToSlide: true,
        arrows:false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    const sarsfeaturefunction = {
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        swipeToSlide: true,
        arrows:false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const blogfunction = {
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        swipeToSlide: true,
        arrows:false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow:2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
        // responsive: [
        //   {
        //     breakpoint: 1024,
        //     settings: {
        //       slidesToShow: 2,
        //       slidesToScroll: 1,
        //       infinite: true,
        //       dots: true
        //     }
        //   },
          
        // ]
      };

    const featuresData = [
        {
            title: "Best in class testing",
            text: "Reports you can count upon",
            description: "APT Diagnostics with its in house industry leading infrastructure provides the reports, you can truly count upon."
        },
        {
            title: "24/7 Processing",
            text: "Because your time is important to us",
            description: "With our testing facilities running 24/7, we process the reports throughout the day so that you get your results on time."
        },
        {
            title: "Easy Appointment Scheduling",
            text: "Quality Experience That Lasts",
            description: "Booking appointments before hand for home collections and walk in is as easy as marking the date on the calendar with our seamless and highly scalable booking platform."
        }
    ] 
    // console.log(testList);
    return (<React.Fragment>
                
                <Head>
                <title>APT Diagnostics || Accurate Precise Timely</title>
                </Head>
                <NavBar testList={testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>

{/* otp window */}
                {otpVerification ? 
                    <div className="otp-verification-window">
                        <Card className="otp-verification-card">
                            <CardBody>
                                <div className='verify-cancel-button'> <span style={{cursor: 'pointer'}} onClick={() => {setOtpVerification(false), sessionStorage.removeItem('verificationOtp')}}><CancelIcon /></span> </div>
                                <CardTitle className="text-center pt-1">Verify OTP</CardTitle>
                                <CardText>An OTP has been sent to +91-{mobile} !</CardText> 
                                <FormGroup>
                                    <Label for="otpField">Please Enter Your OTP</Label>
                                    <Input id="otpField" type="text" autoFocus={true} />
                                </FormGroup>
                                <CardSubtitle id='otpTimerShow' style={{color: "#0a4275", visibility: 'hidden'}}>Not Recieved an OTP <span style={{cursor: 'pointer', color: '#ff6363', fontSize: '1rem', textDecoration: 'underline'}} onClick={()=>{retryOTPHandler()}}>Retry! </span> </CardSubtitle>
                                <div className="text-center"><Button onClick={()=>{handleOTPVerification()}} variant="outlined" style={{color:"rgba(18, 73, 124,1)",margin:"5px",fontWeight:"600",fontSize:"0.9rem",borderColor:"rgba(18, 73, 124,1)"}}>Verify</Button></div>
                            </CardBody>
                        </Card>
                    </div> :
                    <React.Fragment/>
                }

{/* carousel and instant schedule part */}
                <div className="carousel-index-container">
                <Container className="mt-3" >
                    <Row style={{justifyContent: 'center'}}>
                        <Col md="12" lg="8" className="mt-4 mb-4 ioleft no-margin-bottom on-small-no-marginTop">
                            <ImgCarousel data={items}/>
                        </Col>
                        <Col lg="4" md="6" sm="12" xs="12" className="mt-4 mb-4">
                            <Row className="ml-1 mr-1"><Col>
                                <Card className="indexCarouselCard ioright">
                                {testList === null ?
                                    <div className="align-center-column" style={{height:"100%"}}>
                                        <CircularProgress color="secondary" />
                                    </div>: 
                                    <CardBody>
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
                                        <Row  className="ml-1 mr-1 mt-2" style={{flexWrap: 'nowrap', flexDirection: 'row'}} >
                                            <Col md="2" className="align-center-column" style={{width: 'fit-content'}}>
                                                    <img style={{color:"#094275",height:"2.7rem",width:"2.7rem",padding:0,margin:0}} src="images/tests_icon.svg"/>
                                            </Col>
                                            <Col className="search-widget" md="10">
                                                <Autocomplete
                                                    id="combo-box-demo-2"
                                                    options={testList}
                                                    getOptionLabel={(option) => option["testName"]}
                                                    style={{ width: "100%"}}
                                                    onChange = {(event,value)=>{setSelectedTest(value)}}
                                                    renderInput={(params) => <TextField {...params} placeholder="Find Your Test" title='Find Your Test' size="small" variant="outlined" required={true} />}
                                                />
                                                <div className="results">
                                                    
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row  className="ml-1 mr-1 mt-2 mb-3" >
                                            <Col className="division">
                                            </Col>
                                        </Row>
                                        <Row  className="ml-1 mr-1 mt-2" style={{flexWrap: 'nowrap', flexDirection: 'row'}}>
                                            <Col md="2" className="align-center-column" style={{width: 'fit-content'}}>
                                            <img style={{color:"#094275",height:"2.7rem",width:"2.7rem",padding:0,margin:0}} 
                                                src="images/phonenumber_icon.svg"/>
                                            </Col>
                                            <Col md="10" style={{width: "auto", margin: 'auto'}}>
                                                <TextField id="appointmentBookingMobilenumber"  required={true} type="number" size="small" 
                                                pattern="[0-9]{10}" placeholder="10 Digit Contact Number" title='10 Digit Contact Number' 
                                                variant="outlined" />
                                            </Col>
                                        </Row>
                                        <Row  className="ml-1 mr-1 mt-2 mb-3" >
                                            <Col className="division">
                                            </Col>
                                        </Row>
                                        <Row  className="ml-1 mr-1 mt-2 mb-1" >
                                            <Col className="align-center-column">
                                        <Button onClick={()=>{bookAppointmentHandler()}} variant="contained" style={{width:"100%", height : "45px", color:"#fff",background:"#175d9c"}} >Book Now</Button>
                                            </Col>
                                        </Row>
                                        {/* background:"#ababab" ,color:"white"*/}
                                    </CardBody>
                                }
                                </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                </div>     

{/* Our features card */}
            <Container>
                    <Row>
                        <Col>
                            <Card className="features-card">
                                <Row><Col className="landing-h2 iofade">Our Features</Col></Row>
                                {/* <Row style={{padding: '10px 10px 5px'}} className="hide-on-small">
                                    <Col md="4" className="no-padding no-border-style">
                                        <div className="card_flip feature-first-card">
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
                                    <Col md="4" className="no-padding no-border-style">
                                        <div className="card_flip feature-second-card">
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
                                    <Col md="4" className="no-padding no-border-style">
                                        <div className="card_flip feature-third-card">
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
                                    <Col md="4"><Card id="flipcard1" onMouseOver={(event)=>{handleMouseOver(event,1)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col>
                                    <Col md="4"><Card id="flipcard2" onMouseOver={(event)=>{handleMouseOver(event,2)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col>
                                    <Col md="4"><Card id="flipcard3" onMouseOver={(event)=>{handleMouseOver(event,3)}} className="flip-cards"><CardBody className="text-center"></CardBody></Card></Col>
                                </Row> */}
                                <Row>
                                    <Col xs='12' sm='12' lg="12">
                                        <Slider {...featurefunction}>
                                            {featuresData.map((feature, index) => {
                                                return (
                                                    <Col key={index} className="no-padding no-border-style">
                                                        <div className="card_flip feature-first-card" style={{width: 'inherit'}}>
                                                            <div className="card__inner">
                                                                <div className="card__content card_content--front">
                                                                <CardTitle style={{color:"#fff"}} className="features-body-title">
                                                                    {feature.title}
                                                                </CardTitle>
                                                                <CardText className="features-body-text">{feature.text}</CardText>
                                                                </div>
                                                                <div className="card__content card__content--back">
                                                                <CardText className="features-body-text">{feature.description}</CardText>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })}
                                        </Slider>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>

{/* covid 19 cards */}
                <Container>
                    <Row className="mt-4">
                        <Col>
                            <h2 className="landing-h2 mt-2 mb-4 iofade">
                                SARS-CoV-2 Tests
                            </h2>
                        </Col>
                    </Row>
                    {/* <Row className="ml-2 mr-2 hide-on-small"> 
                    {covidTests === null ? <React.Fragment/> : covidTests.map((item, index)=>
                        <Col key={item.testID} sm="4" md="3">
                            <Card onClick={()=>{location.href=`/covid/${item.testID}`}} className="test-card">
                                <CardTitle className="text-center card--title mt-1">{item.testName}</CardTitle>
                                <CardBody >
                                    <CardText className="body-text">{item.details}</CardText>
                                    <div className="align-center-row ">
                                        <Button 
                                            onClick={(event)=>{addToCart(event, item)}} variant="outlined" 
                                            className="test-card-button"
                                            id={`sars-test-button-${item.testID}`}  
                                        >
                                            <span id={`sars-test-${item.testID}`}>
                                                {cart.some(cartItem => cartItem.testID === item.testID) ? 'Added' : 'Book Test'}
                                                Book Test
                                            </span>
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                    </Row> */}
                    <Container>
                        <Row style={{justifyContent: 'center'}}>
                            <Col xs='12' sm='12' lg="12">
                                <Slider {...sarsfeaturefunction}>
                                {covidTests === null ? <React.Fragment/> : covidTests.map((item)=>
                                    <Col key={item.testID} sm="12" md="12">
                                        <Card onClick={()=>{location.href=`/covid/${item.testID}`}} className="test-card">
                                            <CardTitle className="text-center card--title mt-1">{item.testName}</CardTitle>
                                            <CardBody >
                                                <CardText className="body-text">{item.details}</CardText>
                                                <div className="align-center-row ">
                                                    <Button 
                                                        onClick={(event)=>{addToCart(event, item)}} variant="outlined" 
                                                        className="test-card-button"
                                                        id={`sars-test-button-${item.testID}`}  
                                                    >
                                                        <span id={`sars-test-${item.testID}`}>
                                                            {/* {cart.some(cartItem => cartItem.testID === item.testID) ? 'Added' : 'Book Test'} */}
                                                            Book Test
                                                        </span>
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )}
                                </Slider>
                            </Col>
                        </Row>
                    </Container>
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
                    {packages === null? <React.Fragment /> : <HealthCheckCarousel updateCartValue={props.updateCartValue} data={packages}/>}
                </Container>

{/*blogs*/}
                <Container style={{width: '100%', maxWidth: '100vw'}}>
                    <Row>       
                        <Col style={{padding: 0}}>
                            <div className='blogs-div'>
                                <h4 className="text-center mt-3 mb-3 blog-heading">Blogs</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="blogs-container">
                    <div className="blogs-holder">
                        {/* <Container className="hide-on-small">
                            <Row>
                                <Col md='4'>
                                        <Blog bgcolor="#0a4275" color="#fff"/>
                                </Col>
                                <Col md='4'>
                                        <Blog bgcolor="#0a4275" color="#fff"/>
                                </Col>
                                <Col md='4'>
                                        <Blog bgcolor="#0a4275" color="#fff"/>
                                </Col>
                            </Row>
                        </Container> */}
                        <Container>
                            <Row>
                                <Col>
                                    <Slider {...blogfunction}>
                                        {['a', 'a', 'a', 'a', 'a'].map((feature, index) => {
                                            return (
                                                <Col key={index} xs="12" sm="12" md="12">
                                                    {/* <div className="card_flip feature-first-card">
                                                        <div className="card__inner">
                                                            <div className="card__content card_content--front">
                                                            <CardTitle style={{color:"#fff"}} className="features-body-title">
                                                                {feature.title}
                                                            </CardTitle>
                                                            <CardText className="features-body-text">{feature.text}</CardText>
                                                            </div>
                                                            <div className="card__content card__content--back">
                                                            <CardText className="features-body-text">{feature.description}</CardText>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <Blog bgcolor="#0a4275" color="#fff"/>
                                                </Col>
                                            )
                                        })}
                                    </Slider>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>

{/* footer */}
                <div>
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
                                        <h5 className="ioright card--title">Lorem ipsum dolar, FOUNDER</h5>
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
                                        <h5 className="ioright card--title">Lorem ipsum ipsum.CUSTOMER</h5>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Container> */}