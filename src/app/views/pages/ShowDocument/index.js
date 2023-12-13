import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { Row, Col } from "reactstrap";
import './style.scss';
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Swal from 'sweetalert2';
import { post } from "@app/constants.js";
import { getImageData } from "@src/utils/aws";
    
const save = (imageURL, imageName, extension) => {
    getImageData(imageURL)
        .then(data => {
            let blob=new Blob([data.Body], {type: data.ContentType});
            let link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=imageName + "." + extension;
            link.click();
        })
        .catch(err => {
            console.log(err)
        })
}

const print = (imageURL) => {
    var divToPrint = document.getElementById("mainImg");
    if(divToPrint){
        var newWin = window.open('', 'Print-Window', 'width=750,height=650');
        newWin.document.open();
        newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
        newWin.print()
        newWin.document.close();
    }
  
}

const ShowDocument = (props) => {

    let history = useHistory();
    let location = useLocation();

    let imageURL = location.state.imageURL;
    let imageName = location.state.imageName.substring(0, location.state.imageName.lastIndexOf('.'));
    let extension = location.state.imageName.substring(location.state.imageName.lastIndexOf('.')+1, location.state.imageName.length);
    let documentId = location.state.documentId;

    const [isEditing, setEditing] = React.useState(false);
    const [docName, setDocName] = React.useState(imageName);

    if(!location.state) {
        history.push({ pathname: "/documents" })
        return (<></>);
    } 

    const deleteIamge = (documentId) => {        
        Swal.fire({
            title: 'Delete Document',
            text: "Are you sure you wish to delete this document?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
          }).then(async(result) => {
            if (result.isConfirmed) {
                let token = props.userdata.token;
                const header = {headers:{Authorization: `Bearer ${token}`}};
                let data = {
                    "id": documentId,
                };
                const response = await post('deleteDocument', data , header);
                const response_data = response.data;
                if (response_data.success === true)  {
                    history.push({ pathname: "/documents" });
                } else if(response_data.expired === true) {
                    props.logout();
                } else {
                    Swal.fire({
                        text: response_data.message,
                        icon: 'warning',
                        timer: 4000,
                    });
                }
            }
          })
    }

    const onEditing = async(isEditing) => {
        if (!isEditing) {
            let token = props.userdata.token;
            const header = {headers:{Authorization: `Bearer ${token}`}};
            let data = {
                "id": documentId,
                "name": docName + "." + extension,
            };
            await post('updateDocument', data , header);
        }        
        
        setEditing(isEditing);
    }

    const onChange = (e) => {
        const { value } = e.target;
        setDocName(value);
    }

    return (<>
        <MobileNavbar />
        <Row style={{height: '64px', marginTop: "60px"}} className="justify-content-md-center">
            <Col className="col-2 col-md-1 col-lg-1 header" >
                <i className="fa fa-chevron-left" style={{ color: 'black' }} onClick={() => { history.push({ pathname: "/documents" }) }} />
            </Col>
            <Col className="col-8 col-md-4 col-lg-2 header" >
                <span className={!isEditing ? "d-block" : "d-none"}>{docName}</span>    
                <input 
                    className={isEditing ? "form-control text-center d-block" : "form-control text-center d-none"} 
                    type="text" 
                    value={docName} 
                    readOnly={!isEditing}
                    onChange={ onChange } />
            </Col>
            <Col className="col-2 col-md-1 col-lg-1 header" >
                <i className={!isEditing ? "fa fa-pencil-alt d-block" : "d-none"} style={{ color: 'black', cursor: 'pointer' }} onClick={() => { onEditing(true) }} />
                <i className={isEditing ? "fa fa-save d-block" : "d-none"} style={{ color: 'black', cursor: 'pointer' }} onClick={() => { onEditing(false) }} />
            </Col>
        </Row>
        <Row className="" >
            <Col className="ml-auto mr-auto col-12 col-md-6 col-lg-4 image-margin" ></Col>
        </Row>
        <Row>
            <Col style={{height: '543px', padding: '0'}} className="ml-auto mr-auto col-12 col-md-6 col-lg-4" id="mainImg">
                <img id="img-document" style={{ width: '100%', height: '100%' }} src={imageURL} alt="" />
            </Col>
        </Row>
        <Row className="" >
            <Col className="ml-auto mr-auto col-12 col-md-6 col-lg-4 image-margin" ></Col>
        </Row>
        <Row style={{ display: 'flex', height: '91px' }} className="justify-content-md-center footer-icons">                    
            <Col className="icon col-4 col-md-2 col-lg-1">
                <i className="fa fa-print" style={{ color: 'black', cursor: 'pointer' }} onClick={() => { print(imageURL)}} />
                <span>Print</span>
            </Col>
            <Col className="icon col-4 col-md-2 col-lg-1">
                <i className="fa fa-download" style={{ color: 'black', cursor: 'pointer' }} onClick={() => { save(imageURL, docName, extension)}}/>
                <span>Save</span>
            </Col>
            <Col className="icon col-4 col-md-2 col-lg-1">
                <i className="fa fa-trash-alt" style={{ color: 'black', cursor: 'pointer' }} onClick={() => { deleteIamge(documentId)}}/>
                <span>Delete</span>
            </Col>
        </Row>
    </>)
}
const mapStateToProps = state => {
  return {
      userdata: state.auth.userdata
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
      dispatch({ type: "LOGOUT" });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowDocument);

