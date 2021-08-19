import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import { CardImg,Card,CardTitle } from "reactstrap";
import $ from "jquery"
import "../assets/css/darkorgans.scss"

export default function CenterMode(props){
  const [slider,setSlider] = useState(0);


    const handleChange = (e)=>{
      props.setSlide(e)
    }


    const settings = {
        className: "center iofade",
        infinite: true,
        slidesToShow: 7,
        centerMode:true,
        centerPadding: "10px",
        autoplay:true,
        autoplaySpeed:5000,
        arrows:false,
        initialSlide:0,
        pauseOnHover: true,
        swipeToSlide: true,
        afterChange:(e)=>{handleChange(e)},
        cssEase: "ease-out",
        responsive: [
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 7,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 991,
              settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 586,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
              }
          }
      ]
      };

    return (
      <div>
        <Slider ref={ref=>{setSlider(ref)}} {...settings}>
          <div key="1">
            <div onClick={()=>{
              handleChange(0);slider.slickGoTo(0)}} >
                <img className="allergy" style={{height:"100px",width:"100px",margin:0,padding:"10px"}} id="diagnosticsimg1" src="/svg/aptorgans/light/allergy.svg" />
            </div>
          </div>
          <div key="2">
            <div onClick={()=>{
              handleChange(1);slider.slickGoTo(1)}}>
              <img className="brain" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/brain.svg" />
            </div>
          </div>
          <div key="3">
            <div onClick={()=>{
              handleChange(2); slider.slickGoTo(2)}}>
              <img className="reproductive" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/female_reproductive.svg" />
            </div>
          </div>
          <div key="4">
            <div onClick={()=>{
              handleChange(3); slider.slickGoTo(3)}}>
              <img className="heart" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/heart.svg" />
            </div>
          </div>
          <div key="5">
            <div onClick={()=>{
              handleChange(4); slider.slickGoTo(4)}}>
              <img className="kidney" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/kidney.svg" />
            </div>
          </div>
          <div key="6">
            <div onClick={()=>{
              handleChange(5); slider.slickGoTo(5)}}>
              <img className="liver" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/liver.svg" />
            </div>
          </div>
          <div key="7">
            <div onClick={()=>{
              handleChange(6); slider.slickGoTo(6)}}>
              <img className="lungs" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/lungs.svg" />
            </div>
          </div>
          {/* <div>
            <div onClick={()=>{
              handleChange(7); slider.slickGoTo(7)}}>
              <img className="virus" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/virus.svg" />
            </div>
          </div> */}
          <div key="8">
            <div onClick={()=>{
              handleChange(7); slider.slickGoTo(7)}}>
              <img className="vitamins" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/vitamins.svg" />
            </div>
          </div>
          <div key="9">
            <div onClick={()=>{
              handleChange(8); slider.slickGoTo(8)}}>
              <img className="trachea" style={{height:"100px",width:"100px",margin:0,padding:"10px"}}  id="diagnosticsimg1" src="/svg/aptorgans/light/trachea.svg" />
            </div>
          </div>
        </Slider>
      </div>
    );
  }