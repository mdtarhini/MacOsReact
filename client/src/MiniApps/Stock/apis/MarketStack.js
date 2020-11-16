import axios from "axios";
export const MarketStack = axios.create({
  baseURL: "https://www.alphavantage.co/",
  params: {
    apikey: process.env.REACT_APP_STOCK_API_KEY,
  },
});

export const PeriodToEndPoint = {
  day: {
    params: {
      function: "TIME_SERIES_INTRADAY",
      interval: "1min",
      outputsize: "full",
    },
    name: "Time Series (1min)",
    dateFormat: "%Y-%m-%d %H:%M%S",
    timeCut: 24 * 60 * 60 * 1000,
    renderedName: "1D",
  },
  week: {
    params: {
      function: "TIME_SERIES_INTRADAY",
      interval: "15min",
      outputsize: "full",
    },
    name: "Time Series (15min)",
    dateFormat: "%Y-%m-%d %H:%M%S",
    timeCut: 7 * 24 * 60 * 60 * 1000,
    renderedName: "1W",
  },
  month: {
    params: {
      function: "TIME_SERIES_INTRADAY",
      interval: "60min",
      outputsize: "full",
    },
    name: "Time Series (60min)",
    dateFormat: "%Y-%m-%d %H:%M%S",
    timeCut: 30 * 24 * 60 * 60 * 1000,
    renderedName: "1M",
  },
  year: {
    params: { function: "TIME_SERIES_DAILY_ADJUSTED", outputsize: "full" },
    name: "Time Series (Daily)",
    dateFormat: "%Y-%m-%d",
    timeCut: 365 * 24 * 60 * 60 * 1000,
    renderedName: "1Y",
  },
  fiveYears: {
    params: { function: "TIME_SERIES_WEEKLY_ADJUSTED", outputsize: "full" },
    name: "Weekly Adjusted Time Series",
    dateFormat: "%Y-%m-%d",
    timeCut: 5 * 365 * 24 * 60 * 60 * 1000,
    renderedName: "5Y",
  },
  all: {
    params: { function: "TIME_SERIES_MONTHLY_ADJUSTED", outputsize: "full" },
    name: "Monthly Adjusted Time Series",
    dateFormat: "%Y-%m-%d",
    timeCut: 50 * 365 * 24 * 60 * 60 * 1000,
    renderedName: "20Y+",
  },
};

export const listOfStock = {
  IBM: { symbol: "IBM", name: "International Business Machines Corportaion" },
  GOOG: { symbol: "GOOG", name: "Alphabet Inc." },
  MSFT: { symbol: "MSFT", name: "Microsoft Corportaion" },
  AAPL: { symbol: "AAPL", name: "Apple Inc." },
  DIS: { symbol: "DIS", name: "The Walt Disney Company" },
  GE: { symbol: "GE", name: "General Electric Company" },
  NKE: { symbol: "NKE", name: "Nike, Inc" },
};
