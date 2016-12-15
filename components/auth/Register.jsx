import React from 'react';
import $ from 'jquery';
import { Button, Col, FormGroup, FormControl } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { browserHistory } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    }
  }

  alert(jsx) {
    this.setState({ alert: jsx });
  }

  hideAlert() {
    this.setState({ alert: null });
  }

  componentDidMount() {
    let $form = $('#registerForm');
    this.$username = $form.find('#username');
    this.$password = $form.find('#password');
    this.$verify = $form.find('#verify');
  }

  submitRegistration(e) {
    e.preventDefault();
    let $username = this.$username;
    let $password = this.$password;
    let $verify = this.$verify;

    let username = $username.val();
    let password = $password.val();
    let verify = $verify.val();
    if (password !== verify) {
      this.setState({ alert:
        <SweetAlert danger title="Passwords must match" onConfirm={this.hideAlert.bind(this)}/>
      });
    } else {
      let component = this;
      $.post('/signup', {
        username: username,
        password: password
      }).done(function(res) {
        component.alert(
          <SweetAlert success title="Registered Successfully" confirmBtnText="Yay!" onConfirm={browserHistory.push.bind(component, '/')}/>
        );
      }).fail(function(err) {
        component.alert(
          <SweetAlert danger title="Woops" confirmBtnText="Aww man!" onConfirm={component.hideAlert.bind(component)}>
            Something went wrong!
            <br/>
            (The username is probably already taken)
          </SweetAlert>
        );
      });
    }
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
        {this.state.alert}
      </Col>
    );
  }
};

module.exports = Register;
