import React from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Modal, Space } from "antd";
import {
  FileTextTwoTone,
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import {
  fetchLists,
  selectList,
  deleteList,
  showModal,
  setFilter,
} from "../actions";
import DropDownMenu from "./DropDownMenu";
import AddOrEditList from "./AddOrEditList";
import { colors, sizes } from "./myStyles";
const { confirm } = Modal;

class ListOfLists extends React.Component {
  componentDidMount = () => {
    this.props.fetchLists();
  };
  showDeleteConfirm = (listId, listName) => {
    confirm({
      title: `Are you sure you want to delete "${listName}" ?`,
      icon: <ExclamationCircleOutlined />,
      content: "This will delete all reminders in this list.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        if (listId === this.props.filter.value)
          this.props.setFilter({ type: "custom", value: "All" });
        this.props.deleteList(listId).then(() => {});
      },
      onCancel() {},
    });
  };
  renderList = () => {
    if (this.props.lists)
      return Object.values(this.props.lists).map((item, index) => {
        return (
          <li
            className="listNavItem"
            key={index}
            style={{
              color: "black",
              backgroundColor:
                item._id === this.props.filter.value ? "whitesmoke" : "inherit",
              padding: "10px 0px 10px 20px",
            }}
            onClick={() => {
              this.props.setFilter({
                type: "list",
                value: item._id,
              });
              this.props.onListClicked();
            }}
          >
            <Row>
              <Col
                span="3"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Space size={0}>
                  <DropDownMenu
                    optionArray={[
                      {
                        text: "Edit",
                        icon: <EditFilled />,
                        func: () => {
                          this.props.showModal({
                            name: item.name,
                            color: item.color,
                            title: "Edit list",
                            okText: "Update",
                            id: item._id,
                          });
                        },
                      },
                      {
                        text: "---",
                      },
                      {
                        text: "Delete",
                        icon: <DeleteFilled />,
                        func: () => {
                          this.showDeleteConfirm(item._id, item.name);
                        },
                      },
                    ]}
                  />

                  <FileTextTwoTone
                    twoToneColor={item.color}
                    style={{ marginLeft: "0px" }}
                  />
                </Space>
              </Col>

              <Col span="19">
                <span style={{ fontSize: "small" }}>{`${item.name.slice(
                  0,
                  20
                )}${item.name.length > 20 ? "..." : ""}`}</span>
              </Col>
              <Col span="2">
                <span
                  style={{
                    fontSize: "12px",
                    color: colors.darkerGray,
                  }}
                >
                  {Object.values(this.props.reminders).length > 0
                    ? Object.values(this.props.reminders).reduce(
                        (total, reminderItem) => {
                          if (reminderItem.parentList === item._id)
                            return total + 1;
                          return total;
                        },
                        0
                      )
                    : 0}
                </span>
              </Col>
            </Row>
          </li>
        );
      });
    else return null;
  };
  render() {
    return (
      <React.Fragment>
        <AddOrEditList />
        <span
          style={{
            color: colors.darkerGray,
            marginLeft: `${sizes.mainPadding}px`,
          }}
        >
          My Lists
        </span>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {this.renderList()}
        </ul>
        <Button
          type="link"
          style={{ color: colors.darkerGray }}
          onClick={() =>
            this.props.showModal({
              name: "",
              color: colors.blue,
              title: "Add a new list",
              okText: "Add",
              id: null,
            })
          }
        >
          <Space>
            <PlusCircleFilled />
            <span>Add list</span>
          </Space>
        </Button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lists: state.reminders.lists,
    selectedList: state.reminders.selectedList,
    reminders: state.reminders.reminders,
    filter: state.reminders.filter,
  };
};
export default connect(mapStateToProps, {
  fetchLists: fetchLists,
  selectList: selectList,
  deleteList: deleteList,
  showModal: showModal,
  setFilter: setFilter,
})(ListOfLists);
