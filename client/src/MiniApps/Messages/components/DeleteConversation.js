import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteConversation, selectConverstaion } from "../actions";
const { confirm } = Modal;

const DeleteConversation = (props) => {
  const getNumnerOfMessages = (contact) => {
    return props.messages.filter(
      (msg) => msg.to === contact || msg.from === contact
    ).length;
  };
  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure you want to delete this conversation ?`,
      icon: <ExclamationCircleOutlined />,
      content: `This will delete all the ${getNumnerOfMessages(
        props.selectedConv
      )} messages in this conversation.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        props.deleteConversation(props.selectedConv);
        props.selectConverstaion(null);
      },
    });
  };
  return (
    <Button
      size="small"
      disabled={getNumnerOfMessages(props.selectedConv) === 0}
      style={{
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "5px",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        showDeleteConfirm();
      }}
    >
      <DeleteOutlined />
    </Button>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedConv: state.messages.selectedConv,
    messages: state.messages.messages,
  };
};
export default connect(mapStateToProps, {
  deleteConversation: deleteConversation,
  selectConverstaion: selectConverstaion,
})(DeleteConversation);
