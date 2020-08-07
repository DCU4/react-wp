import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
  }



  componentDidMount() {

  }
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }
  render() {

    return (
      <p>home</p>

    );
  }
}
