import {
  FETCH_DATA,
  SET_STOCK,
  OUT_OF_QUOTA,
  LOADING_DATA,
  FETCH_GLOBAL_DATA,
  SET_PERIOD,
} from "./types";
import { MarketStack, PeriodToEndPoint } from "../apis/MarketStack";

const filterAndMapData = (data, period) => {
  // First of all, map the data to be readbale by nivo and replace strings dates with date objects
  if (data) {
    const lastDate = new Date(Object.keys(data)[0]).getTime();
    return Object.keys(data)
      .map((key) => {
        return {
          date: new Date(key),
          y: Number(data[key]["4. close"]),
        };
      })
      .filter((item) => {
        return (
          item.date > new Date(lastDate - PeriodToEndPoint[period].timeCut)
        );
      })
      .sort((a, b) => a.date - b.date)
      .map((item, index) => {
        return {
          ...item,
          x: index,
        };
      });
  }
  return null;
};
export const fetchData = () => {
  return (dispatch, getState) => {
    dispatch({ type: LOADING_DATA });
    const period = getState().stockApp.period;
    MarketStack.get("query", {
      params: {
        symbol: getState().stockApp.stock,
        ...PeriodToEndPoint[period].params,
      },
    }).then((res) => {
      if (
        res.data &&
        !Object.keys(res.data).includes(PeriodToEndPoint[period].name)
      ) {
        dispatch({ type: OUT_OF_QUOTA });
      } else {
        dispatch({
          type: FETCH_DATA,
          payload: filterAndMapData(
            res.data[PeriodToEndPoint[period].name],
            period
          ),
        });
      }
    });
  };
};
export const fetchGlobalData = () => {
  return (dispatch, getState) => {
    const stock = getState().stockApp.stock;
    MarketStack.get("query", {
      params: { function: "GLOBAL_QUOTE", symbol: stock },
    }).then((res) => {
      dispatch({ type: FETCH_GLOBAL_DATA, payload: res.data });
    });
  };
};

export const setStock = (stockSymbol) => {
  return (dispatch) => {
    dispatch({ type: SET_STOCK, payload: stockSymbol });
    dispatch(fetchData());
    dispatch(fetchGlobalData());
  };
};
export const setPeriod = (period) => {
  return (dispatch) => {
    dispatch({ type: SET_PERIOD, payload: period });
    dispatch(fetchData());
  };
};
