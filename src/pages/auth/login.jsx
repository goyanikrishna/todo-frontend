import "./login.less";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import { login } from "../../redux/actions/authActions/login";
import { getErrorMessage } from "../../utils/appUtils";

const Login = (props) => {
  const navigate = useNavigate();

  const onError = (err) => {
    const errorMsg = getErrorMessage(err);
    if (errorMsg) {
      message.error(errorMsg);
    }
  };

  const onSuccess = (msg) => {
    navigate("/");
    message.success(msg || "Success");
  };

  const onFinish = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    props.login(
      data,
      () => onSuccess(),
      (err) => onError(err)
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className="Login_Wrapper">
      <Col className="Image_Container">
        <div className="Image_Content"></div>
      </Col>
      <Col className="Form_Container">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData.data,
  loginDataLoading: state.loginData.loading,
});

export default connect(mapStateToProps, {
  login,
})(Login);
