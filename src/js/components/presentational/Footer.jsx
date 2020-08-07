import React, { Component } from "react";
import {
  Link,
  useLocation
} from "react-router-dom";


export const Footer = (props) => {
    let location = useLocation();
    let path = location.pathname;
    let menuItems = props.menuItems;
    return (
      <ul>
        {menuItems && menuItems.map((item,i)=> {
          if (item.url && item.post_status == 'publish'){
            const slug = item.url.split('/')[3];
            return (<li key={i}>
              <Link className={path.substring(1) == slug ? 'active' : ''} to={`/${slug}`}>{item.title}</Link>
            </li>)
          }
        })}
          
      </ul>

    );
}
