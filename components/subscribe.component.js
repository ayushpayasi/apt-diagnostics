import React, { useState, useRef } from "react";
import gsap from "gsap";
import "../assets/css/subscribe.scss"

const tl = gsap.timeline();
const CHECK_CIRC = 2 * Math.PI * 45;

function SubInteraction() {
  // E-mail address value
  const [email, setEmail] = useState("");

  // If the element is animating
  const [isAnimating, setIsAnimating] = useState(false);

  // Subscribe element
  const subElm = useRef(null);

  // Subscribe mask element
  const subMaskElm = useRef(null);

  // Circle part of the subcribe element
  const subCheckCircleElm = useRef(null);

  // Check part of the subcribe element
  const subCheckElm = useRef(null);

  // Subscribe button click event
  const subscribeClick = evt => {
      evt.preventDefault()
    if (isAnimating === true) {
      return;
    }

    setIsAnimating(true);

    // Main box to circle
    tl.to(subElm.current, {
      width: "25vmin",
      height: "25vmin",
      borderRadius: "50%",
      ease: "power4.out",
      duration: 0.5 });


    // Green circle scale to normal
    tl.to(subMaskElm.current, {
      scale: 1,
      ease: "power4.out",
      duration: 0.5 },
    "-=0.5");

    // Draw a circle
    tl.to(subCheckCircleElm.current, {
      strokeDasharray: CHECK_CIRC + " " + CHECK_CIRC,
      ease: "power3.out",
      duration: 0.5 });


    // Draw a check mark
    tl.to(subCheckElm.current, {
      "--height": "100%",
      ease: "power2.out",
      duration: 0.25 },
    "-=0.5");

    // Draw a check mark
    tl.to(subCheckElm.current, {
      "--width": "84%",
      ease: "power2.out",
      duration: 0.25 },
    "-=0.25");

    // Do nothing, just to delay the reset
    tl.to(subElm.current, {
      duration: 2.5,
      onComplete: () => {
        // Clear email
        setEmail("");

        // Reset animating status
        setIsAnimating(false);

        // Reset the animation to beginning
        tl.progress(0);
        tl.clear();

        // Unset the size of the box
        tl.set(subElm.current, {
          width: null,
          height: null });

      } });

  };

  // Render JSX
  return /*#__PURE__*/(
    React.createElement("div", { className: "sub", ref: subElm }, /*#__PURE__*/
    React.createElement("div", { className: "sub-text" }, /*#__PURE__*/
    React.createElement("h2", null, "Great! Ain't it?"), /*#__PURE__*/
    React.createElement("p", null, "Do you want to hear from us more?")), /*#__PURE__*/

    React.createElement("div", { className: "sub-form" }, /*#__PURE__*/
    React.createElement("div", { className: "field" }, /*#__PURE__*/
    React.createElement("input", {
      type: "email",
      placeholder: "Enter your e-mail address",
      value: email,
      onInput: evt => {setEmail(evt.target.value);} })), /*#__PURE__*/


    React.createElement("div", { className: "field" }, /*#__PURE__*/
    React.createElement("a", {
      href: "#",
      role: "button",
      onClick: subscribeClick }, /*#__PURE__*/

    React.createElement("i", { className: "far fa-bell" }), /*#__PURE__*/
    React.createElement("span", null, "Subscribe now")))), /*#__PURE__*/



    React.createElement("div", { className: "sub-mask", ref: subMaskElm }, /*#__PURE__*/
    React.createElement("svg", {
      viewBox: "0 0 100 100",
      className: "sub-check-circle",
      ref: subCheckCircleElm }, /*#__PURE__*/

    React.createElement("circle", { r: "45", cx: "50", cy: "50" })), /*#__PURE__*/

    React.createElement("div", { className: "sub-check", ref: subCheckElm }, /*#__PURE__*/
    React.createElement("span", null), /*#__PURE__*/
    React.createElement("span", null)))));




}


export default function Subscribe(){
    return(
        <SubInteraction/>
    )
}