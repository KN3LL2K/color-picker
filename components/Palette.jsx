import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import ColorFamilySingle from './ColorFamily/ColorFamilySingle.jsx';
import Swatch from './Swatch.jsx';

class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  getFamilyColors() {
    debugger;
    var result = [];
    var colors = this.props.colorFamily.colors;

    result.push(colors.tertiary2);
    result.push(colors.tertiary1);
    result.push(colors.primary);
    result.push(colors.secondary1);
    result.push(colors.secondary2);

    return result;
  }

  render() {
    return (
      <div className='wrapper'>
        <div onClick={this.props.clickHandler} className='palette row'>
          {this.getFamilyColors().map((color, index) => <Swatch color={color} key={index} />)}
        </div>
      </div>
    );
  }
}

module.exports = Palette;
