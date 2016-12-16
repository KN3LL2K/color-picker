import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import ColorFamilySingle from './ColorFamily/ColorFamilySingle.jsx';

class Palette extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      hover: false
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  getFamilyColors() {
    var result = [];
    var colors = this.props.colors;

    result.push(colors.tertiary2);
    result.push(colors.tertiary1);
    result.push(colors.primary);
    result.push(colors.secondary1);
    result.push(colors.secondary2);

    return result;
  }

  generateSingles() {
    debugger;
    return this.getFamilyColors().map(function(color, index) {
      return <ColorFamilySingle hover={this.state.hover} color={color} key={index} index={index}/>;
    });
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    let styles = {
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

module.exports = Palette;
