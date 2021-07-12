import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import { CardImg,Card,CardTitle } from "reactstrap";
import $ from "jquery"
import "../assets/css/darkorgans.scss"

export default function CenterMode(props){
  const [slider,setSlider] = useState();
  // useEffect(() => {
  //   $('.slick-slider').on('click', '.slick-slide', function (e) {
  //     e.stopPropagation();
  //     var index = $(this).index();
  //     if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
  //           $('.slick-slider').slick('slickGoTo', index);
  //     }
  // });
  // }, [])


    const handleChange = (e)=>{
      props.setSlide(e)
        // const item = document.getElementById(`diagnosticsimg${e}`)
        // console.log(item.src)
        // const regex = /(.*\/)(.*)\-/
        // const arr = item.src.match(regex)
        // let new_src = arr[1]+arr[2]+".svg"
        // item.src = new_src
    }

    const settings = {
        className: "center iofade",
        infinite: true,
        slidesToShow: 9,
        centerMode:true,
        centerPadding: "10px",
        autoplay:true,
        autoplaySpeed:5000,
        arrows:false,
        initialSlide:0,
      //   afterChange:handleChange,
      //   speed: 500,
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
          <div>
            <div onClick={()=>{
              handleChange(7)
              return slider.slickGoTo(0)}} >
                <img className="allergy"id="diagnosticsimg1" src="/svg/aptorgans/light/allergy.svg"></img>
            </div>
          </div>
          <div>
            <div onClick={()=>{
              handleChange(2)
              return slider.slickGoTo(1)}}>
              <img className="brain" id="diagnosticsimg1" src="/svg/aptorgans/light/brain.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(3)
              return slider.slickGoTo(2)}}>
              <img className="reproductive" id="diagnosticsimg1" src="/svg/aptorgans/light/female_reproductive.svg"></img>
            </div>
          </div>
          <div>
            <div onClick={()=>{
              handleChange(0)
              return slider.slickGoTo(3)}}>
              <img className="heart" id="diagnosticsimg1" src="/svg/aptorgans/light/heart.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(5)
              return slider.slickGoTo(4)}}>
              <img className="kidney" id="diagnosticsimg1" src="/svg/aptorgans/light/kidney.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(1)
              return slider.slickGoTo(5)}}>
              <img className="liver" id="diagnosticsimg1" src="/svg/aptorgans/light/liver.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(4)
              return slider.slickGoTo(6)}}>
              <img className="lungs" id="diagnosticsimg1" src="/svg/aptorgans/light/lungs.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(7)
              return slider.slickGoTo(7)}}>
              <img className="virus" id="diagnosticsimg1" src="/svg/aptorgans/light/virus.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(6)
              return slider.slickGoTo(8)}}>
              <img className="virus" id="diagnosticsimg1" src="/svg/aptorgans/dark/virus.svg"></img>
            </div >
          </div>
          <div>
            <div onClick={()=>{
              handleChange(8)
              return slider.slickGoTo(9)}}>
              <img className="vitamins" id="diagnosticsimg1" src="/svg/aptorgans/light/vitamins.svg"></img>
            </div >
          </div>
        </Slider>
      </div>
    );
  }