import React,{useState,useEffect} from 'react'
import "../../assets/css/admin.scss"
import AdminNavbar from "../../components/adminnavbar.component"
import {Row,Col,Container, CardTitle,Card,CardBody,CardText,Button,FormGroup,Label,Input} from "reactstrap"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import AdminPackagesTable from "../../components/adminpackagestable.component"
import axios from 'axios';
import {apiLinks} from "../../connection.config"
import { Paper } from '@material-ui/core';
import PackageUpdateWindow from "../../components/admin/packageUpdateWindows.component"
import TestUpdateWindow from "../../components/admin/testUpdateWindow.component"
import AdminTestsTable from "../../components/adminteststable.component"
import AdminBlogsTable from '../../components/adminblogstable.component';
import BlogUpdateWindow from '../../components/admin/blogUpdateWindow.component';
import BlogInsertWindow from '../../components/admin/blogInsertWindow.component';
import Edit from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import exportFromJSON from 'export-from-json'




export default function Index() {
    const [currentContainer,setCurrentContainer] = useState("adminContent1")
    const [packageList,setPackageList] = useState([])
    const [testList,setTestList] = useState([])
    const [organList,setOrganList] = useState([])
    const [blogList,setBlogList] = useState([])
    const [packageUpdateWindow,setPackageUpdateWindow] = useState(false)
    const [testUpdateWindow,setTestUpdateWindow] = useState(false)
    const [organUpdateWindow,setOrganUpdateWindow] = useState(false)
    const [blogUpdateWindow,setBlogUpdateWindow] = useState(false)
    const [blogInsertWindow,setBlogInsertWindow] = useState(false)
    const [packageToUpdate,setPackageToUpdate] = useState(0);
    const [testToUpdate,setTestToUpdate] = useState(0);
    const [organToUpdate,setOrganToUpdate] = useState(0);
    const [blogToUpdate,setBlogToUpdate] = useState(-1);
    const [fleboCount,setFleboCount] = useState(0)


    const fetchPackageList = async ()=>{
        try{
        const result = await axios.get(apiLinks.adminPackageList)
        if (result.status === 200){
            setPackageList(result.data)
        }
        }catch(err){
            console.log(err)
    }
    }

    const fetchTestList = async ()=>{
        try{
        const result = await axios.get(apiLinks.adminTestList)
        if (result.status === 200){
            setTestList(result.data)
        }
        }catch(err){
            console.log(err)
    }
    }

    const fetchBlogList = async ()=>{
        try{
        const result = await axios.get(apiLinks.adminBlogList)
        if(result.status === 200){
            setBlogList(result.data)
        }
    }
    catch(err){
        console.log(err)
    }
    }

    const fetchFlebo = async ()=>{
        try{
            const result = await axios.get(apiLinks.getFlebo)
            if(result.status === 200){
                document.getElementById("fleboCount").value = result.data.flebo
                setFleboCount(result.data.flebo)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const fleboChangeHandler = async() =>{
        try{
            const flebo = document.getElementById("fleboCount").value
            const result = await axios.post(apiLinks.setFlebo,{"newFlebo":flebo,"currFlebo":fleboCount})
            if(result.status === 200){
                toast("Flebo Count Updated!")
            }
        }
        catch(err){
            toast("failed to update flebo count!")
            console.log(err)
        }
    }

    const downloadSubscriberList =async ()=>{
    try{
        const result = await axios.get(apiLinks.getSubscriber)
        if (result.status === 200){
            const data = result.data            
            const fileName = 'subscriberList'
            const exportType =  exportFromJSON.types.csv
            exportFromJSON({ data, fileName, exportType })
        }
    }catch(err){
        console.log(err)
    }
    }

    const downloadUserList = async ()=>{
        try{
            const result = await axios.get(apiLinks.getUserList)
            if (result.status === 200){
                const data = result.data            
                const fileName = 'userList'
                const exportType =  exportFromJSON.types.csv
                exportFromJSON({ data, fileName, exportType })
            }
        }catch(err){
            console.log(err)
        }
        }

        const downloadContactusData = async ()=>{
            try{
                const result = await axios.get(apiLinks.downloadContactusData)
                if (result.status === 200){
                    const data = result.data.data            
                    const fileName = 'contactusData'
                    const exportType =  exportFromJSON.types.csv
                    exportFromJSON({ data, fileName, exportType })
                }
            }catch(err){
                console.log(err)
            }
            }

        const downloadFeedbackData = async ()=>{
            try{
                const result = await axios.get(apiLinks.downloadFeedbackData)
                if (result.status === 200){
                    const data = result.data.data            
                    const fileName = 'FeedbackData'
                    const exportType =  exportFromJSON.types.csv
                    exportFromJSON({ data, fileName, exportType })
                }

            }catch(err){
                console.log(err)
            }
            }

    useEffect(()=>{
        fetchPackageList()
        fetchTestList()
        fetchBlogList()
        fetchFlebo()
    },[])



    return (
        <>  
            {packageUpdateWindow?<PackageUpdateWindow setPackageUpdateWindow={setPackageUpdateWindow} packageToUpdate={packageToUpdate}/>:<React.Fragment/>}
            {testUpdateWindow?<TestUpdateWindow setTestUpdateWindow={setTestUpdateWindow} testToUpdate={testToUpdate}/>:<React.Fragment/>}
            {blogUpdateWindow?<BlogUpdateWindow setBlogToUpdate={setBlogToUpdate} setBlogUpdateWindow={setBlogUpdateWindow} blogToUpdate={blogToUpdate}/>:<React.Fragment/>}
            {blogInsertWindow?<BlogInsertWindow setBlogInsertWindow={setBlogInsertWindow}/>:<React.Fragment/>}
                <div style={{display:"flex"}}>
                        <div>
                            <AdminNavbar currentContainer={currentContainer} changeContainer={setCurrentContainer}/>
                        </div>
                    <div style={{width:"80%"}}>
                    <Container fluid className="mr-3">
                        <div style={{display:(currentContainer === "adminContent1")?"block":"none"}} id="adminContent1" className="admin-content admin-content1">
                                Dashboard{/* <img src="https://aptdiagnostics-test.s3.ap-south-1.amazonaws.com/f9a9302278622a2fa1c88285214fb3a1"></img> */}
                        </div>
                        <div style={{display:(currentContainer === "adminContent2")?"block":"none"}} id="adminContent2" className="admin-content admin-content2">
                            <Row>
                                <Col>      
                                    <FormGroup>
                                        <Label style={{fontWeight:"700"}} for="combo-box-demo">Search Package</Label>
                                        <Autocomplete
                                                        id="combo-box-demo"
                                                        options={packageList}
                                                        getOptionLabel={(option) => `${option.packageId}`}
                                                        style={{ width: "40%"}}
                                                        onChange = {(event,value)=>{setPackageToUpdate(value.packageId);setPackageUpdateWindow(true);}}
                                                        renderInput={(params) => <TextField {...params} placeholder="Find Package" size="small" variant="outlined" />}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <Label style={{fontWeight:"700"}} for="addPackageBtn">Add Package</Label>
                                    <IconButton id = "addPackageBtn" onClick={()=>{setPackageUpdateWindow(true)}}><AddIcon style={{color:"#ff6363",width:"30px",height:"30px"}}/></IconButton>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card style={{borderRadius:"10px",border:"none",background:"#0a4275",color:"white"}}>
                                        <CardBody>
                                            <CardTitle style={{color:"white"}}>Number Of Packages in Live Health Library</CardTitle>
                                            <CardText>{packageList.length}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{borderRadius:"10px",border:"none",background:"#ff6363",color:"#0a4275"}}>
                                        <CardBody>
                                            <CardTitle>Number Of Packages in APT Library</CardTitle>
                                            <CardText>{packageList.length}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AdminPackagesTable packageList={packageList} packageToUpdate={setPackageToUpdate} updateWindow={setPackageUpdateWindow}/>
                                </Col>
                            </Row>

                        </div>
                        <div style={{display:(currentContainer === "adminContent3")?"block":"none"}} id="adminContent3" className="admin-content admin-content3">
                        <Row>
                                <Col>      
                                    <FormGroup>
                                        <Label style={{fontWeight:"700"}} for="testSearchBar">Search Tests</Label>
                                        <Autocomplete
                                                        id="testSearchBar"
                                                        options={testList}
                                                        getOptionLabel={(option) => `${option.testId}`}
                                                        style={{ width: "40%"}}
                                                        onChange = {(event,value)=>{setTestToUpdate(value.packageId);setTestUpdateWindow(true);}}
                                                        renderInput={(params) => <TextField {...params} placeholder="Find Test" size="small" variant="outlined" />}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <Label style={{fontWeight:"700"}} for="addPackageBtn">Add Test</Label>
                                    <IconButton id = "addPackageBtn" onClick={()=>{setTestUpdateWindow(true)}}><AddIcon style={{color:"#ff6363",width:"30px",height:"30px"}}/></IconButton>
                                </FormGroup>
                                </Col>
                            </Row>
                        <Row>
                                <Col>
                                    <Card style={{borderRadius:"10px",border:"none",background:"#0a4275",color:"white"}}>
                                        <CardBody>
                                            <CardTitle style={{color:"white"}}>Number Of Tests in Live Health Library</CardTitle>
                                            <CardText>{testList.length}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{borderRadius:"10px",border:"none",background:"#ff6363",color:"#0a4275"}}>
                                        <CardBody>
                                            <CardTitle>Number Of Tests in APT Library</CardTitle>
                                            <CardText>{testList.length}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        <Row>
                            <Col>
                                <AdminTestsTable testList={testList} testToUpdate={setTestToUpdate} updateWindow={setTestUpdateWindow}/>
                            </Col>
                        </Row>   
                        </div>
                        <div style={{display:(currentContainer === "adminContent4")?"block":"none"}} id="adminContent4" className="admin-content admin-content4">
                            Hello happy birthday
                        </div>
                        <div style={{display:(currentContainer === "adminContent5")?"block":"none"}} id="adminContent5" className="admin-content admin-content5">
                            <Row>
                                <Col>
                                    <h2 style={{fontWeight:"700"}}>Blogs</h2>
                                </Col>
                            </Row>
                            <Row> 
                                <Col>
                                    <div style={{borderRadius:"10px",border:"1px solid #0a4275"}} className="p-2 m-1 d-flex align-items-center justify-content-space-between">
                                    <IconButton onClick={()=>{/*setBlogUpdateWindow(true)*/setBlogInsertWindow(true)}} style={{color:"#ff6363"}}><AddIcon/></IconButton>
                                    <h5>Add Blog</h5>
                                    

                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AdminBlogsTable blogList={blogList} blogToUpdate={setBlogToUpdate} updateWindow={setBlogUpdateWindow}/>
                                </Col>
                            </Row>
                        </div>
                        <div style={{display:(currentContainer === "adminContent6")?"block":"none"}} id="adminContent6" className="admin-content admin-content6">
                            <Card>
                                <CardBody>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="fleboCount">Flebo</Label>
                                            <Input size="sm" id="fleboCount" placeHolder="Flebo"></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <Button onClick={()=>{fleboChangeHandler()}}>Save</Button>
                                    </Col>
                                </Row>
                                </CardBody>
                            </Card>
                            <Row>
                                <Col>
                                <Card>
                                <CardBody>
                                    <CardTitle>Download Subscribers List</CardTitle>
                                    <Button onClick={()=>{downloadSubscriberList()}}>Download Subscribers List</Button>
                                </CardBody>
                                </Card>
                                </Col>
                                <Col>
                                <Card>
                                <CardBody>
                                    <CardTitle>Download Users List</CardTitle>
                                    <Button onClick={()=>{downloadUserList()}}>Download Users List</Button>
                                </CardBody>
                                </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Card>
                                <CardBody>
                                    <CardTitle>Download Feedback Data</CardTitle>
                                    <Button onClick={()=>{downloadFeedbackData()}}>Download Feedback Data</Button>
                                </CardBody>
                                </Card>
                                </Col>
                                <Col>
                                <Card>
                                <CardBody>
                                    <CardTitle>Download Contact Us Data</CardTitle>
                                    <Button onClick={()=>{downloadContactusData()}}>Download Contactus Data</Button>
                                </CardBody>
                                </Card>
                                </Col>
                            </Row>
                        </div>
                        <div style={{display:(currentContainer === "adminContent7")?"block":"none"}} id="adminContent7" className="admin-content admin-content7">
                            <Card>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </div>
                    </Container>
                    </div>
                    </div>
                    
        </>
    )
}
