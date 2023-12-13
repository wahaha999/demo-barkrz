import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  OnRegisterPetOwnerNames,
  UploadPetInfo,
} from "@app/actions/regsiterPet";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";

import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import CustomInput from "@app/views/components/CustomInput/CustomInput.js";
import "./style.scss";
import { Route, withRouter } from "react-router-dom";

class OwnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      phone_count: [1, 1],
      modal: false,
      callbackMsg: "",
      success: false,
      validationError: false,
      validationErrorMsg: "",
      owners: null,
    };
  }

  componentDidMount() {
    const { Pets } = this.props.petsInformation;
    if (Pets.length > 0) {
      const { owners } = Pets[Pets.length - 1];
      const { phone_count } = this.state;
      owners.forEach((owner, owner_index) => {
        // let owner_name = "name"+owner_index;
        this.setState({ ["name" + owner_index]: owner.owner.name });
        owner.phone_numbers.forEach((phone_number, index) => {
          this.setState({
            ["name" + owner_index + "phone" + index]: phone_number.phone_number,
          });
        });
        phone_count.push(owner.phone_numbers.length);
      });
      this.setState({ count: owners.length });
    }
  }

  OnAddOwner = () => {
    this.setState({ count: this.state.count + 1 });
    const { phone_count } = this.state;
    phone_count.push(1);
  };

  OnAddPhoneCount = (i) => {
    const { phone_count } = this.state;
    phone_count[i] += 1;
    this.setState({ phone_count: phone_count });
  };

  Next = () => {
    const { count, phone_count } = this.state;
    let owners = [];
    let phone_numbers = [];
    let flag = 0;
    for (let i = 0; i < count; i++) {
      phone_numbers = [];
      let name = "name" + i;
      let phoneCount = 0;
      for (let j = 0; j < phone_count[i]; j++) {
        let phone = "name" + i + "phone" + j;

        if (!this.state[phone] || this.state[phone] === "") {
          // this.setState({validationError: true , validationErrorMsg: "Please fill in the gaps"});
          // return;
          continue;
        }
        phone_numbers.push({ phone: this.state[phone] });
        phoneCount++;
      }
      if (phoneCount > 0 && (!this.state[name] || this.state[name] === "")) {
        this.setState({
          validationError: true,
          validationErrorMsg: "Please fill in the name field",
        });
        return;
      } else if (
        phoneCount === 0 &&
        this.state[name] &&
        this.state[name] !== ""
      ) {
        this.setState({
          validationError: true,
          validationErrorMsg:
            "Please input at least a phone number for a owner",
        });
        return;
      } else {
        if (!this.state[name] || this.state[name] === "") {
          continue;
        }
      }

      owners.push({ name: this.state[name], phone_numbers: phone_numbers });
      flag++;
    }
    if (flag === 0) {
      this.setState({
        validationError: true,
        validationErrorMsg: "Please input at least one owner",
      });
      return;
    }
    this.setState({ owners: owners }, () => {
      this.uploadData();
    });

    this.props.SetOwnerNames({ ownerNames: owners });
  };

  uploadData = () => {
    const {
      gender,
      identity_code,
      image,
      name,
      address,
      breed,
      age,
      weight,
      neutered,
      medicalCondition,
      temperament,
    } = this.props.registerPetInfo;

    const data = {
      gender: gender,
      identity_code: identity_code,
      name: name,
      address: address,
      breed: breed,
      age: age,
      weight: weight,
      neutered: neutered,
      medicalCondition: medicalCondition,
      temperament: temperament,
      ownerNames: this.state.owners,
      microchip_number: "",
    };

    const formData = new FormData();
    formData.append("file", image);

    formData.append("data", JSON.stringify(data));

    this.props.CreatePetInfo(formData, this.UploadCallback);
  };

  UploadCallback = (option, msg) => {
    this.setState({ modal: true, success: option, callbackMsg: msg });
  };

  AfterSuccessModal = () => {
    this.setState({ modal: false });
    if (this.state.success === true) {
      this.props.history.push("/petsList");
    }
  };

  Prev = () => {
    this.props.setPrev();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { count, phone_count, success, callbackMsg } = this.state;
    const { validationError, validationErrorMsg } = this.state;
    const { inProgress } = this.props.petsInformation;
    let owners = [];
    let phone_numbers = [];
    for (let i = 0; i < count; i++) {
      phone_numbers = [];
      for (let j = 0; j < phone_count[i]; j++) {
        phone_numbers.push(
          <div
            key={`phone${i}${j}`}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <CustomInput
              onChange={this.handleInputChange}
              name={"name" + i + "phone" + j}
              value={this.state["name" + i + "phone" + j] || ""}
              icon="fa fa-phone"
              placeholder="Phone Number..."
              style={{
                border: "none",
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "#eeeeee",
              }}
              type="text"
            />
            <i
              className="fa fa-plus-circle phone_number_plus_i"
              onClick={() => {
                this.OnAddPhoneCount(i);
              }}
            />{" "}
          </div>
        );
      }
      owners.push(
        <div key={`name${i}`}>
          <CustomInput
            onChange={this.handleInputChange}
            name={"name" + i}
            value={this.state["name" + i] || ""}
            icon="fa fa-male"
            placeholder="Name"
            style={{
              border: "none",
              borderRadius: "20px",
              backgroundColor: "#eeeeee",
            }}
            type="text"
          />
          <div className="mt-2">{phone_numbers}</div>
        </div>
      );
    }
    return (
      <>
        <MobileNavbar icon="fa fa-chevron-left" />
        <Container style={{ marginTop: "136px" }}>
          <Row>
            <Col lg="4" className="mb-5 ml-auto mr-auto text-center">
              <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                <div className="text-center">
                  <p className="font-weight-bold register4PageSpan">
                    Friendly Humans
                  </p>
                  <p style={{ fontSize: "22px", fontFamily: "serif" }}>
                    Owner Contact Information
                  </p>
                </div>
                {owners}
              </div>
              <button
                onClick={this.OnAddOwner}
                style={{
                  borderColor: "#eeeeee",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "#eeeeee",
                }}
                className="ml-auto mr-auto mt-5"
              >
                <img
                  alt="Add Button"
                  src={require("@app/assets/img/plus-btn.png").default}
                  width="30px"
                  height="30px"
                />
              </button>
            </Col>
          </Row>

          <Row
            className="text-center mt-3 mb-3"
            style={{ position: "relative" }}
          >
            <Col lg="4" className="ml-auto mr-auto text-center">
              <div>
                <button onClick={this.Prev} className="btn btn-primary mr-1 ">
                  Prev
                </button>
                <button onClick={this.Next} className="btn btn-primary ml-1">
                  Done
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        {validationError && (
          <Alert
            message={validationErrorMsg}
            OnClose={() => {
              this.setState({ validationError: false });
            }}
            success={false}
          />
        )}
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
  SetOwnerNames: (data) => dispatch(OnRegisterPetOwnerNames(data)),
  CreatePetInfo: (data, callback) => dispatch(UploadPetInfo(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerView);
