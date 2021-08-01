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
import IconButton from "@material-ui/core/IconButton"
import $ from "jquery"
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelIsOpen,setPanelIsOpen] = useState(false);
  const [downloadReportWindow,setDownloadReportWindow] = useState(false);
  const [requestCallBackWindow,setRequestCallBackWindow] = useState(false);
  const [uploadPrescriptionWindow,setUploadPrescriptionWindow] = useState(false);


  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      background:"#ff6363",
    },
  }))(Badge);

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

  const handleCartValueChange = (value)=>{
    props.updateCartValue(value)
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
      if(JSON.parse(sessionStorage.getItem("cart")) !== null){
        if(JSON.parse(sessionStorage.getItem("cart")).length !== 0){
      handleCartValueChange(JSON.parse(sessionStorage.getItem("cart")).length)}
    }
  }, [])

    
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
                </InputAdornment>
                }/>
              </NavItem>
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
           <IconButton onClick={()=>{location.href = "/cart"}}>
           <StyledBadge badgeContent={props.cartValue}>
            <img src="/svg/firstaid.svg" style={{height: "30px",width:"30px"}}></img>
          </StyledBadge>
           
           </IconButton>
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
            <a href="/gift/gift_a_test">Gift-a-Test</a>
            </Col>
            <Col md="2" className="p0 m0 align-center-column">
              <a href="/covid"> <img src="/images/bacteria.png" style={{ width:"15px",height:"15px",margin:"3px"}}/> Covid-19</a>
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
            </div>
            </span>
            </Col>
            
          </Row>
          </Col>
          <Col md="5">
            <Row className="right-small-navbar">
            <Col className="align-center-column">
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
