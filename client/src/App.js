import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import history from "./history";

//actions
import { loadUserByToken } from "./User/actions";
import { setIsSmallScreen } from "./actions";

//styles-related stuff
import "antd/dist/antd.css";
import "./App.css";
import { notification } from "antd";

//miniApps componenets
import HomeApp from "./MiniApps/Home/HomeApp";
import LockScreen from "./MiniApps/LockScreen/components/LockScreen";
import SignUpInModal from "./User/components/SignUpInModal";
import DictionaryApp from "./MiniApps/Dictionary/components/DictionaryApp";
import NotesApp from "./MiniApps/Notes/components/NotesApp";
import RemindersApp from "./MiniApps/Reminders/components/RemindersApp";
import StockApp from "./MiniApps/Stock/components/StockApp";
import MessageApp from "./MiniApps/Messages/components/MessageApp";
import DashboardApp from "./MiniApps/Dashboard/DashboardApp";

class App extends React.Component {
  componentDidMount = () => {
    this.props.loadUserByToken();

    this.checkIfSmallScreen();
    window.addEventListener("resize", this.checkIfSmallScreen);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.checkIfSmallScreen);
  };
  listOfPrivateComponents = [
    { path: "/reminders", component: RemindersApp },
    { path: "/notes", component: NotesApp },
    { path: "/messages", component: MessageApp },
  ];
  listOfPublicComponents = [
    { path: "/", component: HomeApp },
    { path: "/dashboard", component: DashboardApp },
    { path: "/stock", component: StockApp },
    { path: "/dictionary", component: DictionaryApp },
    { path: "/user", component: LockScreen },
  ];
  checkIfSmallScreen = () => {
    this.props.setIsSmallScreen(window.innerWidth < 500);
  };

  detectMob = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  showSmallScreenDisclaimer = () => {
    notification.open({
      placement: "topLeft",

      style: {
        width: "calc(100vw - 5px)",
        position: "fixed",
        left: "5px",
        top: "5px",
      },
      duration: 10,
      message: "Disclaimer",
      description:
        "Some applications are not yet optimized for small screens and might behave 'strangely'",
    });
  };
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            {this.listOfPrivateComponents.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={
                    this.props.userAuth.verified ? route.component : LockScreen
                  }
                />
              );
            })}
            {this.listOfPublicComponents.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.component}
                />
              );
            })}
            <Route path="/signIn" component={SignUpInModal} />
            <Route path="/signUp" component={SignUpInModal} />
            <Route path="*">
              <HomeApp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return { userAuth: state.user.auth };
};
export default connect(mapStateToProps, {
  loadUserByToken: loadUserByToken,
  setIsSmallScreen: setIsSmallScreen,
})(App);
