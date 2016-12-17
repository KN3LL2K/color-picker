import React from 'react';
import $ from 'jquery';
import { InputGroup, Button, Col, FormGroup, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import SweetAlert from 'react-bootstrap-sweetalert';
import { browserHistory } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let $form = $('#loginForm');
    this.$username = $form.find('#username');
    this.$password = $form.find('#password');
  }

  submitLogin(e) {
    e.preventDefault();
    let username = this.$username.val();
    let password = this.$password.val();
    let component = this;
    $.post('/login', {
      username: username,
      password: password
    }).done(function(user) {
      let msg = `Logged in as ${user.username}`;
      component.finishLogin(user);
    }).fail(function(err) {
      let title = err.status === 401 ? err.responseText : 'Incorrect username or password';
      component.props.swal(
        <SweetAlert
          danger
          title={title}
          confirmBtnText="Dang!"
          onConfirm={component.props.hideAlert.bind(component)}
        />
      );
    });
  }

  finishLogin(user) {
    this.props.hideAlert();
    this.props.setUser(user.username, user.userId);
    browserHistory.push('/');
  }

  render() {
    return (
      <Col sm={6} smPush={3}>
        <form id="loginForm" onSubmit={this.submitLogin.bind(this)}>
          <FormGroup controlId="username">
            <InputGroup>
              <InputGroup.Addon><FontAwesome fixedWidth name='user' /></InputGroup.Addon>
              <FormControl type="text" placeholder="Username"/>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="password">
            <InputGroup>
              <InputGroup.Addon><FontAwesome fixedWidth name='key' /></InputGroup.Addon>
              <FormControl type="password" placeholder="Password"/>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="doLogin">
            <Button type="submit" bsStyle="primary">Login</Button>
          </FormGroup>
        </form>
      </Col>
    );
  }
}

module.exports = Login;
