import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }



  componentDidMount() {

  }
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }
  render() {

    return (
      <Link className="enter" to="/">Enter Here</Link>

    );
  }
}
