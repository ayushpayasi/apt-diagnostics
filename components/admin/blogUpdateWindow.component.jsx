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

    const saveBlogDetails =async ()=>{
        try{
        let tempData = blogDetails
        const formData = new FormData()
        if(videoFile !== null){formData.append("videoFile",videoFile)}
        if(blogImages !== null){for(var image of blogImages){formData.append("images",image)}}
        if(authorImage !== null){formData.append("authorImage",authorImage)}
        formData.append("author",document.getElementById("author"))
        formData.append("isVideoBlog",document.getElementById("isVideoBlog").checked)
        formData.append("blogId",tempData.blogId)
        formData.append("blogHeading",document.getElementById("blogHeading"))
        formData.append("blogSubHeading",document.getElementById("blogSubHeading"))
        formData.append("oldVideoLink",tempData.videoLink)
        formData.append("imagesLink",JSON.stringify(tempData.imagesLink))
        formData.append("oldAuthorImage",tempData.authorThumbnail)
        formData.append("content",tempData.content ||"")
        const result = await axios.post(apiLinks.adminPostBlog,formData)
        if(result.status === 200){
            console.log(result.data)
            setBlogDetails(result.data)
            taost("Details Saved!")
            setContentEditor(true)
        }
        else{
            toast("Cant Update Blog!")
        }
        }catch(err){
            console.log(err)
            toast("Internal Server Error")
            setContentEditor(true)
        }
    }

    useEffect(() => {
        if(props.blogToUpdate === -1){document.getElementById("blogId").disabled = true}
        else{document.getElementById("blogId").value = props.blogToUpdate}
    }, [])

    return (    
<>
    {contentEditor?<BlogEditor clearAllState={clearAllState} contentEditorWindow={setContentEditor} BlogUpdateWindow={props.setBlogUpdateWindow}/>:
    <div className="updateWindow">
   <Card className="editWindow">
            <CardBody>
                <CardTitle><Button onClick={()=>{clearAllState();props.setBlogUpdateWindow(false)}} close /></CardTitle>
                <Row>
                    <Col xs="6">
                    <FormGroup>
                            <Label for="blogId"> Blog ID</Label>
                            <Input id="blogId" placeholder="Blog Id"></Input>
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
                            <Input id="author" placeholder="Author"></Input>
                        </FormGroup>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <FormGroup >
                            <Input type="checkbox" id="isVideoBlog"></Input>
                            <Label for="isVideoBlog"> Video Blog</Label>
                        </FormGroup>
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="blogHeading"> Heading</Label>
                            <Input id="blogHeading" placeholder="Blog Heading"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="blogSubHeading"> Sub Heading</Label>
                            <Input id="blogSubHeading" placeholder="Sub Heading"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup>
                        <Label for="authorThumbnail">Author Thumbnail</Label>
                        <Input id="authorThumbnail" onChange={(event)=>{setAuthorImage(event.target.files[0])}} type="file" placeholder="Author Image">
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="blogVideo">Video File</Label>
                        <Input id="blogVideo" onChange={(event)=>{setVideoFile(event.target.files[0]); console.log(event.target.files)}} type="file" placeholder="Blog Video">
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="imageFiles">Image Files</Label>
                        <Input id="imageFiles" multiple onChange={(event)=>{setBlogImages(event.target.files); console.log(event.target.files)}} type="file" placeholder="Blog Images">
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