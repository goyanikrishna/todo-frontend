import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Input, message, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { registerUser } from "../../redux/actions/authActions/register";
import { getErrorMessage } from "../../utils/appUtils";
import setAuthToken from "../../utils/setAuthToken";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Register = (props) => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const onError = (err) => {
    const errorMsg = getErrorMessage(err);
    if (errorMsg) {
      message.error(errorMsg);
    }
  };
  const handleOnSuccessRegister = async (response) => {
    if (response?.data?.token) {
      await localStorage.setItem("jwtToken", response.data.token);
      setAuthToken(response.data.token);
      message.success(response?.data?.message || "Success");
      navigate("/app/dashboard", { replace: true });
    }
  };
  const onFinish = (values) => {
    props.registerUser(
      values,
      (response) => handleOnSuccessRegister(response),
      (err) => onError(err)
    );
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      width: "380px",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
            <path
              d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
              fill="white"
            />
            <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
            <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
          </svg>

          <Title style={styles.title}>Sign up</Title>
          <Text style={styles.text}>
            Join us! Create an account to get started.
          </Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your Name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your Phone Number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="password"
            extra="Password needs to be at least 8 characters."
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={props.registerUserDataLoading}
            >
              Sign up
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Already have an account?</Text>{" "}
              <Link href="">Sign in</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  registerUserData: state.registerUserData.data,
  registerUserDataLoading: state.registerUserData.loading,
});

export default connect(mapStateToProps, {
  registerUser,
})(Register);
