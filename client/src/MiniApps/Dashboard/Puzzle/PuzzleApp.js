import React from "react";
import Draggable from "react-draggable";
import DropDownMenu from "../../Common/DropDownMenu";

import { SIZES, COLORS } from "./styles";
import { Row, Col, Space } from "antd";
import {
  ReloadOutlined,
  CheckOutlined,
  RollbackOutlined,
  AppstoreOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "../../Home/HomeApp.css";
import YosemiteBkgd from "./Images/yosemite.png";
import ReactLogo from "./Images/react-logo.png";

const numberOfTiles = 16;
const imageOptions = [
  { img: YosemiteBkgd, label: "Yosemite" },
  { img: ReactLogo, label: "React logo" },
  { img: null, label: "Just numbers" },
];
const tileStyle = {
  width: SIZES.frameSize / Math.sqrt(numberOfTiles) + "px",
  height: SIZES.frameSize / Math.sqrt(numberOfTiles) + "px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
class Puzzle extends React.Component {
  state = {
    gridArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    solved: false,
    view: "game",
    imageOption: imageOptions[0],
    showSuccess: false,
  };
  componentDidMount = () => {
    this.shuffleGridArray();
  };
  switchView = (option) => {
    this.setState({ view: option });
  };

  shuffleGridArray = () => {
    //start with a solved puzzle
    let shuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let iMove = 0;
    while (iMove < 100) {
      let currentFreeIndex = shuffled.indexOf(numberOfTiles - 1);
      const allowedMoves = this.getAllowedMoves(shuffled);
      const nAllowedMoves = allowedMoves.length;
      const randomMove =
        allowedMoves[Math.floor(Math.random() * nAllowedMoves)];
      shuffled[currentFreeIndex] = shuffled[randomMove];
      shuffled[randomMove] = numberOfTiles - 1;
      iMove++;
    }
    this.setState({ gridArray: shuffled }, this.checkGrid);
  };

  getAllowedMoves = (gridArray) => {
    let currentFreeIndex = gridArray.indexOf(numberOfTiles - 1);
    let allowedMoves = [
      currentFreeIndex - Math.sqrt(numberOfTiles),
      currentFreeIndex + Math.sqrt(numberOfTiles),
    ];
    if (currentFreeIndex % Math.sqrt(numberOfTiles) !== 0) {
      allowedMoves.push(currentFreeIndex - 1);
    }
    if ((currentFreeIndex + 1) % Math.sqrt(numberOfTiles) !== 0) {
      allowedMoves.push(currentFreeIndex + 1);
    }
    return allowedMoves.filter((item) => item >= 0 && item < numberOfTiles);
  };
  handleTileClick = (item, index) => {
    if (!this.state.solved) {
      let gridArray = this.state.gridArray;
      let currentFreeIndex = gridArray.indexOf(numberOfTiles - 1);
      if (this.getAllowedMoves(gridArray).includes(index)) {
        gridArray[currentFreeIndex] = item;
        gridArray[index] = numberOfTiles - 1;
        this.setState({ gridArray: gridArray }, this.checkGrid);
      }
    }
  };
  checkGrid = () => {
    //a grid is valid if the value of each tiles is less than the value of the next one in the array
    const gridArray = this.state.gridArray;
    for (let iTile = 0; iTile < gridArray.length - 1; iTile++) {
      if (gridArray[iTile] > gridArray[iTile + 1]) {
        this.setState({ solved: false });
        return;
      }
    }

    this.setState({ solved: true, showSuccess: true });
    setTimeout(() => this.setState({ showSuccess: false }), 1000);
  };
  renderTiles = () => {
    const tileSize = SIZES.frameSize / Math.sqrt(numberOfTiles);
    const nInRow = Math.sqrt(numberOfTiles);
    const border = this.state.solved
      ? "none"
      : `1px solid ${COLORS.gameBackgournd}`;
    return (
      <Row>
        {this.state.gridArray.map((item, index) => {
          return (
            <Col span={6} key={index}>
              {((!this.state.solved && item !== numberOfTiles - 1) ||
                this.state.solved) && (
                <div
                  style={{
                    ...tileStyle,
                    backgroundColor: this.state.solved
                      ? COLORS.solvedColor
                      : COLORS.playingColor,
                    borderBottom: border,
                    borderRight: border,
                    borderLeft: index % nInRow === 0 ? border : "none",
                    borderTop: index < nInRow ? border : "none",
                    borderTopLeftRadius: index === 0 ? SIZES.borderRadius : "0",
                    borderTopRightRadius:
                      index === nInRow - 1 ? SIZES.borderRadius : "0",
                    borderBottomLeftRadius:
                      index === numberOfTiles - nInRow
                        ? SIZES.borderRadius
                        : "0",
                    borderBottomRightRadius:
                      index === numberOfTiles - 1 ? SIZES.borderRadius : "0",
                    backgroundImage: this.state.imageOption.img
                      ? `url(${this.state.imageOption.img})`
                      : null,
                    backgroundPosition: this.state.imageOption.img
                      ? `${((-1 * item) % nInRow) * tileSize}px ${
                          -1 * Math.floor(item / nInRow) * tileSize
                        }px`
                      : null,
                  }}
                  onClick={() => this.handleTileClick(item, index)}
                >
                  {!this.state.imageOption.img && (
                    <span style={{ fontSize: "2rem", color: "white" }}>
                      {item + 1}
                    </span>
                  )}
                </div>
              )}
            </Col>
          );
        })}
      </Row>
    );
  };
  renderPuzzleOptions = () => {
    return (
      <Space>
        {imageOptions.map((option, index) => {
          return (
            <Space
              direction="vertical"
              align="center"
              className="AppIcon"
              key={index}
              style={{ color: "black", fontSize: "small" }}
              onClick={() =>
                this.setState(
                  { imageOption: option, view: "game" },
                  this.shuffleGridArray()
                )
              }
            >
              {option.img && (
                <img
                  src={option.img}
                  style={{ width: `${SIZES.frameSize / 4}px` }}
                  alt={option.label}
                />
              )}
              {!option.img && (
                <div
                  style={{
                    ...tileStyle,
                    backgroundColor: COLORS.playingColor,
                  }}
                >
                  <span style={{ fontSize: "2rem", color: "white" }}>
                    {Math.floor(Math.random() * (numberOfTiles - 1) + 1)}
                  </span>
                </div>
              )}
              {option.label}
            </Space>
          );
        })}
      </Space>
    );
  };
  renderContent = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: this.props.zIndex,
          top: this.props.top,
          left: this.props.left,
        }}
      >
        {this.state.view !== "options" && (
          <DropDownMenu
            shape="circle"
            optionArray={
              this.state.view === "game"
                ? [
                    {
                      text: "Shuffle",
                      icon: <ReloadOutlined />,
                      func: this.shuffleGridArray,
                    },
                    this.state.imageOption.img
                      ? {
                          text: "Show solution",

                          icon: <CheckOutlined />,
                          func: () => {
                            this.switchView("solution");
                          },
                        }
                      : null,
                    {
                      text: "Another puzzle",
                      icon: <AppstoreOutlined />,
                      func: () => {
                        this.switchView("options");
                      },
                    },
                  ]
                : this.state.view === "solution"
                ? [
                    {
                      text: "Back to game",

                      icon: <RollbackOutlined />,
                      func: () => {
                        this.switchView("game");
                      },
                    },
                  ]
                : []
            }
          />
        )}

        <div
          id="outerDiv"
          style={{
            backgroundColor: COLORS.frameBackground,
            padding: "8px",
            borderRadius: SIZES.borderRadius,
            marginTop: "5px",
          }}
        >
          <div
            id="mainDiv"
            style={{
              height: SIZES.frameSize + "px",
              width: SIZES.frameSize + "px",
              position: "relative",
              backgroundImage:
                this.state.view === "solution"
                  ? `url(${this.state.imageOption.img})`
                  : null,
              backgroundColor: COLORS.gameBackgournd,
              borderRadius: SIZES.borderRadius,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.view === "game" && this.renderTiles()}

            {this.state.view === "options" && this.renderPuzzleOptions()}
            {this.state.showSuccess && (
              <CheckCircleTwoTone
                twoToneColor="rgba(0,250,120,0.3)"
                style={{
                  position: "absolute",
                  fontSize: 0.9 * SIZES.frameSize + "px",
                }}
              />
            )}
          </div>
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
export default Puzzle;
