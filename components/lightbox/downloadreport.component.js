import React,{useState} from 'react'
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap'
import "../../assets/css/lightbox.scss"

export default function DownloadReportLightbox(props) {
  
  const [contactNumberValid, setContactNumberValid] = useState(null)
  
  const handleInputChange = (event)=>{
      var a = /^\d{10}$/;  
        if (a.test(event.target.value)){
          setContactNumberValid(true)
        }   
        else{
          setContactNumberValid(false)
        }
  }
  const close = () =>{
    props.close(false)
  }
    return (
        <>
          <div className="lightbox-cover">
              <div className="lightbox-horizontal">
              <button className="close" onClick={close}>&times;</button>
                  <Row>
                    <Col md="7" style={{display: 'flex', alignItems: 'center'}}>
                      <img style={{width:"96%", height:"250px", margin: "0 auto", borderRadius: '15px'}} src="images/lightbox/download_report.jpg"></img>
                    </Col>
                    <Col md="5">
                      <Form className="mt-3 mb-4 d-flex justify-content-center align-items-center flex-column flex-wrap">
                      <h6>Download Report in one Click!</h6>
                      <FormGroup>
                        <Label for="downloadreport_billid">Bill Id</Label>
                        <Input size="sm" className="lightbox-input" id="downloadreport_billid" placeholder="Bill Id"></Input>
                      </FormGroup>
                      <FormGroup className="position-relative">
                        <Label for="downloadreport_contactnumber">Contact Number</Label>
                        <Input onChange={(event)=>{handleInputChange(event)}} 
                        valid={contactNumberValid} invalid={contactNumberValid === null ? false : 
                        !contactNumberValid} size="sm" className="lightbox-input" 
                        id="downloadreport_contactnumber" placeholder="Contact Number" />
                      </FormGroup>
                      <Button outline className="lightbox-button">Download Report</Button>
                      </Form>
                    </Col>
                  </Row>
              </div>
          </div>
        </>
    )
}

