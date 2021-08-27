import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {toast } from 'react-toastify';
import {Card,CardBody,CardTitle,Row,Col,FormGroup,Button,Label,Input,ListGroup,ListGroupItem, CardSubtitle} from "reactstrap"
import {apiLinks} from "../../connection.config"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';


export default function PackageUpdateWindow(props) {

    const[packageDetails,setPackageDetails] = useState();
    const[testIncluded, setTestIncluded] = useState([]);
    const[preRequisites,setPreRequisites] = useState([]);
    const[testIDealFor,setPackageIdealFor] = useState([]);
    const[image,setImage] = useState(null);
    const [packageToUpdate, setPackageToUpdate] = useState();

    const clearAllState =()=>{
        setPackageDetails([]);
        setTestIncluded([]);
        setPreRequisites([]);
        setPackageIdealFor([]);
        setImage(null);
    }

    const fillDetails = async() => {                      
        try{
            // const response = await axios.get(apiLinks.checkAndFetchPackageDetails,{params:{Id:document.getElementById("testID").value}})
            // if(response.data.status === 200){
            //     // document.getElementById("")
            //     document.getElementById("packageType").value = response.data.body.type
            //     document.getElementById("packageName").value = response.data.body.testName
            //     document.getElementById("packageDescription").value = response.data.body.description
            //     document.getElementById("testAmount").value = response.data.body.testAmount
            //     document.getElementById("packageFeatured").checked = response.data.body.isSpecial
            //     setTestIncluded(response.data.body.testsIncluded)
            //     setPreRequisites(response.data.body.preRequisites)
            //     setPackageIdealFor(response.data.body.idealFor)
            //     setPackageDetails(response.data.body)
            // }
            // else if(response.data.status === 400){
            //     clearAllState();
            //     toast("Invalid Package Id !")
            // }
            const test = props.serverPackages.filter(data => data.testID === packageToUpdate);
            console.log(test);
            setTestIncluded(test[0].testList);
            document.getElementById("packageName").value = test[0].testName;
            document.getElementById("packageCategory").value = test[0].testCategory;
            document.getElementById("testAmount").value = test[0].testAmount;
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
        formData.append("idealFor",`${JSON.stringify(testIDealFor)}`)
        formData.append("isSpecial",`${document.getElementById("packageFeatured").checked}`)
        formData.append("type",`${tempDetails.type}`)
        formData.append("testName",`${tempDetails.testName}`)
        formData.append("description",`${document.getElementById("packageDescription").value}`)
        formData.append("testAmount",`${tempDetails.testAmount}`)
        formData.append("testID",`${tempDetails.testID}`)
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
        document.getElementById("idealForField1").value = testIDealFor[0]||""
        document.getElementById("idealForField2").value = testIDealFor[1]||""
        document.getElementById("idealForField3").value = testIDealFor[2]||""
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

    // useEffect(() => {
    //     document.getElementById("testID").value = props.packageToUpdate
    //     fetchData()

    // }, [])

    
    //     <div className="packagesubUpdateWindow">
    //         <Row>
    //             <Col>
    //                 <Card>
    //                     <CardBody>
    //                         <CardTitle>
    //                             <Button onClick={()=>{document.querySelectorAll(".packagesubUpdateWindow")[0].style.display="none"}} close />
    //                         </CardTitle>
    //                         <CardSubtitle>Ideal For</CardSubtitle>
    //                         <ListGroup flush>
    //                             <ListGroupItem><Input size="sm" id="idealForField1"></Input></ListGroupItem>
    //                             <ListGroupItem><Input size="sm" id="idealForField2"></Input></ListGroupItem>
    //                             <ListGroupItem><Input size="sm" id="idealForField3"></Input></ListGroupItem>
    //                         </ListGroup>
    //                         <Button onClick={()=>{setPackageIdealFor([document.getElementById("idealForField1").value,
    //                             document.getElementById("idealForField2").value,
    //                             document.getElementById("idealForField3").value]);
    //                             document.querySelectorAll(".packagesubUpdateWindow")[0].style.display="none"}}>SAVE</Button>
    //                     </CardBody>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </div>

    //     <div className="packagesubUpdateWindow">
    //         <Row>
    //             <Col>
    //                 <Card>
    //                     <CardBody>
    //                         <CardTitle><Button onClick={()=>{document.querySelectorAll(".packagesubUpdateWindow")[1].style.display="none"}} close /></CardTitle>
    //                         <CardSubtitle>Pre Requisites</CardSubtitle>
    //                         <ListGroup flush>
    //                             <ListGroupItem><Input size="sm" id="preReqField1"></Input></ListGroupItem>
    //                             <ListGroupItem><Input size="sm" id="preReqField2"></Input></ListGroupItem>
    //                             <ListGroupItem><Input size="sm" id="preReqField3"></Input></ListGroupItem>
    //                         </ListGroup>
    //                         <Button onClick={()=>{setPreRequisites([document.getElementById("preReqField1").value,document.getElementById("preReqField2").value,document.getElementById("preReqField3").value]);document.querySelectorAll(".packagesubUpdateWindow")[1].style.display="none"}}>SAVE</Button>
    //                     </CardBody>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </div>

    return (
        <div className="updateWindow">
            
            <div className="idealForUpdateWindow" id="idealForUpdateWindow">
                <Card>
                    <CardBody style={{textAlign: 'center'}}>
                        <CardTitle>
                            <Button onClick={()=>{document.getElementById("idealForUpdateWindow").style.display="none"}} close />
                        </CardTitle>
                        <CardSubtitle>Ideal For</CardSubtitle>
                        <ListGroup flush>
                            <ListGroupItem><Input size="sm" id="idealForField1"></Input></ListGroupItem>
                            <ListGroupItem><Input size="sm" id="idealForField2"></Input></ListGroupItem>
                            <ListGroupItem><Input size="sm" id="idealForField3"></Input></ListGroupItem>
                        </ListGroup>
                        <Button onClick={()=>{setPackageIdealFor([document.getElementById("idealForField1").value,
                            document.getElementById("idealForField2").value,
                            document.getElementById("idealForField3").value]);
                            document.getElementById("idealForUpdateWindow").style.display="none"}}
                            className="customized-button">SAVE
                        </Button>
                    </CardBody>
                </Card>
            </div>

            <div className="prereqUpdateWindow" id="prereqUpdateWindow">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Button onClick={()=>{document.getElementById("prereqUpdateWindow").style.display="none"}} close />
                        </CardTitle>
                        <CardSubtitle>Pre Requisites</CardSubtitle>
                        <ListGroup flush>
                            <ListGroupItem><Input size="sm" id="preReqField1"></Input></ListGroupItem>
                            <ListGroupItem><Input size="sm" id="preReqField2"></Input></ListGroupItem>
                            <ListGroupItem><Input size="sm" id="preReqField3"></Input></ListGroupItem>
                        </ListGroup>
                        <Button className="customized-button" onClick={()=>{setPreRequisites([document.getElementById("preReqField1").value, 
                                document.getElementById("preReqField2").value,
                                document.getElementById("preReqField3").value]);
                                document.getElementById("prereqUpdateWindow").style.display="none"}}>SAVE
                        </Button>
                    </CardBody>
                </Card>
            </div>

            <Card className="editWindow">
                <CardBody>
                    <CardTitle>
                        <Button onClick={()=>{clearAllState(); props.setPackageUpdateWindow(false)}} close />
                    </CardTitle>
                    <Row style={{justifyContent: "center"}} className="mt-3 mb-3">
                        <Col xs="12" md="8">
                            <FormGroup>
                                <Label for="testID"> Package ID</Label>
                                {/* <Input size="sm" id="testID" placeholder="Package Id"></Input> */}
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={props.serverPackages}
                                    getOptionLabel={(option) => `${option.testID} - ${option.testCode}`}
                                    // style={{ width: "40%"}}
                                    onChange = {(event, value)=>{setPackageToUpdate(value.testID)}}
                                    renderInput={(params) => <TextField {...params} placeholder="Find Package" size="small" variant="outlined" />}
                                />
                            </FormGroup>                                
                        </Col>
                        <Col xs="8" md="4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Button className="customized-button" onClick={()=>{fillDetails()}} >Fetch Details</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label for="packageName"> Package Name <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" id="packageName" disabled placeholder="Package Name" />
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label for="packageCategory"> Package Category <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" id="packageCategory" disabled placeholder="Package Category" />
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label for="packageType"> Package Type <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" id="packageType" placeholder="Blog Package Type" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="packageDescription"> Description <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" type="textarea" id="packageDescription" placeholder="Package Description" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" md="4">
                            <FormGroup>
                                    <Label for="packageTestsIncluded"> Tests Included</Label>
                                    <Input size="sm" type="select" id="packageTestsIncluded" placeholder="Tests Included">
                                        <option key="self">Select</option>
                                        {testIncluded.map(item => 
                                            <option key={item.testID}>{item.testCode}</option>)
                                        }
                                    </Input>
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label for="testAmount">Package Price <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" id="testAmount" disabled placeholder="Package Price" />
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label for="packageOrgan"> Related Organ <span style={{color: 'red'}}> *</span></Label>
                                <Input size="sm" id="packageOrgan" placeholder="Package Organ" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mt-3 mb-3"  xs="12" md="3" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            {/* <Button onClick={()=>{fillIdealFor(); document.querySelectorAll(".idealForUpdateWindow")[0].style.display="block";}}>Ideal For</Button> */}
                            <Button className="customized-button" onClick={() => {fillIdealFor(); document.getElementById("idealForUpdateWindow").style.display="block"}}>Ideal For</Button>
                        </Col>

                        <Col className="mt-3 mb-3" xs="12" md="3" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Button className="customized-button" onClick={()=>{ fillPreReq(); document.getElementById("prereqUpdateWindow").style.display="block";}}>Pre Requisites</Button>
                        </Col>

                        <Col className="mt-3 mb-3"  xs="12" md="3" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <FormGroup check inline style={{fontWeight:"600"}}>
                                <Input size="sm" id="packageFeatured" type="checkbox"/>2 Featured
                            </FormGroup>
                        </Col>

                        <Col className="mt-3 mb-3"  xs="12" md="3">
                            <FormGroup>
                                <Label for="image">Upload Image</Label>
                                <Input size="sm" type="file" id="image" onChange={(event)=>{imageChangeHandler(event)}}></Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="pb-3">
                        <Col className="mt-1 d-flex justify-content-center">
                            <Button className="customized-button" onClick={()=>{savePackageDetails()}}>SAVE</Button>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </div>
    )
}