import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

var TopBar = (props) => {

  var onFilterClick = (e) => {
    props.handleStateChange(e);
  };

  return (
    <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Colorz.io</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/register">
        <NavItem>Register</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Log In</NavItem>
      </LinkContainer>
    </Nav>
    <Nav bsStyle="pills" pullRight>
      <LinkContainer to="/create">
        <NavItem eventKey={1} onClick={props.toggleSubmit}>Create New</NavItem>
      </LinkContainer>
    </Nav>
    </Navbar>
  )
}


module.exports = TopBar;
