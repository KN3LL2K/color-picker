import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ColorFamilySingle from './ColorFamilySingle.jsx';


class ColorFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.toggleHover = this.toggleHover.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  getFamilyColors() {
    var result = [];
    var colors = this.props.colorFamily.colors;

    result.push(colors.tertiary2);
    result.push(colors.tertiary1);
    result.push(colors.primary);
    result.push(colors.secondary1);
    result.push(colors.secondary2);
    // for (var key in colors) {
    //   result.push(colors[key]);
    // }
    return result;
  }

  onClickHandler() {
    this.props.setCurrentFamily(this.props.colorFamily);
    this.props.toggleSidebarOn();
  }

  generateSingles() {
    return this.getFamilyColors().map(function(color, index) {
      return <ColorFamilySingle hover={this.state.hover} color={color} key={index} index={index}/>;
    }.bind(this));
  }

  render() {
    var styles = {
      rowStyle: {
        padding: '10px',
        height: 'px'
      }
    };
    return (
      <Row style={styles.rowStyle} onClick={this.onClickHandler} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
        {this.generateSingles()}
      </Row>
    );
  }

}

module.exports = ColorFamily;
