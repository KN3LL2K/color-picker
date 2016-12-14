import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

import React from 'react';
import { Link } from 'react-router';

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
    <Nav pullRight>
      <NavItem eventKey={1}>
        <Link to="/create">
          <Button bsStyle="primary" onClick={props.toggleSubmit}>Create New</Button>
        </Link>
      </NavItem>
    </Nav>
    </Navbar>
  )
}


module.exports = TopBar;
