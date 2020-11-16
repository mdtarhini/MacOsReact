import React from "react";
import { Row, Col, Button } from "antd";
const ColorSelector = ({ colorArray, selectedColor, onSelection }) => {
  const optionList = colorArray.map((option) => {
    return (
      <Col key={option}>
        <div>
          <Button
            onClick={() => onSelection(option)}
            shape="circle"
            style={{
              backgroundColor: option,
              color: "white",
            }}
          >
            <i className={selectedColor === option ? "fas fa-check" : ""}></i>
          </Button>
        </div>
      </Col>
    );
  });
  return <Row gutter={4}>{optionList}</Row>;
};
export default ColorSelector;
