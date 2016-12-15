import React from 'react';
import $ from 'jquery';
import { Button, Col, FormGroup, FormControl } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { browserHistory } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let $form = $('#registerForm');
    this.$username = $form.find('#username');
    this.$password = $form.find('#password');
    this.$verify = $form.find('#verify');
  }

  submitRegistration(e) {
    e.preventDefault();
    let username = this.$username.val();
    let password = this.$password.val();
    let verify = this.$verify.val();

    if (password !== verify) {
      return this.props.swal(
        <SweetAlert danger title="Passwords must match" confirmBtnText="You're not my dad!" onConfirm={this.props.hideAlert}/>
      );
    }

    let component = this;
    $.post('/signup', {
      username: username,
      password: password
    }).done(function(res) {
      component.props.swal(
        <SweetAlert success title="Registered Successfully" confirmBtnText="Yay!" onConfirm={component.finishRegistration.bind(component, username)}/>
      );
    }).fail(function(err) {
      component.props.swal(
        <SweetAlert danger title="Woops" confirmBtnText="Aww man!" onConfirm={component.props.hideAlert}>
          Something went wrong!
          <br/>
          (The username is probably already taken)
        </SweetAlert>
      );
    });
  }

  finishRegistration(username) {
    this.props.hideAlert();
    this.props.setUser(username);
    localStorage.username = username;
    browserHistory.push('/');
  }

  render() {
    return (
      <Col sm={10} smPush={1}>
        <form id="registerForm" onSubmit={this.submitRegistration.bind(this)}>
          <FormGroup controlId="username">
            <FormControl type="text" placeholder="Username"/>
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl type="password" placeholder="Password"/>
          </FormGroup>
          <FormGroup controlId="verify">
            <FormControl type="password" placeholder="Verify Password"/>
          </FormGroup>
          <FormGroup controlId="doRegister">
            <Button type="submit" bsStyle="primary">Register</Button>
          </FormGroup>
        </form>
      </Col>
    );
  }
};

module.exports = Register;
