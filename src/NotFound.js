import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Img from 'react-image';
import Lazy from 'react-lazy-load';
import Boba from './img/boba_404.png';

class NotFound extends Component {

  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col sm={24} md={{span: 4}} className="center-align">
            <Lazy height={400}><Img src={Boba} className="respnsive-img" style={{maxHeight: 400}}/></Lazy>
          </Col>
          <Col sm={24} md={{span: 12}} className="center-align">
            <p className="flow-text">I'm sorry, but it seems like the page you were looking for does not exist. <br/> To return to the last page you were on, <a onClick={() => this.props.history.goBack()}>click here</a></p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NotFound;
