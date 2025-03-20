import "./sidebar.less";
import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faRightFromBracket,
  faUserCircle,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
const { Sider } = Layout;

const Sidebar = ({ onSectionChange }) => {
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);

  const showModal = () => {
    setIsSignOutModalVisible(true);
  };

  const handleOk = () => {
    localStorage.clear();
    setIsSignOutModalVisible(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsSignOutModalVisible(false);
  };

  return (
    <Sider collapsed={true}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["todos"]}
        mode="inline"
        className="custom-menu"
        onClick={(e) => {
          onSectionChange(e.key);
        }}
      >
        <Menu.Item
          key="todos"
          icon={<FontAwesomeIcon icon={faCalendarCheck} />}
          className="menu-item"
        >
          Todos
        </Menu.Item>
        <Menu.Item
          key="detail"
          icon={<FontAwesomeIcon icon={faUserCircle} />}
          className="menu-item"
        >
          Detail
        </Menu.Item>
        <Menu.Item
          key="headtail"
          icon={<FontAwesomeIcon icon={faCoins} />}
          className="menu-item"
        >
          Head Tail
        </Menu.Item>
        <Menu.Item
          key="signout"
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          onClick={showModal}
          className="sign-out-item"
        >
          Sign Out
        </Menu.Item>
      </Menu>
      <Modal
        title="Sign Out"
        visible={isSignOutModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to sign out?</p>
      </Modal>
    </Sider>
  );
};

export default Sidebar;
