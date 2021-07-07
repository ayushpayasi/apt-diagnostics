import React,{useEffect,useState} from 'react'
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
// import Card from "@material-ui/core/Card"
// import CardActionArea from "@material-ui/core/CardActionArea"
// import CardActions from "@material-ui/core/CardActions"
import "../assets/css/index.scss"
import NavBar from "../components/navbar.component"
import {isMobile} from "react-device-detect";
import MobileMenu from "../components/mobilemenu.component"
// import Subscribe from "../components/subscribe.component"
// import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
// import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import ClientCaptcha from "react-client-captcha";
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
// import CenterMode from "../components/centermodecarousel.component"
import SliderDetails from "../components/sliderdetails.component"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button  from "@material-ui/core/Button"
import CallIcon from '@material-ui/icons/Call';
import "../assets/css/animate.scss";
import Blog from "../components/blog.component"
import BigBlog from "../components/bigblog.component"
import HealthCheckCarousel from "../components/healthcheckcarousel.component"
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from "../components/footer.component"
import {apiLinks} from "../connection.config"
import axios from 'axios'
import {useRouter} from "next/router"

export default function Home() {
    const [testList,setTestList] = useState(null)
    const [radioValue,setRadioValue] = useState(null);
    const [selectedTest,setSelectedTest] = useState(null);
    const [otpVerification,setOtpVerification] = useState(false);
    const [mobile,setMobile] = useState(null)
    const router = useRouter()

    const retryOTPHandler = ()=>{

    }

    const handleOTPVerification =()=>{
        setOtpVerification(false)
        router.push("/payments/confirm")
    }

    const bookAppointmentHandler = ()=>{
        const mobile = document.getElementById("appointmentBookingMobilenumber").value
        setMobile(mobile)
        console.log()
        sessionStorage.setItem("directBooking",`${JSON.stringify({
            appointmentType : radioValue,
            test:selectedTest,
            contact:mobile
        })}`)
        
        setOtpVerification(true)
    }
    const getData = async()=>{
        try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}})
        if (response.data[0].code === 200){
            setTestList(Object.values(response.data[1]))
        }
    }
        catch(err){
            console.log(err)
        }
    }



    useEffect(() => {

        getData()

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


    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
      ];


    return (<React.Fragment>
                <NavBar/>
                {otpVerification?<div className="otp-verification-window">
                    <Card className="otp-verification-card">
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
                <div className="carousel-index-container">
                <Container className="mt-3" >
                    <Row>
                        <Col md="12" lg="8" className="mt-4 mb-4 ioleft">
                            <ImgCarousel/>
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
                <Container>
                    <Row>
                    <Col><Card className="features-card">
                        <Row><Col className="landing-h2 iofade">Our Features</Col></Row>
                        <Row>
                            <Col md="4"><Card className="flip-cards"><CardBody className="ioleft"><CardTitle >Who are we?</CardTitle><CardText className="features-body-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, fugiat magnam! Aspernatur ex cupiditate quisquam consequuntur excepturi iure voluptatem quasi!</CardText></CardBody></Card></Col>
                            <Col md="4"><Card className="flip-cards"><CardBody className="iofade"><CardTitle >What we do?</CardTitle><CardText className="features-body-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, fugiat magnam! Aspernatur ex cupiditate quisquam consequuntur excepturi iure voluptatem quasi!</CardText></CardBody></Card></Col>
                            <Col md="4"><Card className="flip-cards"><CardBody className="ioright"><CardTitle>Why us?</CardTitle><CardText className="features-body-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, fugiat magnam! Aspernatur ex cupiditate quisquam consequuntur excepturi iure voluptatem quasi!</CardText></CardBody></Card></Col>

                        </Row>
                                        {/* <CardBody><CardTitle>Who are we?</CardTitle><CardText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, fugiat magnam! Aspernatur ex cupiditate quisquam consequuntur excepturi iure voluptatem quasi!</CardText></CardBody> */}
                                        </Card></Col>
                        {/* <Col>
                                <Row>

                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                        </Col> */}
                    </Row>
                </Container>
                <Container className="lazyload" style={{overflowX:"hidden"}}>
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4 iofade">
                            SARS-CoV-2 Tests
                        </h2>
                    </Col>
                </Row>
                <Row className="ml-2 mr-2"> 
                    <Col>
                        <Card className="test-card ioleft">
                            <CardTitle className="text-center card-title mt-1">Covid 19 RT-PCR Test</CardTitle>
                            <CardBody >
                                <CardText className="body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero ad rerum in repudiandae laborum quibusdam impedit officiis a eum. ipsum dolor sit amet consectetur adipisicing elit. Optio et vel quisquam! Sit mollitia voluptatem labore voluptatibus, velit alias dicta!</CardText>
                            <div className="align-center-row "><Button variant="outlined" fullWidth className="test-card-button">Book Test</Button></div></CardBody>
                            
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioleft">
                            <CardTitle className="text-center card-title mt-1">D-Dimer Test</CardTitle>
                            <CardBody >
                                <CardText className="body-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates a sunt amet facere ducimus dolore rerum dicta repellat labore repellendus. ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardText>
                            <div className="align-center-row "><Button variant="outlined" fullWidth className="test-card-button">Book Test</Button></div></CardBody>
                            
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioright">
                            <CardTitle className="text-center card-title mt-1">COVID Antibody Test</CardTitle>
                            <CardBody>
                                <CardText className="body-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, odio. ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, a. ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardText>
                            <div className="align-center-row "><Button variant="outlined" fullWidth className="test-card-button">Book Test</Button></div></CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="test-card ioright">
                            <CardTitle className="text-center card-title mt-1">CoviProfile Test</CardTitle>
                            <CardBody >
                                <CardText className="body-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, expedita. ipsum dolor sit, amet consectetur adipisicing elit. Iusto, excepturi. ipsum dolor sit amet consectetur adipisicing elit. Inventore, dicta. ipsum dolor sit amet consectetur adipisicing elit. Quam, nisi? ipsum dolor sit amet consectetur adipisicing elit. Saepe ab fugit aperiam veritatis vero quam molestias doloribus odio quisquam eos.</CardText>
                            <div className="align-center-row "><Button variant="outlined" fullWidth className="test-card-button">Book Test</Button></div></CardBody>
                        </Card>
                    </Col>
                </Row>
                </Container>
                <Container>
                    <SliderDetails/>
                </Container>

                <Container>
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4 iofade">
                            Our Curated Heath Packages
                        </h2>
                    </Col>
                </Row>
                    <HealthCheckCarousel/>
                </Container>

                <div className="accreditations">
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
                </div>
                
                <Container className="reviews-container">
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
                                        {/* <img className="ioleft" src="images/profile1.jpg" alt="profile"/> */}
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
                                        {/* <img className="ioright" src="images/profile1.jpg" alt="profile"/> */}
                                        <h5 className="ioright card-title">Lorem ipsum ipsum.CUSTOMER</h5>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Container>
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

                {/* <Container className="mt-2 mb-2">
                <Row>
                    <Col className="align-center-row">
                        <Subscribe/>
                    </Col>
                </Row>
                </Container> */}
                
                <div style={{height:"100vh"}}>
                    <Footer/>
                </div>
                {isMobile?<MobileMenu/>:<React.Fragment/>}
            </React.Fragment>
    )
}
