import React, { Component } from 'react';
import { Row, Col, Progress, Button, Icon, Select, Form, message, Card, Tag } from 'antd';
import ProgressiveImage from 'react-progressive-image-loading';
import Img from 'react-image';
const FormItem = Form.Item;
const Option = Select.Option;
const { Meta } = Card;

class Food extends Component {

  state = {
    yelpKey: 's5fm8-v2z6wb9cor8eUDDvkYQFt1flZeoqbx1hVxu2onKgeC5dCbFpL9dvftLMgP9iNxAIoNxwiI5y4PL6C12E434wpRNw_tkAKpLgm0Huw9R-C10KUUmJa_FbKyWnYx',
    embedKey: 'AIzaSyDWqtue67lekxFKRFzhgm-f1-4A7znrXOU',
    geoCodeKey: 'AIzaSyCPVqrtGTlCrgFYcHLOI_bKxI225h6fkvk',
    latlong: null,
    location: null,
    loading: false,
    showPercent: false,
    showAdvanced: false,
    percent: 0,
    search: {},
    data: null
  }

  componentWillMount = () => {
    //If unable to set, browser does not support geolocation or was denied
    this.setState({ showPercent: true });
    if (navigator.geolocation) {
      this.setState({ search: { radius: 1600, price: '1,2,3', term: 'food' } });
      navigator.geolocation.getCurrentPosition(el => {
        this.setState({ latlong: { lat: el.coords.latitude, long: el.coords.longitude }, percent: 50 });
        this.getLocation(el.coords);
      }, err => {
        this.setState({ showPercent: false });
        console.log(err);
      })
    }
  }

  async getLocation(el) {
    try {
      const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + el.latitude + "," + el.longitude + "&key=" + this.state.geoCodeKey);
      await response.json().then(res => {
        if (res.results.length > 0) {
          this.setState({ location: res.results[0].formatted_address, percent: 100 });
          setTimeout(() => {
            this.setState({ showPercent: false });
          }, 500);
        } else this.setState({ showPercent: false });
      }).catch(err => {
        this.setState({ showPercent: false });
        console.log(err);
      });
    } catch (err) {
      this.setState({ showPercent: false });
      message.error('Unable to fetch data from Google Maps');
    }
  }

  async getFood() {
    try {
      this.setState({ loading: true });
      let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
      url += '?term=' + this.state.search.term;
      url += '&latitude=' + this.state.latlong.lat;
      url += '&longitude=' + this.state.latlong.long;
      url += '&radius=' + this.state.search.radius;
      url += '&price=' + this.state.search.price;
      url += '&open_now=true';
      const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + this.state.yelpKey } });
      await response.json().then(res => {
        if (res.businesses && res.businesses.length > 0) {
          this.setState({ loading: false, data: res });
        } else if (res.error) {
          message.error(res.error.description);
          this.setState({ loading: false });
        } else {
          message.error('No food places found (try modifying settings)');
          this.setState({ loading: false });
        }
      }).catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
    } catch (err) {
      this.setState({ loading: false });
      message.error('Unable to fetch data from Yelp');
      console.log('Yelp fetch failed', err);
    }
  }

  handleQuery = (param, val) => {
    let temp = this.state.search;
    if (param === 'radius') temp[param] = val === 'Walking' ? 1600 : 16100;
    else if (param === 'price') {
      if (val === 'All') temp[param] = '1,2,3';
      else temp[param] = val.length;
    }
    else {
      temp[param] = val;
    }

    this.setState({ search: temp });
  }

  render() {
    let data, tags, directions_url;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    if (this.state.data) {
      tags = [];
      //Randomly select one from available list
      data = this.state.data.businesses[Math.floor(Math.random() * this.state.data.businesses.length)];
      console.log(data);
      data.miles = (data.distance / 1609.34).toFixed(1);
      data.address = data.location.display_address[0] + ', ' + data.location.display_address[1];
      data.categories.forEach(el => {
        tags.push(<Tag key={`tag-${el.alias}`}>{el.alias}</Tag>)
      })
      directions_url = "https://www.google.com/maps/dir/?api=1&origin=" + this.state.location.replace(/ /g, '+') + '&destination=' + data.address.replace(/ /g, '+') + '&travelmode=' + (this.state.search.radius === 1600 ? 'transit' : 'driving');
    }

    return (<div>
      {this.state.showPercent ?
      <Row type="flex" justify="center" align="middle" className="animated fadeIn">
        <Col sm={24} className="center">
          <Progress type="circle" percent={this.state.percent} />
          {this.state.percent < 100 && <h3>Loading App...</h3>}
        </Col>
      </Row>
      :
      <div>
        {!this.state.data ?
        <Row type="flex" justify="center" align="middle" className="animated fadeIn">
          <Col sm={24} className="center">
            {this.state.latlong ?
            <div>
              <p>Need a place to go for food but can't decide where? <br/> Press the button below. No backsies now.</p>
              <Button disabled={this.state.loading} onClick={() => this.getFood()}
                style={{width: 100, height: 100, marginBottom: 20}} type="primary" shape="circle" size="large">{this.state.loading ? <Icon type="loading" style={{fontSize: 40}}/> : <Icon type="environment" style={{fontSize: 40}}/>}</Button>
              <p>Current Location: <br/>{this.state.location}</p>
              {!this.state.loading && <p><a onClick={() => this.setState({showAdvanced: !this.state.showAdvanced})}>Advanced Settings {this.state.showAdvanced ? <Icon type="up"/> : <Icon type="down"/>}</a></p>}
            </div>
            :
            <p>Unable to obtain geolocation, please allow for the site to use your location to use the application.</p>
            }
          </Col>
          {this.state.showAdvanced &&
          <Col sm={24}>
            <Form style={{marginTop: 10}}>
              <FormItem label="Mode of Transportation" {...formItemLayout}>
                <Select defaultValue="Walking/Transit" style={{ width: 120 }} onChange={(val) => this.handleQuery('radius', val)}>
                  <Option value="Walking">Walking/Transit</Option>
                  <Option value="Driving">Driving</Option>
                </Select>
              </FormItem>
              <FormItem label="Type" {...formItemLayout}>
                <Select defaultValue="Food" style={{ width: 120 }} onChange={(val) => this.handleQuery('term', val)}>
                  <Option value="Food">Food</Option>
                  <Option value="Drinks">Drinks</Option>
                </Select>
              </FormItem>
              <FormItem label="Price Range" {...formItemLayout}>
                <Select defaultValue="All" style={{ width: 120 }} onChange={(val) => this.handleQuery('price', val)}>
                  <Option value="$">$</Option>
                  <Option value="$$">$$</Option>
                  <Option value="$$$">$$$</Option>
                  <Option value="All">All</Option>
                </Select>
              </FormItem>
            </Form>
          </Col>
          }
        </Row>
        :
        <Row type="flex" justify="center" align="middle" className="animated fadeIn">
          <Col sm={24} md={12} lg={6} className="center">
            <h2>Your Destination</h2>
            <Card
              style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}
              cover={<ProgressiveImage preview={data.image_url} src={data.image_url} render={(src, style) => <Img className="responsive-img center" alt={data.id} src={src} style={style}/>}/>}
              actions={[<a href={directions_url} target="_blank" rel="noopener noreferrer">Get Directions</a>, <a href={data.url} target="_blank" rel="noopener noreferrer">More Info</a>]}
            >
              <Meta
                title={data.name}
                description={`${data.miles} miles away`}
                style={{marginBottom: 10}}
              />
              <p>{data.address}</p>
              <p><a href={`tel:${data.phone}`}>{data.display_phone}</a></p>
              <div>{tags}</div>
            </Card>
          </Col>
        </Row>
        }
      </div>
      }
    </div>);
  }
}

export default Form.create()(Food);
