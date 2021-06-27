import React from 'react'
import {Row,Col,Container,ListGroup,ListGroupItem} from "reactstrap"

export default function AdminNavbar(props) {
    return (
        <>

        <div className="navbar-admin">
            <img className="admin-navbar-logo" src="/images/logo.png" alt="apt diagnostics"/> 
            <div className="admin-nav-links">
                <ListGroup flush>
                    <ListGroupItem style={{color:(props.currentContainer === "adminContent1")?"#ff6363":"white"}} onClick={()=>{props.changeContainer("adminContent1")}}>Home</ListGroupItem>
                    <ListGroupItem style={{color:(props.currentContainer === "adminContent2")?"#ff6363":"white"}} onClick={()=>{props.changeContainer("adminContent2")}}>Packges</ListGroupItem>
                    <ListGroupItem style={{color:(props.currentContainer === "adminContent3")?"#ff6363":"white"}} onClick={()=>{props.changeContainer("adminContent3")}}>Tests</ListGroupItem>
                    {/* <ListGroupItem style={{color:(props.currentContainer === "adminContent4")?"#ff6363":"white"}} onClick={()=>{props.changeContainer("adminContent4")}}>Organs</ListGroupItem> */}
                    <ListGroupItem style={{color:(props.currentContainer === "adminContent5")?"#ff6363":"white"}} onClick={()=>{props.changeContainer("adminContent5")}}>Blogs</ListGroupItem>
                </ListGroup>
           
            </div>
        </div>
        </>
    )
}
