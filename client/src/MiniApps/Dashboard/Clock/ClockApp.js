import React from "react";
import Draggable from "react-draggable";

//styling
import { SIZES, COLORS } from "./styles";

class Clock extends React.Component {
  getHours = () => {
    const date = new Date();

    let hours = date.getHours();
    let isAM = hours < 12;

    // let hours = 0;
    let minutes = date.getMinutes();

    hours = hours % 12;
    return { hours: hours + minutes / 60, isAM: isAM };
  };
  state = {
    seconds: new Date().getSeconds(),
    minutes: new Date().getMinutes(),
    hours: this.getHours(),
    secondsIntervalId: null,
  };
  componentDidMount = () => {
    const secondsId = setInterval(() => {
      this.incrementTime(new Date().getSeconds());
    }, 1000);
    this.setState({
      secondsIntervalId: secondsId,
    });
  };
  componentWillUnmount = () => {
    clearInterval(this.state.secondsIntervalId);
  };

  incrementTime = (seconds) => {
    this.setState({
      seconds: seconds,
      minutes: seconds === 0 ? new Date().getMinutes() : this.state.minutes,
      hours: seconds === 0 ? this.getHours() : this.state.hours,
    });
  };

  renderHand = (
    angle,
    handColor,
    circleColor,
    handWidth,
    handHeight,
    circleWidth,
    pointy
  ) => {
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            top: this.props.top,
            left: this.props.left,
            backgroundColor: handColor,
            width: handWidth,
            height: handHeight + "px",
            marginBottom: handHeight + "px",
            transform: `rotate(${angle}deg)`,
            transformOrigin: "50% 100%",
            borderTopLeftRadius: pointy ? "100%" : "0%",
            borderTopRightRadius: pointy ? "100%" : "0%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            height: circleWidth,
            width: circleWidth,
            backgroundColor: circleColor,
            borderRadius: "50%",
          }}
        ></div>
      </React.Fragment>
    );
  };
  renderDigits = (radius) => {
    return (
      <React.Fragment>
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((digit, index) => {
          return (
            <span
              key={index}
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "700",
                position: "absolute",
                marginTop:
                  -1 * radius * Math.cos((2 * index * Math.PI) / 12) + "px",
                marginLeft:
                  radius * Math.sin((2 * index * Math.PI) / 12) + "px",
              }}
            >
              {digit}
            </span>
          );
        })}
      </React.Fragment>
    );
  };
  renderContent = () => {
    return (
      <div
        id="outerDiv"
        style={{
          height: SIZES.frameSize + "px",
          width: SIZES.frameSize + "px",
          backgroundColor: COLORS.frameColor1,
          borderRadius: "12px",
          display: "flex",
          alignItems: "top",
          justifyContent: "center",
          position: "absolute",
          zIndex: this.props.zIndex,
        }}
      >
        <div
          id="innerDiv"
          style={{
            height: 0.5 * SIZES.frameSize + "px",
            width: SIZES.frameSize + "px",
            backgroundColor: COLORS.frameColor2,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "22px", fontWeight: "700" }}>
            {this.state.hours.isAM ? "AM" : "PM"}
          </span>
        </div>
        <div
          id="mainDiv"
          style={{
            height: SIZES.clockFraction * SIZES.frameSize + "px",
            width: SIZES.clockFraction * SIZES.frameSize + "px",
            backgroundColor: COLORS.clockBkgd,
            borderRadius: "50%",
            zIndex: 10,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 0.5 * (1 - SIZES.clockFraction) * SIZES.frameSize + "px",
          }}
        >
          {this.renderDigits(0.8 * SIZES.clockFraction * SIZES.frameSize)}
          {this.renderHand(
            this.state.hours.hours * 5 * 6,
            COLORS.hoursHand,
            COLORS.hoursHand,
            "6px",
            0.3 * 0.8 * SIZES.clockFraction * SIZES.frameSize,
            "10px",
            true
          )}

          {this.renderHand(
            this.state.minutes * 6,
            COLORS.minutesHand,
            COLORS.clockBkgd,
            "4px",
            0.4 * 0.8 * SIZES.clockFraction * SIZES.frameSize,
            "8px",
            true
          )}

          {this.renderHand(
            this.state.seconds * 6,
            COLORS.secondsHand,
            COLORS.secondsHand,
            "2px",
            0.5 * 0.8 * SIZES.clockFraction * SIZES.frameSize,
            "6px",
            false
          )}
        </div>
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
export default Clock;
