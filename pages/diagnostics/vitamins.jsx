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

export default function Vitamins() {
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
                <title>Vitamins || APTDiagnostics</title>
            </Head>
            <div className="organ-image-holder">
                <SmallNavBar color="white"/>
                <img className="organ-image-desktop" src="/images/organs_banner/vitamins.jpg"></img>
                {/* <img className="organ-image-mobile" src="/images/mv_allergy.jpg"></img> */}
                <div className="diagnostics-pagetitle">
                    <h5> Vitamins</h5>
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
              <p>
              Vitamins are a broad range of substances that the human body requires for normal functioning, such as metabolism and cellular repair. Lack of sufficient vitamins has been implicated in cellular diseases, such as cancers. 

</p>
            </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Row>
            <Col><h5 className="text-center">Why Important</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col><p>Vitamins work hard to keep our bodies functioning properly and they help drive essential processes needed in our everyday lives. Each nutrient is on a mission to deliver health benefits that help reach our wellness goals.</p></Col></Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Row>
            <Col><h5 className="text-center">Symptoms</h5></Col>
        </Row>
        <Row className="detail-paragraph">
            <Col>
            <List type="unstyled">
              <ul>
                <li>Brittle hair and nails ( vitamin B7 deficiency)</li>
                <li>Mouth ulcers or cracks in the corners of the mouth( vitamin B deficiency)</li>
                <li>Bleeding gums( vitamin C deficiency)</li>
                <li>Poor night vision and white growths on the eyes( vitamin A deficiency)</li>
                <li>Scaly patches and dandruff</li>
                <li>Hair loss</li>
                <li>Red or white bumps on skin</li>
                <li>Restless leg syndrome( iron deficiency)</li>
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
                <li>Anemia</li>
                <li>Pellagra</li>
                <li>Night blindness</li>
                <li>Rickets</li>
                <li>Malnutrition</li>
                <li>Scurvy</li>
                <li>Diarrhea</li>
                <li>Dementia</li>
                <li>Goitre</li>
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
            <Col><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa qui pariatur harum reiciendis possimus, at eligendi beatae vel? Architecto vel eius non, sapiente hic nemo sed cum perferendis. Consequatur maxime accusantium molestias explicabo itaque! Quaerat non officia reiciendis, quia, laudantium distinctio eum voluptas dignissimos provident facere eveniet, dicta quibusdam! Cum, unde dignissimos! Tempora odio voluptas nemo ducimus? Voluptate, consectetur? Aperiam earum voluptates pariatur ut fugiat praesentium eos quod esse consequuntur est, quis temporibus officiis delectus deleniti accusamus voluptatum voluptate enim nostrum neque eligendi dicta. Dolore nesciunt illum, rerum facere eius quae suscipit perferendis mollitia cupiditate commodi eaque voluptate inventore aliquid ratione magni architecto amet, eum facilis vel deleniti impedit, culpa iure? Quidem expedita, quas optio voluptates aliquid nam harum autem tenetur? Minima harum deleniti consequuntur repellat dicta labore voluptate culpa quam modi asperiores? Ipsa aperiam consectetur, vitae officiis dolore esse eveniet magnam delectus repudiandae optio! Cum quos molestias ab dicta repellat obcaecati exercitationem neque voluptatibus omnis recusandae, cumque laborum, ipsam tempora veritatis dolor nihil, aspernatur at ipsa dolorum assumenda? Veritatis blanditiis quae, ullam quia expedita, dicta minus aperiam sunt placeat molestias rem vero, atque porro consectetur. Quos ut dolor ipsa, corrupti nihil inventore obcaecati, sequi, id itaque repudiandae incidunt reprehenderit.</p></Col>
        </Row>
      </TabPanel>
      </Col></Row>
      </Card>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
