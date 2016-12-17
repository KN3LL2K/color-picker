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
    // this.toggleHover = this.toggleHover.bind(this);
    // this.generateSingles = this.generateSingles.bind(this);
  }

  // componentDidMount() {
  //   console.log('props', this.props);
  // }

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

  render() {
    let styles = {
      palette: {
        width: '90%',
        height: 'auto',
      },
      wrapper: {
        paddingTop: '15px',
        paddingBottom: '15px'
      }
    };

    return (
      <div style={styles.wrapper}>
        <div onClick={this.props.clickHandler} className='palette row'>
          {this.getFamilyColors().map((color, index) => <Swatch color={color} key={index} />)}
          <br/><br/>
        </div>
      </div>
    );
  }
}

module.exports = Palette;
