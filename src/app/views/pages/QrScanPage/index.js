import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import { OnRegisterPetIdCode } from "@app/actions/regsiterPet";
import axios from "axios";
import { API_URL } from "@app/constants.js";
import "./style.scss";
import queryString from "query-string";

class QrScanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 500,
      scan_success: false,
      errorMsg: "",
    };
  }

  getCodefromURL = (url) => {
    let res = url.match(/[^=]+$/gi);
    if (res) {
      return res[0];
    } else {
      return null;
    }
  };

  handleScan = (url) => {
    let token = this.props.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    if (this.state.scan_success === true) {
      return;
    }
    if (url) {
      let urlCheck = /barkrz.com/;
      if (urlCheck.test(url)) {
        if (this.getCodefromURL(url)) {
          let code = this.getCodefromURL(url);
          let data = {
            identity_code: code,
          };
          this.props.SetIdCode({ identity_code: code });
          this.setState({
            scan_success: true,
          });

          axios
            .post(`${API_URL}checkCode`, data, header)
            .then((res) => {
              if (!res.data.existance) {
                Swal.fire({
                  text: "Success!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1200,
                }).then(() => {
                  this.props.history.push("/gene");
                });
              } else {
                Swal.fire({
                  text: "Code already exists.",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                  this.setState({ scan_success: false });
                });
              }
            })
            .catch((err) => {
              this.setState({
                errorMsg: err.message,
                scan_success: false,
              });
              Swal.fire({
                text: "Network Error",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            });
        } else {
          Swal.fire({
            text: "Invalid tag Scanned",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.setState({ scan_success: false });
          });
        }
      } else {
        Swal.fire({
          text: "Invalid tag Scanned",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.setState({ scan_success: false });
        });
      }
    }
  };

  handleError = (err) => {
    console.error(err);
    Swal.fire({
      text: "Webcam not supported.",
      icon: "warning",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      this.props.history.push("/");
    });
  };

  render() {
    //Fetch param from local storage as p.

    const params = localStorage.getItem("profile-params");
    if (params) {
      // this.handleScan(`https://barkrz.com/a?p=${params}`);
      localStorage.removeItem("profile-params");
    }
    return (
      <>
        <MobileNavbar />
        <h2 className="text-center scan-title">Scan Your BarkrZ Pet ID</h2>
        <div className="qr-container">
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    registerPetInfo: state.registerPetInfo,
    userdata: state.auth.userdata,
  };
};

const mapDispatchToProps = (dispatch) => ({
  SetIdCode: (code) => dispatch(OnRegisterPetIdCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrScanPage);
