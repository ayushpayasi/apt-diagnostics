import React,{useState} from 'react'
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap'
import "../../assets/css/lightbox.scss"

export default function UploadPrescription(props) {
  const [contactNumberValid, setContactNumberValid] = useState(null);
  const [number, setNumber] = useState(undefined);
  const [file, setFile] = useState(null);
  
  const sendOtpHandler = async ()=>{  

  }

  const fileChange = (event)=>{
      setFile(event.target.files[0])
  }
  
  const handleInputChange = (event)=>{
      var a = /^\d{10}$/;  
      if (a.test(event.target.value)){
        setContactNumberValid(true);
        setNumber(event.target.value);
      }   
      else{
        setContactNumberValid(false);
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
                  <Container className="pb-3 pt-3">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="uploadprescription_contactnumber">Contact Number</Label>
                          <Input onChange={(event)=>{handleInputChange(event)}} valid={contactNumberValid} invalid={contactNumberValid=== null ? false :
                          !contactNumberValid} size="sm" className="lightbox-input" id="uploadprescription_contactnumber" placeholder="Enter 10 Digit Contact Number" />
                        </FormGroup>
                          <button style={{color: '#fff', textDecoration: 'none'}} disabled={number && number.length === 10 ? false : true} className="anchor_btn" onClick={()=>{sendOtpHandler()}}>Send OTP</button>
                          <hr/>
                        <FormGroup>
                          <Label for="uploadprescription_otp">OTP</Label>
                          <Input size="sm" className="lightbox-input" id="uploadprescription_otp" placeholder="Verify OTP"></Input>
                        </FormGroup>
                          <button style={{color: '#fff', textDecoration: 'none'}} className="anchor_btn" onClick={()=>{verifyOtpHandler()}}>Verify</button>
                      </Col>
                      <Col md="6">
                        <Form className="mt-2 d-flex justify-content-center align-items-center flex-column flex-wrap">
                          <h6>Upload Prescription!</h6>
                          <FormGroup>
                            <Label for="uploadprescription_file">Select File</Label>
                            <Input size="sm" onChange={(event)=>{fileChange(event)}} type="file" className="lightbox-input" id="uploadprescription_file" placeholder="selectFile"></Input>
                          </FormGroup>
                            <br />
                          <Button className="lightbox-button">Upload Precription</Button>
                        </Form>
                      </Col>
                  </Row>
                  </Container>
              </div>
          </div>
      </>
  );
};

