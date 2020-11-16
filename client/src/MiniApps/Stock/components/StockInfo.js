import React from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { COLORS } from "./styles";

const largeNumberFormatter = (value) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(1) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(1) + "K"
    : Math.abs(Number(value)).toFixed(1);
};
const StockInfo = (props) => {
  const data = props.globalData;
  return (
    <div style={{ margin: "0px 40px", fontWeight: "500", fontSize: "11px" }}>
      {props.globalData["Global Quote"] && (
        <Row justify="center" gutter={48}>
          {[
            [
              {
                name: "Open",
                value: Number(data["Global Quote"]["02. open"]).toFixed(1),
              },
              {
                name: "High",
                value: Number(data["Global Quote"]["03. high"]).toFixed(1),
              },
              {
                name: "Low",
                value: Number(data["Global Quote"]["04. low"]).toFixed(1),
              },
            ],
            [
              {
                name: "Vol",
                value: largeNumberFormatter(
                  Number(data["Global Quote"]["06. volume"])
                ),
              },
              {
                name: "Price",
                value: Number(data["Global Quote"]["05. price"]).toFixed(1),
              },
              {
                name: "Change",
                value: Number(data["Global Quote"]["09. change"]).toFixed(1),
              },
            ],
          ].map((group, index) => {
            return (
              <Col xs={12} md={12} lg={4} key={index}>
                {group.map((line, subindex) => {
                  return (
                    <Row gutter={30} key={index + subindex}>
                      <Col
                        xs={12}
                        style={{ textAlign: "left", color: COLORS.LIGHTGRAY }}
                      >
                        {line.name}
                      </Col>
                      <Col
                        xs={12}
                        style={{ textAlign: "right", fontWeight: "bold" }}
                      >
                        {line.value}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { globalData: state.stockApp.globalData };
};
export default connect(mapStateToProps)(StockInfo);

// 01. symbol: "IBM",
// 02. open: "121.4100",
// 03. high: "122.1858",
// 04. low: "120.2100",
// 05. price: "120.9400",
// 06. volume: "2130564",
// 07. latest trading day: "2020-09-29",
// 08. previous close: "121.7300",
// 09. change: "-0.7900",
// 10. change percent: "-0.6490%"
