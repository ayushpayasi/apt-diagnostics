import React, {useState,useEffect,useRef} from 'react'
import NavBar from "../../components/navbar.component"
import ReportSlider from "../../components/slider.component"
import {Container,Row,Col,Card,Button,Input} from "reactstrap"
import "../../assets/css/tests.scss"
import ImgCarousel from "../../components/carousel.component"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box"
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios"
import { apiLinks } from '../../connection.config';
import TestPagination from '../../components/pagination.component'



const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}})
        if (response.data[0].code === 200){
            return Object.values(response.data[1])
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
    }
}


const getFeaturedTestData = async ()=>{
    try{
        const response = await axios.get(apiLinks.getAllFeaturedTests)
        if (response.data.code === 200){
            return response.data.data
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
    }
}

export async function getServerSideProps(context) {
    try{
        const testList = await getTestListData()
        const featuredTest = await getFeaturedTestData()
    return { props: {testList,featuredTest}}
    }
    catch(err){
        console.log(err)
        return { props: {testList:[],featuredTest:[]}};
    }
  }

export default function Tests(props) {    
    const [featuredTest,setFeaturedTest] = useState(props.featuredTest)
    const [testList,setTestList] = useState(props.testList)
    const [filteredData,setFilteredData] = useState([])
    const [covidFilteredTests,setCovidFilteredTests] = useState([])
    const [popularTestsFiltered,setPopularTestsFiltered] = useState([])
    const ref = useRef(null)
        const [value, setValue] = useState(0);
        
    const handleCovidFilter =(val)=>{
        setCovidFilteredTests(testList.filter(item=> item.testCategory === "Other Services" && item.testName.toLowerCase().includes(val.toLowerCase())))
    }
    const handlePopularTestFilter = (val)=>{
        setPopularTestsFiltered(featuredTest.filter(item=>item.testName.toLowerCase().includes(val.toLowerCase())))
    }

    const handleAllTestFilter = (val)=>{
        setFilteredData(testList.filter(item=>item.testName.toLowerCase().includes(val.toLowerCase())))
    }

        
    const addToCart = (event,item)=>{
        event.stopPropagation();
        let cart = JSON.parse(sessionStorage.getItem("cart"))
        if(cart !== null){
        if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            props.updateCartValue(cart.length)
            sessionStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        sessionStorage.setItem("cart",JSON.stringify([item]))
    }
    }
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
            <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container>
            <Row>
                    <Col>
                        <img src="/images/carouselimgx.jpg" style={{height:"400px",width:"100%"}}></img>
                    </Col>
                </Row>
            </Container>
{/* Test Catalouge */}
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

{/* Book Home Collection Card */}
            <Container>
                <Row>
                    <Col>
                        <Card className="book-home-collection-card">
                            <h4 className="text-center">Book Home Collection</h4>
                            <Row>
                                <Col xs="4">
                                    {/* <img src="/svg/aptIcons/light/Healthy_Notification.svg"/> */}
                                    <img src="/images/download_icon.svg" />
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
                            <p>Not sure about the tests <a href="#searchTests" style={{textDecoration:"none",color:"#ff6363"}}>Click here</a></p>
                        </Card>
                    </Col>
                </Row>
            </Container>
{/* Quick Search */}
            <Container>
                <Paper>
                    <h4 id="searchTests" className="text-center mt-4">Quick Search</h4>
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
                                <Input type="search" id="covidTestSearch"  placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                                <div class="input-group-append">
                                    <button onClick={()=>{handleCovidFilter(document.getElementById("covidTestSearch").value)}} id="button-addon1" type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                                </div>
                                </div>
                            </div>
                        </div>     
                        <div className="tab-items">
                            {covidFilteredTests.map(item=><div key={item.testID} className="centermode-testcard">
                                <div>{item.testName}</div>
                                <span onClick={(event)=>{addToCart(event,item)}}>Book</span>
                            </div>)}
                        </div>
                    </Container>
                </TabPanel>
                
                <TabPanel value={value} index={1}>
                    <Container>
                        <div className="text-center tab-search"> 
                            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                <div class="input-group">
                                <Input type="search" id="popularTestSearch" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                                <div class="input-group-append">
                                    <button id="button-addon1" onClick={()=>{handlePopularTestFilter(document.getElementById("popularTestSearch").value)}} type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-items">
                        {popularTestsFiltered.map(item=><div key={item.testID} className="centermode-testcard">
                            <div>{item.testName}</div>
                                <span onClick={(event)=>{addToCart(event,item)}}>Book</span>
                            </div>)}
                            </div></Container>
                </TabPanel>
                
                <TabPanel value={value} index={2}>
                    
                    <Container>
                        <div className="text-center tab-search"> 
                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group">
                            <Input type="search" id="searchAllTests" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                            <div class="input-group-append">
                                <button id="button-addon1" onClick={()=>{handleAllTestFilter(document.getElementById("searchAllTests").value)}} type="submit" class="btn btn-link text-primary"><SearchIcon/></button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="tab-items">
                        {filteredData.map(item=><div key={item.testID} className="centermode-testcard">
                                <div>{item.testName}</div>
                                <span onClick={(event)=>{addToCart(event,item)}}>Book</span>
                            </div>)}
                            </div></Container>
                </TabPanel>
                
                </Paper>
            </Container>
{/* some trail text */}
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
{/* popular tests*/}
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
                        <ReportSlider data={featuredTest}/>
                    </Col>
                </Row>
            </Container>
{/* All Test List */}
<Container>
    <Row>
        <Col>
            <h4 className="text-center">ALL TESTS</h4>
            <h5 className="text-center">(Click On Test To Add To Cart)</h5>
        </Col>
    </Row>
</Container>

<Container>
    <TestPagination updateCartValue={props.updateCartValue} testList={testList}/>
</Container>

        </React.Fragment>
    )
}
