<Row className="ml-1 mr-1"><Col>
<Card style={{background:"rgba(223, 223, 223, 0.6)"}}>
  <CardBody>
  <Row>
                    <Col>
                        <h4 className="text-center report-heading p0 m0">Download Report</h4>
                    </Col>
                </Row>
                <Row className="mt-1 ">
                    <Col>
                        <h6 className=" mt-1 ml-1">Patient/Lab ID</h6>
                    </Col>
                </Row>
                <Row  className="ml-1 mr-1" >
                    <Col md="2" className="align-center-row">
                      <AssessmentOutlinedIcon style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}}/>
                    </Col>
                    <Col md="10">
                      <input type="text" className="form-control" id ="patientId" placeholder="Patient/Lab Id!" aria-label="Patient-id/Lab-id"/></Col>
                </Row>
                <Row className="mt-1 ">
                    <Col>
                        <h6 className="ml-1">Password</h6>
                    </Col>
                </Row>
                <Row  className="ml-1 mr-1 mt-1" >
                    <Col md="2" className="align-center-row">
                            <LockOpenOutlinedIcon style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}}/>
                    </Col>
                    <Col md="10">
                      <input type="text" className="form-control" id="password" placeholder="Password!" aria-label="Password"/></Col>
                </Row>
                <Row className="mt-1" >
                    <Col className=" align-center-column">
                        <Button className="color-btn "> Check Report </Button>
                    </Col>
                </Row>
  </CardBody>

</Card>
  </Col></Row>

<Row className="ml-1 mr-1">
<Col>
<Card style={{background:"rgba(223, 223, 223, 0.6)"}}>
<CardBody>
<Row>
                  <Col>
                      <h6 className="text-center report-heading">Book An Appointment</h6>
                  </Col>
              </Row>
              <Row className="mt-1 ">
                  <Col>
                      <h6 className=" mt-1 ml-1">Find Your Test</h6>
                  </Col>
              </Row>
              <Row  className="ml-1 mr-1 mt-1" >
                  <Col md="2" className="align-center-row">
                          <img style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}} src="/images/labicon.png"/>
                  </Col>
                  <Col md="10"><input type="text" className="form-control" placeholder="Search your test!" aria-label="Search your test"/></Col>
              </Row>
              <Row  className="ml-1 mr-1 mt-2 mb-2" >
                  <Col className="division">

                  </Col>
              </Row>
              <Row className="mt-1 ">
                  <Col>
                      <h6 className="ml-1">Find A Lab Near You</h6>
                  </Col>
              </Row>
              <Row  className="ml-1 mr-1 mt-1" >
                  <Col md="2" className="align-center-row">
                          <img style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}} src="images/hospital.png"/>
                  </Col>
                  <Col md="10"><input type="text" className="form-control" placeholder="Nearest Lab" aria-label="Search your test"/></Col>
              </Row>
             
</CardBody>
</Card>

</Col>
</Row>


<div className="report">
<Row>
    <Col>
        <h4 className="text-center mt-1 report-heading">Book An Appointment</h4>
    </Col>
</Row>
<Row className="mt-2 ">
    <Col>
        <h6 className=" mt-1 ml-1">Find Your Test</h6>
    </Col>
</Row>
<Row  className="ml-1 mr-1 mt-2" >
    <Col md="2">
            <img style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}} src="images/labicon.png"/>
    </Col>
    <Col md="10"><input type="text" className="form-control" placeholder="Search your test!" aria-label="Search your test"/></Col>
</Row>
<Row  className="ml-1 mr-1 mt-4 mb-4" >
    <Col className="division">

    </Col>
</Row>
<Row className="mt-2 ">
    <Col>
        <h6 className="ml-1">Find A Lab Near You</h6>
    </Col>
</Row>
<Row  className="ml-1 mr-1 mt-2" >
    <Col md="2" className="align-center-row">
            <img style={{color:"#094275",height:"2rem",width:"2rem",padding:0,margin:0}} src="images/hospital.png"/>
    </Col>
    <Col md="10"><input type="text" className="form-control" placeholder="Nearest Lab" aria-label="Search your test"/></Col>
</Row>
</div>



<Row >
<Col>
    <h4 className="text-center report-heading p0 m0">Download Report</h4>
</Col>
</Row>
<Row >
<Col>
    <h6 className=" mt-1 ml-1">Patient/Lab ID</h6>
</Col>
</Row>
<Row  className="ml-1 mr-1" >
<Col md="2" className="align-center-row">
    <AssessmentOutlinedIcon style={{color:"#000",height:"2rem",width:"2rem",padding:0,margin:0}}/>
</Col>
<Col md="10">
    <input type="text" className="form-control" id ="patientId" placeholder="Patient/Lab Id!" aria-label="Patient-id/Lab-id"/></Col>
</Row>
<Row className="mt-2">
<Col>
    <h6 className="ml-1">Password</h6>
</Col>
</Row>
<Row  className="ml-1 mr-1" >
<Col md="2" className="align-center-row">
    <LockOpenOutlinedIcon style={{color:"#000",height:"2rem",width:"2rem",padding:0,margin:0}}/>
</Col>
<Col md="10" >
    <input type="text" className="form-control" id="password" placeholder="Password!" aria-label="Password"/>
</Col>
</Row>
<Row className="mt-2" >
<Col className="align-center-row mt-2">
    <ClientCaptcha charsCount="6" width="215" backgroundColor="rgba(10, 66, 117,0.5)" captchaCode={code => console.log(code)} />
</Col>
</Row>
<Row className="mt-2">
<Col>
    <input type="text" className="form-control" id="captcha" placeholder="Enter Captcha!" aria-label="Captcha"/>
</Col>
</Row>
<Row >
<Col className=" align-center-column mt-3">
    <Button className="color-btn "> Check Report </Button>
</Col>
</Row>
