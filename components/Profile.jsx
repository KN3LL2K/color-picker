import React from 'react';
import { Col, Grid } from 'react-bootstrap';
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import Palette from './Palette.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    let component = this;
    $.get(`/api/users/${this.props.params.id}`).done(function(data) {
      component.setState({
        user: data,
        loading: false
      });
    }).fail(function(err) {
      component.props.swal(<SweetAlert danger title={err.responseText} onConfirm={component.props.hideAlert}/>);
    });
  }

  renderProfile() {
    let user = this.state.user;
    return (
      <Col xs={12}>
        <h1>{user.info.username}&#39;s Profile</h1>
        <Col sm={6}>
          <h4>Liked Palettes: {user.userLikes.length}</h4>
          <ul>
            {user.userLikes.map(function(palette, index) {
              return <li key={index}><Palette colorFamily={{colors: palette.colorId.colors}} /></li>;
            })}
          </ul>
        </Col>
        <Col sm={6}>
          <h4>Created Palettes: {user.swatches.length}</h4>
          <ul>
            {user.swatches.map(function(palette, index) {
              return <li key={index}><Palette key={index} colorFamily={{colors: palette.colors}} /></li>;
            })}
          </ul>
        </Col>
      </Col>
    );
  }

  render() {
    return (
      <Grid id="profile" fluid>
        {this.state.loading ? <h3>Loading...</h3> : this.renderProfile()}
      </Grid>
    );
  }
}

module.exports = Profile;
