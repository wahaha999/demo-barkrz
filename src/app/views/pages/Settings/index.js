import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
// import images from 'react-payment-inputs/images'
import { PetDelete } from "@app/actions/pet";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import { API_URL } from "@app/constants.js";
import Loading from "@app/views/components/Loading";
import Alert from "@app/views/components/Alert";
import { Login_Success } from "@app/actions/auth";
import "./styles.scss";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInputShow: false,
      loading: false,
      deleteConfirmDialog: false,
      cancelConfirmDialog: false,
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      errorDialog: false,
      errorMsg: "",
      deletingPetID: null,
    };
  }

  SaveCardCancel = () => {
    this.setState({ cardInputShow: false });
  };

  GetCardType = (number) => {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null) return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) return "AMEX";

    // Discover
    re = new RegExp(
      "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
    );
    if (number.match(re) != null) return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null) return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null) return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null) return "Visa Electron";

    return "";
  };

  onCardNumberChange = (e) => {
    this.setState({ cardNumber: e.target.value });
  };

  onCardExpiryChange = (e) => {
    this.setState({ cardExpiry: e.target.value });
  };

  onCardCVCChange = (e) => {
    this.setState({ cardCVC: e.target.value });
  };

  CancelMembership = () => {
    let token = this.props.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    this.setState({ loading: true, cardInputShow: false });
    axios
      .post(`${API_URL}cancelMembership`, {}, header)
      .then((res) => {
        this.setState({ loading: false });
        if (!res.data.expired) {
          if (res.data.success === false) {
            this.setState({ errorMsg: res.data.message, errorDialog: true });
            this.setState({ loading: false });
          } else {
            this.props.CancelMembership();
            this.props.history.push("/membership");
          }
        } else {
          this.props.logout();
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err.message, errorDialog: true });
        this.setState({ loading: false });
      });
  };

  onHandleSubmit = (meta) => {
    if (meta.error) {
      this.setState({ errorDialog: true });
      this.setState({ success: false, errorMsg: meta.error });
    } else {
      const { cardNumber, cardExpiry, cardCVC } = this.state;
      let token = this.props.userdata.token;
      const header = { headers: { Authorization: `Bearer ${token}` } };
      let data = {
        number: cardNumber,
        expiry: cardExpiry,
        cvc: cardCVC,
        nocard: "Yes",
      };
      this.setState({ loading: true, cardInputShow: false });
      axios
        .post(`${API_URL}save_card`, data, header)
        .then((res) => {
          this.setState({ loading: false });
          if (!res.data.expired) {
            if (res.data.success === false) {
              this.setState({ errorMsg: res.data.message, errorDialog: true });
              this.setState({ loading: false });
            } else {
              this.props.SaveCard(res.data);
            }
          } else {
            this.props.logout();
          }
        })
        .catch((err) => {
          this.setState({ errorMsg: err.message, errorDialog: true });
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const {
      deleteConfirmDialog,
      cancelConfirmDialog,
      errorDialog,
      errorMsg,
      loading,
    } = this.state;
    const { Pets } = this.props.petsInformation;

    let pets = [];
    Pets.forEach((element, index) => {
      pets.push(
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0 10px 10px",
          }}
          key={Math.random()}
        >
          <span
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => {
              this.props.history.push(`/edit-profile?id=${index}`);
            }}
          >
            {element.pet.name}
          </span>
          <i
            className="fa fa-trash"
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => {
              this.setState({
                deleteConfirmDialog: true,
                deletingPetID: element.pet.id,
              });
            }}
          />
        </div>
      );
    });
    return (
      <>
        <MobileNavbar />
        <Container style={{ display: "flex", padding: 0 }}>
          <Row style={{ width: "100%", margin: 0, height: "100vh" }}>
            <Col
              className="mr-auto ml-auto"
              lg="5"
              md="6"
              xs="12"
              style={{ display: "flex", padding: 0 }}
            >
              <div style={{ width: "15%", display: "flex" }}>
                <div
                  style={{
                    width: "80%",
                    backgroundColor: "#7FC4AF",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                ></div>
                <div style={{ width: "5%" }} />
              </div>
              <div style={{ width: "85%", padding: "10px" }}>
                <h1 className="setting-title">Account</h1>

                <div className="profile-card" style={{ textAlign: "left" }}>
                  <span
                    className="ml-2 font-weight-bold  "
                    style={{ fontSize: "18px" }}
                  >
                    Account Info
                  </span>
                  <p style={{ fontSize: "16px", paddingLeft: "10px" }}>
                    {this.props.userdata.email}
                  </p>
                </div>

                <div className="profile-card" style={{ textAlign: "left" }}>
                  <span
                    className="ml-2 font-weight-bold  "
                    style={{ fontSize: "18px" }}
                  >
                    Profiles
                  </span>
                  {pets}
                </div>

                <div className="profile-card" style={{ textAlign: "left" }}>
                  <span
                    className="ml-2 font-weight-bold  "
                    style={{ fontSize: "18px" }}
                  >
                    Free Membership
                  </span>
                </div>

                <div className="profile-card" style={{ textAlign: "left" }}>
                  <span
                    className="ml-2 font-weight-bold"
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => {
                      this.props.logout();
                    }}
                  >
                    Log Out
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div
          className="save-contents-dialog-background"
          hidden={!deleteConfirmDialog}
        >
          <div className="save-contents-dialog">
            <div>
              Are you sure you want to delete this Barkrz profile? <br />
              <span>You cannot undo this action.</span>
            </div>
            <button
              onClick={() => {
                this.setState({ loading: true });
                this.setState({ deleteConfirmDialog: false });
                this.props.OnPetDelete(
                  { id: this.state.deletingPetID },
                  (option, message) => {
                    this.setState({ loading: false });

                    if (!option) {
                      this.setState({ errorDialog: true });
                      this.setState({
                        success: option,
                        errorMsg: "Network Error",
                      });
                    }
                  }
                );
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                this.setState({ deleteConfirmDialog: false });
              }}
            >
              No
            </button>
          </div>
        </div>

        <div
          className="save-contents-dialog-background"
          hidden={!cancelConfirmDialog}
        >
          <div className="save-contents-dialog">
            <div>
              Are you sure you want to cancel your membership? <br />
              <span>You pet profile will no longer be visible.</span>
            </div>
            <button
              onClick={() => {
                this.CancelMembership();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                this.setState({ cancelConfirmDialog: false });
              }}
            >
              No
            </button>
          </div>
        </div>
        {loading && <Loading />}
        {errorDialog && (
          <Alert
            message={errorMsg}
            OnClose={() => {
              this.setState({ errorDialog: false });
            }}
            success={false}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.auth.userdata,
    petsInformation: state.petsInformation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnPetDelete: (data, callback) => dispatch(PetDelete(data, callback)),
    SaveCard: (data) => dispatch(Login_Success(data)),
    CancelMembership: () => {
      window.sessionStorage.clear();
      dispatch({ type: "REMOVE_USER_MEMBERSHIP" });
      dispatch({ type: "PET_REMOVE" });
      dispatch({ type: "PET_REGISTER_INIT" });
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
