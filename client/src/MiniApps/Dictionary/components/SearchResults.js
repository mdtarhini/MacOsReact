import React from "react";
import { connect } from "react-redux";
import { Divider } from "antd";
import OneResult from "./OneResult";
import Empty from "./Empty";
class SearchResults extends React.Component {
  renderResults = () => {
    if (this.props.result) {
      if (this.props.result.found) {
        return this.props.result.result.map((item, index) => {
          return (
            <div key={index}>
              <OneResult data={item} />
              {index !== this.props.result.result.length - 1 && <Divider />}
            </div>
          );
        });
      } else {
        return <Empty notFound />;
      }
    } else {
      return null;
    }
  };
  render() {
    if (!this.props.input) {
      return <Empty language={this.props.source.label} />;
    }
    return <div style={{ height: "100vh" }}>{this.renderResults()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    result: state.dict.result,
    input: state.dict.input,
    source: state.dict.source,
  };
};
export default connect(mapStateToProps)(SearchResults);
