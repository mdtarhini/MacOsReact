import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { connect } from "react-redux";
import StockInfo from "./StockInfo";
import { Row, Col, Space, Skeleton, Tooltip } from "antd";
import { COLORS } from "./styles";
import { PeriodToEndPoint, listOfStock } from "../apis/MarketStack";
import { setPeriod } from "../actions";

import { Typography } from "antd";
const { Title } = Typography;
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const MARGINS = { top: 5, right: 50, bottom: 50, left: 50 };

class LineAreaChart extends React.Component {
  state = { headerText: "", color: this.props.color, showPeriodControl: true };

  xAxes = (chartProps) => {
    const data = this.props.data;

    // TODO: Replace switch with a dictionary:
    const tickFormat = {
      all: {
        format: {
          year: "numeric",
        },
        skip: 4,
      },
      fiveYears: {
        format: {
          year: "numeric",
        },
        skip: 2,
      },
      year: {
        format: {
          month: "short",
        },
        skip: 2,
      },
      month: {
        format: {
          day: "numeric",
        },
        skip: 4,
      },
      week: {
        format: {
          day: "numeric",
        },
        skip: 1,
      },
      day: {
        format: {
          hour: "numeric",
        },
        skip: 3,
      },
    };

    let ticks = data
      .filter((item, index) => {
        if (index === 0) return true;

        switch (this.props.period) {
          case "all":
          case "fiveYears":
            return (
              item.date.getFullYear() !== data[index - 1].date.getFullYear()
            );
          case "year":
            return item.date.getMonth() !== data[index - 1].date.getMonth();
          case "month":
          case "week":
            return item.date.getDay() !== data[index - 1].date.getDay();
          case "day":
            return item.date.getHours() !== data[index - 1].date.getHours();
          default:
            return true;
        }
      })
      .map((item) => {
        return {
          x: chartProps.xScale(item.x),
          label: item.date.toLocaleString(
            "default",
            tickFormat[this.props.period].format
          ),
        };
      });

    return (
      <g>
        {/* grid */}
        <g>
          {ticks
            .filter((tick, index) => {
              if (this.props.period !== "day")
                return index % tickFormat[this.props.period].skip === 0;
              else return Number(tick.label) % 3 === 0;
            })
            .map((tick, index) => {
              return (
                <line
                  key={index}
                  x1={tick.x}
                  y1="0"
                  x2={tick.x}
                  y2={chartProps.height - MARGINS.top - MARGINS.bottom}
                  style={{ stroke: "rgba(190,190,190)" }}
                />
              );
            })}
        </g>
        {/* x-axis and ticks */}
        <g
          transform={`translate(0,${
            chartProps.height - MARGINS.top - MARGINS.bottom
          })`}
        >
          <line
            x1="0"
            y1="0"
            x2={chartProps.innerWidth}
            y2="0"
            style={{ stroke: "rgba(190,190,190)" }}
          />
          {ticks
            .filter((tick, index) => {
              if (this.props.period !== "day")
                return index % tickFormat[this.props.period].skip === 0;
              else return Number(tick.label) % 3 === 0;
            })
            .map((tick, index) => {
              return (
                <text
                  x={tick.x}
                  y="20"
                  style={{ fontSize: "11px", fontWeight: "600" }}
                  key={index}
                >
                  {tick.label}
                </text>
              );
            })}
        </g>
      </g>
    );
  };
  render() {
    let yMin = this.props.data.reduce(
      (min, item) => (item.y < min ? item.y : min),
      this.props.data[0].y
    );
    let yMax = this.props.data.reduce(
      (max, item) => (item.y > max ? item.y : max),
      this.props.data[0].y
    );
    yMax = 1.005 * yMax;

    return (
      <div
        style={{
          height: "280px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div style={{ height: "40px" }}>
          <Row
            justify="space-between"
            align="bottom"
            style={{
              borderBottom: "1px solid rgba(190,190,190)",
              width: `calc(100% - ${MARGINS.right + MARGINS.left}px)`,
              marginLeft: `${MARGINS.left}px`,
            }}
          >
            <Col>
              <Space align="baseline">
                <span
                  style={{
                    padding: "0px",
                    margin: "0px",
                    fontWeight: "800",
                    fontSize: "30px",
                  }}
                >
                  {this.props.stock}
                </span>
                <Tooltip title={listOfStock[this.props.stock].name}>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "11px",
                      color: COLORS.LIGHTGRAY,
                    }}
                  >
                    {/* {ellipseAText(listOfStock[this.props.stock].name, 30)} */}
                    {listOfStock[this.props.stock].name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </span>
                </Tooltip>
              </Space>
            </Col>
            {this.props.globalData["Global Quote"] && (
              <Col>
                <Space>
                  <span>
                    {Number(
                      this.props.globalData["Global Quote"]["05. price"]
                    ).toFixed(1)}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color:
                        this.props.globalData["Global Quote"][
                          "10. change percent"
                        ].indexOf("-") === -1
                          ? COLORS.GREEN
                          : COLORS.RED,
                    }}
                  >
                    {Number(
                      this.props.globalData["Global Quote"][
                        "10. change percent"
                      ].split("%")[0]
                    ).toFixed(2) + "%"}
                  </span>
                </Space>
              </Col>
            )}
          </Row>

          <span style={{ fontSize: "smaller", fontWeight: "650" }}>
            {this.state.headerText}
          </span>
          {this.state.showPeriodControl && (
            <Row
              justify="space-around"
              align="middle"
              style={{ height: "100%" }}
            >
              {Object.keys(PeriodToEndPoint).map((key) => {
                return (
                  <Col
                    key={key}
                    className="periodSelect"
                    onClick={() => this.props.setPeriod(key)}
                    style={{
                      fontWeight: "700",
                      fontSize: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor:
                        this.props.period === key
                          ? "rgba(190,190,190)"
                          : "inherit",
                      color: this.props.period === key ? "white" : "black",
                    }}
                  >
                    {PeriodToEndPoint[key].renderedName}
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
        <div style={{ height: "250px", marginTop: "60px" }}>
          <ResponsiveLine
            curve="linear"
            lineWidth={1}
            data={[{ id: "line", data: this.props.data }]}
            margin={MARGINS}
            xScale={{
              type: "linear",
            }}
            enableGridX={false}
            enableArea={true}
            areaBaselineValue={yMin}
            animate={false}
            motionDamping={30}
            yScale={{
              type: "linear",
              min: yMin,
              max: yMax,
            }}
            axisTop={null}
            axisLeft={null}
            axisBottom={{
              tickValues: 0,
            }}
            axisRight={{
              tickSize: 0,
              format: "d",
              tickValues: [0.25, 0.5, 0.75].map(
                (fraction) => yMin + fraction * (yMax - yMin)
              ),
            }}
            gridYValues={[0.25, 0.5, 0.75, 1].map(
              (fraction) => yMin + fraction * (yMax - yMin)
            )}
            colors={[this.state.color]}
            enableCrosshair={true}
            crosshairType={"x"}
            useMesh={true}
            tooltip={(point) => {
              return (
                <div
                  style={{
                    position: "absolute",
                    left: "-10px",
                    top: `-${point.point.y + 20}px`,
                  }}
                >
                  <svg height={50 + point.point.y} width="200">
                    <circle
                      cx="10"
                      cy={point.point.y + 35}
                      r="6"
                      fill={COLORS.BLUE}
                      stroke="white"
                    />

                    <text
                      x="20"
                      y="30"
                      style={{ fontSize: "10px", fill: this.state.color }}
                    >
                      {point.point.data.y}
                    </text>
                  </svg>
                </div>
              );
            }}
            onMouseEnter={() => {
              this.setState({ color: COLORS.BLUE, showPeriodControl: false });
            }}
            onMouseMove={(point) => {
              this.setState({
                headerText: point.data.date.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                  hour: ["day", "week", "month"].includes(this.props.period)
                    ? "numeric"
                    : undefined,
                  minute: ["day", "week", "month"].includes(this.props.period)
                    ? "numeric"
                    : undefined,
                  second: ["day", "week", "month"].includes(this.props.period)
                    ? "numeric"
                    : undefined,
                }),
              });
            }}
            onMouseLeave={() => {
              this.setState({
                headerText: "",
                color: this.props.color,
                showPeriodControl: true,
              });
            }}
            layers={[
              "grid",
              this.xAxes,
              "axes",
              "areas",
              "crosshair",
              "lines",
              "mesh",
              "legends",
            ]}
          />
        </div>
        <StockInfo />
        <div
          style={{
            margin: "60px 40px",
            textAlign: "left",
          }}
        >
          <Title level={5} style={{ color: COLORS.LIGHTGRAY }}>
            Stock news will be added soon..
          </Title>
          <Skeleton avatar paragraph={{ rows: 1 }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.stockApp.data.arrayOfData,
    period: state.stockApp.period,
    stock: state.stockApp.stock,
    globalData: state.stockApp.globalData,
  };
};
export default connect(mapStateToProps, { setPeriod: setPeriod })(
  LineAreaChart
);
