import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useInput } from "@src/utils/hooks/form";
// reactstrap components
import { Button, Container, Row, Col, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
// actions
import { Register, Login } from "@app/actions/auth";
// core components
import CustomInput from "@app/views/components/CustomInput/CustomInput.js";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import "./style.scss";
import axios from "axios";
import { API_URL } from "@app/constants";
import queryString from "query-string";

const RegisterPage = (props) => {
  const [OnLoginForm, setOnLoginForm] = useState(true);
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: confirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
  } = useInput("");
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const inProgress = useSelector((state) => state.auth.inProgress);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    document.body.classList.add("register-page");
    document.documentElement.classList.remove("nav-open");

    let url = props.location.search;
    let params = queryString.parse(url);
    const { code } = params;
    if (code !== undefined || code !== "") {
      sendProfileVisit(code);
    }
    // eslint-disable-next-line
  }, []);

  const sendProfileVisit = (code) => {
    axios
      .get(`${API_URL}profile?code=${code}`)
      .then((res) => {
        if (res.data.error) {
          //do nothing
        } else {
          history.push(`a?p=${code}`);
        }
      })
      .catch((err) => {});
  };

  const OnAuthOptionChanged = (e) => {
    setOnLoginForm(!OnLoginForm);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (error) {
        setError(false);
        return;
      }

      if (validationError) {
        setValidationError(false);
        return;
      }
      Subscribe();
    }
  };

  window.onkeydown = _handleKeyDown;

  const Subscribe = () => {
    if (!validate()) {
      return;
    }

    if (OnLoginForm) {
      dispatch(Login({ email: email, password: password }, OnLoginCallback));
    } else {
      dispatch(
        Register({ email: email, password: password }, OnRegisterCallback)
      );
    }
  };

  const OnRegisterCallback = (option, msg) => {
    if (!option) {
      setError(true);
      setSuccess(true);
      setAlertMsg(msg);
    } else {
      dispatch(Login({ email: email, password: password }, OnLoginCallback));
    }
  };

  const OnLoginCallback = (option, msg, data) => {
    if (option) {
      setError(true);
      setSuccess(false);
      setAlertMsg(msg);
    } else {
      if (data.email === "sample@barkrz.com") {
        history.push("/sample");
      } else {
        if (!OnLoginForm){
          history.push('/petflow');
        }else{
          history.push(props.location.state.from.pathname);
        }
      }
    }
  };

  const validateEmail = (email) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validate = () => {
    if (!validateEmail(email)) {
      setValidationErrorMsg("Please Input Correct Email!");
      setValidationError(true);
      return false;
    }

    if (password === "") {
      setValidationErrorMsg("Please Input Password");
      setValidationError(true);
      return false;
    }

    if (!OnLoginForm && password !== confirmPassword) {
      setValidationErrorMsg("Password does not match!");
      setValidationError(true);
      return false;
    }

    return true;
  };

  const AfterAuthAlert = () => {
    setError(false);
    if (success) {
      resetEmail();
      resetPassword();
      resetConfirmPassword();
      setOnLoginForm(true);
    }
  };

  const AfterValidation = () => {
    setValidationError(false);
  };

  return (
    <div>
      <img
        src={require("@app/assets/svgs/login_Header1.svg").default}
        className="m-auto right-header"
        alt=""
      />
      <div className="register-form">
        <Container>
          <Row>
            <Col
              className="m-auto text-center inner-form"
              md="6"
              sm="12"
              lg="4"
            >
              <img
                src={require("@app/assets/img/new_logo_round.png").default}
                className="m-auto"
                width="160px"
                height="160px"
                alt=""
              />
              <div className="segmented-control mt-4 mb-4">
                <input
                  type="radio"
                  name="sc-1-1"
                  id="sc-1-1-3"
                  checked={OnLoginForm}
                  height="100%"
                  onChange={OnAuthOptionChanged}
                />
                <input
                  type="radio"
                  name="sc-1-1"
                  id="sc-1-1-4"
                  checked={!OnLoginForm}
                  height="100%"
                  onChange={OnAuthOptionChanged}
                />
                <label
                  className="mt-0 mb-0"
                  htmlFor="sc-1-1-3"
                  data-value="Login"
                  style={{ color: "#B6B4B4", backgroundColor: "transparent" }}
                >
                  Login
                </label>
                <label
                  className="mt-0 mb-0"
                  htmlFor="sc-1-1-4"
                  data-value="Sign Up"
                  style={{ color: "#B6B4B4", backgroundColor: "transparent" }}
                >
                  Sign Up
                </label>
              </div>
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter email"
                type="Email"
                icon="fa fa-envelope"
                {...bindEmail}
                style={{ borderColor: "#A5A5A5" }}
              />
              <CustomInput
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                icon="fa fa-key"
                {...bindPassword}
                style={{ borderColor: "white" }}
              />

              {OnLoginForm && (
                <FormGroup row className="justify-content-center">
                  <Link className="link--reset-password" to="/forget-password">
                    Forgot Password
                  </Link>
                </FormGroup>
              )}

              {!OnLoginForm && (
                <>
                  <CustomInput
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    {...bindConfirmPassword}
                    icon="fa fa-key"
                    style={{ borderColor: "white" }}
                  />
                </>
              )}

              <Button
                className="btn-round btn-primary ml-auto mr-auto mt-4 custom-button"
                type="button"
                onClick={Subscribe}
              >
                {OnLoginForm === true ? "Login" : "Sign Up"}
              </Button>
            </Col>
          </Row>
        </Container>
        {error && (
          <Alert
            message={alertMsg}
            OnClose={AfterAuthAlert}
            success={success}
          />
        )}
        {validationError && (
          <Alert
            message={validationErrorMsg}
            OnClose={AfterValidation}
            success={false}
          />
        )}
        {inProgress && <Loading />}
      </div>
      <img
        src={require("@app/assets/svgs/Header-botton.svg").default}
        className="m-auto bottom-header"
        alt=""
      />
    </div>
  );
};

export default RegisterPage;
