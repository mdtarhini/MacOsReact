import React from "react";
import { connect } from "react-redux";
import { addList, editList, closeModal, modalUpdating } from "../actions";
import { Modal, Input, Divider } from "antd";
import { FileTextTwoTone } from "@ant-design/icons";

import ColorSelector from "./ColorSelector";
import { colors } from "./myStyles";
class AddOrEditList extends React.Component {
  state = {
    showError: false,
  };

  handleOk = () => {
    if (this.props.listModalParams.name) {
      if (this.props.listModalParams.id) {
        this.props
          .editList(
            {
              name: this.props.listModalParams.name,
              color: this.props.listModalParams.color,
            },
            this.props.listModalParams.id
          )
          .then(() => {
            this.props.closeModal();
          });
      } else {
        this.props
          .addList({
            name: this.props.listModalParams.name,
            color: this.props.listModalParams.color,
          })
          .then(() => {
            this.props.closeModal();
          });
      }
    } else {
      this.setState({ showError: true });
    }
  };

  handleCancel = (e) => {
    this.props.closeModal();
  };

  render() {
    // console.log(this.props.addingReminderList);
    return (
      <Modal
        confirmLoading={this.props.adding}
        title={this.props.listModalParams.title}
        visible={this.props.listModalVisibility}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText={this.props.listModalParams.okText}
      >
        <Input
          placeholder="list name"
          prefix={
            <FileTextTwoTone twoToneColor={this.props.listModalParams.color} />
          }
          value={this.props.listModalParams.name}
          onChange={(e) => {
            this.props.modalUpdating({
              ...this.props.listModalParams,
              name: e.target.value,
            });
            this.setState({ showError: false });
          }}
        />
        {this.state.showError && (
          <span style={{ color: "red", fontSize: "smaller" }}>
            New list name should not be empty
          </span>
        )}
        <Divider />

        <ColorSelector
          colorArray={[
            colors.red,
            colors.blue,
            colors.orange,
            colors.yellow,
            colors.green,
            colors.purple,
            colors.brown,
            colors.darkerGray,
          ]}
          selectedColor={this.props.listModalParams.color}
          onSelection={(color) => {
            this.props.modalUpdating({
              ...this.props.listModalParams,
              color: color,
            });
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adding: state.requestingSomething.addingReminderList,
    listModalParams: state.reminders.listModalParams,
    listModalVisibility: state.reminders.listModalVisibility,
  };
};
export default connect(mapStateToProps, {
  addList: addList,
  editList: editList,
  closeModal: closeModal,
  modalUpdating: modalUpdating,
})(AddOrEditList);
