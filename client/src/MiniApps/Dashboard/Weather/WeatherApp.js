import React from "react";
import { connect } from "react-redux";
import { OpenWeather } from "./api";
import Draggable from "react-draggable";

import { Row, Col, Space, Tooltip } from "antd";
import { SIZES, COLORS } from "./styles";
const numberOfDays = 6;
const getDayFromTimeStamp = (timestamp) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(timestamp * 1000);
  return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
};
class Weather extends React.Component {
  state = { data: null, positionAllowed: true };
  componentDidMount = () => {
    OpenWeather.get("onecall", {
      params: {
        lat: this.props.geoLocation.lat,
        lon: this.props.geoLocation.lon,
        exclude: "hourly,minutely",
        units: "metric",
      },
    }).then((res) => {
      this.setState({ data: res.data });
    });
  };

  renderHeader = () => {
    return (
      <Row
        justify="space-between"
        style={{
          backgroundColor: COLORS.header,
          padding: "0px 10px",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
        }}
        align="middle"
      >
        <Col>
          <Space direction="vertical">
            <span>H: {this.state.data.daily[0].temp.max.toFixed(0)}&#176;</span>
            <span>L: {this.state.data.daily[0].temp.min.toFixed(0)}&#176;</span>
          </Space>
        </Col>
        <Col style={{ marginTop: "-15%" }}>
          <img
            src={`https://download.spinetix.com/content/widgets/icons/weather/${this.state.data.current.weather[0].icon}.png`}
            alt="weather icon"
            width={SIZES.frameWidth / 3 + "px"}
            draggable={false}
          />
        </Col>
        <Col>
          <span style={{ fontSize: "50px", fontWeight: "lighter" }}>
            {this.state.data.current.temp.toFixed(0)}&#176;
          </span>
        </Col>
      </Row>
    );
  };
  renderDays = () => {
    return (
      <Row
        justify="start"
        gutter={[0, 12]}
        style={{ backgroundColor: COLORS.middle }}
      >
        {this.state.data.daily.slice(0, numberOfDays).map((day) => {
          return (
            <Col key={day.dt} span={4} style={{ textAlign: "center" }}>
              {getDayFromTimeStamp(day.dt)}
            </Col>
          );
        })}
      </Row>
    );
  };
  renderForecast = () => {
    return (
      <Row
        justify="start"
        gutter={[0, 12]}
        style={{
          backgroundColor: COLORS.header,
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
        }}
      >
        {this.state.data.daily.slice(0, numberOfDays).map((day) => {
          return (
            <Col key={day.dt} span={4} style={{ textAlign: "center" }}>
              <Space direction="vertical">
                <img
                  src={`https://download.spinetix.com/content/widgets/icons/weather/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  width={SIZES.frameWidth / numberOfDays / 1.5 + "px"}
                  draggable={false}
                />
                <Tooltip
                  placement="bottom"
                  color={COLORS.middle}
                  title={`L: ${day.temp.min.toFixed(
                    0
                  )}, H: ${day.temp.max.toFixed(0)}`}
                >
                  <span>
                    {day.temp.day.toFixed(0)}
                    &#176;
                  </span>
                </Tooltip>
              </Space>
            </Col>
          );
        })}
      </Row>
    );
  };
  renderContent = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: this.props.top,
          left: this.props.left,
          zIndex: this.props.zIndex,
          width: this.props.smallScreen ? "90vw" : SIZES.frameWidth + "px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderForecast()}
      </div>
    );
  };
  render() {
    if (this.state.data) {
      if (this.props.draggable) {
        return (
          <Draggable
            onMouseDown={() => this.props.onMouseDown(this.props.appName)}
          >
            {this.renderContent()}
          </Draggable>
        );
      } else {
        return this.renderContent();
      }
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return { smallScreen: state.smallScreen };
};
export default connect(mapStateToProps)(Weather);
