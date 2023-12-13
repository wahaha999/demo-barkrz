import React , {Component} from 'react';
import  Rating from 'react-rating';

import { Container, Row, Col} from "reactstrap";

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let reviews = [];
        for (let index = 0; index < 4; index++) {
            reviews.push( 
                <Col lg="4"  md="6"  xs="12" className="mb-3">                            
                    <div className="text-center mb-3">        
                        <img className="img-circle img-no-padding img-responsive" src={"https://randomuser.me/api/portraits/women/82.jpg"} width="120px" height="120px" alt="" />
                    </div>
                    <div className="text-center justify-content-space" style={{fontSize: "20px", width:"100%"}}>
                        <Rating
                        initialRating={5}
                            fullSymbol={<i style={{color: "#eeee00"}} className='fa fa-star' />}
                            emptySymbol={<i className='fa fa-star' />}
                            placeholderSymbol={<i className='fa fa-star' />}
                        />              
                    </div>
                    <div className="text-center font-weight-bold">
                        Lorem ipsum dolor sit amet. consecteur elit. <br/>
                        sed do eiusmod tempor incididumt ut labore et dolore magna aliqua
                    </div>
                </Col>)            
        }

        return(
            <>
                <MobileNavbar />
                 
                <Container style={{marginTop:"100px"}}>
                    <Row className="mb-3">
                        <Col className="ml-auto mr-auto text-center" lg="4"  md="6" xs="12" > 
                            <span className="font-weight-bold" style={{fontSize: "26px", textAlign: "center" , color:"black"}}>Our Barkrz Family</span>
                        </Col>
                    </Row>
                    <Row>  
                        {reviews}
                    </Row>
                </Container>       
            </>
        );
    }
}

export default ReviewPage;