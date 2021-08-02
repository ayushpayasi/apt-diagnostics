import Head from 'next/head'
import React,{useState} from 'react'
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

export default function Liver() {
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
    return (
        <React.Fragment>
          
          <Head>
                <title>Liver || APTDiagnostics</title>
            </Head>
            <div className="organ-image-holder">
                <SmallNavBar color="white"/>
                <img className="organ-image-desktop" src="/images/organs_banner/liver.jpg" ></img>
                {/* <img className="organ-image-mobile" src="/images/mv_allergy.jpg"></img> */}
                <div className="diagnostics-pagetitle">
                    <h5>Liver</h5>
                </div>
            </div>
            {/* <Container>
                enjoy
            </Container> */}
            <Container className="mt-5 tabs-container">
            
                <Card style={{border:"none",borderRadius:"5px",padding:"10px"}}>
                <Row><Col md="3">
      <Tabs
        orientation="vertical"
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
              <p>The liver is a large, meaty organ that sits on the right side of the belly.</p>
              <p>The main roles of the liver include removing toxins, processing food nutrients and regulating body metabolism.</p>
              <p>Important causes of liver disorders are fatty liver, hepatitis virus infections and alcohol.</p>
              <p>Cirrhosis (liver scarring), the end-result of many liver disorders, can lead to liver failure.</p>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Row>
            <Col><h5 className="text-center">Why Important</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col><p>The liver is the largest solid organ in the body. It has many important functions like removing toxins from the body's blood supply, maintaining healthy blood sugar levels, regulating blood clotting, and performing hundreds of other vital functions.</p></Col></Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Row>
            <Col><h5 className="text-center">Symptoms</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
              <List type="unstyled">
                <ul>
                  <li>Fever</li>
                  <li>Tiredness or weakness</li>
                  <li>Yellowing of the skin and eyes, known as jaundice</li>
                  <li>Dark urine</li>
                  <li>Pale stool</li>
                  <li>Nausea and vomiting</li>
                  <li>Pain under the ribs on the right side of the body</li>
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
                  <li>Hepatitis</li>
                  <li>Fatty liver</li>
                  <li>Liver cirrhosis</li>
                  <li>Liver cancer</li>
                  <li>Wilson's disease</li>
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
            <Col><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa qui pariatur harum reiciendis possimus, at eligendi beatae vel? Architecto vel eius non, sapiente hic nemo sed cum perferendis. Consequatur maxime accusantium molestias explicabo itaque! Quaerat non officia reiciendis, quia, laudantium distinctio eum voluptas dignissimos provident facere eveniet, dicta quibusdam! Cum, unde dignissimos! Tempora odio voluptas nemo ducimus? Voluptate, consectetur? Aperiam earum voluptates pariatur ut fugiat praesentium eos quod esse consequuntur est, quis temporibus officiis delectus deleniti accusamus voluptatum voluptate enim nostrum neque eligendi dicta. Dolore nesciunt illum, rerum facere eius quae suscipit perferendis mollitia cupiditate commodi eaque voluptate inventore aliquid ratione magni architecto amet, eum facilis vel deleniti impedit, culpa iure? Quidem expedita, quas optio voluptates aliquid nam harum autem tenetur? Minima harum deleniti consequuntur repellat dicta labore voluptate culpa quam modi asperiores? Ipsa aperiam consectetur, vitae officiis dolore esse eveniet magnam delectus repudiandae optio! Cum quos molestias ab dicta repellat obcaecati exercitationem neque voluptatibus omnis recusandae, cumque laborum, ipsam tempora veritatis dolor nihil, aspernatur at ipsa dolorum assumenda? Veritatis blanditiis quae, ullam quia expedita, dicta minus aperiam sunt placeat molestias rem vero, atque porro consectetur. Quos ut dolor ipsa, corrupti nihil inventore obcaecati, sequi, id itaque repudiandae incidunt reprehenderit.</p></Col>
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
                <li>Heavy alcohol use</li>
                <li>Obesity</li>
                <li>Type 2 diabetes</li>
                <li>Tattoos or body piercings</li>
                <li>Injecting drugs using a shared needle</li>
                <li>Blood transfusion</li>
                <li>Exposure to other people's blood and body fluid</li>
                <li>Unprotected sex</li>
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
