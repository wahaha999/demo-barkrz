/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";

// reactstrap components
import { Row, Col} from "reactstrap";

// core components
import './style.scss';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      OnLoginForm: true,
    }

  }
  componentDidMount() {
    document.body.classList.add("register-page");
  }

  componentWillUnmount() {
    document.body.classList.remove("register-page");
  }

  OnAuthOptionChanged = (e)=> {
    this.setState({OnLoginForm: !this.state.OnLoginForm});
  };

  render() {
    document.documentElement.classList.remove("nav-open");
  
    return (
      <>
          <div style={{ height: "1000px",width: "100%", paddingTop:"150px",backgroundColor:"#7FC4AF"}}>
            <Row >
              <Col className="ml-auto mr-auto text-center"  md="6" lg="4" sm="8" xs="12">
                <div style={{display:"inline-flex",flexDirection:"column", color:"white"}}>
                  <img src={require("@app/assets/img/logo.svg").default} className="m-auto" width="160px" height="160px" alt=""/>
                  <br/>
                  <span className="ml-auto mr-auto mb-2 custom-menu-item" >
                      Login
                      <img src={require("@app/assets/img/white-border.png").default} style={{width:"100%"}} alt="" />
                  </span>
               
                  <span className="ml-auto mr-auto mb-2 custom-menu-item" >
                      Membership
                      <img src={require("@app/assets/img/white-border.png").default} style={{width:"100%"}} alt="" />
                  </span>
                  
                  <span className="ml-auto mr-auto mb-2 custom-menu-item" >
                      Contact Us
                      <img src={require("@app/assets/img/white-border.png").default} style={{width:"100%"}} alt="" />
                  </span>
                  
                  <span className="ml-auto mr-auto mb-2 custom-menu-item" >
                      Reviews
                      <img src={require("@app/assets/img/white-border.png").default} style={{width:"100%"}} alt="" />
                  </span>
                  
                </div>
              </Col>
            </Row>
          </div>
         
      </>
    );
  }
}

export default RegisterPage;
