import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { API_URL } from "@app/constants.js";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Loading from "@app/views/components/Loading";
import ProgressiveImage from "react-progressive-image-loading";
import "./style.scss";

const pdfImage = require("@app/assets/img/pdf.svg").default;
class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: null,
      documents: [],
      showDocument: false,
      imageClicked: "",
      inProgress: false,
    };
  }

  componentDidMount() {
    this.onFetchDocuments();
  }

  onFetchDocuments = () => {
    let token = this.props.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    this.setState({ inProgress: true });
    axios
      .post(`${API_URL}fetchDocuments`, {}, header)
      .then((res) => {
        this.setState({ inProgress: false });
        if (!res.data.expired) {
          let orderedDocs = [];
          for (let document in res.data.documents) {
            let newArray = orderedDocs;
            orderedDocs = newArray.concat(res.data.documents[document]);
          }
          orderedDocs.sort((a, b) => {
            let dateA = new Date(a.created_at);
            let dateB = new Date(b.created_at);
            if (dateA > dateB) {
              return -1;
            } else {
              return 1;
            }
          });

          this.setState({ documents: orderedDocs });
        } else {
          this.props.logout();
        }
      })
      .catch((err) => {
        this.setState({ inProgress: false });
      });
  };

  OnHandleChange = (e) => {
    let val = e.target.value;
    if (val) {
      let arr = val.split("-");
      let year = arr[0],
        month = arr[1],
        day = arr[2];
      let date = month + "/" + day + "/" + year;
      this.setState({ searchDate: date });
    } else {
      this.setState({ searchDate: null });
    }
  };

  OnFileSelected = (file) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("data", JSON.stringify({ name: file.name }));
    let token = this.props.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    this.setState({ inProgress: true });
    axios
      .post(`${API_URL}documents`, formData, header)
      .then((res) => {
        if (!res.data.expired) {
          this.onFetchDocuments();
          this.setState({ inProgress: false, validationError: false });
        } else {
          this.props.logout();
          this.setState({ inProgress: false });
          this.setState({
            validationError: true,
            validationErrorMsg: "Please try again later.",
          });
        }
      })
      .catch((err) => {
        this.setState({ inProgress: false });
        this.setState({
          validationError: true,
          validationErrorMsg: err.message,
        });
      });
  };

  render() {
    const { documents } = this.state;
    const { inProgress } = this.state;
    let documentsDom = [];
    const { searchDate } = this.state;
    const docLen = documents.length;
    let currentDate = "";
    let nextRegisterDate = "";
    let domByDate = [];

    for (let i = 0; i < documents.length; i += 1) {
      // let formatedDate = moment(new Date(documents[i].created_at), "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY");
      var dateArr = documents[i].created_at.split("T")[0].split("-");
      let formatedDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];

      if (searchDate !== formatedDate && searchDate !== null) {
        continue;
      }

      let name = documents[i].name;
      let extension = name.split(".")[1];
      let url = documents[i].url;
      if (extension === "PDF" || extension === "pdf") {
        url = pdfImage;
      }
      domByDate.push(
        <div
          key={documents[i].id}
          style={{
            width: "45%",
            height: "180px",
            display: "flex",
            flexDirection: "column",
          }}
          className="document-card"
          onClick={() => {
            this.props.history.push({
              pathname: "/show-document",
              state: {
                imageURL: url,
                imageName: documents[i].name,
                documentId: documents[i].id,
              },
            });
          }}
        >
          <ProgressiveImage
            preview={require("@app/assets/img/blurred-image-1.jpg").default}
            style={{ width: "100%", height: "100%", borderRadius: "2px" }}
            src={url}
            render={(src, style) => (
              <img
                className="img-doc"
                src={src}
                draggable={false}
                style={style}
                alt=""
              />
            )}
          />
        </div>
      );

      currentDate = documents[i].created_at.slice(0, 10);
      nextRegisterDate =
        i + 1 !== documents.length
          ? documents[i + 1].created_at.slice(0, 10)
          : "";

      if (nextRegisterDate !== currentDate) {
        documentsDom.push(
          <div key={documents[i].id}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  height: "1px",
                  width: "10%",
                  background: "#99999966",
                  marginTop: "15px",
                }}
              ></div>
              <div
                style={{ fontSize: "20px", fontFamily: "auto", color: "black" }}
              >
                {" "}
                {formatedDate}
              </div>
              <div
                style={{
                  height: "1px",
                  width: "70%",
                  background: "#99999966",
                  marginTop: "15px",
                }}
              ></div>
            </div>
            <Row
              style={{
                justifyContent: "space-between",
                fontSize: "20px",
                textAlign: "center",
                display: "flex",
                marginBottom: "20px",
                fontFamily: "auto",
                color: "black",
              }}
            >
              {domByDate}
            </Row>
          </div>
        );
        domByDate = [];
      }
    }

    return (
      <>
        <MobileNavbar />
        <Container style={{ marginTop: "100px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: "bold",
              marginTop: "auto",
              marginBottom: "28px",
              marginLeft: "14px",
            }}
          >
            Pet Documents
          </div>
          <Row>
            <Col
              lg="4"
              md="6"
              sm="12"
              xs="12"
              className="ml-auto mr-auto"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{
                  fontSize: "18px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                Search Date:
              </div>
              <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                <input
                  type="date"
                  name="searchDate"
                  onChange={this.OnHandleChange}
                  className="form-control"
                  style={{ width: "140px" }}
                />
              </div>
              <div className="file-upload-btn">
                <FileUpload handlefilechange={this.OnFileSelected} />
                <img
                  src={require("@app/assets/img/plus-btn.png").default}
                  alt=""
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              lg="4"
              md="6"
              sm="12"
              xs="12"
              className="ml-auto mr-auto"
              style={{ marginTop: "30px" }}
            >
              {docLen === 0 ? (
                <div style={{ fontSize: "20px", textAlign: "center" }}>
                  You have not uploaded any pet documents yet
                </div>
              ) : (
                documentsDom
              )}
            </Col>
          </Row>
        </Container>
        {inProgress && <Loading />}
      </>
    );
  }
}

class FileUpload extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the file upload input DOM element
    this.fileUploadRef = React.createRef();
  }
  handleFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = function (img) {
      this.fileUploadRef.current.value = "";
      this.props.handlefilechange(file);
    }.bind(this);
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <input
        ref={this.fileUploadRef}
        type="file"
        accept=".pdf,.jpg,.png,.jpeg,.JPEG,.HEIC,.GIF"
        onChange={this.handleFile}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.auth.userdata,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch({ type: "LOGOUT" });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
