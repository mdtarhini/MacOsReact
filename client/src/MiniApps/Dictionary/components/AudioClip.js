import React from "react";
import { Button } from "antd";
class AudioClip extends React.Component {
  // add a ref to the attached media
  audio = React.createRef();
  Play = () => {
    this.audio.current.play();
  };
  render() {
    return (
      <div>
        <audio ref={this.audio} src={this.props.url} className="clip"></audio>
        <Button type="link" size="small" onClick={this.Play}>
          {this.props.text}
        </Button>
      </div>
    );
  }
}
export default AudioClip;
