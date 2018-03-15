import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ProgressiveImage from 'react-progressive-image-loading';
import Img from 'react-image';
import Boba from './img/boba_404.png';

class NotFound extends Component {

  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Col md={8} lg={{span: 6}} style={{maxHeight: '400px !important'}}>
            <ProgressiveImage preview={Boba} src={Boba} render={(src, style) => <Img src={src} style={style} className="responsive-img"/>}/>
          </Col>
          <Col md={24} lg={{span: 10}} className="center-align">
            <p style={{fontSize: '1.2rem'}}>I'm sorry, but it seems like the page you were looking for does not exist. <br/> To return to the last page you were on, <a onClick={() => this.props.history.goBack()}>click here</a></p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NotFound;
