import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import firebase from 'firebase';
import moment from 'moment';
import {
  Row,
  Col,
  Layout,
  Menu,
  Dropdown,
  Icon,
} from 'antd';
import Loadable from 'react-loadable';
import Loading from './Loading';
import Logo from './img/logo.png';
const { Header, Content, Footer } = Layout;
const Home = Loadable({
  loader: () =>
    import('./Home'),
  loading: Loading
})
const Projects = Loadable({
  loader: () =>
    import('./Projects'),
  loading: Loading
})
const Shortener = Loadable({
  loader: () =>
    import('./Shortener'),
  loading: Loading
})
const NameGen = Loadable({
  loader: () =>
    import('./NameGen'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () =>
    import('./NotFound'),
  loading: Loading
})

class App extends Component {

  componentWillMount = () => {
    //Run an async check on all urls, remove ones that are 15+ days old
    let db = firebase.firestore();
    let sRef = db.collection('urls');
    let current = moment();
    sRef.get().then(snap => {
      snap.forEach(doc => {
        if(current.diff(moment(doc.data().entry), 'days') > 15) {
          sRef.doc(doc.id).delete();
        }
      })
    }).catch(err => {
      console.log('Error obtaining urls list', err);
    })
  }

  highlightMenu = () => {
    switch (this.props.location.pathname) {
    case '/':
      return '1';
    case '/projects':
      return '2';
    case '/s':
      return '2';
    default:
      return '';
    }
  }

  render() {
    let defaultMenuKey = this.highlightMenu();
    const dropdownMenu = (<Menu selectedKeys={[defaultMenuKey]}>
      <Menu.Item key="1">
        <Link to="/" className="spaced">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/projects" className="spaced">Projects</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a className="spaced" href="https://www.linkedin.com/in/jeff-zhong-1a3036125/" rel="noopener noreferrer" target="_blank"><Icon type="linkedin" style={{marginRight: 5}}/>LinkedIn</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a className="spaced" href="https://github.com/FXStrato" rel="noopener noreferrer" target="_blank"><Icon type="github" style={{marginRight: 5}}/>Github</a>
      </Menu.Item>
    </Menu>);
    return (
      <Layout className="layout" style={{height: "100vh"}}>
      <Header className="animated fadeIn">
        <Row>
            <Col sm={12} md={20}>
              <div style={{
                  float: 'left',
                  color: 'black',
                  marginRight: 20,
                  marginLeft: -10
                }}>
                <Link to="/"><img className="responsive-img" style={{
                maxHeight: 48,
                marginTop: -5
              }} src={Logo} alt="Portfolio Logo"/></Link>
              </div>
              <Menu mode="horizontal" className="hide-on-med-and-down" selectedKeys={[defaultMenuKey]} style={{
                  lineHeight: '62px',
                  borderBottom: 'none',
                }}>
                <Menu.Item key="1">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/projects">Projects</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <a href="https://www.linkedin.com/in/jeff-zhong-1a3036125/" rel="noopener noreferrer" target="_blank"><Icon type="linkedin"/>LinkedIn</a>
                </Menu.Item>
                <Menu.Item key="4">
                  <a href="https://github.com/FXStrato" rel="noopener noreferrer" target="_blank"><Icon type="github"/>Github</a>
                </Menu.Item>
              </Menu>
            </Col>
            <Col sm={4} md={4} className="right-align hide-on-med-and-up show-on-med right">
              <Dropdown overlay={dropdownMenu} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" style={{
                    textDecoration: 'none',
                    color: '#000',
                    marginRight: -10,
                  }} href="">
                  <i className="material-icons" style={{paddingTop: 20}}>menu</i>
                </a>
              </Dropdown>
            </Col>
          </Row>
      </Header>
      <Content style={{margin: '24px 16px 0'}}>
        <div style={{
            padding: 24,
            background: '#fff',
            minHeight: 360
          }}>
            <Switch>
              <Route exact={true} path="/" render={(props) => <Home {...props}/>}/>
              <Route exact={true} path="/projects" component={Projects}/>
              <Route exact={true} path="/s" component={Shortener}/>
              <Route exact={true} path="/projects/namegen" component={NameGen}/>
              <Route exact={true} path="/s/:code" component={Shortener}/>
              <Route component={NotFound}/>
            </Switch>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Jeff Zhong ©2018
      </Footer>
    </Layout>
    );
  }
}

export default withRouter(App);
