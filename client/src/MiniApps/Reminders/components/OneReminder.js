import React from "react";
import { connect } from "react-redux";
import { editReminder } from "../actions";
import { Space, Row, Col, Checkbox, Spin } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import DropDownMenu from "./DropDownMenu";
import { colors } from "./myStyles";

const spinningBin = (
  <DeleteFilled style={{ fontSize: 15, color: colors.red }} spin />
);
const OneReminder = (props) => {
  return (
    <Row>
      <Col span={22}>
        <Space align="start">
          {props.deleting && <Spin indicator={spinningBin} />}
          {!props.deleting && (
            <Checkbox
              checked={props.checked}
              onChange={(e) =>
                props.editReminder({ completed: e.target.checked }, props.id)
              }
            ></Checkbox>
          )}
          <Space direction="vertical" size={3}>
            <span>{props.title}</span>
            <span style={{ fontSize: "smaller", color: colors.darkerGray }}>
              {props.description}
            </span>
            <span style={{ fontSize: "smaller" }}>{props.date}</span>
          </Space>
        </Space>
      </Col>
      <Col span={2} style={{ textAlign: "right" }}>
        <DropDownMenu
          optionArray={[
            {
              text: "Edit",
              icon: <EditFilled />,
              func: props.onEdit,
            },
            {
              text: "Delete",
              icon: <DeleteFilled />,
              func: props.onDelete,
            },
          ]}
        />
      </Col>
    </Row>
  );
};
const mapStateToPros = (state) => {
  return {
    deleting: state.requestingSomething.deletingReminder,
  };
};
export default connect(mapStateToPros, { editReminder: editReminder })(
  OneReminder
);
