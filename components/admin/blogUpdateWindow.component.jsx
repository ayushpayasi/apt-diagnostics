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
        props.setBlogToUpdate(-1)
    }

    const fillDetails = async ()=>{
        try{
        const result = await axios.get(apiLinks.checkAndFetchBlogDetails,{params:{Id:props.blogToUpdate}})
        if(result.status === 200){
            document.getElementById("author").value = result.data[0].author
            document.getElementById("isVideoBlog").checked = result.data[0].isVideoBlog
            document.getElementById("blogHeading").value = result.data[0].heading
            document.getElementById("blogSubHeading").value = result.data[0].subHeading
            document.getElementById("blogVideo").disabled = !result.data[0].isVideoBlog
            setBlogDetails(result.data[0])  
        }
        else if(result.status === 400){
            toast("Invalid ID!")
        }
        else{
            toast("cant fetch details!")
        }
        }catch(err){
            toast("Internal Server Error")
    }}

    const saveBlogDetails = async ()=>{
        try{
        let tempData = blogDetails 
        const formData = new FormData()
        if(videoFile !== null){formData.append("videoFile",videoFile)}
        if(blogImages !== null){for(var image of blogImages){formData.append("images",image)}}
        if(authorImage !== null){formData.append("authorImage",authorImage)}
        formData.append("author",document.getElementById("author").value)
        formData.append("isVideoBlog",document.getElementById("isVideoBlog").checked)
        formData.append("blogId",tempData.blogId)
        formData.append("blogHeading",document.getElementById("blogHeading").value)
        formData.append("blogSubHeading",document.getElementById("blogSubHeading").value)
        formData.append("oldVideoLink",tempData.videoLink)
        formData.append("imagesLink",JSON.stringify(tempData.imagesLinks))
        formData.append("oldAuthorImage",tempData.authorThumbnail)
        formData.append("content",tempData.content ||"")
        const result = await axios.post(apiLinks.adminPostBlog,formData)
        if(result.status === 200){
            console.log(result.data)
            setBlogDetails(result.data)
            toast("Blog Updated Successfully!!")
            setContentEditor(true)
        }
        else{
            toast("Cant Update Blog!")
        }
        }catch(err){
            console.log(err)
            toast("Internal Server Error")
            setContentEditor(true)  //need to change to true
        }
    }

    useEffect(() => {
        if(props.blogToUpdate === -1){document.getElementById("blogId").disabled = true}
        else{document.getElementById("blogId").value = props.blogToUpdate}
    }, [])

    return (    
<>
    {contentEditor?<BlogEditor blogData={blogDetails} clearAllState={clearAllState} contentEditorWindow={setContentEditor} BlogUpdateWindow={props.setBlogUpdateWindow} fromBlogUpdateWindow={true}/>:
    <div className="updateWindow">
   <Card className="editWindow">
            <CardBody>
                <CardTitle><Button onClick={()=>{clearAllState();props.setBlogUpdateWindow(false)}} close /></CardTitle>
                <Row>
                    <Col xs="6">
                    <FormGroup>
                            <Label for="blogId"> Blog ID</Label>
                            <Input size="sm" id="blogId" placeholder="Blog Id"></Input>
                        </FormGroup>                                
                    </Col>
                    <Col xs="4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <Button onClick={()=>{fillDetails()}} style={{background:"#0a4275",color:"white",borderRadius:"10px",border:"none"}}>Fetch Details</Button>
                    </Col>
                </Row>
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
                        {/* <Label for="authorThumbnail">Author Thumbnail</Label>
                        <Input size="sm" id="authorThumbnail" onChange={(event)=>{setAuthorImage(event.target.files[0])}} type="file" placeholder="Author Image">
                        </Input> */}
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
