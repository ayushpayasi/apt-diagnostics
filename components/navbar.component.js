import React, { useState,useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  Container,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import "../assets/css/navbar.scss"
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import DownloadReportLightbox from './lightbox/downloadreport.component';
import RequestCallBack from './lightbox/requestcallback.component';
import UploadPrescription from './lightbox/uploadprescription.component';
import $ from "jquery"

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelIsOpen,setPanelIsOpen] = useState(false);
  const [downloadReportWindow,setDownloadReportWindow] = useState(false);
  const [requestCallBackWindow,setRequestCallBackWindow] = useState(false);
  const [uploadPrescriptionWindow,setUploadPrescriptionWindow] = useState(false);

  const downloadReportHandler =()=>{
    setDownloadReportWindow(false)
  }
  const requestCallBackHandler = ()=>{
    setRequestCallBackWindow(false)
  }
  const uploadPrescriptionHandler =()=>{
    setUploadPrescriptionWindow(false)
  }

  const leftPanelToggle =()=> {
    if(panelIsOpen){
      document.getElementById("left-panel").style.left = "-41%"
      document.getElementById("panel-toggle-button").style.display = "flex"
      setPanelIsOpen(!panelIsOpen);
    }
    else{
      document.getElementById("left-panel").style.left = "0%"
      document.getElementById("panel-toggle-button").style.display = "none"
      setPanelIsOpen(!panelIsOpen);
    }
  }

  useEffect(() => {
    $("#navbar-search").click((obj)=>{$(obj).toggleClass("search-navbar-active")})
      var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("topSpace").style.top = "76px";
        } else {
          document.getElementById("topSpace").style.top = "-10px";
        }
        prevScrollpos = currentScrollPos;
      }
  }, [])


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
 
    
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
       <Navbar className="sticky-top" light expand="lg">
        <NavbarBrand href="/"><img alt="logo" className="logo-img" src="/images/logo.png"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="m-2">
              <NavLink onClick={()=>{setUploadPrescriptionWindow(true)}} className="nav-link curosr-pointer" > <img className = "nav-bar-prescription" src="/svg/aptIcons/light/upload_prescription.svg"/> <span style={{verticalAlign:"bottom",textTransform:"capitalize"}}>Upload Prescription</span></NavLink>  {/*<PublishIcon style={{color:"#ff6363"}} />*/}
            </NavItem>
            <NavItem className="m-3">
                <Input  
                id="navbar-search"
                className="search-navbar"
                placeholder="Search Test/Package"
                disableUnderline
                startAdornment={
                <InputAdornment position="start">
                  <img className = "nav-bar-search" src="/svg/aptIcons/light/search.svg" />
                  {/* <SearchIcon style={{color:"#ff6363"}} /> */}
                </InputAdornment>
                }/>
              </NavItem>
             {/* <NavItem className="m-2">
            <NavLink className="nav-link" href="/components/">Components</NavLink>
            </NavItem>  */}
            <span className="mobile-view-links">
            <NavItem className="m-2">
              <NavLink className="nav-link" href="/about">About</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/tests">Tests</NavLink>
            </NavItem><NavItem className="m-2">
              <NavLink className="nav-link" href="/diagnostics">Diagnostics</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/partner">Partner</NavLink>
            </NavItem><NavItem className="m-2">
              <NavLink className="nav-link" href="/corporates">Corporates</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/labs">Labs</NavLink>
            </NavItem>
            </span>
           </Nav>
           {/* <Autocomplete
                                            id="combo-box-demo"
                                            options={top100Films}
                                            getOptionLabel={(option) => option.title}
                                            style={{ width: "100%"}}
                                            renderInput={(params) => <TextField  {...params} label="Find Your Test" size="small" variant="outlined" />}
                                            /> */}
           {/* <button className="btn navbar-button float-left m-2">BOOK AN APOINTMENT</button> */}
           <img src="/svg/firstaid.svg" style={{height: "30px",width:"30px"}}></img>
        </Collapse>
      </Navbar>
      <div id="topSpace" className="top-space">
        <Container>
        <Row>
        <Col md="7">
          <Row>
            <Col md="1" className="p0 m0 align-center-column">
             <a href="/about">About</a>
            </Col>
            <Col md="2" className="p0 m0 align-center-column">
            <a href="/packages">Packages</a>
            </Col>
            <Col md="2" className="p0 m0 align-center-column">
              <a href="/diagnostics"> <img src="/images/bacteria.png" style={{ width:"15px",height:"15px",margin:"3px"}}/> Covid-19</a>
            </Col>
            <Col md="2" className="p0 m0 align-center-column">
            <span className="dropDown">Patients<ArrowDropDown/>
            <div className="dropdownMenu">
            <ListGroup>
              <ListGroupItem><a href="/tests">Tests</a></ListGroupItem>
              <ListGroupItem><a href="/packages">Packages</a></ListGroupItem>
              <ListGroupItem><a href="/blogs">Blogs</a></ListGroupItem>
              <ListGroupItem><a href="/diagnostics">diagnostics</a></ListGroupItem>
            </ListGroup>
              {/* <ul>
                <li></li>
                <li></li>
                <li></li> 
              </ul> */}
            </div>
            </span>
            </Col>
            
          </Row>
          </Col>
          <Col md="5">
            <Row>
            <Col className="p0 m0 align-center-column">
            <a href="#">Order Medicines <span className="shining_text">coming soon</span></a>
            </Col>  
              <Col className="align-center-row">
                <img className="login-icon" src = "/svg/aptIcons/light/login.svg" /> <a href="/login" className="p0 m0">Login/Download Reports</a>
              </Col>
            </Row>
          </Col>
        </Row>
        </Container >
        </div>
      
      <div id="left-panel" className="left-panel">
          <Row className="left-panel-icon-holder">
          <Col onClick={()=>setDownloadReportWindow(true)} className="align-center-column-col">
          <Row>
            <Col className="align-center-row">
              <img className="sidebar-icon1" src="/svg/aptIcons/light/online_reports.svg" />
            </Col>
            </Row>
            <Row>
              <Col >
                <h6 className="sidebar-text text-center">Download Report</h6>
              </Col>
            </Row>
            </Col>
            </Row>
          <Row className="left-panel-icon-holder"><Col onClick={()=>{location.href="/contactus"}} className="align-center-column-col">
            <Row >
              <Col className="align-center-row">
                <img className="sidebar-icon2" src="/svg/aptIcons/light/feedback.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center">Feedback</h6>
                <h6 className="sidebar-text text-center">Complaints</h6>
              </Col>
            </Row>
            </Col></Row>  
          <Row className="left-panel-icon-holder"><Col onClick={()=>{setRequestCallBackWindow(true)}} className="align-center-column-col">  
            <Row >
              <Col className="align-center-row">
                <img className="sidebar-icon3" src="/svg/aptIcons/light/request_callback.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center">Request Callback</h6>
                {/* <h6 className="sidebar-text text-center">Callback</h6> */}
              </Col>
            </Row>
            </Col></Row>
        </div>
      <div onClick={()=>{location.href="/contactus#contact_us"}} id="right-panel" className="right-panel">
        <p>Contact Us </p>
      </div>
      {downloadReportWindow?<DownloadReportLightbox close={downloadReportHandler}/>:<React.Fragment/>}
      {requestCallBackWindow?<RequestCallBack close={requestCallBackHandler}/>:<React.Fragment/>}
      {uploadPrescriptionWindow?<UploadPrescription close={uploadPrescriptionHandler}/>:<React.Fragment/>}
    </React.Fragment>
  );
}

export default Navigation;
