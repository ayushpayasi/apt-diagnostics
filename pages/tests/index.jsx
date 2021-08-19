import Head from 'next/head';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import NavBar from "../../components/navbar.component";
import ReportSlider from "../../components/slider.component";
import {Container, Row, Col, Card, Button, Input} from "reactstrap";
import "../../assets/css/tests.scss";
import ImgCarousel from "../../components/carousel.component";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import { apiLinks } from '../../connection.config';
import TestPagination from '../../components/pagination.component';
import { toast } from 'react-toastify';

const getTestListData = async ()=>{
    try{
        const response = await axios.get(apiLinks.priceList,{params:{coupon:"priceList"}});
        if (response.data[0].code === 200){
            return Object.values(response.data[1]);
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}


const getFeaturedTestData = async ()=>{
    try{
        const response = await axios.get(apiLinks.getAllFeaturedTests);
        if (response.data.code === 200){
            return response.data.data;
        }
        else{
            return [];
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function getServerSideProps(context) {
    try{
        const testList = await getTestListData();
        const featuredTest = await getFeaturedTestData();
    return { props: {testList, featuredTest}};
    }
    catch(err){
        console.log(err);
        return { props: {testList:[],featuredTest:[]}};
    }
  }

export default function Tests(props) {    
    const [featuredTest, setFeaturedTest] = useState(props.featuredTest);
    const [testList, setTestList] = useState(props.testList);
    const [filteredData, setFilteredData] = useState([]);
    const [covidFilteredTests, setCovidFilteredTests] = useState([]);
    const [popularTestsFiltered, setPopularTestsFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(0);
    const [cart, setCart] = useState([]);

    // const ref = useRef(0);
        
    const handleCovidFilter = (event) => {
        event.stopPropagation();
        if(search.length > 1)
            setCovidFilteredTests(testList.filter(item => item.testCategory === "Routine InHouse TT1" && item.testName.toLowerCase().includes(search.toLowerCase())));
        else
            setCovidFilteredTests(testList.filter(item => item.testCategory === "Routine InHouse TT1"));
    }
    const handlePopularTestFilter = (event) => {
        event.stopPropagation();
        if(search.length > 1)
            setPopularTestsFiltered(testList.filter(item => item.testCategory === 'None' && item.testName.toLowerCase().includes(search.toLowerCase())));
        else
            setPopularTestsFiltered(testList.filter(item => item.testCategory === 'None'));
    }
    
    const handleAllTestFilter = (event) => {
        event.stopPropagation();
        if(search.length > 1)
            setFilteredData(testList.filter(item => item.testName.toLowerCase().includes(search.toLowerCase())));
        else
            setFilteredData(testList);
    }

    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setSearch('');
        setValue(newValue);
        setCovidFilteredTests(testList.filter(item => item.testCategory === 'Routine InHouse TT1'));
        setPopularTestsFiltered(testList.filter(item => item.testCategory === 'None'));
        setFilteredData(testList.filter(item => item.testCategory === '-'));
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if(value === 0)
            handleCovidFilter(event);
        else if(value === 1)
            handlePopularTestFilter(event);
        else
            handleAllTestFilter(event);
    }
    
    useEffect(() => {
        // ref.current.updateIndicator();
        setCovidFilteredTests(testList.filter(item => item.testCategory === 'Routine InHouse TT1'));
        setPopularTestsFiltered(testList.filter(item => item.testCategory === 'None'));
        setFilteredData(testList.filter(item => item.testCategory === '-'));

        let cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);

    }, []);

    const addToCart = useCallback((event, product)=>{
        event.stopPropagation();

        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart === null ? [] : cart;
        let existing = cart.filter(item => item.testID === product.testID);

        // document.getElementById(`sars-test-${product.testID}`).innerText = 'Added';

        if(existing && existing.length){
            toast.warning('Item already exists in cart 🛒', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }else{
            cart.push(product);
            props.updateCartValue(cart.length);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

    }, []);

        //   enable this to solve the error, you have to use a timeout in order for it to work

    // useEffect(() => {
    //     ref.current.updateIndicator();
    //   }, []);
        
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
        <React.Fragment>
            
        <Head>
          <title>Tests || APT Diagnostics</title>
        </Head>
            <NavBar testList={testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container>
                <Row className="mt-5">
                    <Col className="tests-image-box">
                        <img src="/images/carouselimgx.jpg" ></img>
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
                            <h4 style={{color : "#0a4275"}} className="text-center">Book Home Collection</h4>
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
                            {/* <p>Not sure about the tests <a href="#searchTests" style={{textDecoration:"none",color:"#ff6363"}}>Click here</a></p> */}
                        </Card>
                    </Col>
                </Row>
            </Container>

{/* Quick Search */}
            
            <Container className="mt-5 mb-4">
                <Paper>
                    <h4 id="searchTests" style={{color:"#0a4275"}} className="text-center mt-4">Quick Search</h4>
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Covid-19 Tests" className="text-on-small" value={0} />
                        <Tab label="Popular Tests" className="text-on-small" value={1} />
                        <Tab label="All Tests" className="text-on-small" value={2} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Container>
                            <div className="text-center tab-search"> 
                                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <Input type="text" id="covidTestSearch" 
                                            autoFocus
                                            placeholder="What're you searching for?" 
                                            aria-describedby="button-addon1" className="form-control border-0 bg-light"
                                            value={search}
                                            onChange={(event) => {handleSearch(event)}}
                                        />
                                        <div className="input-group-append">
                                            <button onClick={handleCovidFilter} 
                                                id="button-addon1" type="submit" className="btn btn-link text-primary">
                                                <SearchIcon/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>     
                            <div className="testBox-tab-items test-list-scroll" style={covidFilteredTests.length === 0 ? {justifyContent: 'center'}: {justifyContent: 'flex-start'}}>
                                <div className="testBox-left">
                                    {
                                    covidFilteredTests.length > 0 ? (covidFilteredTests.map(item => 
                                        <div key={item.testID} className="centermode-testcard-test-search">
                                            <div>{item.testName}</div>
                                            <span onClick={(event)=>{addToCart(event, item)}}>Book</span>
                                        </div>)) : <p>No Results Found for "{search}"</p>
                                    }
                                </div>
                            </div>
                        </Container>
                    </TabPanel>
                
                    <TabPanel value={value} index={1}>
                        <Container>
                            <div className="text-center tab-search"> 
                                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <Input type="text" id="popularTestSearch" 
                                            autoFocus
                                            placeholder="What're you searching for?" 
                                            aria-describedby="button-addon1" className="form-control border-0 bg-light"
                                            value={search}
                                            onChange={(event) => {handleSearch(event)}}
                                        />
                                        <div className="input-group-append">
                                            <button id="button-addon1" onClick={handlePopularTestFilter} 
                                                type="submit" className="btn btn-link text-primary">
                                                <SearchIcon/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testBox-tab-items test-list-scroll" style={popularTestsFiltered.length === 0 ? {justifyContent: 'center'}: {justifyContent: 'flex-start'}}>
                                <div className="testBox-left">
                                    {
                                    popularTestsFiltered.length > 0 ? (popularTestsFiltered.map(item => 
                                        <div key={item.testID} className="centermode-testcard-test-search">
                                            <div>{item.testName}</div>
                                            <span onClick={(event)=>{addToCart(event, item)}}>Book</span>
                                        </div>)) : <p>No Results Found for "{search}"</p>
                                    }
                                </div>
                            </div>
                        </Container>
                    </TabPanel>
                
                    <TabPanel value={value} index={2}>
                        <Container>
                            <div className="text-center tab-search"> 
                                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <Input type="text" id="searchAllTests" 
                                            autoFocus
                                            placeholder="What're you searching for?" 
                                            aria-describedby="button-addon1" className="form-control border-0 bg-light"
                                            value={search}
                                            onChange={(event) => {handleSearch(event)}}
                                        />
                                        <div className="input-group-append">
                                            <button id="button-addon1" onClick = {handleAllTestFilter} 
                                                type="submit" className="btn btn-link text-primary">
                                                <SearchIcon/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testBox-tab-items test-list-scroll" style={filteredData.length === 0 ? {justifyContent: 'center'}: {justifyContent: 'flex-start'}}>
                                <div className="testBox-left">
                                    {   
                                    filteredData.length > 0 ? (filteredData.map(item =>
                                        <div key={item.testID} className="centermode-testcard-test-search">
                                            <div>{item.testName}</div>
                                            <span onClick={(event)=>{addToCart(event, item)}}>Book</span>
                                        </div>)) : <p>No Results Found for "{search}"</p>
                                    }
                                </div>
                            </div>
                        </Container>
                    </TabPanel>
                
                </Paper>
            </Container>

{/* some trail text */}
            <Container className="mt-4 pt-4">
                <Row>
                    <Col>
                        <h5 style={{color:"#0a4275"}} className="text-center">Lorem, ipsum dolor.</h5>
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
                        <ReportSlider updateCartValue={props.updateCartValue} data={featuredTest}/>
                    </Col>
                </Row>
            </Container>

{/* All Test List */}
            {/* <Container>
                <Row>
                    <Col>
                        <h4 style={{color:"#0a4275"}}className="text-center">ALL TESTS</h4>
                        <h5 style={{color:"#0a4275"}} className="text-center">(Click On Test To Add To Cart)</h5>
                    </Col>
                </Row>
            </Container>

            <Container>
                <TestPagination updateCartValue={props.updateCartValue} testList={testList}/>
            </Container> */}
            <Container>
                <Row className="mb-5 mt-5"></Row>
            </Container>

        </React.Fragment>
    )
}
