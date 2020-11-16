import React from "react";
import { connect } from "react-redux";
import { setFilter, fetchLists } from "../actions";
import CloseMinExpand from "../../Common/CloseMinExpand";

import { Layout, Typography, Row, Col, Divider } from "antd";
import { FolderFilled, ClockCircleFilled, BellFilled } from "@ant-design/icons";
import SideWidget from "./SideWidget";
import SearchReminders from "./SearchReminders";
import ListOfLists from "./ListOfLists";
import ListOfReminders from "./ListOfReminders";
import { colors, sizes, dateFormat } from "./myStyles";

import moment from "moment";
const { Sider, Content, Header } = Layout;
const { Title } = Typography;

class Reminders extends React.Component {
  state = {
    showSider: true,
  };
  interactionToHideSider = () => {
    if (this.props.smallScreen) {
      this.setState({ showSider: false });
    }
  };
  componentDidMount = () => {
    this.props.fetchLists();
  };
  getTitle = () => {
    if (this.props.filter) {
      switch (this.props.filter.type) {
        case "list":
          return this.props.lists[this.props.filter.value].name;
        case "custom":
          return this.props.filter.value;
        case "Search":
          return `Results for "${this.props.filter.value}"`;
        default:
          return "";
      }
    }
    return "";
  };
  getCustomColor = (category) => {
    switch (category) {
      case "All":
        return colors.darkerGray;
      case "Scheduled":
        return colors.orange;
      case "Today":
        return colors.blue;
      default:
        return colors.blue;
    }
  };
  getColor = () => {
    if (this.props.filter) {
      switch (this.props.filter.type) {
        case "list":
          return this.props.lists[this.props.filter.value].color;
        case "custom":
          return this.getCustomColor(this.props.filter.value);
        case "Search":
          return colors.darkerGray;
        default:
          return colors.blue;
      }
    }
    return "";
  };

  getNonCompletedFor = (filter) => {
    if (this.props.reminders) {
      return Object.values(this.props.reminders).reduce((total, item) => {
        if (!item.completed) {
          if (filter.type === "list") {
            if (filter.value === item.parentList) {
              return total + 1;
            }
          } else {
            if (filter.value === "All") {
              return total + 1;
            } else if (filter.value === "Scheduled") {
              if (item.date !== null) {
                return total + 1;
              }
            } else if (filter.value === "Today") {
              if (
                moment(item.date).format(dateFormat) ===
                moment().format(dateFormat)
              ) {
                return total + 1;
              }
            }
          }
        }
        return total;
      }, 0);
    }
    return 0;
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <CloseMinExpand
          thirdIsBack={!this.state.showSider && this.props.smallScreen}
          onThirdClicked={() =>
            this.setState({ showSider: !this.state.showSider })
          }
        />
        <Header
          style={{
            position: "fixed",
            width: this.state.showSider
              ? `calc(100vw - ${sizes.siderWidth}px)`
              : "100vw",
            left: this.state.showSider ? `${sizes.siderWidth}px` : "0px",
            height: `${sizes.headerHeight}px`,
            padding: `0px ${sizes.mainPadding}px`,
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            backgroundColor: "white",
          }}
        >
          <Title type="info" style={{ color: this.getColor(), margin: 0 }}>
            {this.getTitle()}
          </Title>
          <Title
            type="info"
            level={2}
            style={{ color: this.getColor(), margin: 0 }}
          >
            {this.getNonCompletedFor(this.props.filter)}
          </Title>
        </Header>
        {this.state.showSider && (
          <Sider
            width={this.props.smallScreen ? "100vw" : sizes.siderWidth}
            style={{
              height: "100vh",
              position: "fixed",
              zIndex: 200,
              overflowY: "auto",
              left: 0,
              backgroundColor: colors.lightGray,
              borderRight: `1px solid ${colors.darkGray}`,
            }}
          >
            <Layout
              style={{
                backgroundColor: "inherit",
                position: "relative",
                overflowX: "hidden",
              }}
            >
              <Header
                style={{
                  height: `${sizes.headerHeight}px`,
                  backgroundColor: "inherit",
                  padding: `0px ${sizes.mainPadding}px 10px ${sizes.mainPadding}px`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                {!(this.state.showSider && this.props.smallScreen) && (
                  <SearchReminders />
                )}
              </Header>
              <Content style={{ marginTop: "30px" }}>
                <Row
                  gutter={[8, 8]}
                  style={{ padding: `0px ${sizes.mainPadding}px` }}
                >
                  <Col span={12}>
                    <SideWidget
                      activeColor={this.getCustomColor("Today")}
                      inactiveColor={colors.darkGray}
                      isActive={
                        this.props.filter.type === "custom" &&
                        this.props.filter.value === "Today"
                      }
                      counter={this.getNonCompletedFor({
                        type: "custom",
                        value: "Today",
                      })}
                      label={"Today"}
                      onClick={() => {
                        this.props.setFilter({
                          type: "custom",
                          value: "Today",
                        });
                        this.interactionToHideSider();
                      }}
                    >
                      <BellFilled />
                    </SideWidget>
                  </Col>
                  <Col span={12}>
                    <SideWidget
                      activeColor={this.getCustomColor("Scheduled")}
                      inactiveColor={colors.darkGray}
                      isActive={
                        this.props.filter.type === "custom" &&
                        this.props.filter.value === "Scheduled"
                      }
                      counter={this.getNonCompletedFor({
                        type: "custom",
                        value: "Scheduled",
                      })}
                      label={"Scheduled"}
                      onClick={() => {
                        this.props.setFilter({
                          type: "custom",
                          value: "Scheduled",
                        });
                        this.interactionToHideSider();
                      }}
                    >
                      <ClockCircleFilled />
                    </SideWidget>
                  </Col>
                  <Col span={24}>
                    <SideWidget
                      activeColor={this.getCustomColor("All")}
                      inactiveColor={colors.darkGray}
                      isActive={
                        this.props.filter.type === "custom" &&
                        this.props.filter.value === "All"
                      }
                      counter={this.getNonCompletedFor({
                        type: "custom",
                        value: "All",
                      })}
                      label={"All"}
                      onClick={() => {
                        this.props.setFilter({
                          type: "custom",
                          value: "All",
                        });
                        this.interactionToHideSider();
                      }}
                    >
                      <FolderFilled />
                    </SideWidget>
                  </Col>
                </Row>
                <Divider />
                <ListOfLists
                  onListClicked={() => {
                    this.interactionToHideSider();
                  }}
                />
              </Content>
            </Layout>
          </Sider>
        )}
        <Layout
          style={{
            marginLeft: this.state.showSider ? `${sizes.siderWidth}px` : "0px",
            marginTop: `${sizes.headerHeight}px`,
          }}
        >
          <Content
            style={{
              padding: `0 ${sizes.mainPadding}px`,
              backgroundColor: "white",
            }}
          >
            <ListOfReminders
              onAddNote={() => {
                this.interactionToHideSider();
              }}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.reminders.filter,
    lists: state.reminders.lists,
    reminders: state.reminders.reminders,
    smallScreen: state.smallScreen,
  };
};
export default connect(mapStateToProps, {
  setFilter: setFilter,
  fetchLists: fetchLists,
})(Reminders);
