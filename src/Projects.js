import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse, Icon, Button } from 'antd';
import ProgressiveImage from 'react-progressive-image-loading';
import Img from 'react-image';
import Lazy from 'react-lazy-load';
import CoPlayBanner from './img/coplay_banner.png';
import ShortenerBanner from './img/shortener_banner.png';
import NamegenBanner from './img/namegen_banner.png';
import OwrankBanner from './img/owrank_banner.png';
const Panel = Collapse.Panel;


class Projects extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24} className="center-align">
            <h2>Projects</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <Collapse bordered={true} accordion={true}>
              <Panel header="CoPlay" key={1}>
                <Row gutter={16} style={{paddingLeft: 24}} type="flex" justify="center" align="middle">
                  <Col md={24} lg={12} style={{marginBottom: 15}}>
                    <Lazy>
                      <ProgressiveImage preview={CoPlayBanner} src={CoPlayBanner} render={(src, style) => <Img className="responsive-img shadow" style={style} src={src} alt="CoPlay Room Example"/>}/>
                    </Lazy>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="center-align">
                      <a href="https://coplay-840e6.firebaseapp.com/" target="_blank" rel="noopener noreferrer"><Button type="secondary" style={{marginBottom: 5, marginRight: 5}}>Check It Out</Button></a>
                      <a href="https://github.com/FXStrato/coplay" target="_blank" rel="noopener noreferrer"><Button type="secondary" style={{marginBottom: 5, marginRight: 5}}><Icon type="github"/></Button></a>
                    </div>
                    <h3>About</h3>
                    <p>CoPlay is an application intended to allow users to listen to a playlist of songs at the same time. Users queue up music from Youtube, and each song is then played in succession.</p>
                    <h3>Technologies Used</h3>
                    <p>React, Firebase, Bulma.io</p>
                    <h3>Features</h3>
                    <ul>
                      <li>Anyone can create a room, simply by clicking on Create Room which will generate a unique url to share</li>
                      <li>The room owner can pause, play, skip, and also choose to make their room public and show on the room list tab (rooms are private by default)</li>
                      <li>Guests of the room are able to queue up songs, and remove their own songs from queue, but do not have the ability to modify the current song</li>
                      <li>A list of songs that have played is aggregated in the history tab.</li>
                    </ul>
                    <h3>Ambition</h3>
                    <p>CoPlay was developed originally within a student group in a class called Info343 at the University of Washington in 2017. The original idea which I pitched was for friends and individuals to have the ability to listen to the same song together at the same time, with an example of only need one computer playing music while others can queue up the songs they want themselves and others to listen to. After the class ended, I continued to develop on it, recreating it from scratch with similar logic but with my own implementations; it is currently intended to be desktop only, but there are plans to make this into a complete, stand alone application that is both mobile and desktop friendly.</p>
                  </Col>
                </Row>
              </Panel>
              <Panel header="URL Shortener" key={2}>
                <Row gutter={16} style={{paddingLeft: 24}}>
                  <Col md={24} lg={12} style={{marginBottom: 15}}>
                    <Lazy>
                      <ProgressiveImage preview={ShortenerBanner} src={ShortenerBanner} render={(src, style) => <Img className="responsive-img shadow" style={style} src={src} alt="URL Shortener Example"/>}/>
                    </Lazy>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="center-align">
                      <Link to="/s"><Button type="secondary" style={{marginBottom: 5, marginRight: 5}}>Check It Out</Button></Link>
                    </div>
                    <h3>About</h3>
                    <p>A simple URL shortener using Base62 and md5 to encode and shorten a URL.</p>
                    <h3>Technologies Used</h3>
                    <p>React, Firebase/Firestore, AntD</p>
                    <h3>Features</h3>
                    <ul>
                      <li>Unique hashing for each URL using md5 and Base62 encoding.</li>
                      <li>Supports the use of custom URL links.</li>
                      <li>Each URL has a 15 day lifespan, but can be refreshed if the same URL is requested again (does not apply to custom URLs).</li>
                      <li>Integrity checks prevent duplicate insertions and invalid inputs.</li>
                    </ul>
                    <h3>Ambition</h3>
                    <p>A URL shortener has always been an interesting tool that I wanted to create. I decided to give it a shot, and develop one to learn about how it worked.I imported the md5 encryption, but developed a Base62 encoding to use.</p>
                  </Col>
                </Row>
              </Panel>
              <Panel header="Project Name Generator" key={3}>
                <Row gutter={16} style={{paddingLeft: 24}}>
                  <Col md={24} lg={12} style={{marginBottom: 15}}>
                    <Lazy>
                      <ProgressiveImage preview={NamegenBanner} src={NamegenBanner} render={(src, style) => <Img className="responsive-img shadow" style={style} src={src} alt="Project Name Generator Example"/>}/>
                    </Lazy>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="center-align">
                      <Link to="/projects/namegen"><Button type="secondary" style={{marginBottom: 5, marginRight: 5}}>Check It Out</Button></Link>
                    </div>
                    <h3>About</h3>
                    <p>A simple project name generator.</p>
                    <h3>Technologies Used</h3>
                    <p>React, AntD</p>
                    <h3>Features</h3>
                    <ul>
                      <li>Generate a project name using a json file of nouns.</li>
                      <li>Names are randomly generated from a list of 4500+ nouns.</li>
                    </ul>
                    <h3>Ambition</h3>
                    <p>In the past, I've struggled to come up with fancy sounding names for my projects. Now, with naming conventions like those of Github and Heroku, they've become much easier. I also wanted to try and come up with a simple and quick manner to name a project, and here we are.</p>
                  </Col>
                </Row>
              </Panel>
              <Panel header="Overwatch Rank Checker" key={4}>
                <Row gutter={16} style={{paddingLeft: 24}}>
                  <Col md={24} lg={12} style={{marginBottom: 15}}>
                    <Lazy>
                      <ProgressiveImage preview={OwrankBanner} src={OwrankBanner} render={(src, style) => <Img className="responsive-img shadow" style={style} src={src} alt="Overwatch Rank Checker Example"/>}/>
                    </Lazy>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="center-align">
                      <Link to="/projects/owrank"><Button type="secondary" style={{marginBottom: 5, marginRight: 5}}>Check It Out</Button></Link>
                    </div>
                    <h3>About</h3>
                    <p>Check a person's rank and most played heroes for the current competitive season in the game Overwatch.</p>
                    <h3>Technologies Used</h3>
                    <p>React, AntD, <a href="https://github.com/Fuyukai/OWAPI" target="_blank" rel="noopener noreferrer">OWAPI</a>, <a href="http://recharts.org/#/en-US/" target="_blank" rel="noopener noreferrer">Recharts</a></p>
                    <h3>Features</h3>
                    <ul>
                      <li>Utilizes an overwatch API (OWAPI) to acquire data.</li>
                      <li>Displays current season's rank, games won, total games played, win ratio, avatar, and competitive time played for each hero.</li>
                      <li></li>
                    </ul>
                    <h3>Ambition</h3>
                    <p>I wanted to be able to view my friends' ranked information without having to go online ingame to check. I wanted to make my own small, unique checker so that I can look up the information I need quickly and without the necessity of being ingame to do so.</p>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
