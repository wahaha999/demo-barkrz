import React , {Component} from 'react';
import  Rating from 'react-rating';

import {  Container, Row, Col } from "reactstrap";

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';

class MedUploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      
        return(
            <>
                <MobileNavbar />                  
                <Container  style={{marginTop:"100px"}}>
                    <Row className="mb-3">
                        <Col className="ml-auto mr-auto text-center" lg="4"  md="6" xs="12" > 
                            <span className="font-weight-bold" style={{fontSize: "30px", textAlign: "center" , color:"black"}}>
                                My Vet Paper Work
                            </span>
                        </Col>
                    </Row>
                    <Row>  
                        <Col lg="4"  md="6"  xs="12" className="mb-3 ml-auto mr-auto text-center">                            
                            <div className="text-center mb-3 ml-4 mr-4" style={{display:"flex",flexDirection:"column"}}>        
                                <button style={{borderRadius:"5px", backgroundColor:"#eee",border:"none"}}>  
                                    <span style={{fontSize:"27px"}} className="m-lg-2">
                                        <br />
                                        <i className="fa fa-upload" />
                                        <br />
                                        Upload Document
                                        <br />
                                        <br />
                                    </span>                                    
                                </button>  

                                <button style={{borderRadius:"5px",backgroundColor:"#eee",border:"none"}} className="mt-3">  
                                    <span style={{fontSize:"27px"}} className="m-lg-2">
                                        <br></br>
                                        <i className="fa fa-camera"></i>              
                                        <br></br>                    
                                        Scan
                                        <br></br>
                                        <br></br>
                                    </span>                                    
                                </button>                                
                            </div>                            
                        </Col>
                    </Row>
                    <Row className="text-center mt-5" style={{position:"relative"}}>
                        <Col lg="4" className="ml-auto mr-auto text-center">
                            <div className="ml-auto mr-auto" style={{fontSize: "12px"}}>
                                <Rating
                                    stop={5}
                                    readonly={true}
                                    initialRating={5}
                                    fullSymbol={<i style={{color: "#84f5d2"}} className="fa fa-circle"></i>}
                                    emptySymbol={<i className="fa fa-circle"></i>}
                                    placeholderSymbol={<i className="fa fa-circle"></i>}
                                />
                                
                            </div>                         
                            <div>
                                <span className="med-upload-span left">
                                        <i className="fa fa-chevron-left"></i>    
                                </span>   
                                <span className="med-upload-span right">
                                        <i className="fa fa-chevron-right"></i>    
                                </span>   
                            </div>
                        </Col>
                    </Row>
                </Container>       
            </>
        );
    }
}

export default MedUploadPage;