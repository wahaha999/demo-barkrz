import React, { Component } from 'react';
import ReactDom from "react-dom";

import { Container, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { OnRegisterPetNameAndImage } from '@app/actions/regsiterPet'

import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import heic2any from "heic2any";

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';
import previewImage from "@app/assets/img/pngtolee.png";

class NameProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            previewImg: "",
            img: null,
            validationError: false,
            validationErrorMsg: "",
            isConverting: false,
        }
    }

    handleFileChange = (dataUri, file) => {        
        const newFileName = file.name.split(".")[0] + ".jpg";
        const blob = new Blob([file], {type: "image/*,.heic"});
        this.setState({ isConverting: true });
        heic2any({
            blob,
            toType: "image/jpeg",
            quality: 0.5, // cuts the quality and size by half
        })
        .then((conversionResult) => {
            this.setState({ isConverting: false });
            var newFile = new File([conversionResult], newFileName);
            var url = URL.createObjectURL(conversionResult);
            this.setState({ previewImg: url });
            this.setState({ img: newFile });
        })
        .catch((e) => {
            this.setState({ isConverting: false });
            this.setState({ previewImg: dataUri });
            this.setState({ img: file });
            console.log(e);
        });        
    };

    componentDidMount() {
        const { name, image } = this.props.registerPetInfo;
        if (image) {
            this.setState({ name: name, previewImg: image });
        } else {
            this.setState({ name: name, previewImg: previewImage });
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    Next = () => {
        const { name, img, previewImg } = this.state;
        if (name === "") {
            this.setState({ validationError: true, validationErrorMsg: "Please Fill the Name field" });
            return;
        } else if (previewImg === null) {
            this.setState({ validationError: true, validationErrorMsg: "Please Select Pet Image" });
            return;
        }
        this.props.SetNameAndImage({ name: name, image: img });
        this.props.history.push("/register1");
    };

    Prev = () => {
        this.props.history.goBack();
    };

    render() {

        const { validationError, validationErrorMsg, isConverting } = this.state;
        return (
            <>
                <MobileNavbar />
                <Container style={{ marginTop: "136px" }}>
                    <Row>
                        <Col lg="4" md="6" xs="12" className="mb-3 mt-5 ml-auto mr-auto">
                            <div className="text-center mb-3">
                                <div className="avatar-photo">
                                    <FileUpload handleFileChange={this.handleFileChange} />
                                    <img src={this.state.previewImg} alt="" />
                                </div>
                            </div>
                            <div className="font-weight-bold ml-auto mr-auto" style={{ fontSize: "20px", width: "80%", marginTop: "40px", color: "black" }}>
                                Hi, My name is
                                <div className="form__group">
                                    <input className="form__field " type="text" name="name" id='name' placeholder="Enter the Pet Name" style={{ textAlign: "center" }} value={this.state.name} onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="text-center mt-5" style={{ position: "relative" }}>
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
                {
                    isConverting &&
                    <Loading />
                }
            </>
        );
    }
}

class FileUpload extends Component {
    handleFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) return;

        reader.onload = function (img) {
            ReactDom.findDOMNode(this.refs.in).value = "";
            this.props.handleFileChange(img.target.result, file);
        }.bind(this);
        reader.readAsDataURL(file);
    };

    render() {
        return (
            <input ref="in" type="file" accept="image/*,.heic" onChange={this.handleFile} />
        );
    }
}

const mapStateToProps = state => {
    return { registerPetInfo: state.registerPetInfo };
};

const mapDispatchToProps = dispatch => ({
    SetNameAndImage: (data) => dispatch(OnRegisterPetNameAndImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameProfilePage);