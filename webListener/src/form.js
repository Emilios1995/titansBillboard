import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.submit(this.state.value);
    }
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.submit(this.state.value)}>
          submit
        </button>
      </div>
    );
  }
  componentWillReceiveProps() {
    this.setState({ value: "" });
  }
}
