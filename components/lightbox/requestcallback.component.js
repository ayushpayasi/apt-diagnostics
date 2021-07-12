import React,{useState} from 'react'
import { Container,Row,Col,FormGroup,Input,Button,Label,Form, FormFeedback } from 'reactstrap'
import "../../assets/css/lightbox.scss"

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

    const close = ()=>{
        props.close(false)
    }
    return (
    <>
        <div className="lightbox-cover">
                <div className="lightbox-vertical">
                <button className="close" onClick={close}>&times;</button>
                </div>
            </div>
        </>
    )
}
