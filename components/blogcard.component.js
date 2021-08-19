import React, {useState} from 'react'
import {Badge,Container,CardTitle,Card,CardImg,CardText,CardSubtitle} from "reactstrap"
// import Card from "@material-ui/core/Card";
import Share from "./share.component";
import parse from "html-react-parser";

const BlogCard = (props) => {

    const isVideoBlog = props.isVideo;
    let text = props.description;
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&nbsp;/g, " ");
    text = text.replace(/&#39;/, "'");
    const onClickHandler = () => {
        props.catchBlogClick(true,props.blogDataDetails,isVideoBlog)
    }

    return(
        <>
            <Card className="blog-card packages-card shrink-on-small" onClick={onClickHandler}>
                <div className='curated-health-image'>
                    {/*if the blog contains video then use iframe*/}
                    {isVideoBlog ?  <CardImg top width="100%" style={{cursor : 'pointer'}} src={props.videoLink}></CardImg> : 
                                    <CardImg top width="100%" style={{cursor : 'pointer'}} src={props.imageLink}></CardImg> }  
                </div>
                <div className="blog-card-details">
                    <CardSubtitle style={{textAlign: 'left'}} className="mt-3">Written by <br/> <Badge color="primary"> Team APT DIagnostics</Badge></CardSubtitle>
                    {/* <CardTitle style={{cursor : 'pointer'}}>{props.title}</CardTitle> */}
                    <Share className="mt-3" /> 
                </div>
                <CardText style={{maxHeight: '25vh', overflowY: 'scroll'}}>{parse(text)}</CardText>
            </Card> 
        </>
    )
}

export default BlogCard