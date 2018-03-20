import React, { Component } from 'react';
import { Row, Col, Input, Card, Spin, Form, Tooltip, Icon, Avatar } from 'antd';
import Img from 'react-image';
import ProgressiveImage from 'react-progressive-image-loading';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts';
const Search = Input.Search;
const FormItem = Form.Item;

class OWRank extends Component {

  state = {
    id: null,
    loading: false,
    showData: false,
    noComp: false,
    data: null,
    error: {},
    colors: {
      "genji": "#76ff03",
      "torbjorn": "#ffab91",
      "doomfist": "#795548",
      "dva": "#f8bbd0",
      "reinhardt": "#b0bec5 ",
      "roadhog": "#a37632",
      "ana": "#87abd1",
      "widowmaker": "#b094e0",
      "mercy": "#fff9e2",
      "junkrat": "#dbad23",
      "mccree": "#b25353",
      "hanzo": "#c4b685",
      "sombra": "#7767bc",
      "soldier76": "#5d698c",
      "orisa": "#3a844b",
      "zenyatta": "#fff5ad",
      "reaper": "#8e3b45",
      "bastion": "#6c874f",
      "symmetra": "#a5dbef",
      "winston": "#a5a5af",
      "tracer": "#ffb83f",
      "zarya": "#f48fb1",
      "mei": "#58a2e2",
      "pharah": "#218fef",
      "lucio": "#88db64",
      "moira": "#662a31"
    }
  }

  async getData(id) {
    this.setState({ loading: true, noComp: false, id });
    //Get stats
    let url = "https://owapi.net/api/v3/u/" + id + "/blob";
    try {
      const response = await fetch(url);
      return response.json().then(res => {
        if (res.us !== undefined) {
          //Check if they are competitive or not
          if (res.us.stats.competitive) {
            this.setState({ loading: false, showData: true, data: res.us });
          } else {
            this.setState({ loading: false, noComp: true, showData: false, data: null, });
          }
        } else {
          let error = {
            status: 'error',
            msg: 'Data not found, please double check name or ID'
          }
          this.setState({ loading: false, showData: false, data: null, error });
        }
      });
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  getHeroesData = () => {
    let temp = [];
    let data = this.state.data.heroes.playtime.competitive;
    for (let elem in data) {
      let played = data[elem];
      let minutes = played * 60;
      temp.push({ name: this.capitalize(elem), time: played, minutes })
    }
    temp.sort((a, b) => { return (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0); });
    let most = temp[0].minutes;
    temp.forEach(e => {
      e.diff = most - e.minutes;
    })
    return temp;
  }

  checkSearch = val => {
    let pattern = new RegExp('^(.+)-([0-9]+)$', 'g');
    if (pattern.test(val)) this.getData(val);
    else {
      let error = {
        status: 'error',
        msg: 'Invalid entry, please double check input'
      }
      this.setState({ error });
    }
  }

  capitalize = val => {
    return val.charAt(0).toUpperCase() + val.substring(1);
  }

  getTime = val => {
    if ((val / 60) >= 1) return Math.floor(val / 60) + (Math.floor(val / 60) > 1 ? ' HRS' : ' HR');
    else if (val >= 1 && val < 60) return Math.floor(val) + ' MINS';
    else if (val < 1 && val > 0) return 'UNDER A MIN';
    else return val + ' MIN';
  }

  render() {
    const renderCustomizedLabel = (props) => {
      const { x, y, width, value } = props;
      return (
        <text fill="#fff" x={width+x - 10} y={y + 18} textAnchor="end">
          {this.getTime(value)}
        </text>
      );
    };
    let rank, heroes;
    if (this.state.data) {
      rank = this.state.data.stats.competitive.overall_stats;
      heroes = this.getHeroesData();
    }

    return (<div>
      <Row>
        <Col md={24} lg={{span: 12, offset: 6}}>
          <h2>Overwatch Rank Checker</h2>
          <p style={{fontSize: '0.95rem'}}>Search up a US player's competitive stats for the current season of Overwatch. Write the input as [Battlenet Name]-[Battlenet ID]</p>
          <p>NOTE: The search is case sensitive!</p>
          <Spin spinning={this.state.loading}>
            <Form>
              <FormItem validateStatus={this.state.error.status} help={this.state.error.msg}>
                <Search placeholder="ex. Neonine-1943" onSearch={this.checkSearch} disabled={this.state.loading} onChange={val => this.setState({error: {}})} enterButton="Check Rank" size="large" />
              </FormItem>
            </Form>
          </Spin>
        </Col>
      </Row>
      {this.state.showData &&
      <div>
        <Row style={{marginTop: 30}} type="flex" justify="center" gutter={16}>
          <Col md={24} lg={4} style={{marginBottom: 30}}>
            <Card loading={this.state.loading} className="full-width">
              <Row gutter={16} type="flex" justify="center" align="middle">
                <Col md={24} lg={12} className="center-align" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                  <ProgressiveImage preview={rank.tier_image} src={rank.tier_image} render={(src, style) => <Img className="responsive-img center-align" alt={rank.tier} src={src} style={style}/>}/>
                  <Tooltip title={this.capitalize(rank.tier)} placement="bottom">
                  <h3 style={{fontWeight: 'bold'}}>{rank.comprank}</h3>
                  </Tooltip>
                </Col>
                <Col md={24} lg={12} className="center-align">
                  <p><Avatar size="large" shape="square" src={rank.avatar}/></p>
                  <p>Level: {rank.prestige}<Icon type="star"/> | {rank.level}</p>
                  <p>Wins: {rank.wins}</p>
                  <p>Total Games: {rank.games}</p>
                  <p>Win Rate: {rank.win_rate}%</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={12} className="full-width">
            <ResponsiveContainer height={700}>
              <BarChart layout="vertical" data={heroes} barCategoryGap={0}>
                <Bar dataKey="minutes" stackId="a">
                  {
                    heroes.map((e, index) => {
                      return <Cell key={`cell-${index}`} fill={this.state.colors[e.name.toLowerCase()]}/>
                    })
                  }
                </Bar>
                <Bar dataKey="diff" stackId="a" fill="#d1d3d3">
                  <LabelList dataKey="minutes" position="insideRight" content={renderCustomizedLabel} />
                </Bar>
                <XAxis type="number" hide={true}/>
                <YAxis type="category" dataKey="name" width={90}/>
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </div>
      }
      {this.state.noComp &&
        <Row style={{marginTop: 30}} type="flex" justify="center" align="middle">
          <Col sm={24} md={24} lg={12} className="center-align">
            <h2>Not enough competitive data</h2>
            <p style={{fontSize: '0.95rem'}}>This can happen due not enough ranked games played, preseason occurring, or the API being updated.</p>
          </Col>
        </Row>
      }
    </div>);
  }
}

export default Form.create()(OWRank);
