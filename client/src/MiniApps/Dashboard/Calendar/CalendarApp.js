import React from "react";
import Draggable from "react-draggable";

//other components
import { SIZES, COLORS } from "./styles";
import { Row, Col } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
class Calendar extends React.Component {
  state = {
    year: 2020,
    month: 1,
    day: 2,
  };
  componentDidMount = () => {
    let date = new Date();
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay(),
    });
  };
  getFirstAndLastDaysInMonth = () => {
    let first = new Date(this.state.year, this.state.month, 1);
    let last = new Date(this.state.year, this.state.month + 1, 0);

    return {
      firstDate: first.getDate(),
      firstDay: first.getDay(),
      lastDate: last.getDate(),
      lastDay: last.getDay(),
    };
  };
  isThisToday = (date) => {
    let today = new Date();
    return (
      date === today.getDate() &&
      this.state.month === today.getMonth() &&
      this.state.year === today.getFullYear()
    );
  };
  arrowClicked = (direction) => {
    let newMonth =
      direction === "left" ? this.state.month - 1 : this.state.month + 1;
    newMonth = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
    let newYear =
      newMonth === 11 && direction === "left"
        ? this.state.year - 1
        : newMonth === 0 && direction === "right"
        ? this.state.year + 1
        : this.state.year;

    this.setState({
      month: newMonth,
      year: newYear,
    });
  };
  renderGrid = () => {
    const firstAndLastDays = this.getFirstAndLastDaysInMonth();
    let arrayOfDays = [];

    //fill (so far spaces) the dates from previous month
    for (let iBlank = 0; iBlank < firstAndLastDays.firstDay; iBlank++) {
      arrayOfDays.push({ date: "", day: -1 });
    }

    let iDay;
    for (let iDate = 1; iDate <= firstAndLastDays.lastDate; iDate++) {
      iDay = iDate === 1 ? firstAndLastDays.firstDay : iDay + 1;
      iDay = iDay === 7 ? 0 : iDay;
      arrayOfDays.push({ date: iDate, day: iDay });
    }
    //fill (so far spaces) the dates from next month
    for (let iBlank = 0; iBlank < 6 - firstAndLastDays.lastDay; iBlank++) {
      arrayOfDays.push({ date: "", day: -1 });
    }

    return (
      <Row gutter={[6, 6]} style={{ marginTop: "5px" }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((weekday, index) => {
          return (
            <Col key={index} span={3} offset={index === 0 ? 2 : 0}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "19px",
                  fontWeight: "700",
                  color: "rgb(190,190,190)",
                }}
              >
                {weekday}
              </span>
            </Col>
          );
        })}
        {arrayOfDays.map((day, index) => {
          return (
            <Col span={3} offset={index % 7 === 0 ? 2 : 0} key={index + 7}>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "19px",
                  fontWeight: "700",
                  color: this.isThisToday(day.date) ? COLORS.green : "white",
                }}
              >
                {day.date}
              </span>
            </Col>
          );
        })}
      </Row>
    );
  };
  renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "10%",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <CaretLeftFilled
          style={{ fontSize: "large" }}
          onClick={() => this.arrowClicked("left")}
        />
        <span
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "700",
            color: COLORS.green,
          }}
        >{`${monthNames[this.state.month]} ${this.state.year}`}</span>
        <CaretRightFilled
          style={{ fontSize: "large" }}
          onClick={() => this.arrowClicked("right")}
        />
      </div>
    );
  };
  renderContent = () => {
    return (
      <div
        id="outerDiv"
        style={{
          width: SIZES.frameWidth + "px",
          color: "white",
          padding: "10px",
          backgroundColor: COLORS.frameColor,
          borderRadius: "6px",
          position: "absolute",
          top: this.props.top,
          left: this.props.left,
          zIndex: this.props.zIndex,
        }}
      >
        {this.renderHeader()}
        {this.renderGrid()}
      </div>
    );
  };
  render() {
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
  }
}
export default Calendar;
