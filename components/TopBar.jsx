import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    }
  }

  logout() {
    let component = this;
    var finishLogout = function() {
      component.props.setUser(null, null);
      delete localStorage.username;
      delete localStorage.userId;
      component.props.hideAlert();
      browserHistory.push.bind(component, '/');
    }
    $.get('/logout').done(function() {
      component.props.swal(<SweetAlert success title="Logged Out" confirmBtnText="See you later!" onConfirm={finishLogout}/>);
    }).fail(function(err) {
      component.props.swal(
        <SweetAlert danger title="Failed to log out" confirmBtnText="How does this even happen?" onConfirm={component.props.hideAlert}/>
      );
    });
  }

  renderAuth() {
    if (!this.props.username) {
      return (
        <Nav>
          <LinkContainer to="/register">
            <NavItem>Register</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem>Log In</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
    return (
      <Nav>
      <LinkContainer to={`/profile/${localStorage.userId}`}>
        <NavItem>
          Weclome, {this.props.username}!
        </NavItem>
      </LinkContainer>
        <NavItem onClick={this.logout.bind(this)}>
          Log out
        </NavItem>
      </Nav>
    );
  }
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Colorz.io</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderAuth.call(this)}
        {
          !this.props.username ? null : (
            <Nav bsStyle="pills" pullRight>
              <LinkContainer to="/create">
                <NavItem>Create New</NavItem>
              </LinkContainer>
            </Nav>
          )
        }
      </Navbar>
    );
  }
}


module.exports = TopBar;
