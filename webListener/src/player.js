import React, { Component } from "react";
import Sound from "react-sound";
import moment from "moment";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isPlaying: false
    };
  }
  render() {
    const { position, isPlaying } = this.state;
    const { url } = this.props;
    return (
      <div>
        <Sound
          url={url}
          playFromPosition={position}
          playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        />
        <button
          onClick={() =>
            this.setState({ position: this.state.position + 2000 })}
        >
          listen again
        </button>
      </div>
    );
  }
  componentDidMount() {
    const { billboardLocation } = this.props;
    const position = moment.duration(billboardLocation).asMilliseconds();
    setTimeout(
      () => this.setState({ position: position, isPlaying: true }),
      1000
    );
  }
  componentWillReceiveProps(props) {
    this.setState({ position: 0, isPlaying: false });
    const { billboardLocation } = props;
    const position = moment.duration(billboardLocation).asMilliseconds();
    setTimeout(
      () => this.setState({ position: position, isPlaying: true }),
      2000
    );
  }
}
