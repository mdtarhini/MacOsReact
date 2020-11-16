import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getTranslation, setInput } from "../actions";
class Search extends React.Component {
  state = { input: "" };
  handleChange = (e) => {
    this.props.setInput(e.target.value);
    if (e.target.value !== "") this._getTranslation();
  };

  _getTranslation = _.debounce(() => {
    this.props.getTranslation(this.props.input, this.props.source);
  }, 200);

  render() {
    return (
      <Input
        placeholder="search"
        size="small"
        autoFocus
        onPressEnter={() => {
          this.props.getTranslation(this.props.input, this.props.source);
        }}
        prefix={<SearchOutlined />}
        allowClear
        value={this.props.input}
        onChange={this.handleChange}
        style={{
          fontSize: "13px",
          borderRadius: "5px",
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return { input: state.dict.input, source: state.dict.source };
};
export default connect(mapStateToProps, {
  getTranslation: getTranslation,
  setInput: setInput,
})(Search);
