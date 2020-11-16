import React from "react";
import { Space, Divider, Typography } from "antd";
import SynonymList from "./SynonymList";
import AudioClip from "./AudioClip";
const { Title } = Typography;
class OneResult extends React.Component {
  renderPhonetics = () => {
    const data = this.props.data;
    if (data.phonetics) {
      return data.phonetics.map((phonetic, index) => {
        if (phonetic.text) {
          return (
            <Space key={index}>
              <AudioClip url={phonetic.audio} />
              <span>
                {(index === 0 ? "|" : " ,") +
                  phonetic.text.replace(/\//g, "") +
                  (index === data.phonetics.length - 1 ? "|" : "")}
              </span>
            </Space>
          );
        }
        return null;
      });
    }
    return null;
  };

  renderPhonetics = () => {
    const data = this.props.data;
    if (data.phonetics) {
      return (
        <Space style={{ fontSize: "12px", marginBottom: "3px" }} size={0}>
          {data.phonetics.map((phonetic, index) => {
            if (phonetic.text) {
              return (
                <React.Fragment key={index}>
                  {index === 0 && (
                    <Divider
                      type="vertical"
                      style={{ margin: "0px", backgroundColor: "grey" }}
                    />
                  )}
                  <AudioClip
                    url={phonetic.audio}
                    text={phonetic.text.replace(/\//g, "")}
                  />
                  {index === data.phonetics.length - 1 ? (
                    <Divider
                      type="vertical"
                      style={{ margin: "0px", backgroundColor: "grey" }}
                    />
                  ) : (
                    <span>.</span>
                  )}
                </React.Fragment>
              );
            }
            return null;
          })}
        </Space>
      );
    }
  };

  renderDefinitions = (array) => {
    return (
      <ul>
        {array.map((item, index) => {
          return (
            <li key={index}>
              {item.definition}
              {item.example && <i className="example"> {item.example}</i>}
              {item.synonyms && <SynonymList array={item.synonyms} />}
            </li>
          );
        })}
      </ul>
    );
  };
  renderMeanings = () => {
    const data = this.props.data;
    if (data.meanings) {
      return data.meanings.map((item, index) => {
        return (
          <div key={index}>
            <Title level={4}>{item.partOfSpeech}</Title>
            {item.definitions.length > 0 &&
              this.renderDefinitions(item.definitions)}
          </div>
        );
      });
    }
    return null;
  };
  render() {
    const data = this.props.data;
    return (
      <div>
        <Space>
          <Title level={2}>{data && data.word}</Title>
          <span>{this.renderPhonetics()}</span>
        </Space>
        {this.renderMeanings()}
      </div>
    );
  }
}
export default OneResult;
