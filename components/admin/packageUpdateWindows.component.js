import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {toast } from 'react-toastify';
import {Card,CardBody,CardTitle,Row,Col,FormGroup,Button,Label,Input,ListGroup,ListGroupItem, CardSubtitle} from "reactstrap"
import {apiLinks} from "../../connection.config"


export default function PackageUpdateWindow(props) {

    const[packageDetails,setPackageDetails] = useState();
    const[testIncluded,setTestIncluded] = useState([]);
    const[preRequisites,setPreRequisites] = useState([]);
    const[packageIdealFor,setPackageIdealFor] = useState([]);
    const[image,setImage] = useState(null);

    const clearAllState =()=>{
        setPackageDetails([]);
        setTestIncluded([]);
        setPreRequisites([]);
        setPackageIdealFor([]);
        setImage(null);
    }

    const fillDetails = async()=>{                      
        try{
        const response = await axios.get(apiLinks.checkAndFetchPackageDetails,{params:{Id:document.getElementById("packageId").value}})
        if(response.data.status === 200){
            // document.getElementById("")
            document.getElementById("packageType").value = response.data.body.type
            document.getElementById("packageName").value = response.data.body.name
            document.getElementById("packageDescription").value = response.data.body.description
            document.getElementById("packagePrice").value = response.data.body.packagePrice
            document.getElementById("packageFeatured").checked = response.data.body.isSpecial
            setTestIncluded(response.data.body.testsIncluded)
            setPreRequisites(response.data.body.preRequisites)
            setPackageIdealFor(response.data.body.idealFor)
            setPackageDetails(response.data.body)
        }
        else if(response.data.status === 400){
            clearAllState();
            toast("Invalid Package Id !")
        }
        }
        catch(err){
            console.log(err)
        }
    }

    const savePackageDetails = async ()=>{
        try{
            let tempDetails = packageDetails
        let formData = new FormData();
        if(image === null){
        }
        else{
            formData.append("image", image, image.name)
        }
        formData.append("preRequisites",`${JSON.stringify(preRequisites)}`)
        formData.append("idealFor",`${JSON.stringify(packageIdealFor)}`)
        formData.append("isSpecial",`${document.getElementById("packageFeatured").checked}`)
        formData.append("type",`${tempDetails.type}`)
        formData.append("name",`${tempDetails.name}`)
        formData.append("description",`${document.getElementById("packageDescription").value}`)
        formData.append("packagePrice",`${tempDetails.packagePrice}`)
        formData.append("packageId",`${tempDetails.packageId}`)
        formData.append("testsIncluded",`${JSON.stringify(tempDetails.testsIncluded)}`)
        formData.append("oldImg",tempDetails.image)
        const response = await axios.post(apiLinks.adminPostPackage,formData,{headers:{"Content-type": "multipart/form-data"}})
        if(response.status === 200){
            toast("package Updated!")
            props.setPackageUpdateWindow(false)
        }
        else{
            toast("cant Update Package!")
            props.setPackageUpdateWindow(false)
        }
        }
        catch(err){
            console.log(err)
            toast("Internal Server Error!")
            props.setPackageUpdateWindow(false)
        }
    }

    const fillPreReq= ()=>{
        document.getElementById("preReqField1").value = preRequisites[0]||""
        document.getElementById("preReqField2").value = preRequisites[1]||""
        document.getElementById("preReqField3").value = preRequisites[2]||""
    }

    const fillIdealFor= ()=>{
        document.getElementById("idealForField1").value = packageIdealFor[0]||""
        document.getElementById("idealForField2").value = packageIdealFor[1]||""
        document.getElementById("idealForField3").value = packageIdealFor[2]||""
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

    const imageChangeHandler = (event) => {
        setImage(event.target.files[0])
    }

    useEffect(() => {
        document.getElementById("packageId").value = props.packageToUpdate
        fetchData()    

    }, [])

    return (
        <div className="updateWindow">
            <div className="packagesubUpdateWindow">
            <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <CardTitle><Button onClick={()=>{document.querySelectorAll(".packagesubUpdateWindow")[0].style.display="none"}} close /></CardTitle>
                    <CardSubtitle>Ideal For</CardSubtitle>
                    <ListGroup flush>
                        <ListGroupItem><Input size="sm" id="idealForField1"></Input></ListGroupItem>
                        <ListGroupItem><Input size="sm" id="idealForField2"></Input></ListGroupItem>
                        <ListGroupItem><Input size="sm" id="idealForField3"></Input></ListGroupItem>
                    </ListGroup>
                    <Button onClick={()=>{setPackageIdealFor([document.getElementById("idealForField1").value,document.getElementById("idealForField2").value,document.getElementById("idealForField3").value]);document.querySelectorAll(".packagesubUpdateWindow")[0].style.display="none"}}>SAVE</Button>
                    </CardBody>
                    </Card>
                    
                    </Col>
                </Row>

            </div>
            <div className="packagesubUpdateWindow">
                <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <CardTitle><Button onClick={()=>{document.querySelectorAll(".packagesubUpdateWindow")[1].style.display="none"}} close /></CardTitle>
                    <CardSubtitle>Pre Requisites</CardSubtitle>
                    <ListGroup flush>
                        <ListGroupItem><Input size="sm" id="preReqField1"></Input></ListGroupItem>
                        <ListGroupItem><Input size="sm" id="preReqField2"></Input></ListGroupItem>
                        <ListGroupItem><Input size="sm" id="preReqField3"></Input></ListGroupItem>
                    </ListGroup>
                    <Button onClick={()=>{setPreRequisites([document.getElementById("preReqField1").value,document.getElementById("preReqField2").value,document.getElementById("preReqField3").value]);document.querySelectorAll(".packagesubUpdateWindow")[1].style.display="none"}}>SAVE</Button>
                    </CardBody>
                    </Card>
                    
                    </Col>
                </Row>
                </div>
                <Card className="editWindow">
                    <CardBody>
                        <CardTitle><Button onClick={()=>{clearAllState();props.setPackageUpdateWindow(false)}} close /></CardTitle>
                        <Row>
                            <Col xs="4">
                            <FormGroup>
                                    <Label for="packageId"> Package ID</Label>
                                    <Input size="sm" id="packageId" placeholder="Package Id"></Input>
                                </FormGroup>                                
                            </Col>
                            <Col xs="4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <Button onClick={()=>{fillDetails()}} style={{background:"#0a4275",color:"white",borderRadius:"10px",border:"none"}}>Fetch Details</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="packageType"> Package Type</Label>
                                    <Input size="sm" id="packageType" disabled placeholder="Package Type"></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="packageName"> Package Name</Label>
                                    <Input size="sm" id="packageName" disabled placeholder="Package Name"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="packageDescription"> Description</Label>
                                    <Input size="sm" type="textarea" id="packageDescription" placeholder="Package Description"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                    <Label for="packageTestsIncluded"> Tests Included</Label>
                                    <Input size="sm" type="select" id="packageTestsIncluded" placeholder="Tests Included">
                                    {testIncluded.map(item=><option>{item}</option>)}
                                    </Input>
                                    
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="packagePrice">Package Price</Label>
                                <Input size="sm" id="packagePrice" disabled placeholder="Package Price">
                                </Input>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <FormGroup style={{fontWeight:"600"}}>
                                <Input size="sm" id="packageFeatured" type="checkbox"/>{' '} Featured
                                </FormGroup>
                            </Col>
                            <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Button onClick={()=>{ fillPreReq();document.querySelectorAll(".packagesubUpdateWindow")[1].style.display="block";}}>Pre Requisites</Button>
                            </Col>
                            <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Button onClick={()=>{fillIdealFor();document.querySelectorAll(".packagesubUpdateWindow")[0].style.display="block";}}>Ideal For</Button>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="image">Upload Image</Label>
                                    <Input size="sm" type="file" id="image" onChange={(event)=>{imageChangeHandler(event)}}></Input>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col className="mt-1 d-flex justify-content-center">
                                <Button onClick={()=>{savePackageDetails()}}>SAVE</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
    )
}