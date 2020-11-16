import {
  FETCH_DATA,
  SET_STOCK,
  MOUSE_ON_CHART,
  SET_PERIOD,
  OUT_OF_QUOTA,
  LOADING_DATA,
  FETCH_GLOBAL_DATA,
} from "../actions/types";
import { combineReducers } from "redux";

const stockReducer = (state = "IBM", action) => {
  switch (action.type) {
    case SET_STOCK:
      return action.payload;
    default:
      return state;
  }
};

const mosueOnChartReducer = (state = false, action) => {
  switch (action.type) {
    case MOUSE_ON_CHART:
      return action.payload;
    default:
      return state;
  }
};

const periodReducer = (state = "day", action) => {
  switch (action.type) {
    case SET_PERIOD:
      return action.payload;
    default:
      return state;
  }
};

const dataReducer = (
  state = { arrayOfData: [], status: "loading" },
  action
) => {
  switch (action.type) {
    case FETCH_DATA:
      return { arrayOfData: action.payload, status: "ok" };
    case OUT_OF_QUOTA:
      return { arrayOfData: [], status: "out-of-quota" };
    case LOADING_DATA:
      return { arrayOfData: [], status: "loading" };
    default:
      return state;
  }
};
const globalDataReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
  period: periodReducer,
  mosueOnChart: mosueOnChartReducer,
  stock: stockReducer,
  globalData: globalDataReducer,
});
