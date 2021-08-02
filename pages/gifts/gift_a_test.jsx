import Head from 'next/head'
import React,{useState} from 'react'
import Navigation from '../../components/navbar.component'
import {Container,Card, CardText,CardBody,Row,Col,InputGroup,Input,Button,} from "reactstrap"
import "../../assets/css/gifts.scss"
import {apiLinks} from "../../connection.config"
import axios from "axios"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box"
import SearchIcon from '@material-ui/icons/Search';
import HealthCheckCarousel from '../../components/healthcheckcarousel.component'
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


const getPackagesData = async()=>{
    try{
        const packagesResponse = await axios.get(apiLinks.getPackages)
        if(packagesResponse.data.code === 200){
            return packagesResponse.data.data
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
    return { props: {testList,featuredTest,packages: await getPackagesData()}}
    }
    catch(err){
        console.log(err)
        return { props: {testList:[],featuredTest:[],packages:[]}};
    }
  }


export default function GiftaTest(props) {
    const [testList,setTestList] = useState(props.testList)
    const [value, setValue] = useState(0);
    const [filteredData,setFilteredData] = useState([])
    const [covidFilteredTests,setCovidFilteredTests] = useState([])
    const [popularTestsFiltered,setPopularTestsFiltered] = useState([])
    const [packages,setPackages] = useState(props.packages)
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

            
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

    return (
        <>
        
        <Head>
                <title>Gift Test || APTDiagnostics</title>
            </Head>
          <Navigation updateCartValue={props.updateCartValue} cartValue={props.cartValue}/>  
            <Container>
                <Row className="mt-5">
                    <Col>
                        <img src="/images/packages/test.jpg" alt="image" className="gift-static-img"></img>
                    </Col>
                </Row>
                <h4 className="text-center mt-3"> Gift Test To You Loved Ones!</h4>
            </Container>
            
            <Container>
                <Paper>
                    <h4 id="searchTests" style={{color:"#0a4275"}} className="text-center mt-4">Quick Search</h4>
                <Tabs
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
            
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h2 className="landing-h2 mt-2 mb-4 iofade">
                            Our Curated Heath Packages
                        </h2>
                    </Col>
                </Row>
                    {packages === null? React.Fragment :<HealthCheckCarousel updateCartValue={props.updateCartValue}  data={packages}/>}
                </Container>

        </>
    )
}
