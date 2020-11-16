import React from "react";
import { connect } from "react-redux";
import { listOfStock } from "../apis/MarketStack";
import { COLORS } from "./styles";
import { setStock } from "../actions/";

const StockList = (props) => {
  return Object.values(listOfStock).map((stockItem, index) => {
    return (
      <div
        key={index}
        style={{
          borderTop: `1px solid ${COLORS.LIGHTERGRAY}`,
          borderBottom:
            index === Object.values(listOfStock).length - 1
              ? `1px solid ${COLORS.LIGHTERGRAY}`
              : "none",
          backgroundColor:
            stockItem.symbol === props.stock ? "whitesmoke" : "inherit",
        }}
        onClick={() => {
          props.setStock(stockItem.symbol);
          props.onStockClicked();
        }}
      >
        <p
          style={{ margin: "2px 20px", fontWeight: "600", fontSize: "0.82rem" }}
        >
          {stockItem.symbol}
        </p>
        <p
          style={{
            margin: "0px 20px",
            paddingBottom: "2px",
            color: COLORS.LIGHTGRAY,
            fontSize: "0.7rem",
          }}
        >
          {stockItem.name.slice(0, 50) +
            (stockItem.name.length > 50 ? ".." : "")}
        </p>
      </div>
    );
  });
};
const mapStateToProps = (state) => {
  return { stock: state.stockApp.stock };
};
export default connect(mapStateToProps, { setStock: setStock })(StockList);
