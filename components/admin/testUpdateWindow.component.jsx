import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {toast } from 'react-toastify';
import {Card,CardBody,CardTitle,Row,Col,FormGroup,Button,Label,Input,ListGroup,ListGroupItem, CardSubtitle} from "reactstrap"
import {apiLinks} from "../../connection.config"


export default function TestUpdateWindow(props) {

    const[testDetails,setTestDetails] = useState();
    const[testImage,setTestImage] = useState(null);
    const[testReport,setTestReport] = useState(null);

    const clearAllState =()=>{
        setTestDetails([]);
        setTestImage(null);
        setTestReport(null);
    }

    const fillDetails = async()=>{                      
        try{
        const response = await axios.get(apiLinks.checkAndFetchTestDetails,{params:{Id:document.getElementById("testID").value}})
        if(response.data.status === 200){
            document.getElementById("testType").value = response.data.body.type
            document.getElementById("testName").value = response.data.body.testName
            document.getElementById("testDescription").value = response.data.body.description
            document.getElementById("testDetails").value = response.data.body.details
            document.getElementById("testPrice").value = response.data.body.testAmount
            document.getElementById("testFeatured").checked = response.data.body.isSpecial
            setTestDetails(response.data.body)
        }
        else if(response.data.status === 400){
            clearAllState();
            toast("Invalid Test Id !")
        }
        }
        catch(err){
            console.log(err)
            toast("Internal Server Error!")
        }
    }

    const saveTestDetails = async ()=>{
        try{
            let tempDetails = testDetails
        let formData = new FormData();
        if(testImage === null){
        }
        else{
            formData.append("testImage", testImage, testImage.name)
        }
        if(testReport === null){
        }
        else{
            formData.append("testReport", testReport, testReport.name)
        }
        formData.append("isSpecial",`${document.getElementById("testFeatured").checked}`)
        formData.append("type",`${tempDetails.type}`)
        formData.append("testName",`${tempDetails.testName}`)
        formData.append("description",`${document.getElementById("testDescription").value}`)
        formData.append("details",`${document.getElementById("testDetails").value}`)
        formData.append("testAmount",`${tempDetails.testAmount}`)
        formData.append("testID",`${tempDetails.testID}`)
        formData.append("oldTestImage",tempDetails.imageLink)
        formData.append("oldTestReport",tempDetails.sampleReportImage)

        const response = await axios.post(apiLinks.adminPostTest,formData,{headers:{"Content-type": "multipart/form-data"}})
        if(response.status === 200){
            toast("Test Updated!")
            props.setTestUpdateWindow(false)
        }
        else{
            toast("cant Update Test!")
            props.setTestUpdateWindow(false)
        }
        }
        catch(err){
            console.log(err)
            toast("Internal Server Error!")
            props.setTestUpdateWindow(false)
        }
    }

    const fetchData = async()=>{
        try{
        const result = await axios.get(apiLinks.adminGetPackageById,{params:{Id:props.packageToUpdate}})
            setPackageDetails(result.data)
        }   
        catch(err){
            console.log(err)
        }
    }

    const testReportChangeHandler = (event) => {
        setTestReport(event.target.files[0])
    }
    const testImageChangeHandler = (event)=>{
        
        setTestImage(event.target.files[0])
    }

    useEffect(() => {
        document.getElementById("testID").value = props.testToUpdate
        fetchData()    
    }, [])

    return (
        <div className="updateWindow">
                <Card className="editWindow">
                    <CardBody>
                        <CardTitle><Button onClick={()=>{clearAllState();props.setTestUpdateWindow(false)}} close /></CardTitle>
                        <Row>
                            <Col xs="4">
                            <FormGroup>
                                    <Label for="testID"> Test ID</Label>
                                    <Input size="sm" id="testID" placeholder="Test Id"></Input>
                                </FormGroup>                                
                            </Col>
                            <Col xs="4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <Button onClick={()=>{fillDetails()}} style={{background:"#0a4275",color:"white",borderRadius:"10px",border:"none"}}>Fetch Details</Button>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <FormGroup style={{fontWeight:"600"}}>
                                <Input size="sm" id="testFeatured" type="checkbox"/>{' '} Featured
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="testType"> Test Type</Label>
                                    <Input size="sm" id="testType" disabled placeholder="Test Type"></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="testName"> Test Name</Label>
                                    <Input size="sm" id="testName" disabled placeholder="Test Name"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="testDescription"> Description</Label>
                                    <Input size="sm" type="text" id="testDescription" placeholder="Test Description"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                    <Label for="testDetails"> Test Details</Label>
                                    <Input size="sm" type="textarea" id="testDetails" placeholder="Test Details"></Input>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="testPrice"> Test Price</Label>
                                    <Input size="sm" id="testPrice" disabled placeholder="Test Price"></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="image">Upload Report Image</Label>
                                    <Input size="sm" type="file" id="image" onChange={(event)=>{testReportChangeHandler(event)}}></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="image2">Upload Test Image</Label>
                                    <Input size="sm" type="file" id="image2" onChange={(event)=>{testImageChangeHandler(event)}}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-1 d-flex justify-content-center">
                                <Button onClick={()=>{saveTestDetails()}}>SAVE</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
    )
}