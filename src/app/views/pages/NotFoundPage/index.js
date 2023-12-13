import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row } from "reactstrap";

const NotFoundPage = () => {  
    return (
        <Container>
            <Row className="align-items-center flex-column mt-5">
                <img style={{width: "160px", height: "160px"}} alt="not found img" src={require("@app/assets/img/logo.svg").default} />
                <h5 className="text-center">This page could not be found</h5>
                <Link className="h5 font-weight-bold" to="/">Go to Home</Link>
            </Row>            
        </Container>
    );
  };
  
  export default withRouter(NotFoundPage);