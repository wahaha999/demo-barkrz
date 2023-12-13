import React, { Component } from "react";
import Rating from "react-rating";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { UploadPetInfo } from "@app/actions/regsiterPet";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import "./style.scss";

class MotivationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      callbackMsg: "",
      success: false,
    };
  }

  uploadData = () => {
    const {
      gender,
      image,
      name,
      address,
      breed,
      age,
      weight,
      neutered,
      medicalCondition,
      temperament,
      ownerNames,
    } = this.props.registerPetInfo;
    const data = {
      gender: gender,
      image: image,
      name: name,
      address: address,
      breed: breed,
      age: age,
      weight: weight,
      neutered: neutered,
      medicalCondition: medicalCondition,
      temperament: temperament,
      ownerNames: ownerNames,
      microchip_number: "",
    };
    this.props.CreatePetInfo(data, this.UploadCallback);
  };

  UploadCallback = (option, msg) => {
    this.setState({ modal: true, success: option, callbackMsg: msg });
  };

  AfterSuccessModal = () => {
    this.setState({ modal: false });
    this.props.history.push("/petsList");
  };

  render() {
    const { success, callbackMsg } = this.state;
    const { inProgress } = this.props.petsInformation;
    return (
      <>
        <MobileNavbar />
        <Container style={{ marginTop: "100px" }}>
          <Row style={{ marginTop: "50px", marginBottom: "100px" }}>
            <Col className="ml-auto mr-auto text-center" lg="4" md="6" xs="12">
              <span
                className="font-weight-bold"
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Wow!
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: "100px", marginBottom: "100px" }}>
            <Col
              lg="4"
              md="6"
              xs="12"
              className="mb-3 ml-auto mr-auto text-center"
            >
              <div className="text-center mb-3">
                <img
                  onClick={this.uploadData}
                  className="img-circle img-no-padding img-responsive"
                  src={require("@app/assets/img/check-icon.png").default}
                  width="150px"
                  height="150px"
                  alt=""
                />
              </div>
              <div
                className="text-center"
                style={{ fontSize: "30px", color: "black" }}
              >
                We're almost there
              </div>
            </Col>
          </Row>
          <Row
            className="text-center mt-5"
            style={{
              position: "relative",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <Col lg="4" className="ml-auto mr-auto text-center">
              <div className="ml-auto mr-auto" style={{ fontSize: "12px" }}>
                <Rating
                  stop={6}
                  readonly={true}
                  initialRating={6}
                  fullSymbol={
                    <i
                      style={{ color: "#84f5d2" }}
                      className="fa fa-circle"
                    ></i>
                  }
                  emptySymbol={<i className="fa fa-circle"></i>}
                  placeholderSymbol={<i className="fa fa-circle"></i>}
                />
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.modal && (
          <Alert
            message={callbackMsg}
            OnClose={this.AfterSuccessModal}
            success={success}
          />
        )}
        {inProgress && <Loading />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registerPetInfo: state.registerPetInfo,
    petsInformation: state.petsInformation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  CreatePetInfo: (data, callback) => dispatch(UploadPetInfo(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MotivationPage);
