import React,{useState,useEffect,useRef} from 'react'
import {Card,CardTitle,CardBody,CardText,Row,Col,Container,Button}  from "reactstrap"
import Head from "next/head"
import CKEditor from 'ckeditor4-react';

import dynamic from "next/dynamic";
import { toast } from 'react-toastify';

const dataSave = async() => {
        try{
            let tempData = blogDetails
            const formData = new FormData()
            if(videoFile !== null){formData.append("videoFile",videoFile)}
            if(blogImages !== null){for(var image of blogImages){formData.append("images",image)}}
            if(authorImage !== null){formData.append("authorImage",authorImage)}
            

            
            // const result = await axios.post(apiLinks.adminPostBlog,formData)
            // if(result.status === 200){
            //     console.log(result.data)
            //     setBlogDetails(result.data)
            //     toast("Details Saved!")
            //     setContentEditor(true)  
            // }
        }
        catch(err){
            console.log(err)
            toast("Yes")
        }
    }


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
            <Button onClick={dataSave()}>save</Button>
        </Card>
        </>
    )
}
