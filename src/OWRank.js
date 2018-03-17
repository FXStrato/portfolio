import React, { Component } from 'react';
import { Row, Col, Input, Card, Avatar, Spin } from 'antd';
import Img from 'react-image';
const Search = Input.Search;


class OWRank extends Component {

  state = {
    id: null,
    loading: false,
    showData: false,
    noComp: false,
    data: null,
  }

  async getData(id) {
    this.setState({ loading: true, noComp: false, id });
    //Get stats
    let url = "https://owapi.net/api/v3/u/" + id + "/blob";
    try {
      const response = await fetch(url);
      return response.json().then(res => {
        if(res.us !== undefined) {
          //Check if they are competitive or not
          if(res.us.stats.competitive) {
            this.setState({ loading: false, showData: true, data: res.us });
          } else {
            this.setState({loading: false, noComp: true, showData: false, data: null,});
          }
        } else {
          console.log('Invalid ID');
          this.setState({loading: false, showData: false, data: null});
        }
      });
    } catch (err) {
      console.log('fetch failed', err);
    }
  }

  render() {
    let rank, hero;
    if(this.state.data)  {
      rank = this.state.data.stats.competitive.overall_stats;
      hero = this.state.data.heroes.stats.competitive;
    }
    return (<div>
      <Row>
        <Col md={24} lg={{span: 12, offset: 6}}>
          <h2>OWRank</h2>
          <p style={{fontSize: '0.95rem'}}>Search up a US player's competitive stats for this season. Write the input as [Battlenet Name]-[Battlenet ID]</p>
          <Spin spinning={this.state.loading}>
            <Search placeholder="ex. Neonine-1943" onSearch={value => this.getData(value)} enterButton="Check Rank" size="large" />
          </Spin>
        </Col>
      </Row>
      {this.state.showData &&
      <div>
        <Row style={{marginTop: 30}} type="flex" justify="center" align="middle" gutter={16}>
          <Col sm={12} md={12} lg={4}>
            <Card
              loading={this.state.loading}
              style={{ width: '100%'}}
              cover={<Img className="responsive-img center-align" style={{maxWidth: 300, marginLeft: 'auto', marginRight: 'auto'}} alt={rank.tier} src={rank.tier_image} />}
            >
              <p>Card information goes here</p>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={12}>
            Hero information will display here
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

export default OWRank;
