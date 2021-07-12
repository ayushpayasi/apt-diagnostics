import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {apiLinks} from "../../connection.config"
import {Card,CardBody,CardTitle,Row,Col,FormGroup,Button,Label,Input,ListGroup,ListGroupItem, CardSubtitle} from "reactstrap"
import {toast} from "react-toastify"
import BlogEditor from "./blogEditor.component"


export default function BlogUpdateWindow(props) {
    const [blogDetails,setBlogDetails] = useState()
    const [videoFile,setVideoFile] = useState(null)
    const [blogImages,setBlogImages] = useState(null)
    const [authorImage,setAuthorImage] = useState(null)
    const [contentEditor,setContentEditor] = useState(false)    
    const [videoCheckBox,setVideoCheckBox] = useState(false); //for disabling and enabling the video upload option


    const clearAllState =()=>{
        setBlogDetails("")
        setVideoFile(null)
        setBlogImages(null)
        setAuthorImage(null)
    }

    const saveBlogDetails = async ()=>{
        try{
        const formData = new FormData()
        if(videoFile !== null){formData.append("videoFile",videoFile)}
        if(blogImages !== null){for(var image of blogImages){formData.append("images",image)}}
        if(authorImage !== null){formData.append("authorImage",authorImage)}
        formData.append("author",document.getElementById("author").value)
        formData.append("isVideoBlog",document.getElementById("isVideoBlog").checked)
        formData.append("blogHeading",document.getElementById("blogHeading").value)
        formData.append("blogSubHeading",document.getElementById("blogSubHeading").value)
        formData.append("content","")
        const result = await axios.post(apiLinks.adminInsertBlog,formData)
        if(result.status === 200){
            console.log(result.data)
            setBlogDetails(result.data)
            toast("Blog Inserted Successfully!")
            setContentEditor(true)
        }
        else{
            toast("Cant Insert Blog!")
        }
        }catch(err){
            console.log(err)
            toast("Internal Server Error")
            setContentEditor(true)  //need to change to true
        }
    }

    useEffect(() => {
    }, [])

    return (    
<>
    {contentEditor?<BlogEditor blogData={blogDetails} clearAllState={clearAllState} contentEditorWindow={setContentEditor} BlogInsertWindow={props.setBlogInsertWindow} fromBlogInsertWindow={true}/>:
    <div className="updateWindow">
   <Card className="editWindow">
            <CardBody>
                <CardTitle><Button onClick={()=>{clearAllState();props.setBlogInsertWindow(false)}} close /></CardTitle>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="author"> Author</Label>
                            <Input size="sm" id="author" placeholder="Author"></Input>
                        </FormGroup>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <FormGroup >
                            <Input size="sm" type="checkbox" id="isVideoBlog" onChange={(event)=>{setVideoCheckBox(true)}}></Input>
                            <Label for="isVideoBlog"> Video Blog</Label>
                            {/* <h1>console.log(videoCheckBox)</h1> */}
                        </FormGroup>
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="blogHeading"> Heading</Label>
                            <Input size="sm" id="blogHeading" placeholder="Blog Heading"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="blogSubHeading"> Sub Heading</Label>
                            <Input size="sm" id="blogSubHeading" placeholder="Sub Heading"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup>
                        <Label for="catgory">Category</Label>
                        <Input size="sm" id="category" placeholder="category">    
                        </Input>
                    </FormGroup>
                    </Col> 
                    <Col>
                    <FormGroup>
                        <Label for="blogVideo">Video File</Label>
                        {videoCheckBox?<Input size="sm" id="blogVideo" onChange={(event)=>{setVideoFile(event.target.files[0]); setVideoCheckBox(false); console.log(event.target.files)}} type="file" placeholder="Blog Video"></Input>:<Input size="sm" id="blogVideo" type="file" disabled></Input>}
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="imageFiles">Image Files</Label>
                        <Input size="sm" id="imageFiles" multiple onChange={(event)=>{setBlogImages(event.target.files); console.log(event.target.files)}} type="file" placeholder="Blog Images">
                        </Input>
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-1 d-flex justify-content-center">
                        <Button onClick={()=>{saveBlogDetails()}}>SAVE AND PROCEED</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
    }</>
    )
}
