import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Row, Col } from 'reactstrap';
import CustomInput from "@app/views/components/CustomInput/CustomInput.js";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import { useInput } from '@src/utils/hooks/form';
import { ResetPassword, Auth_End } from '@app/actions/auth';
import './style.scss';

const ForgetPasswordLinkPage = (props) => {

    const { value: email, bind: bindEmail } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');
    const { value: password_confirm, bind: bindPasswordConfirm } = useInput('');

    const inProgress = useSelector(state => state.auth.inProgress);
    const errors = useSelector(state => state.auth.error);
    const dispatch = useDispatch();
    let history = useHistory();
    const queryParams = new URLSearchParams(window.location.search);

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          dispatch(ResetPassword({email: email, password: password, password_confirm: password_confirm, token: queryParams.get('token')}));
        } catch (error) {

        }
    };

    const afterSubmit = (success) => {
        dispatch(Auth_End());
        if (success) history.push("/auth");        
    };

    return (
        <div className="section--forget-password-link">
            <Container>
                <Row className="vh-100">
                    <Col md={6} sm={12} lg={4} className="m-auto text-center">
                        <img src={require("@app/assets/img/logo.svg").default} className="m-auto" width="160px" height="160px" alt="" />
                        <h2 className="mt-3">Reset Password</h2>
                        <Form>
                            <CustomInput 
                                label="Email" 
                                name="email" 
                                type="email" 
                                icon="fa fa-envelope" 
                                {...bindEmail} 
                                style={{ borderColor: "white" }} />
                            <CustomInput 
                                label="Password" 
                                name="password" 
                                type="password" 
                                icon="fa fa-key" 
                                {...bindPassword} 
                                style={{ borderColor: "white" }} />
                            <CustomInput 
                                label="Password Confirm" 
                                name="password_confirm" 
                                type="password" 
                                icon="fa fa-key" 
                                {...bindPasswordConfirm} 
                                style={{ borderColor: "white" }} />
                            
                            <Button 
                                className="btn-round custom-button mt-4"
                                onClick={handleSubmit}>
                                    Reset Password
                            </Button>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
            {
                inProgress &&
                <Loading />
            }
            {
                (!inProgress && errors != null) && (
                    <Alert
                        message={errors.success ? "Reset password successfully!" : errors.error}
                        OnClose={() => afterSubmit(errors.success)}
                        success={errors.success}
                    />
                )
            }
        </div>        
    )
}

export default ForgetPasswordLinkPage;