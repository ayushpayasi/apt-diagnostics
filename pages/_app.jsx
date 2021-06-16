import App from "next/app";
import React from "react";
import Head from "next/head"
import { ToastContainer} from 'react-toastify';

// Main SCSS
import "../assets/scss/main.scss";
import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  componentDidMount(){
    sessionStorage.setItem("cart",JSON.stringify([]))
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
        </>
    );
  }
}

export default MyApp
