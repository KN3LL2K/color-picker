import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import ColorFamilySingle from './ColorFamily/ColorFamilySingle.jsx';

class Swatch extends React.Component {
  constructor(props) {
    super(props);
    debugger;
  }

  getFamilyColors() {
    var result = [];
    var colors = this.props.colorFamily.colors;

    result.push(colors.tertiary2);
    result.push(colors.tertiary1);
    result.push(colors.primary);
    result.push(colors.secondary1);
    result.push(colors.secondary2);

    return result;
  }

  generateSingles() {
    return this.getFamilyColors().map(function(color, index) {
      return <ColorFamilySingle hover={this.state.hover} color={color} key={index} index={index}/>;
    }.bind(this));
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    var styles = {
      rowStyle: {
        padding: '10px',
        height: 'px'
      }
    };
    return (
      <Row style={styles.rowStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover} >
        {this.generateSingles()}
      </Row>
    );
  }
}

module.exports = Swatch;
