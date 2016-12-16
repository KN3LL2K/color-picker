import React from 'react';
import $ from 'jquery';
import { InputGroup, Button, Col, FormGroup, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
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
    }).done(function(user) {
      user.username = username;
      let msg = `Registered as ${user.username}`;
      component.props.swal(
        <SweetAlert success title={msg} confirmBtnText="Yay!" onConfirm={component.finishRegistration.bind(component, user)}/>
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

  finishRegistration(user) {
    this.props.hideAlert();
    this.props.setUser(user.username, user.userId);
    browserHistory.push('/');
  }

  render() {
    return (
      <Col sm={6} smPush={3}>
        <form id="registerForm" onSubmit={this.submitRegistration.bind(this)}>
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
          <FormGroup controlId="verify">
            <InputGroup>
              <InputGroup.Addon><FontAwesome fixedWidth name='key' /></InputGroup.Addon>
              <FormControl type="password" placeholder="Verify Password"/>
            </InputGroup>
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
