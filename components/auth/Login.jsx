import React from 'react';
import $ from 'jquery';
import { Button, Col, FormGroup, FormControl } from 'react-bootstrap';
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
    }).done(function(msg) {
      debugger;
      component.props.swal(<SweetAlert success title={msg} confirmBtnText="Nice!" onConfirm={component.finishLogin.bind(component, username)}/>);
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

  finishLogin(username) {
    this.props.hideAlert();
    this.props.setUser(username);
    localStorage.username = username;
    browserHistory.push('/');
  }

  render() {
    return (
      <Col sm={10} smPush={1}>
        <form id="loginForm" onSubmit={this.submitLogin.bind(this)}>
          <FormGroup controlId="username">
            <FormControl type="text" placeholder="Username"/>
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl type="password" placeholder="Password"/>
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
