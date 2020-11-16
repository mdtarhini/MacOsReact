import React from "react";
import { evaluate } from "mathjs";

//style-related stuff
import { SIZES } from "./constants";
import "./CalculatorApp.css";

//other components
import Draggable from "react-draggable";
import Buttons from "./Buttons";
import Screen from "./Screen";

class Calculator extends React.Component {
  state = { oldEquation: "", equation: "0", replace: true };

  addToEquation = (value) => {
    if (this.state.replace) {
      this.setState({ equation: value, replace: false });
    } else {
      this.setState({ equation: this.state.equation + value });
    }
  };
  getType = (value) => {
    if (["*", "-", "+", "/", "%"].includes(value)) return "OPERATOR";
    else return "digit";
  };
  // componentDidMount = () => {
  //   document.addEventListener("keydown", this.handleKeyDown);
  // };

  // componentWillUnmount = () => {
  //   document.removeEventListener("keydown", this.handleKeyDown);
  // };
  // handleKeyDown = (e) => {
  //   if (/^[0-9]|\)|\(|\+|-|\/|\*$/i.test(e.key)) {
  //     this.handleAButtonClick(e.key);
  //   } else if (e.key === "Enter") {
  //     this.handleAButtonClick("=");
  //   } else if (e.key === "Backspace") {
  //     this.handleAButtonClick("ac");
  //   }
  // };
  handleAButtonClick = (value) => {
    // Pre-processing:
    let equation = this.state.equation;
    let equationLength = equation.length;
    if (this.getType(value) === "OPERATOR") {
      this.setState({ replace: false });
      if (
        this.getType(equation[equationLength - 1]) === "OPERATOR" &&
        value !== "-"
      ) {
        this.setState({
          equation: equation.replace(/[%/*+-]+$/, value),
        });
      } else {
        this.setState({
          equation: equation + value,
        });
      }
      return;
    }
    switch (value) {
      case "=":
        let equationBackup = equation;
        // preprocessing:
        if (equation.split("(").length !== equation.split(")").length) return;
        try {
          this.setState({ equation: `${evaluate(equation)}` });
          this.setState({ oldEquation: equationBackup, replace: true });
        } catch (err) {
          this.setState({ oldEquation: "", replace: true, equation: "Error" });
        }
        break;
      case "ac":
        if (this.state.replace || equation.length === 1) {
          this.setState({ oldEquation: "", equation: "0", replace: true });
        } else {
          this.setState({ equation: equation.slice(0, -1) });
        }
        break;
      case ".":
        if (equation.indexOf(".") === -1) {
          this.addToEquation(value);
        }
        break;
      case ")":
        if (equation.split("(").length <= equation.split(")").length) return;
        else break;
      default:
        this.addToEquation(value);
    }
  };
  renderContent = () => {
    return (
      <div
        style={{
          height: 5 * SIZES.buttonHeight + SIZES.screenHeight + "px",
          width: `${4 * SIZES.buttonWidth}px`,
          position: "absolute",
          top: this.props.top,
          left: this.props.left,
          zIndex: this.props.zIndex,
        }}
      >
        <Screen
          equation={this.state.equation}
          oldEquation={this.state.oldEquation}
        />
        <Buttons
          onAButtonClick={this.handleAButtonClick}
          replace={this.state.replace}
        />
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
export default Calculator;
