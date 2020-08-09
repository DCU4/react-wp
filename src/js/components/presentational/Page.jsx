import React, { Component } from "react";
import {Helmet} from "react-helmet";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages:[]
    }
  }


  getPages = async () => {

    const headers = {
      'Access-Control-Allow-Origin': '*',
    }
    // const url = 'https://fishtaco.lndo.site/wp-json/wp/v2/pages/?per_page=5';
    const url = 'https://updates-fishtaco.pantheonsite.io/wp-json/custom-api/v1/all-pages/';
    // const url = 'https://fishtaco.lndo.site/wp-json/custom-api/v1/all-pages/';
    const api_call = await fetch(`${url}`, {
      "method": "GET",
      // "headers": headers
    });

    const data = await api_call.json();
    
    if (data) {
      this.setState({
        pages: data,
      })
    }
  }


  componentDidMount() {
    this.getPages();
  }


  render() {
    let page = this.state.pages.find(page => page.post_title == this.props.routeInfo.title);
    
    if (!this.state.pages || page == undefined) {
      return <p>hol up...</p>;
    }
    return (
      
      <section className="page" >
        <Helmet>
          <title>{page.post_title}</title>
        </Helmet>
        <header>
          <h1>{page.post_title}</h1>
        </header>
          <div dangerouslySetInnerHTML={{ __html: page.post_content }} className="page-basic" ></div>
      </section>

    );
  }
}
