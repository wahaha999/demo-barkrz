import React , {Component} from 'react';
import {Container, Row, Col } from "reactstrap";
import {connect} from 'react-redux';
import {OnRegisterPetGender} from '@app/actions/regsiterPet'

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';

let timer;
class GenePage extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            gender: null
        }
    }

    componentDidMount() {
        const {gender} = this.props.registerPetInfo;
        if (gender === "Male") {
            this.setState({gender: false});
        } else if(gender === "Female"){
            this.setState({gender: true});
        }
    }

    onBackButtonEvent = (e) => {
        // this.props.history.back();
    }

    GenderSelect = (val)=> {
        this.setState({gender: val});
        this.props.SetGender({gender:val===true?"Female":"Male"});

        if (timer!=='undefined') {
            clearTimeout(timer);
        }

        timer = setTimeout(function() { //Start the timer
            this.props.history.push("/name-profile");
        }.bind(this), 200)
    };

    Next = ()=> {
        this.props.SetGender({gender:this.state.gender?"Male":"Female"});
        this.props.history.push("/name-profile");
    };

    render() {
        const {gender} = this.state;
        
        return(
            <>
                <MobileNavbar />                               
                <Container style={{marginTop:"136px"}}>
                    <Row>  
                        <Col lg="4"  className="mb-5 ml-auto mr-auto text-center">                            
                            <div className="text-center">        
                                <span className="font-weight-bold" style={{fontSize: "32px", textAlign: "center" , color:"black"}}>Am I a good girl?</span>
                            </div>
                            {
                                gender === true? <img  className={'ml-auto mr-auto mt-5 gender-select gender-selected'} src={require("@app/assets/img/female_click.png").default} width="150px" height="150px" onClick={()=>{this.GenderSelect(true)}} alt=""/>:
                                                <img  className={'ml-auto mr-auto mt-5 gender-select'} src={require("@app/assets/img/female_click.png").default} width="150px" height="150px" onClick={()=>{this.GenderSelect(true)}} alt=""/>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" className="mb-5 ml-auto mr-auto text-center">                            
                            <div className="text-center">        
                                <span className="font-weight-bold" style={{fontSize: "32px", textAlign: "center" , color:"black"}}>Am I a good boy?</span>
                            </div>
                            {
                                gender === false? <img  className={'ml-auto mr-auto mt-5 gender-select gender-selected'} src={require("@app/assets/img/male_click.png").default} width="150px" height="150px" onClick={()=>{this.GenderSelect(false)}} alt="" />:
                                <img  className={'ml-auto mr-auto mt-5 gender-select'} src={require("@app/assets/img/male_click.png").default} width="150px" height="150px" onClick={()=>{this.GenderSelect(false)}} alt="" />
                            }
                        </Col>
                    </Row>
                </Container>     
            </>
        );
    }
}
const mapStateToProps = state => {
    return {registerPetInfo: state.registerPetInfo};
  };
  
  const mapDispatchToProps = dispatch => ({
    SetGender: (data) => dispatch(OnRegisterPetGender(data)),
  });
  
export default connect(mapStateToProps , mapDispatchToProps)(GenePage);