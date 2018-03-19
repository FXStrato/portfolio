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
    error: {}
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
          console.log('Invalid ID');
          this.setState({ loading: false, showData: false, data: null });
        }
      });
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  getHeroesData = () => {
    let temp = [];
    let data = this.state.data.heroes.stats.competitive;
    for (let elem in data) {
      let played = data[elem].general_stats.time_played;
      let minutes = Math.floor(played * 60);
      temp.push({ name: this.capitalize(elem), time: played, minutes })
    }
    temp.sort((a, b) => { return (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0); });
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

  render() {
    let rank, heroes;
    if (this.state.data) {
      rank = this.state.data.stats.competitive.overall_stats;
      heroes = this.getHeroesData();
    }

    return (<div>
      <Row>
        <Col md={24} lg={{span: 12, offset: 6}}>
          <h2>OWRank</h2>
          <p style={{fontSize: '0.95rem'}}>Search up a US player's competitive stats for the current season of Overwatch. Write the input as [Battlenet Name]-[Battlenet ID]</p>
          <p>NOTE: The search is case sensitive!</p>
          <Spin spinning={this.state.loading}>
            <Form>
              <FormItem validateStatus={this.state.error.status} help={this.state.error.msg}>
                <Search placeholder="ex. Neonine-1943" onSearch={this.checkSearch} onChange={val => this.setState({error: {}})} enterButton="Check Rank" size="large" />
              </FormItem>
            </Form>
          </Spin>
        </Col>
      </Row>
      {this.state.showData &&
      <div>
        <Row style={{marginTop: 30}} type="flex" justify="center" align="middle" gutter={16}>
          <Col sm={12} md={12} lg={4}>
            <Card loading={this.state.loading} className="full-width">
              <Row gutter={16} type="flex" align="middle">
                <Col md={24} lg={12} className="center-align" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                  <ProgressiveImage preview={rank.tier_image} src={rank.tier_image} render={(src, style) => <Img className="responsive-img center-align" alt={rank.tier} src={src} style={style}/>}/>
                  <Tooltip title={this.capitalize(rank.tier)} placement="bottom">
                  <h3>{rank.comprank}</h3>
                  </Tooltip>
                </Col>
                <Col md={24} lg={12}>
                  <p><Avatar size="large" shape="square" src={rank.avatar}/></p>
                  <p>Level: {rank.prestige}<Icon type="star"/> | {rank.level}</p>
                  <p>Wins: {rank.wins}</p>
                  <p>Total Games: {rank.games}</p>
                  <p>Win Rate: {rank.win_rate}%</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={12}>
            <ResponsiveContainer height={600}>
              <BarChart layout="vertical" data={heroes}>
                <Bar dataKey="time" background={{fill: '#eee'}}>
                  {
                    heroes.map((e, index) => (
                      <Cell key={`cell-${index}`} fill="#0d47a1"/>
                    ))
                  }
                  <LabelList dataKey="minutes" position="end" formatter={v => `${v} hours`} />
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
            <h2>No Competitive Information Found</h2>
            <p style={{fontSize: '0.95rem'}}>Play some ranked to get data to display!</p>
          </Col>
        </Row>
      }
    </div>);
  }
}

export default Form.create()(OWRank);
