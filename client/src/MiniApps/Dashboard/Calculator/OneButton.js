import React from "react";

//other components
import { COLORS } from "./constants/";

class OneButton extends React.Component {
  state = { bkgd: "inherit" };
  handleClick = () => {
    this.setState({ bkgd: COLORS.lightGrey });
    setTimeout(() => this.setState({ bkgd: "inherit" }), 100);
  };
  render() {
    return (
      <div
        type="primary"
        className="btnCol"
        onClick={this.handleClick}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: this.state.bkgd,
          display: "flex",
          alignItems: "center",
          color: "whitesmoke",
          fontWeight: "250",
          justifyContent: "center",
        }}
      >
        {this.props.label}
      </div>
    );
  }
}
export default OneButton;
