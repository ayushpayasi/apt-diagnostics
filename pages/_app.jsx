import App from "next/app";
import React from "react";
import Head from "next/head"
import { ToastContainer} from 'react-toastify';
// import DownloadReportLightbox from "../components/lightbox/downloadreport.component";
// Main SCSS
import "../assets/scss/main.scss";
import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {cartValue: 0};
  }

  updateCartValue = (value)=> {
    this.setState({cartValue:value})
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        {/* {this.state.downloadReport?<DownloadReportLightbox/>:<React.Fragment/>} */}
        <Component {...pageProps} cartValue={this.state.cartValue} updateCartValue={this.updateCartValue} />
        <ToastContainer />
        </>
    );
  }
}

export default MyApp
