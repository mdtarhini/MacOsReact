import React from "react";
import { connect } from "react-redux";
import { MarketStack } from "../apis/MarketStack";
import { COLORS } from "./styles";
import { setStock } from "../actions/";
class OneStockInList extends React.Component {
  componentDidMount = () => {
    MarketStack.get("query", {
      params: { function: "GLOBAL_QUOTE", symbol: this.props.stock.symbol },
    });
  };
  render() {
    return (
      <div
        style={{
          borderTop: `1px solid ${COLORS.LIGHTERGRAY}`,
          backgroundColor:
            this.props.stock.symbol === this.props.currentStock
              ? "whitesmoke"
              : "inherit",
        }}
        onClick={() => {
          this.props.setStock(this.props.stock.symbol);
        }}
      >
        <p style={{ margin: "3px 20px", fontWeight: "600", fontSize: "1rem" }}>
          {this.props.stock.symbol}
        </p>
        <p style={{ margin: "0px 20px", color: COLORS.LIGHTGRAY }}>
          {this.props.stock.name}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentStock: state.stockApp.stock };
};
export default connect(mapStateToProps, { setStock: setStock })(OneStockInList);
