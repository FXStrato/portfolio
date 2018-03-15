import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Row, Col, Input, Button, Form, Popover, Spin } from 'antd';
import md5 from 'js-md5';
import moment from 'moment';
import firebase from 'firebase';
const FormItem = Form.Item;
const Search = Input.Search;
const base = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

class Shortener extends Component {

  state = {
    encoded: null,
    value: '',
    custom: '',
    error: "",
    help: "",
    popover: false,
    loading: false,
    showCustom: false,
    customError: {},
  }

  componentWillMount = () => {
    this.db = firebase.firestore();
    if(this.props.match.params.code) {
      let code = this.props.match.params.code;
      this.db.collection('urls').doc(code).get().then(snap => {
        if(snap.exists) {
          window.location.assign(snap.data().longurl);
        } else {
          this.props.history.push({pathname: '/s', state: {path: code}});
        }
      })
    }
  }

  //Function to encode url, uses md5 hash before converting to base62, takes 8 char substring
  encode = (value, custom) => {
    this.setState({ encoded: null });
    let hash = "";
    let hashArr = [];
    let dividend = parseInt(md5(value), 36);
    let remainder = 0;

    while (dividend > 0) {
      remainder = Math.floor(dividend % 62);
      dividend = Math.floor(dividend / 62);
      hashArr.unshift(remainder);
    }

    if (hashArr.length > 8) {
      for (let i = 0; i < 8; i++) {
        hash += base[hashArr[i]];
      }
    } else {
      hashArr.forEach((val) => {
        hash += base[val];
      });
    }

    //If value does not contain http, need to add that in (default http)
    if(!value.includes("http://www.")) value = "http://www." + value;
    let sRef = this.db.collection('urls');
    this.setState({ loading: true });
    //Don't really need to check for existing hash, if 15 days is max TTL. If same hash is generated, refresh TTL
    let name = custom || hash;
    sRef.doc(name).set({
      longurl: value,
      entry: moment().format(),
    }).then(() => {
      this.setState({ loading: false, encoded: hash });
    }).catch(err => {
      console.log('Error setting generated url', err);
    })
  }

  checkValue = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  handleCopy = () => {
    this.setState({ popover: true });
    setTimeout(() => {
      this.setState({ popover: false });
    }, 1000)
  }

  handleCustom = (rule, value, callback) => {
    let pattern = new RegExp('^[a-zA-Z0-9_]*$');
    if (pattern.test(value)) {
      this.setState({ custom: value, customError: {} });
      callback();
    } else {
      callback('Invalid character(s) detected');
    }
  }

  handleInput = (rule, value, callback) => {
    if (value) {
      if (this.checkValue(value)) {
        if (!value.includes("jeffzhong.me/s/")) {
          //Value is good, can set
          this.setState({value});
          callback();
        } else {
          callback('URL has already been shortened');
        }
      } else {
        callback('Invalid URL');
      }
    } else {
      callback('Cannot submit an empty string');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //If custom exists, check if custom is already in firestore, if not use that.
        if(values.custom) {
          this.db.collection('urls').doc(values.custom).get().then(snap => {
            if(!snap.exists) {
              this.setState({customError: {}})
              this.encode(values.input, values.custom);
            } else {
              this.setState({encoded: null, customError: {status: 'error', msg: 'Custom link already exists'}})
            }
          }).catch(err => {
            console.log('Error checking if custom exists', err);
          })
        } else {
          this.encode(values.input);
        }
      }
    })
  }

  render() {
    let path;
    if(this.props.location.state) {
       path = this.props.location.state.path || false;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {!this.props.match.params.code ?
        <Row>
          <Col md={24} lg={{span: 12, offset: 6}}>
            {path && <p className="center-align">jeffzhong.me/s/{path} does not exist; bring it to life.</p>}
            <h2>URL Shortener</h2>
            <p style={{fontSize: '0.9rem'}}>Generate a shortened URL using Base62 encoding. Custom URLs are supported. Shortened URLs will last for 15 days.</p>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                <Button type="secondary" style={{marginBottom: 10}} onClick={() => this.setState({showCustom: !this.state.showCustom})}>{this.state.showCustom ? 'Hide Custom URL': 'Use Custom URL'}</Button>
                {getFieldDecorator('input', {
                  rules: [{}, {validator: this.handleInput}]
                })(<Search placeholder="Input URL" onPressEnter={this.handleSubmit} disabled={this.state.loading} enterButton="Shorten URL" size="large" />)}
              </FormItem>
              {this.state.showCustom &&
              <FormItem className="animated fadeIn" validateStatus={this.state.customError.status} help={this.state.customError.msg}>
                <p>Numbers and letters and underscores are supported. (ex. link3_status)</p>
                {getFieldDecorator('custom', {
                  rules: [{},{validator: this.handleCustom}]
                })(<Input size="large" placeholder="Custom URL" onPressEnter={this.handleSubmit}/>)}
              </FormItem>
              }
            </Form>
          </Col>
        </Row>
        :
        <Row>
          <Col sm={24} className="center-align">
            <h3>Redirecting...</h3>
            <Spin size="large"/>
          </Col>
        </Row>
        }
        <Spin spinning={this.state.loading}>
          <Row style={{marginTop: 20}}>
            <Col md={24} lg={{span: 12, offset: 6}}>
              {this.state.encoded &&
              <div className="animated fadeIn">
                <h2 className="center-align">Generated URL</h2>
                <CopyToClipboard text={"jeffzhong.me/s/" + this.state.encoded} onCopy={this.handleCopy}>
                  <Popover visible={this.state.popover} content="URL Copied">
                    <Button style={{width: '100%'}} size="large" type="secondary">jeffzhong.me/s/{this.state.encoded}</Button>
                  </Popover>
                </CopyToClipboard>
              </div>
              }
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

export default Form.create()(Shortener);
