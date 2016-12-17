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

  // generateSingles() {
  //   // debugger;
  //   let component = this;
  //   return this.getFamilyColors().map(function(color, index) {
  //     return <ColorFamilySingle hover={component.state.hover} color={color} key={index} index={index}/>;
  //   });
  // }

  // toggleHover() {
  //   this.setState({hover: !this.state.hover});
  // }



  render() {
    let styles = {
      palette: {
        width: '90%',
        height: 'auto',
        // paddingTop: '10px',
        // paddingBottom: '10px'
        // position: 'absolute'
      }
    };

    return (
      <div style={styles.palette} onClick={this.props.clickHandler} className='palette row'>
        {this.getFamilyColors().map((color, index) => <Swatch color={color} key={index} />)}
        <br/><br/>
      </div>
    );
  }
}

module.exports = Palette;
