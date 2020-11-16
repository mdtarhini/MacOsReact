import React from "react";

//style-related stuff
import {
  CalculatorOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Layout, Select, Space } from "antd";
import { SIZES, COLORS } from "./styles";

//other components
import CloseMinExpand from "../Common/CloseMinExpand";
import ClockApp from "./Clock/ClockApp";
import CalendarApp from "./Calendar/CalendarApp";
import ConverterApp from "./Converter/ConverterApp";
import CalculatorApp from "./Calculator/CalculatorApp";
import PuzzleApp from "./Puzzle/PuzzleApp";
import WeatherApp from "./Weather/WeatherApp";

const { Option } = Select;

// /credits: https://gist.github.com/roydejong/fb021a973160fa3d04d7aaca675a46cf
//Draggable is not great on touch screen
const detectTouchDevice = () => {
  try {
    let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

    let mq = function (query) {
      return window.matchMedia(query).matches;
    };

    if (
      "ontouchstart" in window ||
      (typeof window.DocumentTouch !== "undefined" &&
        document instanceof window.DocumentTouch)
    ) {
      return true;
    }

    return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
  } catch (e) {
    return false;
  }
};
const arrayOfApps = [
  {
    name: "calculator",
    component: <CalculatorApp />,
    initTop: "10%",
    initLeft: "70%",
    icon: <CalculatorOutlined />,
  },
  {
    name: "converter",
    component: <ConverterApp />,
    initTop: "60%",
    initLeft: "15%",
    icon: <SwapOutlined />,
  },
  { name: "clock", component: <ClockApp />, icon: <ClockCircleOutlined /> },
  {
    name: "calendar",
    component: <CalendarApp />,
    initTop: "50%",
    initLeft: "80%",
    icon: <CalendarOutlined />,
  },
  {
    name: "puzzle",
    component: <PuzzleApp />,
    initTop: "20%",
    initLeft: "10%",
    icon: <AppstoreOutlined />,
  },
  {
    name: "weather",
    component: <WeatherApp />,
    initTop: "60%",
    initLeft: "60%",
    icon: <AppstoreOutlined />,
  },
];
class DashboardApp extends React.Component {
  state = {
    topApp: "calculator",
    isTouchDevice: detectTouchDevice(),
    geoLocation: null,
  };
  mouseDownOnApp = (app) => {
    if (this.state.topApp !== app) {
      this.setState({ topApp: app });
    }
  };

  componentDidMount = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          geoLocation: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      },
      (err) => {
        throw err;
      }
    );
  };

  renderForLargeScreens = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CloseMinExpand />
        {arrayOfApps
          .filter((app) => !(app.name === "weather" && !this.state.geoLocation))
          .map((app) => {
            return React.cloneElement(app.component, {
              zIndex: this.state.topApp === app.name ? 100 : 1,
              onMouseDown: this.mouseDownOnApp,
              appName: app.name,
              key: app.name,
              draggable: true,
              top: app.initTop,
              left: app.initLeft,
              geoLocation: this.state.geoLocation,
            });
          })}
      </div>
    );
  };

  renderForSmallScreens = () => {
    return (
      <Layout>
        <CloseMinExpand />
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            overflow: "hidden",
            backgroundColor: COLORS.HEADER,
            height: SIZES.HEADER_HEIGHT + "px",
            padding: "5px 5px",
            borderBottom: "1px lightgray solid",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Select
            bordered={false}
            style={{
              width: "calc(100vw - 100px)",
              borderRadius: "5px",
              backgroundColor: COLORS.GREY,
              fontWeight: "bold",
            }}
            value={this.state.topApp}
            onChange={(value) => this.setState({ topApp: value })}
          >
            {arrayOfApps
              .filter(
                (app) => !(app.name === "weather" && !this.state.geoLocation)
              )
              .map((app) => {
                return (
                  <Option value={app.name} key={app.name}>
                    <Space>
                      {app.icon}
                      {app.name}
                    </Space>
                  </Option>
                );
              })}
          </Select>
        </div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            overflow: "hidden",
            top: SIZES.HEADER_HEIGHT + "px",
            height: `calc(100vh - ${SIZES.HEADER_HEIGHT}px)`,
            padding: "5px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {React.cloneElement(
            arrayOfApps.filter((app) => app.name === this.state.topApp)[0]
              .component,
            { draggable: false, geoLocation: this.state.geoLocation }
          )}
        </div>
      </Layout>
    );
  };
  render() {
    if (this.state.isTouchDevice) {
      return this.renderForSmallScreens();
    } else {
      return this.renderForLargeScreens();
    }
  }
}

export default DashboardApp;
