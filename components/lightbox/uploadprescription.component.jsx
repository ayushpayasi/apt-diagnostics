import React,{useState} from 'react';
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap';
import "../../assets/css/lightbox.scss";
import axios from 'axios';
import { apiLinks } from '../../connection.config';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const removeOtp = () => {
  sessionStorage.removeItem('prescriptionOtp');
}

const showToast = (message, err = 0) => {
  if(err === 0)
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });
  else
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
  });
}

const sendOtpHandler = async (name, mobile, setOtpOpen) => {  
  try{
    if(name.length === 0){
      setOtpOpen(false);
      showToast("Enter Full Name!");
    }
    else if(mobile.length !== 10){
      setOtpOpen(false);
      showToast("Enter a valid 10 digit contact number");
    }
    else{
      const response = await axios.get(apiLinks.prescriptionOtp, {params: {mobile: `${mobile}`}});
      const data = response.data;
      if(data.code !== 200){
        throw data;
      }
      else{
          setOtpOpen(true);
          sessionStorage.setItem('prescriptionOtp', JSON.stringify({code: data.otp, contact: data.mobile}));
          sessionStorage.setItem("userprescription", 
              JSON.stringify({
                "name": name,
                "number": mobile
              })
          );
          setTimeout(removeOtp, 150000);
          showToast("OTP Sent Successfully!", 1);
      }
    }
  }
  catch(err){
      setOtpOpen(false);
      console.log(err);
      showToast(err.message);
  }
}

export default function UploadPrescription(props) {

  const [contactNumberValid, setContactNumberValid] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [otpIsOpen, setOtpOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [file, setFile] = useState(null);
  
  const checkPass = async (code, otpCode) => {
    const isValid = await bcrypt.compare(code, otpCode);
    return (isValid);
  }

  const handleOTPVerification = async () => {
    const data = JSON.parse(sessionStorage.getItem('prescriptionOtp'));
    const user = JSON.parse(sessionStorage.getItem("userprescription"));
    if(data === null){
      sessionStorage.removeItem('prescriptionOtp');
      sessionStorage.removeItem('userprescription');
      showToast('Otp Expired, please try again !');
      setPrescriptionOpen(false);
      setOtpOpen(false);
    }
    else{
      try{
        const otpCode = data.code;
        const contact = data.contact;
        const code = inputOtp;
        const isValid = await checkPass(code, otpCode);

        if(contact !== number){
          sessionStorage.removeItem('prescriptionOtp');
          sessionStorage.removeItem('userprescription');
          showToast('Session Expired, please try again');
          setPrescriptionOpen(false);
          setOtpOpen(false);
        }
        else{
          if(code === null || code === ''){
            showToast('Enter your OTP');
          }
          else if(!isValid){
            showToast('Invalid Otp entered, please try again');
          }
          else{
            setPrescriptionOpen(true);
            showToast("OTP verified successfully!", 1);
            sessionStorage.removeItem("prescriptionOtp");
          }
        }
      }
      catch(err){
          console.log(err);
          showToast('Something went wrong, please try again');
          setPrescriptionOpen(false);
      }
    }
  }

  const fileChange = (event)=>{
      setFile(event.target.files[0]);
  }
  
  const handleInputChange = (event) => {
    var a = /^\d{10}$/;  
    if (a.test(event.target.value)){
      setContactNumberValid(true);
    }
    else{
      setContactNumberValid(false);
    }
    setNumber(event.target.value);
  }
  
  const close = () => {
    props.close(false);
  }

  const submitHandler = async () => {
    try{
      if(sessionStorage.getItem("userprescription") === null){
        showToast("Field values not found!, please try again later!");
        return;
      }
      const userData = JSON.parse(sessionStorage.getItem("userprescription"));
      const name = userData.name;
      const contact = userData.number;
      if(name.length === 0){
        showToast("Enter your Full Name!");
      }
      else if(contact.length !== 10){
        showToast("Enter a valid 10 digit number!");
      }
      else if(file === null){
        showToast("Enter your prescription!");
      }
      else{
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", parseInt(contact));
        formData.append("file", file);
        const result = await axios.post(apiLinks.postPrescription, formData);
        if(result.status === 200){
          showToast("Prescription Uploaded Successfully", 1);
          // setFile(null);
          // setNumber("");
          close();
        }
        else if(result.status === 400){
          showToast("Required Fields Missing!");
        }
        else{
          throw result.data;
        }
      }
    }
    catch(err){
      console.log(result);
    }
  }

  return (
      <>
          <div className="lightbox-cover">
              <div className="lightbox-horizontal prescription-box">
              <button className="close" onClick={close}>&times;</button>
                  <Container className="pb-3 pt-3" style={{borderRadius: "10px"}}>
                    <Row style={{alignItems: "center"}}>
                      <Col md="6">

                        <FormGroup>
                          <Label for="uploadprescription_name" style={{fontSize: '1.1rem'}}>Name</Label>
                          <Input onChange={(event)=>{setName(event.target.value)}} bsSize="sm" value={name}
                              className="lightbox-input" id="uploadprescription_name" autoFocus={true}
                              placeholder="Enter Your Full Name" />
                        </FormGroup>

                        <FormGroup>
                          <Label for="uploadprescription_contactnumber" style={{fontSize: '1.1rem'}}>Contact Number</Label>
                          <Input onChange={(event)=>{handleInputChange(event)}} valid={contactNumberValid} 
                              invalid={contactNumberValid === null ? false : !contactNumberValid} bsSize="sm" 
                              className="lightbox-input" id="uploadprescription_contactnumber" value={number}
                              placeholder="Enter 10 Digit Contact Number" />
                        </FormGroup>
                        <button style={{color: '#fff', fontSize: '0.9rem', textDecoration: 'none', padding: '5px 7px'}} 
                        disabled={number && number.length === 10 ? false : true} className="anchor_btn" 
                        onClick={()=>{sendOtpHandler(name, number, setOtpOpen)}}>Send OTP</button>
                        <hr/>

                        <FormGroup>
                          <Label for="uploadprescription_otp" style={{fontSize: '1.1rem'}}>OTP</Label>
                          <Input bsSize="sm" className="lightbox-input" type="text" id="uploadprescription_otp" disabled={!otpIsOpen}
                          placeholder="Verify OTP" value={inputOtp} onChange={(event) => setInputOtp(event.target.value)}
                           />
                        </FormGroup>
                        <button style={{color: '#fff', fontSize: '1rem', textDecoration: 'none', padding: '5px 7px'}} 
                        disabled={!otpIsOpen} className="anchor_btn" 
                        onClick={handleOTPVerification}>Verify</button>
                      </Col>

                      <Col md="6">
                        <Form className="mt-2 d-flex justify-content-center align-items-center flex-column flex-wrap">
                          <h6 className="pb-4" style={{fontSize: '1.1rem'}}>Upload Prescription!</h6>
                          <FormGroup>
                            <Label for="uploadprescription_file" style={{fontSize: "0.9rem"}}>Select File</Label>
                            <Input bsSize="sm" onChange={(event)=>{fileChange(event)}} type="file" disabled={!prescriptionOpen}
                              className="lightbox-input" id="uploadprescription_file" placeholder="Select File" 
                              accept=".pdf, .jpg, .jpeg, .png, image/*"
                            />
                          </FormGroup>
                            {/* <br /> */}
                          <Button onClick={submitHandler} className="lightbox-button" disabled={file === null ? true: false}>Upload Precription</Button>
                        </Form>
                      </Col>
                  </Row>
                  </Container>
              </div>
          </div>
      </>
  );
};

