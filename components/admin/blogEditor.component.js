import React,{useState,useEffect,useRef} from 'react'
import {Card,CardTitle,CardBody,CardText,Row,Col,Container,Button}  from "reactstrap"
import Head from "next/head"
import CKEditor from 'ckeditor4-react';

import dynamic from "next/dynamic";



export default function BlogEditor(props) {
    useEffect(()=>{

    },[])

    return (
        <>
        <Card className="blogEditor">
            <CardBody>
            <CardTitle><Button onClick={()=>{props.clearAllState();props.setBlogUpdateWindow(false);props.contentEditorWindow(false);}} close /></CardTitle>
            <textarea name="editor1"></textarea>
            <CKEditor/>
            </CardBody>
        </Card>
        </>
    )
}
