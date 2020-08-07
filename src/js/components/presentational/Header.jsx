import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    }
  }


  // getMenuItems = async () => {

  //   const url = 'https://updates-fishtaco.pantheonsite.io/wp-json/custom-api/v1/all-menu-items/'
  //   // const url = 'https://fishtaco.lndo.site/wp-json/custom-api/v1/all-menu-items/';
  //   const api_call = await fetch(`${url}`, {
  //     "method": "GET"
  //   });
  //   const data = await api_call.json();

  //   if (data) {
  //     this.setState({
  //       menuItems: data
  //     });
  //   }
  // }

  componentDidMount() {
    // this.getMenuItems();
  }
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }
  render() {
    let menuItems = this.props.menuItems;
    return (
      
      <ul>
        <h1><Link to="/">Hello there.</Link></h1>
        {menuItems && menuItems.map((item,i)=> {
          if (item.url && item.post_status == 'publish'){
            const slug = item.url.split('/')[3];
            return (<li key={i}>
              <Link to={`/${slug}`}>{item.title}</Link>
            </li>)
          }
        })}
          
      </ul>

    );
  }
}
