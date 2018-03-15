import React, { Component } from 'react';
import { Row, Col, Button, Popover } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Nouns from './etc/nouns';

class NameGen extends Component {

  state = {
    name: null,
    popover: false
  }

  generateName = () => {
    this.setState({name: null});
    let total = Nouns.list.length;
    let random = Math.floor(Math.random() * total);
    this.setState({name: Nouns.list[random]});
  }

  handleCopy = () => {
    this.setState({ popover: true });
    setTimeout(() => {
      this.setState({ popover: false });
    }, 1000)
  }

  render() {
    return (<div>
      <Row type="flex" justify="center" align="middle">
        <Col sm={24} md={24} lg={24} className="center-align">
          <h2>Project Name Generator</h2>
          <p style={{fontSize: '0.95rem'}}>Lost for a project name? This simple generator will produce a noun prefixed by "project".</p>
          <Button type="primary" size="large" onClick={this.generateName}>Generate Project Name</Button>
        </Col>
      </Row>
      {this.state.name &&
      <Row type="flex" justify="center" align="middle" className="animated fadeIn" style={{marginTop: 30}}>
        <Col sm={24} md={24} lg={10}>
          <CopyToClipboard text={"project " + this.state.name} onCopy={this.handleCopy}>
            <Popover visible={this.state.popover} placement="bottom" content="Project name copied">
              <Button className="full-width" size="large" type="secondary">project {this.state.name}</Button>
            </Popover>
          </CopyToClipboard>
        </Col>
      </Row>
      }
    </div>);
  }
}

export default NameGen;
