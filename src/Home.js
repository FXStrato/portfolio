import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Button } from 'antd';
import Me from './img/me.png';
import ProgressiveImage from 'react-progressive-image-loading';
import Img from 'react-image';

class Home extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" gutter={16}>
          <Col sm={24} md={8} lg={6} style={{marginBottom: 20, maxWidth: 220}}>
            <ProgressiveImage preview={Me} src={Me} render={(src, style) => <Img className="responsive-img shadow" style={style} src={src} alt="Jeff Zhong"/>}/>
          </Col>
          <Col sm={24} md={14} lg={10}>
            <h2>About Me</h2>
            <p style={{fontSize: '0.9rem'}}>Hello and welcome. My name is Jeff Zhong, and I am a Front End/User Experience (UX) Developer and Engineer. I graduated from the University of Washington - Seattle in 2017, and currently work for AT&T (July 2017-Present). I enjoy creating and developing side projects to explore different technologies and bring to life my own interests, ideas, and style.</p>
            <p style={{fontSize: '0.9rem'}}>The technologies I have interest in at the moment include <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://angular.io/" rel="noopener noreferrer" target="_blank">Angular</a>, <a href="https://firebase.google.com/" rel="noopener noreferrer" target="_blank">Firebase</a>, and <a href="https://ant.design/" rel="noopener noreferrer" target="_blank">AntD</a>.</p>
            <h3>Quick Project Links</h3>
            <p style={{fontSize: '0.9rem'}}>Some projects are built into the site; to access them quickly, select from below.</p>
            <Link to="/projects"><Button type="secondary">All Projects</Button></Link>
            <Divider type="vertical"/>
            <Link to="/s">URL Shortener</Link>
            <Divider type="vertical"/>
            <Link to="/projects/namegen">Project Name Generator</Link>
            <Divider type="vertical"/>
            <Link to="/projects/owrank">Overwatch Rank Checker</Link>
            <Divider type="vertical"/>
            <Link to="/projects/food">Place to Eat</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
