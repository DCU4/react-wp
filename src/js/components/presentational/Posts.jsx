import React, { Component, useState } from "react";
import {
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter,
  Switch
} from "react-router-dom";

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
    console.log(data);

    if (data) {
      this.setState({
        posts: data,
        showSinglePost: false
      })
    }
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
  return (
    <div>
      <div className="single-post">
        <h3>{post.post_title}</h3>
        <img src={post.thumbnail} />
        <article dangerouslySetInnerHTML={{ __html: post.post_content }}></article>
        <p>{postPath}</p>
      </div>
    </div>
  );
}