import React from "react";
import { Typography } from "antd";
const { Title } = Typography;
const Empty = ({ language, notFound }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ color: "lightgrey", fontWeight: "300" }}>
        {notFound ? (
          <p>No entries found.</p>
        ) : (
          <p>
            Type a word to look up in ...
            <br />"{language}" Dictionary
          </p>
        )}
      </Title>
    </div>
  );
};
export default Empty;
