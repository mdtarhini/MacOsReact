import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { loadGuest } from "../../User/actions";
import AppIcon from "./AppIcon";
import { SIZES } from "./Styles";

import DashboardIcon from "./app-icons/dashboard-icon.png";
import StocksIcon from "./app-icons/stocks-icon.png";
import RemindersIcon from "./app-icons/reminders-icon.png";
import DictionaryIcon from "./app-icons/dictionary-icon.png";
import NotesIcon from "./app-icons/notes-icon.png";
import MessagesIcon from "./app-icons/messages-icon.png";
import UserIcon from "./app-icons/user-icon.png";

const HomeApp = (props) => {
  const listOfApps = [
    {
      path: "/reminders",
      label: "Reminders",
      iconUrl: RemindersIcon,
    },
    {
      path: "/messages",
      label: "Messages",
      iconUrl: MessagesIcon,
    },
    {
      path: "/notes",
      label: "Notes",
      iconUrl: NotesIcon,
    },
    {
      path: "/dictionary",
      label: "Dictionary",
      iconUrl: DictionaryIcon,
    },
    {
      path: "/stock",
      label: "Stocks",
      iconUrl: StocksIcon,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      iconUrl: DashboardIcon,
    },
    {
      path: "/user",
      label: "User info",
      iconUrl: UserIcon,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Row justify="center" gutter={[48, 32]}>
        {listOfApps.map((app, index) => {
          return (
            <Col key={index}>
              <AppIcon
                url={app.iconUrl}
                size={props.smallScreen ? "4em" : SIZES.ICONSIZE}
                path={app.path}
                component={app.iconComp}
                label={app.label}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userAuth: state.user.auth, smallScreen: state.smallScreen };
};
export default connect(mapStateToProps, {
  loadGuest: loadGuest,
})(HomeApp);
