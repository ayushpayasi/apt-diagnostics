import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import { CardImg,Card,CardTitle } from "reactstrap";
import $ from "jquery"

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
        console.log(e)
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
        autoplay:true,
        autoplaySpeed:5000,
        arrows:false,
        initialSlide:0,
        infinite:true,
        slidesToScroll:1,
        afterChange:handleChange,
        speed: 500,
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
            <div onClick={()=>{slider.slickGoTo(7)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%",margin:0,padding:0}}  id="diagnosticsimg1" src="/svg/brain-inactive.svg"></CardImg>
            </div>
        </div>
          <div>
          <div onClick={()=>{slider.slickGoTo(8)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%",margin:0,padding:0}} id="diagnosticsimg2" src="/svg/female_reproductive_system-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(9)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%",margin:0,padding:0}}  id="diagnosticsimg3" src="/svg/heart-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(10)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%",margin:0,padding:0}}  id="diagnosticsimg4" src="/svg/intestines-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(0)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg5" src="/svg/kidney-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(1)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg6" src="/svg/liver.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(2)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg7" src="/svg/lungs.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(3)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg8" src="/svg/male_reproductive_system-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(4)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg9" src="/svg/pancreas-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(5)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg10" src="/svg/stomach-inactive.svg"></CardImg>
          </div ></div>
          <div>
          <div onClick={()=>{slider.slickGoTo(6)}} style={{border:"1px solid #094275",borderRadius:"5px"}}>
                <CardImg style={{height:"100px",width:"100%"}}  id="diagnosticsimg11" src="/svg/thyroid-inactive.svg"></CardImg>
          </div ></div>
        </Slider>
      </div>
    );
  }