import React from 'react';
import { Col } from 'react-bootstrap';
import $ from 'jquery';

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
      component.setState({ user: data });
    }).fail(function(err) {
      component.swal(<SweetAlert danger title={err.responseText} onConfirm={component.hideAlert}/>);
    });
  }

  renderProfile() {
    return (
      <h1>{this.state.user.username}&#39;s Profile</h1>
    );
  }

  render() {
    return (
      <Col id="profile" sm={10} smPush={1}>
        {this.state.loading ? <h3>Loading...</h3> : this.renderProfile()}
        <h1>Profile! Hey-oh!</h1>
      </Col>
    );
  }
}

module.exports = Profile;
