import React, {useState} from 'react'
import {Badge,Container,CardTitle,Card,CardImg,CardText,CardSubtitle} from "reactstrap"
// import Card from "@material-ui/core/Card"
import Share from "./share.component"

const BlogCard = (props) => {

    const isVideoBlog = props.isVideo

    const onClickHandler = () => {
        props.catchBlogClick(true,props.blogDataDetails,isVideoBlog)
    }

    return(
        <>
            <Card className="blog-card">
                {isVideoBlog ? <CardImg top width="100%" onClick={onClickHandler} style={{cursor : 'pointer'}} src={props.videoLink}></CardImg>: <CardImg top width="100%" onClick={onClickHandler} style={{cursor : 'pointer'}} src={props.imageLink}></CardImg> } {/*if the blog contains video then use iframe*/} 
                <CardSubtitle>Written by <Badge color="primary"> Team APT DIagnostics</Badge></CardSubtitle>
                <CardTitle onClick={onClickHandler} style={{cursor : 'pointer'}}>{props.title}</CardTitle>
                <Share/> 
                <CardText>{props.description.substring(0,10)+"..."}</CardText>
            </Card> 
        </>
    )
}

export default BlogCard