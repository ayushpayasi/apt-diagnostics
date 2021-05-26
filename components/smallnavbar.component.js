import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import "../assets/css/navbar.scss"

const SmallNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
     <Navbar className={props.color==="white"?"navbarsmall-a sticky-top":"navbarsmall sticky-top"} light expand="lg">
        <NavbarBrand href="/"><img alt="logo" className="logo-img-small" src="/images/logotype2.jpg"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="m-2">
              <NavLink className="nav-link" href="/about">About</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/tests">Packages</NavLink>
            </NavItem><NavItem className="m-2">
              <NavLink className="nav-link" href="/diagnostics">Covid-19</NavLink>
            </NavItem>
            <NavItem className="m-2">
            <NavLink className="nav-link" href="/partner">Patients</NavLink>
            </NavItem>
           </Nav>
        </Collapse>
      </Navbar>
      </div>
  );
}

export default SmallNavbar;