import React,{useState} from 'react'
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap'
import "../../assets/css/lightbox.scss"
import TextField from "@material-ui/core/TextField"
import { toast } from 'react-toastify'
import {apiLinks} from "../../connection.config"
import axios from "axios"
import { number } from 'prop-types'

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

export default function RequestCallBack(props) {
  const [contactNumberValid,setContactNumberValid] = useState(null);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  
  const handleInputChange = (event) => {
    setNumber(event.target.value);
    var a = /^\d{10}$/;  
    if (a.test(event.target.value)){
      setContactNumberValid(true)
    }   
    else{
      setContactNumberValid(false)
    }
  }
  
  const close = () => {
      props.close(false);
  }

  const requestCallBackHandler = async () => {
    try{
      if(name.length === 0 || name === null){
        showToast("Enter Your Name below!");
        return;
      }
      if(number.length !== 10){
        showToast("Enter a valid 10 digit contact number");
      }
      else{
        const username = name;
        const contact = number;
        const result = await axios.post(apiLinks.requestCallback,{name: username, number: contact})
        if(result.data.code === 200){
          close();
          showToast(`We'll soon contact you ${username}!`, 1);
        }
        else{
          showToast("Failed to request a callback!");
        }
      }
    }
    catch(err){
      console.log(err);
      showToast("Internal Server Error!, please try again");
    }
  }

  return (
    <>
      <div className="lightbox-cover">
        <div className="lightbox-vertical">
          <button className="close" style={{backgroundColor: '#fff'}} onClick={close}>&times;</button>
          <div className="details-box">
            <TextField id="callbackName" label="Name" InputLabelProps={{
              style: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                fontWeight:"700",
                color: 'rgba(10, 66, 117,255)',
              }}}
              onChange={(event) => {setName(event.target.value)}} value={name}
              style={{backdropFilter: 'blur(5px)', color:"#fff", marginBottom: '5px'}}
            />
            <TextField id="callbackNumber" error={contactNumberValid=== null? false : !contactNumberValid} 
                onChange={handleInputChange} label="Contact Number" InputLabelProps={{
                style: {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  fontWeight:"700",
                  color: 'rgba(10, 66, 117,255)',
                }}}
                style={{backdropFilter: 'blur(5px)', color:"#fff"}}
                value={number}
              />
            <Button onClick={()=>{requestCallBackHandler()}} outline >Request Callback</Button>
            <br />
          </div>
        </div>
    </div>
  </>
  )
}
