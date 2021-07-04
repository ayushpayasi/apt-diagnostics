import React, {useState} from 'react'
import {Badge,Container,CardTitle,Card,CardImg,CardText,CardSubtitle} from "reactstrap"
// import Card from "@material-ui/core/Card"
import Share from "./share.component"

const BlogCard = (props) => {


    const onClickHandler = () => {
        props.catchBlogClick(true, props.blogDataDetails)
    }
    return(
        <>
                <Card className="blog-card">
                <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                <CardSubtitle>Written by <Badge color="primary"> Team APT DIagnostics</Badge></CardSubtitle>
                <CardTitle onClick={onClickHandler} style={{cursor : 'pointer'}}>{props.title}</CardTitle>
                <Share/> 
                <CardText>{props.description}</CardText>
            </Card>
            
        </>
    )
}

export default BlogCard