import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

import React from 'react';

var FilterBar = (props) => {

  var onFilterClick = (e) => {
    props.handleStateChange(e);
  };

  return (
    <Navbar fixedTop inverse>
      <Navbar.Brand>
        <a href="/">Colorz.io</a>
      </Navbar.Brand>
      <Nav activeKey='allTime' bsStyle='pills' onSelect={onFilterClick}>
      {/*
        <NavDropdown eventKey='mostClicked' title='Popular' id='nav-dropdown'>
          <MenuItem eventKey='today' title='menuItem'>Today</MenuItem>
          <MenuItem eventKey='thisWeek' title='menuItem'>This Week</MenuItem>
          <MenuItem eventKey='thisMonth' title='menuItem'>This Month</MenuItem>
          <MenuItem eventKey='allTime' title='menuItem'>All-Time</MenuItem>
        </NavDropdown>
        */}
        <NavItem title='all' eventKey='all'>All</NavItem>
        <NavItem title='blue' eventKey='blue'>Blue</NavItem>
        <NavItem title='red' eventKey='red'>Red</NavItem>
        <NavItem title='green' eventKey='green'>Green</NavItem>
      </Nav>
      <Nav style={{paddingTop: '8px'}} pullRight>
        <Button bsStyle="primary" onClick={props.toggleSubmit}>Create New</Button>
      </Nav>

    </Navbar>
  )
}


module.exports = FilterBar;