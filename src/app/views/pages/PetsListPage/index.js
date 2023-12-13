import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import { Container, Row, Col } from "reactstrap";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import ProgressiveImage from "react-progressive-image-loading";
import "./style.scss";

const galleryImages = [require("@app/assets/img/tolee.png").default];

class PetsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      breed: "",
      screenWidth: document.body.clientWidth,
      isScrolling: false,
      clickX: 0,
    };
  }

  componentDidUpdate = (nextProps, nextState) => {
    if (this.state.isScrolling !== nextState.isScrolling) {
      this.toggleScrolling(nextState.isScrolling);
    }
  };

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    } else {
      window.removeEventListener("mousemove", this.onMouseMove);
    }
  };

  OnCardClick = (index) => {
    this.props.history.push(`/edit-profile?id=${index}`);
  };

  onMouseMove = (event) => {
    const { isScrolling } = this.state;
    if (!isScrolling) return;
    const { clientX, scrollLeft, scrollTop, clientY } = this.state;
    this._scroller.scrollLeft = scrollLeft + clientX - event.clientX;
    this._scroller.scrollTop = scrollTop + clientY - event.clientY;
  };

  onMouseUp = () => {
    this.setState({
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0,
      clientX: 0,
      clientY: 0,
    });
  };

  onMouseDown = (event) => {
    const { scrollLeft, scrollTop } = this._scroller;
    this.setState({
      isScrolling: true,
      scrollLeft,
      scrollTop,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  OnResizeEvent = () => {
    this.setState({ screenWidth: document.body.clientWidth });
  };

  componentDidMount() {
    window.onresize = this.OnResizeEvent;
  }

  attachScroller = (scroller) => {
    this._scroller = ReactDOM.findDOMNode(scroller);
  };

  render() {
    const { Pets } = this.props.petsInformation;
    const { screenWidth } = this.state;
    let petsList = [];

    let len = Pets.length !== 0;
    Pets.forEach((value, index) => {
      petsList.push(
        <div className="pets_list_image" key={index}>
          <div
            className="pet-image-btn"
            onClick={() => this.OnCardClick(index)}
          >
            <div className="avatar-photo">
              <ProgressiveImage
                preview={require("@app/assets/img/blurred-image-1.jpg").default}
                src={value.pet.image}
                render={(src, style) => (
                  <img src={src} draggable={false} style={style} alt="pet" />
                )}
              />
            </div>

            <div className="pet-image-btn-overlay" draggable={false}>
              <i className="fa fa-search-plus" />
            </div>
          </div>
          <span style={{ marginTop: 10 }}>{value.pet.name}</span>
        </div>
      );
    });
    if (screenWidth < 768) {
      petsList.push(
        <Row key={Math.PI * Math.random()}>
          <Col className="ml-auto mr-auto text-center" md="6" sm="12" lg="4">
            <button
              className="aprof_button mt-5"
              onClick={() => {
                this.props.history.push("/petflow");
              }}
            >
              <img
                src={require("@app/assets/img/plus-btn.png").default}
                style={{ borderRadius: "50%" }}
                alt=""
                width="80px"
                height="80px"
              />
            </button>
          </Col>
        </Row>
      );
    }

    return (
      <>
        <MobileNavbar icon="fa fa-chevron-left" />
        <Container style={{ marginTop: "100px" }}>
          {len && screenWidth < 768 && (
            <Row>
              <Col className="ml-auto mr-auto" md="6" sm="12" lg="4">
                <div className="outer">
                  <div className="inner">
                    <div className="element">{petsList}</div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {len && screenWidth >= 768 && (
            <>
              <div className="w-outer">
                <div
                  className="w-inner scroller"
                  ref={this.attachScroller}
                  onMouseDown={this.onMouseDown}
                  onMouseMove={this.onMouseMove}
                  onMouseUp={this.onMouseUp}
                >
                  {petsList}
                </div>
              </div>
              <Row>
                <Col
                  className="ml-auto mr-auto text-center"
                  md="6"
                  sm="12"
                  lg="4"
                >
                  <button
                    className="aprof_button mt-5"
                    onClick={() => {
                      this.props.history.push("/petflow");
                    }}
                  >
                    <img
                      src={require("@app/assets/img/plus-btn.png").default}
                      style={{ borderRadius: "50%" }}
                      width="80px"
                      height="80px"
                      alt=""
                    />
                  </button>
                </Col>
              </Row>
            </>
          )}
          {!len && (
            <>
              <Row className="mb-3" style={{ marginTop: "150px" }}>
                <Col
                  className="ml-auto mr-auto text-center"
                  lg="4"
                  md="6"
                  xs="12"
                >
                  <h1 className="aprof_span">Create a Pet Profile</h1>
                </Col>
              </Row>
              <Row>
                <Col
                  lg="4"
                  md="6"
                  xs="12"
                  className="mb-3 ml-auto mr-auto text-center"
                >
                  <div className="text-center mb-3">
                    <img
                      style={{
                        height: "200px",
                        width: "200px",
                        padding: "10px",
                        borderRadius: "50%",
                        zIndex: "3",
                      }}
                      src={galleryImages[0]}
                      onClick={() => {
                        this.props.history.push("/petflow");
                      }}
                      alt="Default Pet Profile"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  className="ml-auto mr-auto text-center"
                  md="6"
                  sm="12"
                  lg="4"
                >
                  <button
                    className="aprof_button mt-5"
                    onClick={() => {
                      this.props.history.push("/petflow");
                    }}
                  >
                    <img
                      src={require("@app/assets/img/plus-btn.png").default}
                      style={{ borderRadius: "50%" }}
                      width="80px"
                      height="80px"
                      alt="plus"
                    />
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    petsInformation: state.petsInformation,
    userdata: state.auth.userdata,
  };
};

export default connect(mapStateToProps)(PetsListPage);
