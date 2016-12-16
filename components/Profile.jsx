import React from 'react';
import { Col } from 'react-bootstrap';
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';
import ColorFamily from './ColorFamily/ColorFamily.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
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
    let user = this.state.user
    debugger;
    return (
      <Col sm={12}>
        <h1>{user.info.username}&#39;s Profile</h1>
        <h3>Liked Swatches: {user.userLikes.length}</h3>
        <ul>
          {user.userLikes.map(function(swatch, index) {
           return <ColorFamily key={index}>{swatch.toString()}</ColorFamily>
          })}
        </ul>
        <h3>Created Swatches: {user.swatches.length}</h3>
        <ul>
          {user.swatches.map(function(swatch, index) {
           return <li key={index}>{swatch.toString()}</li>
          })}
        </ul>
      </Col>
    );
  }

  render() {
    return (
      <Col id="profile" sm={10} smPush={1}>
        {this.state.loading ? <h3>Loading...</h3> : this.renderProfile()}
      </Col>
    );
  }
}

module.exports = Profile;
