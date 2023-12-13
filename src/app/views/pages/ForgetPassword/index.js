import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col } from 'reactstrap';
import { useInput } from '@src/utils/hooks/form';
import CustomInput from "@app/views/components/CustomInput/CustomInput.js";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import { ForgetPassword, Auth_End } from '@app/actions/auth';
import './style.scss';

const ForgetPasswordPage = (props) => {

    const { value: email, bind: bindEmail } = useInput('');
    const inProgress = useSelector(state => state.auth.inProgress);
    const errors = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ForgetPassword({email: email}));
    };

    const afterSubmit = () => {
        dispatch(Auth_End());
    };

    return (
        <div className="section--forget-password">
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
                            <Button 
                                className="btn-round custom-button mt-4"
                                onClick={handleSubmit}>
                                Send Password Reset Link
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
                        message={errors.success ? "Sent reset password link successfully!" : errors.error}
                        OnClose={afterSubmit}
                        success={errors.success}
                    />
                )
            }
        </div>        
    )
}

export default ForgetPasswordPage;