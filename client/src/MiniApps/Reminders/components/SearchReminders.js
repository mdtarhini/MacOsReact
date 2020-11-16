import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { setFilter } from "../actions";
import { colors } from "./myStyles";
class SearchReminders extends React.Component {
  state = { filterBeforeSearch: { type: "custom", value: "All" } };
  render() {
    return (
      <Input
        size="small"
        prefix={<SearchOutlined />}
        placeholder="search"
        bordered={false}
        onChange={(e) => {
          if (e.target.value) {
            this.props.setFilter({ type: "Search", value: e.target.value });
          } else {
            this.props.setFilter(this.state.filterBeforeSearch);
          }
        }}
        onFocus={() => {
          if (this.props.filter.type !== "Search") {
            this.setState({ filterBeforeSearch: this.props.filter });
          }
        }}
        style={{
          backgroundColor: colors.darkGray,
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.reminders.filter,
  };
};
export default connect(mapStateToProps, { setFilter: setFilter })(
  SearchReminders
);
