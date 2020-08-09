import React, { Component, useState } from "react";
import {
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter,
  Switch
} from "react-router-dom";
import {Helmet} from "react-helmet";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      singlePostShowing: false
    }
  }

  getPosts = async () => {

    const headers = {
      'Access-Control-Allow-Origin': '*',
    }
    // const url = 'https://fishtaco.lndo.site/wp-json/wp/v2/posts/?per_page=5';
    const url = 'https://updates-fishtaco.pantheonsite.io/wp-json/custom-api/v1/all-posts/';
    // const url = 'https://fishtaco.lndo.site/wp-json/custom-api/v1/all-posts/';
    const api_call = await fetch(`${url}`, {
      "method": "GET",
      // "headers": headers
    });

    const data = await api_call.json();
    // console.log(data);

    if (data) {
      this.setState({
        posts: data,
        showSinglePost: false
      })
    }

    // yoast REST API
    // const headUrl = 'https://updates-fishtaco.pantheonsite.io/wp-json/yoast/v1/get_head?url=https://updates-fishtaco.pantheonsite.io/press/'
    // const api_call_headUrl = await fetch(`${headUrl}`, {
    //   "method": "GET",
    //   // "headers": headers
    // });
    // const headData = await api_call_headUrl.json();
    // console.log(headData);

  }

  showSinglePost = () => {
    let showSinglePost = this.state.showSinglePost;
    this.setState({
      showSinglePost: !showSinglePost ? true : false
    });
  }


  componentDidMount() {
    console.log('mount me')
    this.getPosts();
  }

  render() {
    let { path, url } = this.props.match;
    let posts = this.state.posts;
    // let showSinglePost = this.state.showSinglePost;
    if (this.state.posts.length == 0) {
      return <p>hol up...</p>;
    }

    return (

      <section className="press-page" >
        <Helmet>
          <title>Press</title>
        </Helmet>
        <Switch>
          <Route exact path={path}>
            <div className="press-post-basic" >
              {posts && posts.map((post, i) => {
                // console.log(post);
                // const slug = item.url.split('/')[3];
                return (
                  <div key={i} className="press-post-content">
                    <Link onClick={this.showSinglePost} to={`${url}/${post.post_name}`}><img alt="" src={post.thumbnail} /></Link>

                    <div className="date-title">
                      <p className="date">{post.post_date}</p>
                      <Link onClick={this.showSinglePost} to={`${url}/${post.post_name}`}><h2 className="press-title">{post.post_title}</h2></Link>
                    </div>

                  </div>
                );
              })}
            </div>
          </Route>

          <Route path={`${path}/:postPath`}>
            <SinglePost
              posts={posts}
            />
          </Route>
        </Switch>

      </section>

    );
  }
}
export default withRouter(Posts);

export const SinglePost = (props) => {
  let { postPath } = useParams();
  let post = props.posts.find(post => post.post_name == postPath);
  let metaDesc = post.meta_data._yoast_wpseo_metadesc ? post.meta_data._yoast_wpseo_metadesc[0] : "";
  // console.log(metaDesc);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.post_title}</title>
        
        <meta name="description"  content={metaDesc} />
        <link rel="canonical" href="https://fishtaco.lndo.site" />
      </Helmet>
      <div className="single-post">
        <h3>{post.post_title}</h3>
        <img src={post.thumbnail} />
        <article dangerouslySetInnerHTML={{ __html: post.post_content }}></article>
        <p>{postPath}</p>
      </div>
    </div>
  );
}