import React from "react";
import { Row, Col } from "antd";
import Search from "./Search";
import ToolbarSources from "./ToolbarSources";
import { COLORS, SIZES } from "./styles";
const HeaderContent = () => {
  return (
    <React.Fragment>
      <Row
        justify="space-between"
        align="bottom"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          overflow: "hidden",
          backgroundColor: COLORS.HEADER,
          height: SIZES.HEADER_HEIGHT,
          padding: "5px 5px",
          borderBottom: "1px lightgray solid",
        }}
      >
        <Col>
          <ToolbarSources />
        </Col>
        <Col xs={8} sm={6} lg={4}>
          <Search />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default HeaderContent;
