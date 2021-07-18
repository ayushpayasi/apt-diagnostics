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

export default function Reproductivesystem() {
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
            <div className="organ-image-holder">
                <SmallNavBar color="white"/>
                <img className="organ-image-desktop" src="/images/organs_banner/heart.png"></img>
                <img className="organ-image-mobile" src="/images/mv_allergy.jpg"></img>
                <div className="diagnostics-pagetitle">
                    <h5>Heart - Symptoms,Diagnosis, Tests</h5>
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
        <Row>
            <Col>
              <p>Heart is a muscular organ around the size of a closed fist, and it sits in the chest, slightly to the left of center.</p>
              <p>The functions of the heart are to pump oxygenated blood around the body, and to deliver deoxygenated blood and waste products (carbon dioxide) to the lungs.</p>
              <p>The heart consists of four chambers, each separated by valves that only permit blood to flow in one direction.</p>
              <p>Disorders of the heart include coronary heart disease, angina, heart attack, valve diseases and congenital disorders. </p>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Row>
            <Col><h5 className="text-center">Why Important</h5></Col>
        </Row>
        <Row>
            <Col><p>The heart is one of the most important organs in a human's body because it pumps blood around your body, delivering oxygen and nutrients to your cells and removing waste products.</p></Col></Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Row>
            <Col><h5 className="text-center">Symptoms</h5></Col>
        </Row>
        <Row>
            <Col>
              <List type="unstyled">
                <ul>
                  <li>A feeling of indigestion</li>
                  <li>Anxiety and restlessness</li>
                  <li>Backache</li>
                  <li>Difficulty feeding and poor weight gain in infants</li>
                  <li>Erectile dysfunction</li>
                  <li>Fatigue</li>
                  <li>Mild, transient shortness of breath with exertion</li>
                  <li>Nausea and vomiting</li>
                  <li>Mild weakness and feeling lightheaded</li>
                  <li>Pain, numbness, and mild swelling in the feet and ankles</li>
                  <li>Pale skin with or without sweating</li>
                  <li>Wet cough</li>
                </ul>
              </List>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Row>
            <Col><h5 className="text-center">Disease Associated</h5></Col>
        </Row>
        <Row>
            <Col>
            <List type="unstyled">
                <ul>
                  <li>Abnormal heart rhythms, or arrhythmias.</li>
                  <li>Aorta disease and Marfan syndrome.</li>
                  <li>Congenital heart disease.</li>
                  <li>HIV/AIDS</li>
                  <li>Coronary artery disease {"-narrowing of the arteries"}</li>
                  <li>Heart attack.</li>
                  <li>Deep vein thrombosis and pulmonary embolism.</li>
                  <li>Heart failure.</li>
                  <li>Heart muscle disease {"cardiomyopathy"}</li>
                </ul>
              </List>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Row>
            <Col><h5 className="text-center">Suggested Tests</h5></Col>
        </Row>
        <Row>
            <Col><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa qui pariatur harum reiciendis possimus, at eligendi beatae vel? Architecto vel eius non, sapiente hic nemo sed cum perferendis. Consequatur maxime accusantium molestias explicabo itaque! Quaerat non officia reiciendis, quia, laudantium distinctio eum voluptas dignissimos provident facere eveniet, dicta quibusdam! Cum, unde dignissimos! Tempora odio voluptas nemo ducimus? Voluptate, consectetur? Aperiam earum voluptates pariatur ut fugiat praesentium eos quod esse consequuntur est, quis temporibus officiis delectus deleniti accusamus voluptatum voluptate enim nostrum neque eligendi dicta. Dolore nesciunt illum, rerum facere eius quae suscipit perferendis mollitia cupiditate commodi eaque voluptate inventore aliquid ratione magni architecto amet, eum facilis vel deleniti impedit, culpa iure? Quidem expedita, quas optio voluptates aliquid nam harum autem tenetur? Minima harum deleniti consequuntur repellat dicta labore voluptate culpa quam modi asperiores? Ipsa aperiam consectetur, vitae officiis dolore esse eveniet magnam delectus repudiandae optio! Cum quos molestias ab dicta repellat obcaecati exercitationem neque voluptatibus omnis recusandae, cumque laborum, ipsam tempora veritatis dolor nihil, aspernatur at ipsa dolorum assumenda? Veritatis blanditiis quae, ullam quia expedita, dicta minus aperiam sunt placeat molestias rem vero, atque porro consectetur. Quos ut dolor ipsa, corrupti nihil inventore obcaecati, sequi, id itaque repudiandae incidunt reprehenderit.</p></Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Row>
            <Col><h5 className="text-center">causes</h5></Col>
        </Row>
        <Row>
            <Col>
              <List type="unstyled">
                <ul>
                  <li>Smoking</li>
                  <li>High cholesterol</li>
                  <li>Diabetes</li>
                  <li>Inactivity</li>
                  <li>Being overweight or obese</li>
                  <li>Family history</li>
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
