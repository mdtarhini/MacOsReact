import React from "react";
import { evaluate } from "mathjs";
import { categoriesAnUnits } from "./units";
import Draggable from "react-draggable";

//styling
import { SIZES, COLORS } from "./styles";
import { Select, Row, Col, Space, Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const { Option } = Select;
const selectStyle = {
  fontWeight: "bold",
  width: 0.4 * SIZES.frameWidth,
  borderRadius: "9px",
  background:
    "linear-gradient(0deg, rgba(131,133,133,1) 0%, rgba(223,223,223,1) 100%)",
};
class Converter extends React.Component {
  state = {
    category: "volume",
    inputUnit: categoriesAnUnits.volume.defaultInput,
    outputUnit: categoriesAnUnits.volume.defaultOutput,
    inputValue: 1,
    outputValue:
      1 *
      categoriesAnUnits.volume.units[categoriesAnUnits.volume.defaultInput]
        .toStandard,
  };
  componentDidMount = () => {};
  unitChanged = (isInput, value) => {
    let stateKey = isInput ? "inputUnit" : "outputUnit";
    this.setState({ [stateKey]: value }, () => {
      this.inputChange(true, 1);
    });
  };
  renderUnits = (isInput = true) => {
    const category = categoriesAnUnits[this.state.category].units;
    return (
      <Select
        value={isInput ? this.state.inputUnit : this.state.outputUnit}
        bordered={false}
        style={{ ...selectStyle, width: "100%" }}
        onChange={(value) => {
          this.unitChanged(isInput, value);
        }}
        suffixIcon={<CaretDownOutlined />}
      >
        {Object.keys(category).map((unit) => {
          return (
            <Option value={unit} key={unit}>
              {category[unit].label}
            </Option>
          );
        })}
      </Select>
    );
  };
  categoryChanged = (value) => {
    this.setState(
      {
        category: value,
        inputUnit: categoriesAnUnits[value].defaultInput,
        outputUnit: categoriesAnUnits[value].defaultOutput,
      },
      () => {
        this.inputChange(true, 1);
      }
    );
  };
  renderCategories = () => {
    return (
      <Space>
        <span style={{ fontWeight: "bold" }}>Convert</span>
        <Select
          value={this.state.category}
          bordered={false}
          style={selectStyle}
          onChange={this.categoryChanged}
          suffixIcon={<CaretDownOutlined />}
        >
          {Object.keys(categoriesAnUnits).map((category) => {
            return (
              <Option value={category} key={category}>
                {categoriesAnUnits[category].label}
              </Option>
            );
          })}
        </Select>
      </Space>
    );
  };

  inputChange = (isInput, value) => {
    if (value === "") {
      this.setState({
        inputValue: "",
        outputValue: "",
      });
    } else {
      if (this.state.category === "temperature") {
        this.setState({
          inputValue: isInput
            ? value
            : evaluate(
                categoriesAnUnits["temperature"].units[
                  this.state.outputUnit
                ].to[this.state.inputUnit].replace("x", value)
              ),
          outputValue: !isInput
            ? value
            : evaluate(
                categoriesAnUnits["temperature"].units[this.state.inputUnit].to[
                  this.state.outputUnit
                ].replace("x", value)
              ),
        });
      } else {
        const inputToOutput =
          categoriesAnUnits[this.state.category].units[this.state.outputUnit]
            .toStandard /
          categoriesAnUnits[this.state.category].units[this.state.inputUnit]
            .toStandard;
        this.setState({
          inputValue: isInput ? value : value * inputToOutput,
          outputValue: !isInput ? value : value / inputToOutput,
        });
      }
    }
  };
  renderContent = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: this.props.top,
          left: this.props.left,
          zIndex: this.props.zIndex,
          margin: "10px",
        }}
      >
        <div
          id="headerDiv"
          style={{
            width: "100%",
            height: SIZES.headerHeight + "px",
            padding: "10px",
            backgroundColor: COLORS.headerColor,
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.renderCategories()}
        </div>
        <div
          style={{
            backgroundColor: COLORS.frameColor,
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
            width: this.props.draggable ? SIZES.frameWidth + "px" : "",
            padding: "20px",
          }}
        >
          <Row justify="between" gutter={[2, 12]}>
            <Col span={11}>{this.renderUnits(true)}</Col>
            <Col span={2}></Col>
            <Col span={11}>{this.renderUnits(false)}</Col>
            <Col span={11}>
              <Input
                value={this.state.inputValue}
                type="number"
                onChange={(e) => this.inputChange(true, e.target.value)}
              />
            </Col>
            <Col
              span={2}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              =
            </Col>
            <Col span={11}>
              <Input
                type="number"
                value={this.state.outputValue}
                onChange={(e) => this.inputChange(false, e.target.value)}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  render() {
    if (this.props.draggable) {
      return (
        <Draggable
          onMouseDown={() => this.props.onMouseDown(this.props.appName)}
        >
          {this.renderContent()}
        </Draggable>
      );
    } else {
      return this.renderContent();
    }
  }
}
export default Converter;
