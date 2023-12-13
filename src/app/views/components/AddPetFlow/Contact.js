import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Button } from "reactstrap";
import { connect } from "react-redux";
import {
  OnRegisterPetOwnerNames,
  UploadPetInfo,
} from "@app/actions/regsiterPet";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import CustomInput from "@app/views/components/CustomInput/CustomInput.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// import "./style.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Box, Divider, Switch } from "@material-ui/core";
import { Header } from "./Header";
import { Pet_Flow_Information } from "@app/actions/pet";
import { logFbEvent } from "@src/firebase";

class Contact extends Component {
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
      hideAddress: false,
      address: "",
      is_address_hidden: false,
    };
  }

  componentDidMount() {
    const { Pets } = this.props.petsInformation;
    if (Pets.length > 0) {
      const { owners } = Pets[Pets.length - 1];
      const { phone_count } = this.state;
      owners.forEach((owner, owner_index) => {
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
          validationErrorMsg: "Please input at least one phone number",
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
      image,
      name,
      breed,
      neutered,
      temperament,
      vaccinated,
      notes,
      weight,
      identity_code,
      age,
      medicalCondition,
    } = this.props.petsInformation.petFlowData;

    const data = {
      gender: gender,
      name: name,
      address: this.state.address,
      breed: breed,
      age: age,
      weight: weight?.toString() || "",
      neutered: neutered,
      medicalCondition: medicalCondition || "",
      temperament: temperament,
      is_address_hidden: this.state.is_address_hidden,
      ownerNames: this.state.owners,
      microchip_number: "",
      is_vaccinated: vaccinated,
      notes: notes,
      identity_code: identity_code,
    };

    const formData = new FormData();
    formData.append("file", image);

    formData.append("data", JSON.stringify(data));

    this.props.CreatePetInfo(formData, this.UploadCallback);
    this.props.petFlowInformation({});
  };

  UploadCallback = (option, msg) => {
    logFbEvent("signup_complete");
    this.setState({ modal: true, success: option, callbackMsg: msg });
  };

  AfterSuccessModal = () => {
    this.setState({ modal: false });
    if (this.state.success === true) {
      this.props.history.push("/petsList");
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowAddress = (e) => {
    const checked = e.target.checked || false;
    this.setState({ is_address_hidden: checked });
    if (checked) {
      this.setState({ hideAddress: true });
    } else {
      this.setState({ hideAddress: false });
    }
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
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            className="mt-2"
          >
            <PhoneInput
              country={"us"}
              value={this.state["name" + i + "phone" + j] || ""}
              inputProps={{
                name: "name" + i + "phone" + j,
              }}
              onChange={(value, data, event, formattedValue) => {
                this.setState({ ["name" + i + "phone" + j]: formattedValue });
              }}
            />
          </div>
        );
      }
      owners.push(
        <>
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
          {owners?.length > 1 && (
            <div>
              {" "}
              <Divider />
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <Box className="pet-contact-page pet-all-page">
          <Header
            handlePreStep={this.props.handlePreStep}
            page={5}
            current={6}
          />
          <Box className="page-padding">
            <Box my={4} className="header-text">
              <div className="contact-header"> Contact </div>
              <div className="labeltext">
                {" "}
                Set their emergency contact information{" "}
              </div>
            </Box>
            {/* <div className="header-address" style={{ marginBottom: "15px" }}>
              Address
            </div> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div className="header-address">Address</div>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div className="hide-address">Hide</div>
                <Switch
                  name="is_address_hidden"
                  onClick={(e) => this.handleShowAddress(e)}
                />
              </Box>
            </Box>
            <div
              className="find-address"
              style={{ height: "50px", width: "100%" }}
            >
              <GooglePlacesAutocomplete
                className="input"
                selectProps={{
                  isClearable: true,
                  placeholder:
                    this.state?.address === ""
                      ? "Search your address..."
                      : this.state?.address,
                  value: this.state?.address,
                  onChange: (obj) => {
                    this.setState({
                      address: obj && obj.label ? obj.label : "",
                    });
                  },
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      height: 40,
                      paddingLeft: 20,
                      whiteSpace: "normal",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontWeight: 400,
                    }),
                    singleValue: (provided) => {
                      return {
                        ...provided,
                        paddingLeft: 20,
                        whiteSpace: "normal",
                        fontWeight: 400,
                      };
                    },
                    placeholder: (provided) => ({
                      ...provided,
                      paddingLeft: 20,
                      fontWeight: 400,
                    }),
                  },
                }}
              />
              <SearchIcon className="input-search" />
              {this.state.is_address_hidden && (
                <Box mb={2}>
                  <div className="note-text-bottom">
                    Only your City and State will show on your public pet
                    profile
                  </div>
                </Box>
              )}
            </div>

            <Box py={6}>
              <Box className="mb-5 ml-auto mr-auto">
                <div>
                  <div>
                    <div
                      className="header-address"
                      style={{ marginBottom: "-30px" }}
                    >
                      Friendly humans
                    </div>
                  </div>
                  <Box mt={2} className="human-details">
                    {owners}
                  </Box>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Button className="add-button" onClick={this.OnAddOwner}>
                    Add Human
                  </Button>
                </div>
              </Box>
            </Box>
            <div>
              <Button className="next-button" onClick={this.Next}>
                Finish
              </Button>
            </div>
          </Box>
        </Box>
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
    petsInformation: state.petsInformation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  SetOwnerNames: (data) => dispatch(OnRegisterPetOwnerNames(data)),
  CreatePetInfo: (data, callback) => dispatch(UploadPetInfo(data, callback)),
  petFlowInformation: (data) => dispatch(Pet_Flow_Information(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contact)
);
