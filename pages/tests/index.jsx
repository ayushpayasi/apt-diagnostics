import React, {useState,useEffect,useRef} from 'react'
import {isMobile} from "react-device-detect";
import NavBar from "../../components/navbar.component"
import BreadCrumb from "../../components/breadcrumb.component"
import ReportSlider from "../../components/slider.component"
import {Container,Row,Col,Card,Button,Input} from "reactstrap"
import MobileMenu from "../../components/mobilemenu.component"
import "../../assets/css/tests.scss"
import ImgCarousel from "../../components/carousel.component"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box"
import SearchIcon from '@material-ui/icons/Search';
import Grow from "@material-ui/core/Grow"


export default function Tests() {
    const ref = useRef(null)
        const [value, setValue] = useState(0);

        //   enable this to solve the error, you have to use a timeout in order for it to work
    useEffect(() => {
        ref.current.updateIndicator();
      }, []);


        
                function TabPanel(props) {
                    const { children, value, index, ...other } = props;
                
                    return (
                    <div
                        role="tabpanel"
                        hidden={value != index}
                        id={`full-width-tabpanel-${index}`}
                        aria-labelledby={`full-width-tab-${index}`}
                        {...other}
                    >
                        {value == index && (
                        <Box p={3}>
                           {children}
                        </Box>
                        )}
                    </div>
                    );
                }
                


        const handleTabChange = (event, newValue) => {
            setValue(newValue);
        };

    return (
        <React.Fragment>
            <NavBar/>
            {/* <BreadCrumb links={["home","tests"]}/> */}
            <Container fluid>
            <Row className="test-banner">
                    <Col>
                        <img src="/images/carouselimgx.jpg"></img>
                    </Col>
                </Row>
            </Container>
            
            <Container >
                
                <Row>
                    <Col className="mt-5">
                        <h1 style={{color:"#0a4275",fontWeight:"700",textTransform:"uppercase"}} className="text-center">TEST Catalogue - Book A Test</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, doloribus! ipsum dolor sit amet consectetur adipisicing elit. Ullam quibusdam maxime repudiandae officiis velit at exercitationem animi, odit quos nemo.</p>
                    </Col>
                </Row>
               </Container>
               
            <Container>
                <Paper>
                    <h4 className="text-center mt-4">Quick Search</h4>
                <Tabs
                    action={ref}
                    // id="tab-test-bar"
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Covid-19 Tests" value="0" />
                    <Tab label="Popular Tests" value="1" />
                    <Tab label="All Tests" value="2" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Container>
                        <div className="text-center tab-search"> 
                            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                <div class="input-group">
                                <Input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                                <div class="input-group-append">
                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tab-items">
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                        </div>
                    </Container>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Container>
                        <div className="text-center tab-search"> 
                            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                <div class="input-group">
                                <Input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                                <div class="input-group-append">
                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-items">
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            </div></Container>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    
                    <Container>
                        <div className="text-center tab-search"> 
                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group">
                            <Input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                            <div class="input-group-append">
                                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="tab-items">
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            <div className="centermode-testcard">
                                <div>Lorem, ipsum. ipsum.</div>
                                <span onClick={()=>{}}>Book</span>
                            </div>
                            </div></Container>
                </TabPanel>
                </Paper>
            </Container>
             
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h5 className="text-center">Lorem, ipsum dolor.</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quo inventore architecto! Totam cum perferendis a iure vitae! Fuga maiores repellendus ab? Recusandae earum tenetur labore nam aperiam commodi suscipit, cumque consequuntur autem eaque laboriosam pariatur facere laborum et, dolor tempore repudiandae? Soluta ducimus totam quasi aliquam fugiat hic.</p>
                    </Col>
                </Row>
            </Container>
                      
            <Container>
                <Row>
                    <Col>
                        <Card className="book-home-collection-card">
                            <h4 className="text-center">Book Home Collection</h4>
                            <Row>
                                <Col xs="4">
                                    <img src="/svg/aptIcons/light/Healthy_Notification.svg"/>
                                    <p>
                                        Online Access to Reports
                                    </p>
                                </Col>
                                <Col xs="4">
                                    <img src="/svg/aptIcons/light/home_collection.svg"/>
                                    <p>
                                        Free Home Collection & Cancellation
                                    </p>
                                </Col>
                                <Col xs="4">
                                    <img src="/svg/aptIcons/light/timely_reports.svg"/>
                                    <p>Convenient & Time Saving</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="align-center-column">
                                    <Button>Book Now</Button>
                                </Col>
                            </Row>
                            <p>Not sure about the tests <a href="#" style={{textDecoration:"none",color:"#ff6363"}}>Click here</a></p>
                        </Card>
                    </Col>
                </Row>
            </Container>
             
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h5 className="text-center">Lorem, ipsum dolor.</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quo inventore architecto! Totam cum perferendis a iure vitae! Fuga maiores repellendus ab? Recusandae earum tenetur labore nam aperiam commodi suscipit, cumque consequuntur autem eaque laboriosam pariatur facere laborum et, dolor tempore repudiandae? Soluta ducimus totam quasi aliquam fugiat hic.</p>
                    </Col>
                </Row>
            </Container>
           
            <Container className="mt-4" >
                <Row>
                    <Col className="mt-2">
                        <h5 style={{color:"#094275",textAlign:"center"}}>Popular Tests</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{color:"grey",textAlign:"center"}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, soluta. </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReportSlider/>
                    </Col>
                </Row>
            </Container>

{/*             
            <Container className="mt-4">
                <Row>
                    <Col className="mt-2">
                        <h5 style={{color:"#094275",textAlign:"center"}}>CoVid-19 Tests</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{color:"grey",textAlign:"center"}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, soluta. </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReportSlider/>
                    </Col>
                </Row>
            </Container>
             */}
            <Container>
                <Row>
                    <Col className="mt-2">
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus saepe similique eligendi officia eius, fuga animi consectetur consequatur tenetur quasi dolore blanditiis accusantium voluptate doloremque, aliquid vitae temporibus dolorum magnam. ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quo inventore architecto! Totam cum perferendis a iure vitae! Fuga maiores repellendus ab? Recusandae earum tenetur labore nam aperiam commodi suscipit, cumque consequuntur autem eaque laboriosam pariatur facere laborum et, dolor tempore repudiandae? Soluta ducimus totam quasi aliquam fugiat hic.</p>
                    </Col>
                </Row>
            </Container>
            {isMobile?<MobileMenu/>:<React.Fragment/>}
        </React.Fragment>
    )
}
