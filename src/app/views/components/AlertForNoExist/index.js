import React, { Component } from "react";

import "./style.scss";

class AlertForNoExist extends Component {
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
                src={require("@app/assets/img/logo.svg").default}
                alt="logo"
                className="logo"
              />
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={this.OnClose}
              />
            </div>
            <div className="alert-body">
              <p className="title">Welcome to BarkrZ!</p>

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

export default AlertForNoExist;
