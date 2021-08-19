import React, { useState,useEffect, useCallback } from 'react';
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
  NavbarText,
} from 'reactstrap';
import "../assets/css/navbar.scss"
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import DownloadReportLightbox from './lightbox/downloadreport.component';
import RequestCallBack from './lightbox/requestcallback.component';
import UploadPrescription from './lightbox/uploadprescription.component';
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import $ from "jquery"
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelIsOpen,setPanelIsOpen] = useState(false);
  const [downloadReportWindow,setDownloadReportWindow] = useState(false);
  const [requestCallBackWindow,setRequestCallBackWindow] = useState(false);
  const [uploadPrescriptionWindow,setUploadPrescriptionWindow] = useState(false);
  const [cart, setCart] = useState([]);


  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      background:"#ff6363",
    },
  }))(Badge);

  const downloadReportHandler = () => {
    setDownloadReportWindow(false);
  }
  const requestCallBackHandler = () => {
    setRequestCallBackWindow(false);
  }
  const uploadPrescriptionHandler = () => {
    setUploadPrescriptionWindow(false);
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
    // $("#navbar-search").click((obj)=>{$(obj).toggleClass("search-navbar-active")})
    //   var prevScrollpos = window.pageYOffset;
    //     window.onscroll = function() {
    //     var currentScrollPos = window.pageYOffset;
    //     if (prevScrollpos > currentScrollPos) {
    //       document.getElementById("topSpace").style.top = "76px";
    //     } else {
    //       document.getElementById("topSpace").style.top = "-10px";
    //     }
    //     prevScrollpos = currentScrollPos;
    //   }
      if(JSON.parse(localStorage.getItem("cart")) !== null){
        if(JSON.parse(localStorage.getItem("cart")).length !== 0){
          handleCartValueChange(JSON.parse(localStorage.getItem("cart")).length)
        }
      }

      let cart = JSON.parse(localStorage.getItem("cart"));
      setCart(cart);
  }, []);

  const addToCart = useCallback((event, product)=>{

      event.stopPropagation();
      if(product === null ) return;
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart === null ? [] : cart;
      let existing = cart.filter(item => item.testID === product.testID);

      if(existing && existing.length){
          window.alert('Item Already added to cart!');
      }else{
          cart.push(product);
          props.updateCartValue(cart.length);
          localStorage.setItem("cart", JSON.stringify(cart));
      }

  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
       <Navbar className="sticky-top" light expand="lg">
        <NavbarBrand href="/"><img alt="logo" className="logo-img" src="/images/logo.png"/></NavbarBrand>
        <NavbarToggler onClick={toggle} style={{borderColor: '#ff6363', borderRadius: '5px', borderWidth: '1.7px'}} />
        <Collapse isOpen={isOpen} navbar style={{width: '-webkit-fill-available'}}>
          <Nav className="mr-auto" navbar>

            <span className="mobile-view-links">
              <div className="mobile-prescription-cart">
                <NavItem className="m-2">
                  <NavLink onClick={()=>{setUploadPrescriptionWindow(true); toggle()}} 
                        className="nav-link curosr-pointer flex-row-center" > 
                        <img className = "nav-bar-prescription" 
                          src="/svg/aptIcons/light/upload_prescription.svg"/> 
                          <span className="nav-mobile-link-big" style={{verticalAlign:"bottom",textTransform:"capitalize"}}>
                            &nbsp;Upload Prescription
                          </span>
                  </NavLink>
                </NavItem>

                <IconButton onClick={()=>{location.href = "/cart"}}>
                  <StyledBadge badgeContent={props.cartValue}>
                    <img src="/svg/firstaid.svg" style={{height: "30px",width:"30px"}}></img>
                  </StyledBadge>
                </IconButton>
              </div>

              <NavItem className="m-3" style={{display: 'flex', justifyContent: 'flex-start'}}>
                <div className="medic-search-box" style={{borderRadius: 10, overflow: 'hidden', width: '80%'}}>
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    id="combo-box"
                    options={props.testList || []}
                    getOptionLabel={(option) => option.testName}
                    style={{ width: "100%"}}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <div className="navbar-items-booking">
                          <div>{option.testName}</div>
                          <span onClick={(event)=>{addToCart(event, option)}}>Book</span>
                        </div>
                      </React.Fragment>
                    )}
                    // onChange = {(event, value)=>{addToCart(event, value)}}
                    renderInput={(params) => <TextField {...params} 
                                                className="search-navbar navsearch" 
                                                size='small' id="filled-search-1" 
                                                label="Add Test To Cart" 
                                                variant="filled" 
                                                placeholder="Search Test"
                                            />}
                />
                </div>
            </NavItem>

              {/* <NavItem className="m-2">
                <NavLink className="nav-link" href="/about">About</NavLink>
              </NavItem>

              <NavItem className="m-2">
                <NavLink className="nav-link" href="/tests">Tests</NavLink>
              </NavItem>
              
              <NavItem className="m-2">
                <NavLink className="nav-link" href="/diagnostics">Diagnostics</NavLink>
              </NavItem>

              <NavItem className="m-2">
                <NavLink className="nav-link" href="/partner">Partner</NavLink>
              </NavItem>
              
              <NavItem className="m-2">
                <NavLink className="nav-link" href="/corporates">Corporates</NavLink>
              </NavItem>

              <NavItem className="m-2">
                <NavLink className="nav-link" href="/labs">Labs</NavLink>
              </NavItem> */}

              <NavItem className="m-4">
                <div className="navbar-login-image">
                  {/* <img className="login-icon" src = "/svg/aptIcons/light/login.svg" />  */}
                  <NavLink href="/login" className="pl-1 m0 nav-mobile-link-big">
                    Login / Download Reports
                  </NavLink>
                </div>
              </NavItem>

              <NavItem className="m-4">
                <NavLink className="nav-link nav-mobile-link-big" href="/about">
                  About
                </NavLink>
              </NavItem>

              <NavItem className="m-4">
                <NavLink className="nav-link nav-mobile-link-big" href="/gifts/gift_a_test">
                  Gift-a-Test
                </NavLink>
              </NavItem>

              <NavItem className="m-4">
                <NavLink className="nav-link nav-mobile-link-big" href="/covid"> 
                  Covid-19
                </NavLink>
              </NavItem>

              <NavItem className="m-4">
                <span className="dropDown nav-mobile-link-big" style={{color: '#fff', paddingLeft: 0}}>PATIENTS<ArrowDropDown/>
                  <div className="dropdownMenu">
                  <ListGroup>
                    <ListGroupItem>
                      <NavLink className="nav-link" href="/tests" className='mobile-nav-patients-dropdown nav-mobile-link-big'>
                        Tests
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                      <NavLink className="nav-link" href="/packages" className='mobile-nav-patients-dropdown nav-mobile-link-big'>
                        Packages
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                      <NavLink className="nav-link" href="/blogs" className='mobile-nav-patients-dropdown nav-mobile-link-big'>
                        Blogs
                      </NavLink>
                    </ListGroupItem>
                    {/* <ListGroupItem>
                      <NavLink className="nav-link" href="/diagnostics" className='mobile-nav-patients-dropdown nav-mobile-link-big'>
                        Diagnostics
                      </NavLink>
                    </ListGroupItem> */}
                  </ListGroup>
                  </div>
                </span>
              </NavItem>

              <NavItem className="m-3 call-free" style={{cursor:"pointer"}}>
                <p style={{fontSize: '1rem', textAlign: 'right'}}>
                  Any queries ? <br />
                  <span style={{color:"#ff6363"}} className="p-0 m-0">
                    Call Us:
                  </span> 1800-121-123456
                </p>
              </NavItem>

            </span>

            {!isOpen && <NavItem className="m-2">
              <NavLink onClick={()=>{setUploadPrescriptionWindow(true)}} 
                    className="nav-link curosr-pointer" > 
                    <img className = "nav-bar-prescription" 
                      src="/svg/aptIcons/light/upload_prescription.svg"/> 
                      <span style={{verticalAlign:"bottom",textTransform:"capitalize"}}>
                        Upload Prescription
                      </span>
              </NavLink>  
            </NavItem>}

            {!isOpen && <NavItem className="m-3">
                <Autocomplete
                    multiple
                    disableCloseOnSelect
                    id="combo-box-demo"
                    options={props.testList || []}
                    getOptionLabel={(option) => option.testName}
                    style={{ width: "100%"}}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <div className="navbar-items-booking">
                          <div>{option.testName}</div>
                          <span onClick={(event)=>{addToCart(event, option)}}>Book</span>
                        </div>
                      </React.Fragment>
                    )}
                    // onChange = {(event, value)=>{addToCart(event, value)}}
                    renderInput={(params) => <TextField {...params} 
                                                className="search-navbar navsearch" 
                                                size='small' id="filled-search" 
                                                label="Add Test To Cart" 
                                                variant="filled" 
                                                placeholder="Search Test"
                                            />}
                />
            </NavItem>}

            {!isOpen && <NavItem className="m-3 call-free" style={{cursor:"pointer"}}>
              <p style={{color:"#ff6363"}} className="p-0 m-0">Call Us:</p> 1800-121-123456
            </NavItem>}

          </Nav>

          {!isOpen && <IconButton onClick={()=>{location.href = "/cart"}}>
            <StyledBadge badgeContent={props.cartValue}>
              <img src="/svg/firstaid.svg" style={{height: "30px",width:"30px"}}></img>
            </StyledBadge>
           </IconButton>}

        </Collapse>
      </Navbar>

      <div className="top-space">
        <Container>
          <Row>
            <Col md="7">
              <Row>
                <Col md="1" className="p0 m0 align-center-column">
                  <a href="/about">About</a>
                </Col>
                <Col md="2" className="p0 m0 align-center-column">
                  <a href="/gifts/gift_a_test">Gift-a-Test</a>
                </Col>
                <Col md="2" className="p0 m0 align-center-column">
                  <a href="/covid"> <img src="/images/bacteria.png" style={{ width:"15px",height:"15px",margin:"3px"}}/> Covid-19</a>
                </Col>
                <Col md="2" className="p0 m0 align-center-column">
                  <span className="dropDown" style={{color: '#0a4275'}}>Patients<ArrowDropDown/>
                  <div className="dropdownMenu">
                  <ListGroup>
                    <ListGroupItem><a href="/tests">Tests</a></ListGroupItem>
                    <ListGroupItem><a href="/packages">Packages</a></ListGroupItem>
                    <ListGroupItem><a href="/blogs">Blogs</a></ListGroupItem>
                    {/* <ListGroupItem><a href="/diagnostics">diagnostics</a></ListGroupItem> */}
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
        </Container>
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
            </Col>
          </Row>  
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
          </Col>
        </Row>
      </div>

      <div onClick={()=>{location.href="/contactus#contact_us"}} id="right-panel" className="right-panel">
        <p>Contact Us </p>
      </div>

      <div id="bottom-panel" className="bottom-panel">
        <Row className="bottom-icon-holder">
          <Col onClick={()=>setDownloadReportWindow(true)} className="align-center-column-col">
            <Row>
              <Col className="align-center-row">
                <img className="sidebar-icon1" src="/svg/aptIcons/light/online_reports.svg" />
              </Col>
            </Row>
            <Row>
              <Col >
                <h6 className="sidebar-text text-center" style={{color: "#ff6363"}}>Download Report</h6>
              </Col>
            </Row>
          </Col>
          <Col onClick={()=>{location.href="/contactus"}} className="align-center-column-col">
            <Row>
              <Col className="align-center-row">
                <img className="sidebar-icon2" src="/svg/aptIcons/light/feedback.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center" style={{color: "#ff6363"}}>Feedback / Complaints</h6>
              </Col>
            </Row>
          </Col>
          <Col onClick={()=>{setRequestCallBackWindow(true)}} className="align-center-column-col">  
            <Row >
              <Col className="align-center-row">
                <img className="sidebar-icon3" src="/svg/aptIcons/light/request_callback.svg"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="sidebar-text text-center" style={{color: "#ff6363"}}>Request Callback</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {downloadReportWindow?<DownloadReportLightbox close={downloadReportHandler}/>:<React.Fragment/>}
      {requestCallBackWindow?<RequestCallBack close={requestCallBackHandler}/>:<React.Fragment/>}
      {uploadPrescriptionWindow?<UploadPrescription close={uploadPrescriptionHandler}/>:<React.Fragment/>}
    </React.Fragment>
  );
}

export default Navigation;
