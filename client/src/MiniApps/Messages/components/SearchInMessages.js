import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { setMessagesFilter } from "../actions";
import { SIZES, COLORS } from "./styles";
const SearchInMessages = (props) => {
  return (
    <div
      style={{
        padding: "10px",
        paddingTop: SIZES.HEADER_HEIGHT / 2,
        borderBottom: `1px solid ${COLORS.DIVIDER}`,
        width: "100%",
        height: SIZES.HEADER_HEIGHT,
      }}
    >
      <Input
        size="small"
        allowClear
        placeholder="seacrh"
        prefix={<SearchOutlined />}
        value={props.messagesFilter}
        onChange={(e) => {
          props.setMessagesFilter(e.target.value);
        }}
        style={{
          fontSize: "13px",
          fontWeight: 500,
          borderRadius: "5px",
        }}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    messagesFilter: state.messages.messagesFilter,
  };
};
export default connect(mapStateToProps, {
  setMessagesFilter: setMessagesFilter,
})(SearchInMessages);
