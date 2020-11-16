import React from "react";
import { Layout } from "antd";
import HeaderContent from "./HeaderContent";
import SearchResults from "./SearchResults";
import CloseMinExpand from "../../Common/CloseMinExpand";

import "./App.css";
import { SIZES } from "./styles";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <CloseMinExpand />
      <HeaderContent />

      <Content
        style={{
          padding: "0 50px",
          marginTop: SIZES.HEADER_HEIGHT,
          height: `calc(100vh - ${SIZES.HEADER_HEIGHT}px)`,
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        <SearchResults />
      </Content>
    </Layout>
  );
};
export default App;
