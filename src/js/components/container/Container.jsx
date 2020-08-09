import React, { Component } from "react";
import ReactDOM from "react-dom";
import Page from "../presentational/Page.jsx";
import Posts from "../presentational/Posts.jsx";
import Home from "../presentational/Home.jsx";
import {Header} from "../presentational/Header.jsx";
import {Footer} from "../presentational/Footer.jsx";
import Gallery from "../presentational/Gallery.jsx";
import Locations from "../presentational/Locations.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageRoutes: []
    };
  }

  getMenuItems = async () => {

    const url = 'https://updates-fishtaco.pantheonsite.io/wp-json/custom-api/v1/all-menu-items/'
    // const url = 'https://fishtaco.lndo.site/wp-json/custom-api/v1/all-menu-items/';
    const api_call = await fetch(`${url}`, {
      "method": "GET"
    });
    const data = await api_call.json();

    if (data) {
      this.setState({
        pageRoutes: data
      });
    }
  }


  componentDidMount() {
    this.getMenuItems();
  }
  
  render() {
    let pageRoutes = this.state.pageRoutes;
    return (
      <div>
        <Router>
        <header>
          <Header 
            menuItems={pageRoutes}
            // headContent
          />
        </header>
        <main className="container">
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route path="/press">
            <Posts />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          {pageRoutes.map((route,i) => {
            if (route.url && route.post_status == 'publish'){
              const slug = route.url.split('/')[3];
              console.log(slug);
              if (slug != ''){
                return (
                  <Route key={i} path={`/${slug}`}>
                    <Page
                      routeInfo={route}
                    />
                  </Route>
                )
              } else {
                // home page
                return (
                  <Route key={i} exact path="/">
                    <Home />
                    <Page
                      routeInfo={route}
                    />
                  </Route>
                )
              }
            }
          })}
        </Switch>
          
        </main>
        <footer>
          <Footer
            menuItems={pageRoutes}
          />
        </footer>
        </Router>
      </div>
      
    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;