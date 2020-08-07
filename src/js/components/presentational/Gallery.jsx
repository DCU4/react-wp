import React, { Component } from "react";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images:[],
      className: ''
    }
  }


  getGallery = async () => {

    const headers = {
      'Access-Control-Allow-Origin': '*',
    }
    // const url = 'https://fishtaco.lndo.site/wp-json/wp/v2/posts/?per_page=5';
    const url = 'https://updates-fishtaco.pantheonsite.io/wp-json/custom-api/v1/all-gallery-images/';
    // const url = 'https://fishtaco.lndo.site/wp-json/custom-api/v1/all-posts/';
    const api_call = await fetch(`${url}`, {
      "method": "GET",
      // "headers": headers
    });

    const data = await api_call.json();
    // console.log(data);
    
    if (data) {
      this.setState({
        images: data,
      })
    }

  }

  getClasses = e => {
    const img = e.target;
    img.classList.add('load')

  }


  componentDidMount() {
    this.getGallery();
    // this.getClasses();
  }

  componentDidUpdate() {
  //   
    
  }

  componentWillUnmount() {
    // clearTimeout(this.timer);
  }

  render() {
    let images = this.state.images;
    // let className = this.state.className;
    if (this.state.images.length == 0) {
      return <p>hol up...</p>;
    }
    
    return (
      
      <section  className="gallery" >
        {images.map((image,i)=> {
          return (
                <img onLoad={this.getClasses} key={i} src={image} />
              )
          
        })}
      </section>

    );
  }
}
