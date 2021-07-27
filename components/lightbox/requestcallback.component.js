import React,{useState} from 'react'
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap'
import "../../assets/css/lightbox.scss"
import TextField from "@material-ui/core/TextField"
import { toast } from 'react-toastify'
import {apiLinks} from "../../connection.config"
import axios from "axios"

export default function RequestCallBack(props) {
    const [contactNumberValid,setContactNumberValid] = useState(null)
    
    const handleInputChange = (event)=>{
        var a = /^\d{10}$/;  
          if (a.test(event.target.value)){
            setContactNumberValid(true)
          }   
          else{
            setContactNumberValid(false)
          }
    }

    const requestCallBackHandler = async ()=>{
      try{
      const name = document.getElementById("callbackName").value
      const number = document.getElementById("callbackNumber").value
      const result = await axios.post(apiLinks.requestCallback,{name,number})
      if(result.data.code === 200){
        toast("callback request made!")
      }
      else{
        toast("Failed to request a callback!")
      }
    }
  catch(err){
    console.log(err)
    toast("internal server Error!")
  }
}

    const close = ()=>{
        props.close(false)
    }
    return (
    <>
        <div className="lightbox-cover">
                <div className="lightbox-vertical">
                <button className="close" onClick={close}>&times;</button>
                <div className="details-box">
                  
                <TextField id="callbackName" label="Name" InputLabelProps={{
                      style: {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '100%',
                        fontWeight:"700",
                        color: 'rgba(10, 66, 117,255)'
                      }}}
                      style={{color:"#fff"}}
                      />

                  <TextField id="callbackNumber" error={contactNumberValid=== null? false : !contactNumberValid} onChange={handleInputChange} label="Contact Number" InputLabelProps={{
                      style: {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '100%',
                        fontWeight:"700",
                        color: 'rgba(10, 66, 117,255)'
                      }}}
                      style={{color:"#fff"}}/>
                  
                  <Button onClick={()=>{requestCallBackHandler()}} outline >Request Callback</Button>
                </div>
                </div>
            </div>
        </>
    )
}
