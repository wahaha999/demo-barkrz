import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OnRegisterPetAgeWeightNeutered } from '@app/actions/regsiterPet'

import { Container, Row, Col } from "reactstrap";
import Alert from "@app/views/components/Alert";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';

class Register2Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            weight: "",
            neutered: "1",
            validationError: false,
            validationErrorMsg: "",
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        const { age, weight } = this.props.registerPetInfo;
        this.setState({ age: age, weight: weight });
    }

    Next = () => {
        const { age, weight, neutered } = this.state;
        if (age === "") {
            this.setState({ validationError: true, validationErrorMsg: "Please Fill the Birth Year field" });
            return;
        } else if (weight === "") {
            this.setState({ validationError: true, validationErrorMsg: "Please Fill the Weight field" });
            return;
        }

        this.props.SetAgeWeightNeutered({ age: age, weight: weight, neutered: neutered });
        this.props.history.push("/register3");
    };

    Prev = () => {
        this.props.history.goBack();
    };

    render() {
        const { age, weight } = this.state;
        const { validationError, validationErrorMsg } = this.state;
        const { gender } = this.props.registerPetInfo;
        return (
            <>
                <MobileNavbar icon="fa fa-chevron-left" />
                <Container style={{ marginTop: "136px" }}>
                    <Row>
                        <Col lg="4" className="mb-5 ml-auto mr-auto text-center">
                            <div className="text-center">
                                <span className="font-weight-bold register2Span">When I was born?</span>
                            </div>

                            <input type="date" name="age" value={age} onChange={this.handleInputChange} placeholder="2019" className="register2Input" min="1980-01-01" max="2030-01-01" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" className="mb-5 ml-auto mr-auto text-center">
                            <div className="text-center">
                                <span className="font-weight-bold register2Span" >My weight is? (lbs)</span>
                            </div>
                            <input name="weight" value={weight} onChange={this.handleInputChange} className="register2Input" type="number" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" className="mb-5 ml-auto mr-auto text-center">
                            <div className="text-center">
                                <span className="font-weight-bold register2Span" >{gender === 'Male' ? 'Am I Neutered?' : 'Am I spayed?'}</span>
                            </div>
                            <select onChange={this.handleInputChange} name="neutered" className="register2Input">
                                <option className="text-center" value={1} defaultValue>Yes</option>
                                <option className="text-center" value={0}>No</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className="text-center mt-5 mb-3" style={{ position: "relative" }}>
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
                        OnClose={() => { this.setState({ validationError: false }) }}
                        success={false}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return { registerPetInfo: state.registerPetInfo };
};

const mapDispatchToProps = dispatch => ({
    SetAgeWeightNeutered: (data) => dispatch(OnRegisterPetAgeWeightNeutered(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register2Page);
