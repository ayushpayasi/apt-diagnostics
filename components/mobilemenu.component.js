import React from 'react'
import {Row,Col} from 'reactstrap'
import CallIcon from '@material-ui/icons/Call';
import HomeIcon from '@material-ui/icons/Home';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

export default function MobileMenu() {
    return (
        <div className="mobilebar">
            <Row >
                <Col className="br-1 align-center-column">
                    <CallIcon style={{color:"#f0d5c0",height:"50px",width:"50px"}}/>
                    <h6 style={{color:"#f0d5c0"}}> Call Us</h6>
                </Col>
                <Col className="br-1 align-center-column" >
                    <HomeIcon style={{color:"#f0d5c0",height:"50px",width:"50px"}}/>
                    <h6 style={{color:"#f0d5c0"}}> Home</h6>
                </Col>
                <Col className="br-1 align-center-column">
                    <LiveHelpIcon style={{color:"#f0d5c0",height:"50px",width:"50px"}}/>
                    <h6 style={{color:"#f0d5c0"}}> Help</h6>
                </Col>
            </Row>
        </div>
    )
}
