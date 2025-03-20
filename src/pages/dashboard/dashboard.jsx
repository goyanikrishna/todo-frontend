// React + Ant
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Layout, Form, Input, Button, Table, Modal, Card, message } from "antd";
import { getErrorMessage } from "../../utils/appUtils";
// Components
import Sidebar from "../sidebar/sidebar";
import HeadTailGame from "../headtail/HeadTail";
// Redux
import { getUser } from "../../redux/actions/userActions/getUser";
import { updateUser } from "../../redux/actions/userActions/updateUser";
import { deleteUser } from "../../redux/actions/userActions/deleteUser";
import { addTodo } from "../../redux/actions/todoActions/addTodo";
import { listTodo } from "../../redux/actions/todoActions/listTodo";
import { updateTodo } from "../../redux/actions/todoActions/updateTodo";
import { deleteTodo } from "../../redux/actions/todoActions/deleteTodo";

const { Content } = Layout;

const Dashboard = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("todos");
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const onError = (err) => {
    const errorMsg = getErrorMessage(err);
    if (errorMsg) {
      message.error(errorMsg);
    }
  };

  const onSuccess = (msg) => {
    message.success(msg || "Success");
  };

  const showModal = (record) => {
    form.resetFields();
    setSelectedItemId(record?._id || null);

    switch (activeSection) {
      case "todos":
        setIsTodoModalVisible(true);
        break;
      default:
        break;
    }

    if (record) {
      form.setFieldsValue({
        ...record,
        doctor: record?.doctor?._id,
        patient: record?.patient?._id,
        dob: moment(record?.dob).format("YYYY-MM-DD"),
        time: moment(record?.time).format("YYYY-MM-DD"),
      });
    }
  };

  const handleCancel = () => {
    switch (activeSection) {
      case "todos":
        setIsTodoModalVisible(false);
        break;
      default:
        break;
    }
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const newItem = form.getFieldsValue();

      switch (activeSection) {
        case "todos":
          if (selectedItemId) {
            await props.updateTodo(
              { todoId: selectedItemId, ...newItem },
              onSuccess,
              onError
            );
          } else {
            await props.addTodo(newItem, onSuccess, onError);
          }
          await props.listTodo({}, onError);
          setIsTodoModalVisible(false);
          break;
        case "detail":
          await props.updateUser({ ...newItem }, onSuccess, onError);
          props.getUser(onError);
        default:
          break;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showDeleteConfirmation = (id) => {
    let modalName =
      activeSection.charAt(0).toUpperCase() + activeSection.slice(1, -1);
    Modal.confirm({
      title: `Delete ${modalName}`,
      content: "Are you sure you want to delete this?",
      onOk: () => handleDelete(id),
      // onCancel: handleCancelDelete,
    });
  };

  const handleDelete = (id) => {
    switch (activeSection) {
      case "todos":
        props.deleteTodo(id, onSuccess, onError);
        break;
      default:
        break;
    }
  };

  const TodoColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <a onClick={() => showModal(record)}>Edit</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a onClick={() => showDeleteConfirmation(record._id)}>Delete</a>
        </span>
      ),
    },
  ];

  const handleSidebarSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDeleteUser = () => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this?",
      onOk: () => {
        props.deleteUser(() => {
          onSuccess();
          navigate("/login");
        }, onError);
      },
    });
  };

  useEffect(() => {
    props.listTodo({}, onError);
  }, [props.addTodoData, props.updateTodoData, props.deleteTodoData]);

  useEffect(() => {
    if (activeSection === "detail") {
      props.getUser(onError);
    }
  }, [activeSection]);

  useEffect(() => {
    form.setFieldsValue({
      name: props.getUserData?.name,
      email: props.getUserData?.email,
      phone: props.getUserData?.phone,
    });
  }, [props.getUserData, form]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar onSectionChange={handleSidebarSectionChange} />
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360, margin: "16px 0" }}>
            {activeSection === "todos" && (
              <Button
                type="primary"
                onClick={() => showModal()}
                style={{ marginBottom: 16 }}
              >
                Add{" "}
                {activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1, -1)}
              </Button>
            )}
            {activeSection === "todos" && (
              <>
                <Table
                  loading={props?.listTodoLoading}
                  dataSource={props?.listTodoData?.todos || []}
                  columns={TodoColumns}
                  rowKey={(record) => record._id}
                />
                <Modal
                  title={`${!selectedItemId ? "Add" : "Edit"} ${
                    activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1, -1)
                  }`}
                  visible={isTodoModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  confirmLoading={
                    props.addTodoLoading || props.updateTodoLoading
                  }
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ required: true, message: "Title required" }]}
                    >
                      <Input placeholder="Enter title" />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true, message: "Name required" }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        { required: true, message: "Description required" },
                      ]}
                    >
                      <Input placeholder="Enter description" />
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
            {activeSection === "detail" && (
              <>
                <Card
                  loading={props?.getUserLoading}
                  title="User Details"
                  extra={
                    <>
                      <Button
                        type="primary"
                        onClick={handleOk}
                        loading={props.updateUserLoading}
                        disabled={props.getUserLoading}
                        style={{ marginRight: 10 }}
                      >
                        Update User
                      </Button>
                      <Button
                        type="default"
                        onClick={handleDeleteUser}
                        loading={props.deleteUserLoading}
                        disabled={props.getUserLoading}
                      >
                        Delete User
                      </Button>
                    </>
                  }
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true, message: "Name required" }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, message: "Email required" }]}
                    >
                      <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true, message: "Phone required" }]}
                    >
                      <Input placeholder="Enter phone" />
                    </Form.Item>
                  </Form>
                </Card>
              </>
            )}
            {activeSection === "headtail" && (
              <>
                <HeadTailGame />
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  // User
  getUserData: state.getUserData.data,
  getUserLoading: state.getUserData.loading,
  updateUserData: state.updateUserData.data,
  updateUserLoading: state.updateUserData.loading,
  deleteUserData: state.deleteUserData.data,
  deleteUserLoading: state.deleteUserData.loading,

  // Todo
  addTodoData: state.addTodoData.data,
  addTodoLoading: state.addTodoData.loading,
  listTodoData: state.listTodoData.data,
  listTodoLoading: state.listTodoData.loading,
  updateTodoData: state.updateTodoData.data,
  updateTodoLoading: state.updateTodoData.loading,
  deleteTodoData: state.deleteTodoData.data,
  deleteTodoLoading: state.deleteTodoData.loading,
});

export default connect(mapStateToProps, {
  getUser,
  updateUser,
  deleteUser,
  addTodo,
  listTodo,
  updateTodo,
  deleteTodo,
})(Dashboard);
