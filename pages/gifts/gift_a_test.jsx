import React,{useState, useEffect, useCallback} from 'react';
import Head from 'next/head';
import Navigation from '../../components/navbar.component';
import {Container,Card, CardText,CardBody,Row,Col,InputGroup,Input,Button,} from "reactstrap";
import "../../assets/css/gifts.scss";
import {apiLinks} from "../../connection.config";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box"
import SearchIcon from '@material-ui/icons/Search';
import HealthCheckCarousel from '../../components/healthcheckcarousel.component';
import { toast } from 'react-toastify';

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
            return response.data.data;
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
            return packagesResponse.data.data;
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
        const testList = await getTestListData();
        const featuredTest = await getFeaturedTestData();
        const packages = await getPackagesData();
        return  {
                    props: { testList, featuredTest, packages }
                }
    }
    catch(err){
        console.log(err)
        return { props: {testList:[], featuredTest:[], packages:[]}};
    }
  }


export default function GiftaTest(props) {

    const [value, setValue] = useState(0);
    const [testList,setTestList] = useState(props.testList);
    const [packages,setPackages] = useState(props.packages);
    const [cart, setCart] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const [covidFilteredTests,setCovidFilteredTests] = useState([]);
    const [popularTestsFiltered,setPopularTestsFiltered] = useState([]);
    const [search, setSearch] = useState('');
    
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
            <Navigation testList = {props.testList} updateCartValue={props.updateCartValue} cartValue={props.cartValue} />  
                <Container>
                    <Row className="mt-5">
                        <Col>
                            <img src="/images/packages/test.jpg" alt="image" className="gift-static-img" />
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
            
                <Container className="mb-5">
                    <Row className="mt-4">
                        <Col>
                            <h2 className="landing-h2 mt-4 mb-5">
                                Our Curated Heath Packages
                            </h2>
                        </Col>
                    </Row>
                        {packages === null? React.Fragment :<HealthCheckCarousel updateCartValue={props.updateCartValue}  data={packages}/>}
                </Container>
                <Container>
                    <Row className="mb-5 mt-5"></Row>
                </Container>

        </>
    )
}