import React from 'react'
import {Container,Row,Col,ListGroupItem,ListGroup,Button} from "reactstrap"
import NavBar from "../components/navbar.component"
import IconButton from "@material-ui/core/IconButton"
import CancelOutlined from "@material-ui/icons/CancelOutlined"
import "../assets/css/downloadreports.scss"


export default function Reports() {
    const cartData = [
        {billId:"2021",
        name:"healthtest healthtest healthtest",
        reportDate:"03-05-2021",
        downloadLink:"",},
        {billId:"2022",
        name:"Lorem ipsum dolor sit amet.",
        reportDate:"05-05-2021",
        downloadLink:"",},
        {billId:"2023",
        name:"Lorem ipsum dolor sit amet.",
        reportDate:"07-05-2021",
        downloadLink:"",},
        {billId:"2024",
        name:"Lorem ipsum dolor sit amet.",
        reportDate:"09-05-2021",
        downloadLink:"",}
    ]

    
    const fillCart = (obj)=>{
        return(
            <ListGroupItem>
            <Row className="reports-cart-data">
                <Col md="1" xs="6">{obj.billId}</Col>
                <Col md="2" xs="6">{obj.reportDate}</Col>
                <Col md="5" xs="12">{obj.name}</Col>
                <Col md="2" xs="6"><Button>Cancel</Button></Col>
                <Col md="2" xs="6"><Button>Download</Button></Col>
            </Row>
        </ListGroupItem>
        )
    }


    return (
        <>
        <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
        <Container className="reports-container">
            <Row>
                <Col className="mt-5 text-center">
                    <h5>Your Orders</h5>
                </Col>
            </Row>
            <Row>
                <Col className="reports-list mt-2">
                <ListGroup flush>
                    <ListGroupItem className="reports-list-heading">
                    <Row>
                       <Col md="1">Bill Id</Col>
                       <Col md="2">Report Date</Col>
                       <Col md="5">Test/Package Name</Col>
                       <Col md="2">Cancel</Col>
                       <Col md="2">Download Report</Col>
                   </Row>
                    </ListGroupItem>
                    {cartData.map(item=>fillCart(item))}
                </ListGroup>
                </Col>
            </Row>
        </Container>
        </>
    )
}
