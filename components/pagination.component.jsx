import React,{useState} from 'react'
import Pagination from '@material-ui/lab/Pagination';
import {Container,Row,Col,ListGroupItem,ListGroup} from "reactstrap"
export default function TestPagination(props) {
    const testList = props.testList.sort((a, b) => a.testName.localeCompare(b.testName));
    const totalPerPage = parseInt(props.testList.length/10)
    const [currPage,setCurrPage] = useState(0)
    const [totalPage,setTotalPage] = useState(9)
    let startPage = totalPerPage*(currPage+1)
    let perList = parseInt(totalPerPage/3)

    const handleChange = (event,value)=>{
        setCurrPage(value)
        startPage = totalPerPage*(value+1)
    }

            
    const addToCart = (event,item)=>{
        event.stopPropagation();
        let cart = JSON.parse(sessionStorage.getItem("cart"))
        if(cart !== null){
        if(cart.length === 0){sessionStorage.setItem("cart",JSON.stringify([item]))}
        else{
            cart.push(item)
            props.updateCartValue(cart.length)
            sessionStorage.setItem("cart",JSON.stringify(cart))
        }
    }else{
        sessionStorage.setItem("cart",JSON.stringify([item]))
    }
    }

    return (
        <>
    <Row className="mt-4">
    
        <Col><ListGroup flush >{testList.slice(startPage,startPage+perList).map(item=><ListGroupItem style={{cursor:"pointer"}} onClick={(event)=>{addToCart(event,item)}} key="item.testID">{item.testName}</ListGroupItem>)}</ListGroup></Col>
        <Col><ListGroup flush >{testList.slice(startPage+perList+1,startPage+(perList*2)).map(item=><ListGroupItem style={{cursor:"pointer"}} onClick={(event)=>{addToCart(event,item)}} key="item.testID">{item.testName}</ListGroupItem>)}</ListGroup></Col>
        <Col><ListGroup flush >{testList.slice(startPage+(perList*2),startPage+totalPerPage).map(item=><ListGroupItem style={{cursor:"pointer"}} onClick={(event)=>{addToCart(event,item)}} key="item.testID">{item.testName}</ListGroupItem>)}</ListGroup></Col>
    </Row>
        <Pagination count={totalPage} page={currPage} onChange={handleChange}/>        
        </>
    )
}
