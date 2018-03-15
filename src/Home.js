import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Spin, Button } from 'antd';
import Me from './img/me.jpg';
import Img from 'react-image';
import Lazy from 'react-lazy-load';
const ButtonGroup = Button.Group;

class Home extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" gutter={16}>
          <Col md={24} lg={6}>
            <Lazy width={220} className="right">
              <Img className="responsive-img shadow" style={{borderRadius: '10%', marginBottom: 10}} src={Me} alt="Jeff Zhong" loader={<Spin size="small" />}/>
            </Lazy>
          </Col>
          <Col md={24} lg={10}>
            <h2>About Me</h2>
            <p style={{fontSize: '0.9rem'}}>Hello and welcome. My name is Jeff Zhong, and I am a Front End/User Experience (UX) Developer and Engineer. I graduated from the University of Washington - Seattle in 2017, and currently work for AT&T (July 2017-Present). I enjoy creating and developing side projects to explore different technologies and bring to life my own interests, ideas, and style.</p>
            <p style={{fontSize: '0.9rem'}}>The technologies I have interest in at the moment include <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://angular.io/" rel="noopener noreferrer" target="_blank">Angular</a>, <a href="https://firebase.google.com/" rel="noopener noreferrer" target="_blank">Firebase</a>, and <a href="https://ant.design/" rel="noopener noreferrer" target="_blank">AntD</a>.</p>
            <h3>Quick Project Links</h3>
            <p style={{fontSize: '0.9rem'}}>Some projects are built into the site; to access them quickly, select from below.</p>
            <ButtonGroup>
              <Link to="/projects"><Button type="primary"> All Projects</Button></Link>
              <Link to="/s"><Button>URL Shortener</Button></Link>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
