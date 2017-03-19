import React, { Component } from "react";
import Form from "./form";
import Player from "./player";
import moment from "moment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currentIndex: 0,
      position: 0
    };
    this.loadEpisodes = this.loadEpisodes.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this.loadEpisodes();
  }
  render() {
    const { episodes, currentIndex } = this.state;
    if (!episodes.length) {
      return <span>loading</span>;
    }
    const current = episodes[currentIndex];
    const { billboardLocation, audioUrl } = current;
    return (
      <div className="App">
        <Player url={audioUrl} billboardLocation={billboardLocation} />
        <Form submit={this.submit} />
      </div>
    );
  }
  loadEpisodes() {
    fetch("http://localhost:3000/episodes")
      .then(r => r.json())
      .then(episodes => {
        const unanswered = episodes.filter(
          ep => !ep.billboard && ep.billboard !== "pass"
        );
        console.log(unanswered);
        this.setState({ episodes: unanswered });
      });
  }
  submit(text) {
    const { episodes, currentIndex } = this.state;
    const current = episodes[currentIndex];
    fetch("http://localhost:3000/episodes/" + current._id, {
      method: "PATCH",
      body: JSON.stringify({ billboard: text }),
      headers: new Headers({ "Content-Type": "application/json" })
    }).then(_ => {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    });
  }
}

export default App;
