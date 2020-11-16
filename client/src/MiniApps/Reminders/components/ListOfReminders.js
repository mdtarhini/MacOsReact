import React from "react";
import { Divider, Card, Button, Modal, Typography, Spin } from "antd";
import { connect } from "react-redux";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import OneReminder from "./OneReminder";
import AddOrEditReminder from "./AddOrEditReminder";
import moment from "moment";
import { dateFormat, colors } from "./myStyles";
import {
  addReminder,
  fetchReminders,
  editReminder,
  deleteReminder,
  toggleCompletedVisibility,
} from "../actions";
const { confirm } = Modal;
const { Title } = Typography;
const gridStyle = {
  width: "100%",
  padding: "12px",
};
class ListOfReminders extends React.Component {
  state = { showAddReminder: false, reminderToEdit: -1 };
  componentDidMount = () => {
    this.props.fetchReminders();
  };
  showDeleteConfirm = (reminderId) => {
    confirm({
      title: "Delete this reminder?",
      icon: <ExclamationCircleOutlined />,
      content: "This item will be deleted permanently!",
      okText: "Yes",
      okType: "danger",
      confirmLoading: this.props.deleting,
      cancelText: "No",
      onOk: () => {
        this.props.deleteReminder(reminderId);
      },
      onCancel() {},
    });
  };
  rows = () => {
    return Object.values(this.props.reminders)
      .filter((item) => {
        if (this.props.completedVisibility) return true;
        else return !item.completed;
      })
      .filter((item) => {
        if (this.props.filter.type === "list") {
          if (this.props.filter.value === item.parentList) {
            return true;
          }
          return false;
        } else if (this.props.filter.type === "Search") {
          return (
            item.title.includes(this.props.filter.value) ||
            item.description.includes(this.props.filter.value)
          );
        } else {
          switch (this.props.filter.value) {
            case "All":
              return true;
            case "Scheduled":
              return item.date !== null;
            case "Today":
              return (
                moment(item.date).format(dateFormat) ===
                moment().format(dateFormat)
              );
            default:
              return false;
          }
        }
      })
      .sort((item) => {
        if (item.completed) return 1;
        return -1;
      })
      .map((item) => {
        return (
          <Card.Grid style={gridStyle} key={item._id}>
            {this.state.reminderToEdit !== item._id && (
              <OneReminder
                id={item._id}
                title={item.title}
                checked={item.completed}
                description={item.description}
                date={item.date ? moment(item.date).format(dateFormat) : null}
                onDelete={() => {
                  this.showDeleteConfirm(item._id);
                }}
                onEdit={() => {
                  this.setState({ reminderToEdit: item._id });
                }}
              />
            )}
            {this.state.reminderToEdit === item._id && (
              <AddOrEditReminder
                title={item.title}
                description={item.description}
                date={item.date ? moment(item.date, dateFormat) : null}
                parentList={item.parentList}
                onCancel={() => {
                  this.setState({ reminderToEdit: -1 });
                }}
                onFinish={(values) => {
                  this.props
                    .editReminder({ ...values, completed: false }, item._id)
                    .then(() => {
                      this.setState({ reminderToEdit: -1 });
                    });
                }}
              />
            )}
          </Card.Grid>
        );
      });
  };
  renderAddReminderButton = () => {
    return (
      <Button
        onClick={() => {
          this.setState({ showAddReminder: true });
          this.props.onAddNote();
        }}
        size="small"
        style={{
          padding: "0px 5px",
          position: "fixed",
          zIndex: 300,
          top: "5px",
          right: "5px",
        }}
      >
        <PlusOutlined style={{ margin: "0px 6px 0px 6px" }} />
      </Button>
    );
  };
  renderAddReminderCard = () => {
    return (
      <Card style={{ marginTop: "20px" }}>
        <Card.Grid style={gridStyle}>
          <AddOrEditReminder
            title=""
            description=""
            date={null}
            parentList={null}
            onCancel={() => {
              this.setState({ showAddReminder: false });
            }}
            onFinish={(values) => {
              this.props
                .addReminder({ ...values, completed: false })
                .then(() => {
                  this.setState({ showAddReminder: false });
                });
            }}
          />
        </Card.Grid>
      </Card>
    );
  };
  renderReminders = () => {
    if (this.rows().length !== 0) {
      return <Card>{this.rows()}</Card>;
    }
    return null;
  };
  renderEmptyOrAllCompleted = () => {
    const divStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: "200px",
      textAlign: "center",
    };
    if (this.props.fetching) {
      return (
        <div style={divStyle}>
          <Spin />
        </div>
      );
    }
    if (this.rows().length === 0 && !this.state.showAddReminder) {
      return (
        <div style={divStyle}>
          <Title level={2} style={{ color: "lightgrey", fontWeight: "400" }}>
            No Reminders
          </Title>
        </div>
      );
    }
    return null;
  };
  render() {
    return (
      <div>
        <Divider
          style={{ fontSize: "small", color: colors.darkGray }}
          orientation="left"
        >
          <Button
            type="link"
            onClick={() => {
              this.props.toggleCompletedVisibility();
            }}
          >
            {`${this.props.completedVisibility ? "hide" : "show"} completed`}
          </Button>
        </Divider>
        {this.renderReminders()}
        {this.state.showAddReminder && this.renderAddReminderCard()}
        {this.renderAddReminderButton()}
        {this.renderEmptyOrAllCompleted()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fetching: state.requestingSomething.fetchingReminders,
    deleting: state.requestingSomething.deletingReminder,
    reminders: state.reminders.reminders,
    completedVisibility: state.reminders.completedVisibility,
    filter: state.reminders.filter,
  };
};
export default connect(mapStateToProps, {
  addReminder: addReminder,
  fetchReminders: fetchReminders,
  deleteReminder: deleteReminder,
  editReminder: editReminder,
  toggleCompletedVisibility: toggleCompletedVisibility,
})(ListOfReminders);
