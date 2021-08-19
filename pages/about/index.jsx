import React from 'react';
import NavBar from "../../components/navbar.component";
import {Container,Row,Col} from "reactstrap";
import Tab from "../../components/abouttab.component";
import "../../assets/css/about.scss";
import Head from 'next/head';
import axios from 'axios';
import { apiLinks } from '../../connection.config';

const getTestListData = async ()=>{
  try{
      const response = await axios.get(apiLinks.priceList, {params:{coupon:"priceList"}});
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

const getCovidTestData = async () => {
  try{
      const covidTestsResponse = await axios.get(apiLinks.getCovidTests);
      if(covidTestsResponse.data.code === 200){
          return covidTestsResponse.data.data;
      }
      else{
          return [];
      }
  }
  catch(err){
      console.log(err);
  }
}

const getPackagesData = async () => {
  try{
      const packagesResponse = await axios.get(apiLinks.getPackages);
      if(packagesResponse.data.code === 200){
          return packagesResponse.data.data;
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
    const packages = await getPackagesData();
    const covidTests = await getCovidTestData();
    const testList = await getTestListData();
    // console.log(packages);
    // console.log(covidTests);
    // console.log(testList);
    return  {props: 
                {packages, covidTests, testList} 
            };
  }
  catch(err){
      console.log(err);
      return { props: {packages:[], covidTests:[], testList:[]} };
  }
}

export default function About(props) {
    return (
        <React.Fragment>
            <Head>
                <title>About || APTDiagnostics</title>
            </Head>
            <NavBar testList = {props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
            <Container>
                <Row>
                    <Col>
                        <Tab/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
