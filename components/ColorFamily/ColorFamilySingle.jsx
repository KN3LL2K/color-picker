import React from 'react';
import {Col} from 'react-bootstrap';
import ColorFamily from './ColorFamily.jsx';
import CopyToClipboard from 'react-copy-to-clipboard';

class ColorFamilySingle extends React.Component {
  constructor(props) {
    super(props);
  }
  hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : null;
  }
  render() {
    // var rgb = this.hexToRGB(this.props.color);
    let fontColor = null;
    //Functionality for hover on single color to show hex value, either light or dark
    //Not currently implemented but available in css file under .color-single

    // TODO reimplement this in some fasion
    // if (rgb.red > 127 || rgb.green > 127 || rgb.blue > 127) {
    fontColor = '#000000';
    // } else {
      // fontColor = '#ffffff';
    // }
    var styles = {
      background: {
        backgroundColor: this.props.color,
        height: "100px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
      },
      text: {
        color: fontColor,
      }
    };
    if (this.props.hover) {
      styles.background.boxShadow = '-3px 0 10px';
    }
    return (
      <div>
      {this.props.index === 0 ? (
        <Col className="color-single" style={styles.background} xs={2} xsOffset={1}>
          <h4 style={styles.text}>{this.props.color}</h4>
        </Col>
      ) : (
        <Col className="color-single" style={styles.background} xs={2}>
          <h4 style={styles.text}>{this.props.color}</h4>
        </Col>
      )}
      </div>
    );
  }
}

module.exports = ColorFamilySingle;
