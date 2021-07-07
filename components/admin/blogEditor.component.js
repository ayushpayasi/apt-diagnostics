import React,{useState} from 'react'
import {Card,CardTitle,CardBody,Dropdown,DropdownToggle, DropdownMenu, FormGroup, DropdownItem,CardText,Row,Col,Container,Button}  from "reactstrap"
import Head from "next/head"
import CKEditor from 'ckeditor4-react';
import axios from 'axios'
import {apiLinks} from "../../connection.config"
import dynamic from "next/dynamic";
import { toast } from 'react-toastify';

export default function BlogEditor(props) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [editorData, setEditorData] = useState('');



    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggle2 = () => setDropdownOpen2(prevState => !prevState);

    const onEditorChange = (evt) => {
        setEditorData(evt.editor.getData())
    }

    const saveContent = async() => {
       try {
           if(editorData) {
               const result = await axios.post(apiLinks.adminInsertBlogContent, {insertContentData : editorData, blogId : props.blogData.blogId})
               if(result.status === 200) {
                   toast("Content Inserted Successfully")
               }
               else{
                   toast("Content was not saved successfully")
               }
               props.fromBlogUpdateWindow ? props.BlogUpdateWindow(false) : props.BlogInsertWindow(false);
           }
           
       }
       catch(err) {
           console.log(err)
        toast("Internal Server Error")
       }
    }



    return (
        <>
        <Card className="blogEditor">
            <CardBody>
            <CardTitle><Button onClick={()=>{props.clearAllState();props.fromBlogUpdateWindow ? props.BlogUpdateWindow(false) : props.BlogInsertWindow(false);props.contentEditorWindow(false);}} close /></CardTitle>
            <Row>
                <Col>
                    <FormGroup>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                Edit Images
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Image-Links</DropdownItem>
                                {props.blogData.imagesLinks.length > 0 ? props.blogData.imagesLinks.map(image => <DropdownItem text key={Math.floor(Math.random() * Math.random() * 1000)}>{image}</DropdownItem>) :<DropdownItem text>No image found for this blog!!</DropdownItem> }   
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                            <DropdownToggle caret>
                                Edit Videos
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Video Links</DropdownItem>
                                {props.blogData.videoLink ? <DropdownItem text>{props.blogData.videoLink}</DropdownItem> :<DropdownItem text>No video found for this blog!!</DropdownItem> }
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                </Col>
            </Row>
            <textarea name="editor1"></textarea>
            <CKEditor onChange={onEditorChange}/>
            </CardBody>
            <Button onClick={saveContent}>save</Button>
        </Card>
        </>
    )
}
