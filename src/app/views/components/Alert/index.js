import React, { Component } from "react";

import "./style.scss";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  OnClose = () => {
    this.props.OnClose();
  };

  render() {
    const { message, success } = this.props;

    return (
      <>
        <div className="alert-container">
          <div className="alert-card">
            <div className="alert-header">
              <img
                src={
                  require("@app/assets/svgs/new/logo-name-white.svg").default
                }
                alt="logo"
                style={{ margin: 20 }}
              />
              <i
                className="fa fa-times"
                aria-hidden="true"
                style={{ color: "white" }}
                onClick={this.OnClose}
              />
            </div>
            <div className="alert-body">
              {!success ? (
                <img
                  src={require("@app/assets/img/fail.png").default}
                  alt="fail mark"
                  className="mark rounded-circle"
                />
              ) : (
                <img
                  src={require("@app/assets/img/pass.png").default}
                  alt="fail success"
                  className="mark rounded-circle"
                />
              )}

              <p>{message}</p>
              {success ? (
                <button className="btn btn-primary" onClick={this.OnClose}>
                  OK
                </button>
              ) : (
                <button className="btn btn-danger" onClick={this.OnClose}>
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Alert;
