import React from "react";
import { Button } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

class SynonymList extends React.Component {
  state = { showSynonyms: false };

  render() {
    const array = this.props.array;
    if (array.length === 0) {
      return null;
    }
    return (
      <React.Fragment>
        <div>
          <Button
            style={{ fontSize: "0.72rem" }}
            type="link"
            size="small"
            onClick={() =>
              this.setState({ showSynonyms: !this.state.showSynonyms })
            }
          >
            {array.length + " synonyms"}
            {this.state.showSynonyms && <CaretUpOutlined />}
            {!this.state.showSynonyms && <CaretDownOutlined />}
          </Button>
        </div>

        <ul
          className="synList"
          style={{ display: this.state.showSynonyms ? "block" : "none" }}
        >
          {array.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </React.Fragment>
    );
  }
}
export default SynonymList;
