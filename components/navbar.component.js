import React, { useState } from 'react';
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
  Button
} from 'reactstrap';
import "../assets/css/navbar.scss"
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import IconButton from '@material-ui/core/IconButton';

// import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import CloseIcon from '@material-ui/icons/Close';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelIsOpen,setPanelIsOpen] = useState(false);
  const leftPanelToggle =()=> {
    if(panelIsOpen){
      document.getElementById("left-panel").style.left = "-41%"
      document.getElementById("panel-toggle-button").style.display = "flex"
      setPanelIsOpen(!panelIsOpen);
    }
    else{
      console.log("enjoy")
      document.getElementById("left-panel").style.left = "0%"
      document.getElementById("panel-toggle-button").style.display = "none"
      setPanelIsOpen(!panelIsOpen);
    }
  }
    
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
       <Navbar className="sticky-top" light expand="lg">
        <NavbarBrand href="/"><img alt="logo" className="logo-img" src="/images/logo.png"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="m-2">
              <NavLink className="nav-link" href="/components/">Components</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/components/">Components</NavLink>
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
           <button className="btn navbar-button float-left m-2">BOOK AN APOINTMENT</button>
        </Collapse>
      </Navbar>
      <div className="top-space">
        <Container fluid>
        <Row>
        <Col md="4">
          <Row>
            <Col md="3" className="p0 m0 align-center-column">
             <a href="/about">About</a>
            </Col>
            <Col md="3" className="p0 m0 align-center-column">
            <a href="/packages"> Packages </a>
            </Col>
            <Col md="3" className="p0 m0 align-center-column">
              <a href="/diagnostics"> Covid-19 </a>
            </Col>
            <Col md="3" className="p0 m0 align-center-column">
            <a href="/tests">Patients</a>
            </Col>
          </Row>
          </Col>
          <Col md="4">
            <Row>
            <Col className="p0 m0 align-center-column">
            <a href="/labs"> Upload Prescription </a>
            </Col>
            <Col className="p0 m0 align-center-column">
            <a href="#">Order Medicines </a>
            </Col>
            </Row>

          </Col>
          <Col md="4">
            <Row>
              {/* <Col className="align-center-row">
                <HeadsetMicIcon /><h6 className="p0 m0">7692988733</h6>
              </Col>
              <Col className="align-center-row">
                <HelpOutlineIcon/><h6 className="p0 m0">Support</h6>
              </Col> */}
              <Col className="align-center-row">
                <PersonOutlineIcon/> <h6 className="p0 m0">Login/Download Reports</h6>
              </Col>
            </Row>
          </Col>
        </Row>
        </Container >
        </div>
      
      <div id="left-panel" className="left-panel">
      
          {/* <Row>
          <Col sm="9" className="align-center-row"><p className="sidebar-navlink-head" href="/coupons">Quick Links</p></Col>
          <Col sm="3"className="icon-button-center" ><IconButton onClick={()=>leftPanelToggle()}><CloseIcon style={{color:"#fff"}}/></IconButton> </Col>
          </Row> */}
          <Row className="left-panel-icon-holder">
          <Col className="align-center-column-col">
          <Row>
            <Col className="align-center-row">
              <img className="sidebar-icon" src="/svg/contactus.svg"/>
            </Col>
            </Row>
            <Row>
              <Col >
                <h6 className="sidebar-text text-center">Contact us</h6>
              </Col>
            </Row>
            </Col>
            </Row>
          <Row className="left-panel-icon-holder"><Col className="align-center-column-col">
            <Row >
              <Col className="align-center-row">
                <img className="sidebar-icon" src="/svg/feedback.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center">Feedback</h6>
                <h6 className="sidebar-text text-center">Complaints</h6>
              </Col>
            </Row>
            </Col></Row>  
          <Row className="left-panel-icon-holder"><Col className="align-center-column-col">  
            <Row >
              <Col className="align-center-row">
                <img className="sidebar-icon" src="/svg/call-back.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center">Request</h6>
                <h6 className="sidebar-text text-center">Callback</h6>
              </Col>
            </Row>
            </Col></Row>
        </div>
      {/* <span id="panel-toggle-button" className="left-panel-button">
       <h6 onClick={()=>{leftPanelToggle()}} className="left-panel-text">VIEW REPORT </h6>
      <IconButton onClick={()=>{leftPanelToggle()}}> <ArrowForwardIosRoundedIcon className="arrow-button"/> </IconButton>
      </span> */}
    </React.Fragment>
  );
}

export default Navigation;



            {/* <Col xs="6">
              <NavLink className="sidebar-navlink" href="/coupons">COUPONS</NavLink>
            </Col> */}
            {/* <Col xs="6"><h7 className="shigning-text">New</h7></Col> */}
          
          {/* <Row >
            <Col >
              <NavLink className="sidebar-navlink" href="/login">Download Reports</NavLink>
            </Col>
          </Row>
          <Row >
            <Col >
              <NavLink className="sidebar-navlink" href="/login">Login</NavLink>
            </Col>
          </Row>
          <Row > */}
            {/* <Col >
              <NavLink className="sidebar-navlink" href="/findtest">Find A Test</NavLink>
            </Col>
          </Row> */}