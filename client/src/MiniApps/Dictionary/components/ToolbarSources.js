import React from "react";
import { connect } from "react-redux";
import { setSource } from "../actions";
import { Button } from "antd";
import languages from "../languages";

const ToolbarSources = (props) => {
  const sourceButtons = languages.map((item, index) => {
    return (
      <Button
        key={index}
        size="small"
        type="text"
        style={{
          color: props.source.code === item.code ? "white" : "grey",
          backgroundColor: props.source.code === item.code ? "grey" : "inherit",
          marginRight: "2px",
          fontSize: "12px",
          padding: "2px",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          props.setSource(item);
        }}
      >
        {item.label}
      </Button>
    );
  });
  return <>{sourceButtons}</>;
};

const mapStateToProps = (state) => {
  return { source: state.dict.source };
};
export default connect(mapStateToProps, { setSource: setSource })(
  ToolbarSources
);
