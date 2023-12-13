import React , {Component} from 'react';
import {connect} from 'react-redux';
import {OnRegisterPetMedicalConditionAndTemperament} from '@app/actions/regsiterPet'
import { Container, Row, Col } from "reactstrap";

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Alert from "@app/views/components/Alert";
import './style.scss';

class MedicalView extends Component {
    constructor(props) {
        super(props);
        this.state={
            medicalCondition:"",
            temperament:"",
            friendly:false,
            withkids:false,
            withdogs:false,
            withcats:false,
            skittish:false,
            aggressive:false,
            calm:false,
            playful:false,
            validationError:false,
            validationErrorMsg:"",
        }
    }

    componentDidMount() {
        const {medicalCondition, temperament} = this.props.registerPetInfo;
        this.setState({medicalCondition: medicalCondition , temperament: temperament});
        temperament[0] === "1"?this.setState({friendly:true}):this.setState({friendly:false});
        temperament[1] === "1"?this.setState({withkids:true}):this.setState({withkids:false});
        temperament[2] === "1"?this.setState({withdogs:true}):this.setState({withdogs:false});
        temperament[3] === "1"?this.setState({withcats:true}):this.setState({withcats:false});
        temperament[4] === "1"?this.setState({skittish:true}):this.setState({skittish:false});
        temperament[5] === "1"?this.setState({aggressive:true}):this.setState({aggressive:false});
        temperament[6] === "1"?this.setState({calm:true}):this.setState({calm:false});
        temperament[7] === "1"?this.setState({playful:true}):this.setState({playful:false});

    }

    handleInputChange = (e) => {

        const {name , value , checked} = e.target;
        if (name === "medicalCondition") {
            this.setState({[name]: value});
        } else {
            this.setState({[name]: checked});
        }
    };

    Next = ()=> {

        const {medicalCondition, friendly,withkids,withdogs,withcats,skittish,aggressive,calm,playful} = this.state;
        if (!friendly && !withkids && !withdogs && !withcats && !skittish && !aggressive && !calm && !playful) {
            this.setState({validationError: true , validationErrorMsg: "Please Select at least one of temperament"});
            return;
        }

        let temperament="";
        friendly?temperament+="1":temperament+="0";
        withkids?temperament+="1":temperament+="0";
        withdogs?temperament+="1":temperament+="0";
        withcats?temperament+="1":temperament+="0";
        skittish?temperament+="1":temperament+="0";
        aggressive?temperament+="1":temperament+="0";
        calm?temperament+="1":temperament+="0";
        playful?temperament+="1":temperament+="0";
        this.props.SetMedicalConditionAndTemperament({medicalCondition:medicalCondition, temperament:temperament});
        this.props.setNext();
    };

    Prev = ()=> {
        this.props.setPrev();
    };

    render() {
        const {medicalCondition , friendly, withkids, withdogs,withcats,skittish,aggressive,calm,playful} = this.state;
        const {validationError , validationErrorMsg} = this.state;
        return(
            <>
                <MobileNavbar icon="fa fa-chevron-left"/>

                <Container style={{marginTop:"136px"}}>
                    <Row>
                        <Col lg="4"  className="mb-5 ml-auto mr-auto text-center">
                            <div className="text-center">
                                <span className="font-weight-bold" style={{fontSize: "26px", textAlign: "center" , color:"black"}}>Medical Conditions?</span>
                            </div>
                            <input value={medicalCondition} name="medicalCondition" onChange={this.handleInputChange} className="register3Input mt-4"  type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4"  className="mb-5 ml-auto mr-auto text-center">
                            <div className="text-center">
                                <span className="font-weight-bold" style={{fontSize: "26px", textAlign: "center" , color:"black"}}>Temperament</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4"  className="mb-5 ml-auto mr-auto text-center">
                            <Row>
                                <Col lg="6" sm="6" md="6" xs='6'>
                                    <div  style={{display: "inline-flex" , flexDirection: "column"}}>
                                        <label className="custom-check-box">Friendly
                                            <input name="friendly" checked={ friendly } onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark"/>
                                        </label>
                                        <label className="custom-check-box">With Kids
                                            <input name="withkids" checked={withkids} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark"/>
                                        </label>
                                        <label className="custom-check-box">With Dogs
                                            <input name="withdogs" checked={withdogs} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark"/>
                                        </label>
                                        <label className="custom-check-box">With Cats
                                            <input name="withcats" checked={withcats} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark"/>
                                        </label>
                                    </div>
                                </Col>
                                <Col lg="6" sm="6" md="6" xs='6'>
                                    <div  style={{display: "inline-flex", flexDirection: "column"}}>
                                        <label className="custom-check-box">Skittish
                                            <input  name="skittish" checked={skittish} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark" />
                                        </label>
                                        <label  className="custom-check-box">Aggressive
                                            <input name="aggressive" checked={aggressive} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark" />
                                        </label>
                                        <label className="custom-check-box">Calm
                                            <input name="calm" checked={calm} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark" />
                                        </label>
                                        <label className="custom-check-box">Playful
                                            <input name="playful" checked={playful} onChange={this.handleInputChange} type="checkbox" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="text-center mt-5 mb-3" style={{position:"relative"}}>
                        <Col lg="4" className="ml-auto mr-auto text-center">
                            <div>
                                <button onClick={this.Prev} className="btn btn-primary mr-1 ">
                                    Prev
                                </button>
                                <button onClick={this.Next} className="btn btn-primary ml-1">
                                    Next
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {
                    validationError &&
                    <Alert
                        message={validationErrorMsg}
                        OnClose={()=>{this.setState({validationError:false})}}
                        success={false}
                    />
                }
            </>
        );
    }
}


const mapStateToProps = state => {
    return {registerPetInfo: state.registerPetInfo};
};

const mapDispatchToProps = dispatch => ({
    SetMedicalConditionAndTemperament: (data) => dispatch(OnRegisterPetMedicalConditionAndTemperament(data)),
});

export default connect(mapStateToProps , mapDispatchToProps)(MedicalView);
