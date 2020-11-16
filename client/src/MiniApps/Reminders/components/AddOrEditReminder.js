import React from "react";
import { connect } from "react-redux";
import {
  Space,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Tooltip,
  Select,
  Form,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  FileTextTwoTone,
} from "@ant-design/icons";
import { fetchLists } from "../actions";
import { colors, dateFormat } from "./myStyles";
const { Option } = Select;

const AddOrEditReminder = (props) => {
  return (
    <Form
      onFinish={(values) => {
        props.onFinish(values);
      }}
      initialValues={{
        title: props.title,
        description: props.description,
        date: props.date,
        parentList: props.parentList,
      }}
    >
      <Row>
        <Col span={22}>
          <Space direction="vertical">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please add a title",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Title"
                bordered={false}
                style={{ width: "60vw" }}
                autoFocus
              />
            </Form.Item>
            <Form.Item name="description" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Description"
                bordered={false}
                style={{ width: "60vw", fontSize: "small" }}
              />
            </Form.Item>
            <Space>
              <Form.Item name="date" style={{ marginBottom: 0 }}>
                <DatePicker format={dateFormat} bordered={false} />
              </Form.Item>
              <Form.Item name="parentList" style={{ marginBottom: 0 }}>
                <Select
                  bordered={false}
                  style={{ width: 200 }}
                  placeholder="Select a list"
                >
                  {Object.values(props.lists).map((list) => {
                    return (
                      <Option value={list._id} key={list._id}>
                        <Space>
                          <FileTextTwoTone twoToneColor={list.color} />
                          {list.name}
                        </Space>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Space>
          </Space>
        </Col>
        <Col span={2} style={{ textAlign: "right" }}>
          <Space direction="vertical">
            <Tooltip placement="left" title="save" color={colors.blue}>
              <Button
                // size="small"
                type="txt"
                shape="circle"
                htmlType="submit"
                loading={props.adding}
              >
                {!props.adding && (
                  <CheckOutlined style={{ fontSize: "smaller" }} />
                )}
              </Button>
            </Tooltip>

            <Tooltip placement="left" title="cancel" color={colors.red}>
              <Button
                // size="small"
                type="txt"
                shape="circle"
                onClick={props.onCancel}
              >
                <CloseOutlined style={{ fontSize: "smaller" }} />
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};
const mapStateToPros = (state) => {
  return {
    lists: state.reminders.lists,
    adding:
      state.requestingSomething.addingReminder ||
      state.requestingSomething.editingReminder,
  };
};
export default connect(mapStateToPros, { fetchLists: fetchLists })(
  AddOrEditReminder
);
