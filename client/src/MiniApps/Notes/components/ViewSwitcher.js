import React from "react";
import { connect } from "react-redux";
import { switchView } from "../actions";
import { Button } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { COLORS } from "../constants";
const ViewSwitcher = (props) => {
  return (
    <>
      <Button
        size="small"
        className="osxButton"
        style={{
          fontSize: "13px",
          fontWeight: 400,
          borderRight: "none",
          borderRadius: "5px 0px 0px 5px",
          color: props.view === "standard" ? "white" : "inherit",
          backgroundColor: props.view === "standard" ? COLORS.DARKGREY : "",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          props.switchView("standard");
        }}
      >
        <MenuOutlined />
      </Button>
      <Button
        size="small"
        className="osxButton"
        style={{
          fontSize: "13px",
          fontWeight: 400,
          borderLeft: "none",
          borderRadius: "0px 5px 5px 0px",
          color: props.view === "grid" ? "white" : "inherit",
          backgroundColor: props.view === "grid" ? COLORS.DARKGREY : "",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          props.switchView("grid");
        }}
      >
        <AppstoreOutlined />
      </Button>
    </>
  );
};
const mapStateToProps = (state) => {
  return { view: state.notes.view };
};
export default connect(mapStateToProps, { switchView })(ViewSwitcher);

/*

notesInGrid = () => {
    if (this.props.notes) {
      return Object.values(this.props.notes).map((item) => {
        return (
          <Col key={item._id}>
            <Space direction="vertical" align="center" size={1}>
              <Card
                onClick={() => this.props.selectANote(item._id)}
                hoverable
                style={{
                  width: 180,
                  height: 150,
                  borderRadius: "5px",
                  backgroundColor: "rgb(240,240,240)",
                }}
              >
                {item.text}
              </Card>

              <span style={{ fontSize: "small" }}>
                {ellipseAText(item.title, 30)}
              </span>
              <span style={{ fontSize: "smaller" }}>{item.date}</span>
            </Space>
          </Col>
        );
      });
    } else {
      return <div>Loading notes</div>;
    }
  };

*/
