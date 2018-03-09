import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './Loading';
import { Row, Col } from 'antd';
const Home = Loadable({
  loader: () =>
    import('./Home'),
  loading: Loading
})
const About = Loadable({
  loader: () =>
    import('./About'),
  loading: Loading
})

class App extends Component {
  render() {
    return (<div>
      <Row>
        <Col span={24}>
          <h1>App.js</h1>
          <Link to="/" style={{marginRight: 10}}>Home</Link>
          <Link to="/about">About</Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h2>Routes</h2>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Col>
      </Row>
    </div>);
  }
}

export default withRouter(App);
