import React,{useState} from 'react'
import Head from 'next/head'
import MobileMenu from "../../components/mobilemenu.component"
import {isMobile} from "react-device-detect";
import SmallNavBar from "../../components/smallnavbar.component"
import BreadCrumb from "../../components/breadcrumb.component"

import {Container,Col,Row,Card,List} from "reactstrap"
import CenterMode from "../../components/centermodecarousel.component"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"


import "../../assets/css/diagnostics.scss"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
              {children}
            {/* <Typography>{children}</Typography> */}
          </Box>
        )}
      </div>
    );
  }

export default function Brain() {
  const [value, setValue] = React.useState(0);
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(isMobile)
    return (
        <React.Fragment>
          
          <Head>
                <title>Brain || APTDiagnostics</title>
            </Head>
            <div className="organ-image-holder">
                <SmallNavBar color="white"/>
                <img className="organ-image-desktop" src="/images/organs_banner/brain.jpg"></img>
                {/* <img className="organ-image-mobile" src="/images/mv_allergy.jpg"></img> */}
                <div className="diagnostics-pagetitle">
                    <h5>Brain</h5>
                </div>
            </div>
            {/* <Container>
                enjoy
            </Container> */}
            <Container className="mt-5 tabs-container">
            
                <Card style={{border:"none",borderRadius:"5px",padding:"10px"}}>
                <Row><Col md="3">
      <Tabs
        orientation= "vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Diagnostics"
        className="organs-tabs"
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Why Important" {...a11yProps(1)} />
        <Tab label="Symptoms" {...a11yProps(2)} />
        <Tab label="Disease Associated" {...a11yProps(3)} />
        <Tab label="Suggested Tests" {...a11yProps(4)} />
        <Tab label="Causes" {...a11yProps(5)} />
      </Tabs></Col><Col md="9" className="organ-description-col">
      <TabPanel value={value} index={0}>
        <Row>
            <Col><h5 className="text-center">Overview</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
              <p>Brain assembles the messages in a way that has meaning for us, and can store that information in our memory.</p>
              <p>The main components of the brain include the brain stem, cerebellum, thalamus, cerebrum and corpus callosum.</p>
              <p>The brain can be affected by a wide range of disorders and events such as trauma, nervous system diseases, stroke and tumours.</p>
              <p>The specific symptoms or losses of functioning depend on which brain areas are affected.</p>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Row>
            <Col><h5 className="text-center">Why Important</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col><p>The brain is arguably the most important organ in the human body. It controls and coordinates actions and reactions, allows us to think and feel, and enables us to have memories and feelings.</p></Col></Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Row>
            <Col><h5 className="text-center">Symptoms</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
            <List type="unstyled">
              <ul>
                <li>Headaches</li>
                <li>Seizures</li>
                <li>Numbness or tingling in your arms or legs</li>
                <li>Numbness or tingling in your arms or legs</li>
                <li>Nausea</li>
                <li>Vomiting</li>
                <li>Changes in personality</li>
                <li>Difficulty with movement or balance</li>
                <li>Changes in your hearing, speech, or vision</li>
              </ul>
            </List>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Row>
            <Col><h5 className="text-center">Disease Associated</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
            <List type="unstyled">
              <ul>
                <li>Alzheimer's Disease</li>
                <li>Dementias</li>
                <li>Brain Cancer</li>
                <li>Epilepsy and Other Seizure Disorders</li>
                <li>Mental Disorders</li>
                <li>Parkinson's and Other Movement Disorders</li>
                <li>Stroke and Transient Ischemic Attack</li>
              </ul>
            </List>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Row>
            <Col><h5 className="text-center">Suggested Tests</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
            
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Row>
            <Col><h5 className="text-center">Causes</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
            <List type="unstyled">
              <ul>
                <li>Accident</li>
                <li>Brain tumor</li>
                <li>Stroke</li>
                <li>High blood pressure</li>
                <li>Disorder</li>
              </ul>
            </List>
            </Col>
        </Row>
      </TabPanel>
      </Col></Row>
      </Card>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
