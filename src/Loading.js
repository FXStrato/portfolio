import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';

class Loading extends Component {
  render() {
    return (
      <Row>
        <Col span={24} className="center-align">
          <Spin/>
        </Col>
      </Row>
    )
  }
}

export default Loading;
