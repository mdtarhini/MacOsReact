import React from "react";
import { connect } from "react-redux";
import { addList } from "../actions";
import { Modal, Button, Input, Divider, Space } from "antd";
import { FileTextTwoTone } from "@ant-design/icons";

import ColorSelector from "./ColorSelector";
class AddList extends React.Component {
  state = {
    visible: false,
    newListColor: "#fc3d39",
    newListName: "",
    showError: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
      newListName: "",
    });
  };

  handleOk = () => {
    if (this.state.newListName) {
      this.props
        .addList({
          name: this.state.newListName,
          color: this.state.newListColor,
        })
        .then(
          this.setState({
            visible: false,
          })
        );
    } else {
      this.setState({ showError: true });
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button type="text" onClick={this.showModal} style={this.props.style}>
          <Space>
            <span className="fas fa-plus-circle mx-2"></span>
            <span>Add list</span>
          </Space>
        </Button>
        <Modal
          title="Add a new list"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Add"
        >
          <Input
            placeholder="list name"
            prefix={<FileTextTwoTone twoToneColor={this.state.newListColor} />}
            value={this.state.newListName}
            onChange={(e) => {
              this.setState({ newListName: e.target.value, showError: false });
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
              "#fc3d39",
              "#fd9426",
              "#fecb2f",
              "#2ac55e",
              "#157efb",
              "#bf7ad9",
              "#9c8565",
            ]}
            selectedColor={this.state.newListColor}
            onSelection={(color) => {
              this.setState({ newListColor: color });
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.reminders.lists,
  };
};
export default connect(mapStateToProps, { addList: addList })(AddList);
