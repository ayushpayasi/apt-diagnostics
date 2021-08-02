import React, { useState, useRef } from "react";
import gsap from "gsap";
import "../assets/css/subscribe.scss"

const tl = gsap.timeline();
const CHECK_CIRC = 2 * Math.PI * 45;

function SubInteraction() {
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const subElm = useRef(null);
  const subMaskElm = useRef(null);
  const subCheckCircleElm = useRef(null);
  const subCheckElm = useRef(null);
  const subscribeClick = evt => {
      evt.preventDefault()
    if (isAnimating === true) {
      return;
    }

    setIsAnimating(true);

    tl.to(subElm.current, {
      width: "25vmin",
      height: "25vmin",
      borderRadius: "50%",
      ease: "power4.out",
      duration: 0.5 });

    tl.to(subMaskElm.current, {
      scale: 1,
      ease: "power4.out",
      duration: 0.5 },
    "-=0.5");

    tl.to(subCheckCircleElm.current, {
      strokeDasharray: CHECK_CIRC + " " + CHECK_CIRC,
      ease: "power3.out",
      duration: 0.5 });


    tl.to(subCheckElm.current, {
      "--height": "100%",
      ease: "power2.out",
      duration: 0.25 },
    "-=0.5");

    tl.to(subCheckElm.current, {
      "--width": "84%",
      ease: "power2.out",
      duration: 0.25 },
    "-=0.25");

    tl.to(subElm.current, {
      duration: 2.5,
      onComplete: () => {

        setEmail("");

        setIsAnimating(false);

        tl.progress(0);
        tl.clear();

        tl.set(subElm.current, {
          width: null,
          height: null });

      } });

  };

  return (
    React.createElement("div", { className: "sub", ref: subElm }, 
    React.createElement("div", { className: "sub-text" }, 
    React.createElement("h2", null, "Great! Ain't it?"), 
    React.createElement("h6", null, "Subscribe, To Keep In Touch With Us!")), 

    React.createElement("div", { className: "sub-form" }, 
    React.createElement("div", { className: "field" }, 
    React.createElement("input", {
      type: "email",
      placeholder: "Enter your e-mail address",
      value: email,
      onInput: evt => {setEmail(evt.target.value);} })), 


    React.createElement("div", { className: "field" }, 
    React.createElement("a", {
      href: "#",
      role: "button",
      onClick: subscribeClick },

    React.createElement("span", null, "Subscribe now")))),



    React.createElement("div", { className: "sub-mask", ref: subMaskElm }, 
    React.createElement("svg", {
      viewBox: "0 0 100 100",
      className: "sub-check-circle",
      ref: subCheckCircleElm }, 

    React.createElement("circle", { r: "45", cx: "50", cy: "50" })), 

    React.createElement("div", { className: "sub-check", ref: subCheckElm }, 
    React.createElement("span", null), 
    React.createElement("span", null)))));




}


export default function Subscribe(){
    return(
        <SubInteraction/>
    )
}