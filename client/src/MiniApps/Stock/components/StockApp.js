import React from "react";
import { connect } from "react-redux";
import LineAreaChart from "./LineAreaChart";
import StockList from "./StockList";
import { fetchData, fetchGlobalData } from "../actions";
import { COLORS } from "./styles";
import { Spin, Result, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CloseMinExpand from "../../Common/CloseMinExpand";
import "./StockApp.css";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Sider, Content } = Layout;
class StockApp extends React.Component {
  state = { showSider: false };
  interactionToHideSider = () => {
    if (this.props.smallScreen) {
      this.setState({ showSider: false });
    }
  };
  componentDidMount = () => {
    this.setState({ showSider: !this.props.smallScreen });
    this.props.fetchData();
    this.props.fetchGlobalData();
  };
  conditionalChartRendering = () => {
    if (this.props.data.status === "out-of-quota") {
      return (
        <div style={{ textAlign: "center", width: "100%", fontSize: "15px" }}>
          <Result title="This app is for prototyping and use a free API with a maximum call frequency of 5 calls per minute and 500 calls per day. Please retry in a minute." />
        </div>
      );
    } else if (this.props.data.status === "loading") {
      return (
        <div style={{ textAlign: "center", width: "100%" }}>
          <Spin indicator={antIcon} />
        </div>
      );
    }
    if (this.props.data.arrayOfData !== null) {
      if (this.props.data.arrayOfData.length > 0) {
        return (
          <div>
            <LineAreaChart
              color={
                this.props.data.arrayOfData[0].y <=
                this.props.data.arrayOfData[
                  this.props.data.arrayOfData.length - 1
                ].y
                  ? COLORS.GREEN
                  : COLORS.RED
              }
            />
          </div>
        );
      }
    }
  };
  render() {
    return (
      <Layout>
        <CloseMinExpand
          thirdIsBack={!this.state.showSider && this.props.smallScreen}
          onThirdClicked={() =>
            this.setState({ showSider: !this.state.showSider })
          }
        />
        {this.state.showSider && (
          <Sider
            width={this.props.smallScreen ? "100vw" : "20vw"}
            style={{
              height: "100vh",
              backgroundColor: COLORS.SIDER,
              padding: "50px 0px",
              borderRight: `1px solid ${COLORS.LIGHTERGRAY}`,
            }}
          >
            <StockList onStockClicked={this.interactionToHideSider} />
          </Sider>
        )}
        <Content
          width={this.state.showSider ? "80vw" : "100vw"}
          style={{
            height: "100vh",
            backgroundColor: "white",
            padding: "20px calc(10vw - 50px)",
            overflow: "auto",
          }}
        >
          {this.conditionalChartRendering()}
        </Content>
      </Layout>
    );
  }
}
const connectStateToProps = (state) => {
  return {
    data: state.stockApp.data,
    smallScreen: state.smallScreen,
  };
};
export default connect(connectStateToProps, {
  fetchData: fetchData,
  fetchGlobalData: fetchGlobalData,
})(StockApp);
