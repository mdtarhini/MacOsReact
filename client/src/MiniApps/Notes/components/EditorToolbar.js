import React from "react";
import { Row, Col } from "antd";
import BlockTypeToggler from "./BlockTypeToggler";
import InlineStyleToggler from "./InlineStyleToggler";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
// import ViewSwitcher from "./ViewSwitcher";
import SearchInNotes from "./SearchInNotes";
import SaveCurrent from "./SaveCurrent";

const EditorToolbar = (props) => {
  return (
    <Row style={{ marginLeft: "60px", width: "100%" }} justify="space-between">
      <Col style={{ marginRight: "15px" }}></Col>
      {props.showSearchBarAndAddNote && (
        <Col>
          <Row>
            <Col>
              <DeleteNote />
            </Col>
            <Col>
              <AddNote />
            </Col>
          </Row>
        </Col>
      )}

      {props.showEditingTools && (
        <React.Fragment>
          {" "}
          <Col offset={2}>
            <SaveCurrent />
          </Col>
          <Col>
            <InlineStyleToggler />
          </Col>
          <Col>
            <BlockTypeToggler />
          </Col>
        </React.Fragment>
      )}

      {props.showSearchBarAndAddNote && (
        <Col xs={0} md={8} lg={4}>
          <SearchInNotes />
        </Col>
      )}
    </Row>
  );
};
export default EditorToolbar;
