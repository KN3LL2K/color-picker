import React from 'react';
import ColorInfoView from '../ColorInfoView.jsx';
import { Panel, Button, Row, Col, Grid } from 'react-bootstrap';
import { browserHistory } from 'react-router';


var hexToRGB = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

class ColorFamilyInfoView extends React.Component {
  constructor(props) {
    super(props);
  }

  convertHexToRGB() {
    var objArr = [];
    var colors = this.props.currentFamily.colors
    for (var key in colors) {
      if (key.match(/^color./)) {
        var newObj = {};
        var rgbObj = hexToRGB(colors[key]);
        var rgb = 'rgb(' + rgbObj.r + ', ' + rgbObj.g + ', ' + rgbObj.b + ')';
        var newObj = {hex: colors[key], rgb: rgb};
        objArr.push(newObj);
      }
    }
    return objArr;
  }

  editPalette() {
    let colors = this.props.currentFamily.colors;
    localStorage.primary = colors.primary;
    localStorage.secondary1 = colors.secondary1;
    localStorage.secondary2 = colors.secondary2;
    localStorage.tertiary1 = colors.tertiary1;
    localStorage.tertiary2 = colors.tertiary2;
    localStorage.paletteName = this.props.currentFamily.name;
    browserHistory.push(`/swatch/edit/${this.props.currentFamily._id}`);
  }

  render() {
    // this component can render without a currentFamily
    let colors = this.props.currentFamily.colors || {};
    var styles = {
      borderColor1: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: colors.primary
      },
      bgColor1: {
        margin: '1px',
        backgroundColor: colors.primary
      },

      borderColor2: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: colors.secondary1
      },
      bgColor2: {
        margin: '1px',
        backgroundColor: colors.secondary1
      },

      borderColor3: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: colors.secondary2
      },
      bgColor3: {
        margin: '1px',
        backgroundColor: colors.secondary2
      },

      borderColor4: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: colors.tertiary1
      },
      bgColor4: {
        margin: '1px',
        backgroundColor: colors.tertiary1
      },

      borderColor5: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: colors.tertiary2
      },
      bgColor5: {
        margin: '1px',
        backgroundColor: colors.tertiary2
      }
    };
    return (
      <div className="sidebar-content">
        <h5>Click a Code to Copy!</h5>
        <Button onClick={this.props.toggleSidebarOff}>Hide Sidebar</Button>
        <div className="color-family-info">
          {this.convertHexToRGB().map(function(color, index) {
            return <ColorInfoView color={color} key={index} index={index}/>
          })}

           <h5> Example UI Elements</h5>

          <Panel style={styles.bgColor5}>
          Panel
          </Panel>
            <Button style={styles.bgColor1}> Color 1 </Button>
            <Button style={styles.bgColor2}> Color 2 </Button>
            <Button style={styles.bgColor3}> Color 3 </Button>
            <Button style={styles.bgColor4}> Color 4 </Button>
            <Button style={styles.bgColor5}> Color 5 </Button> <br/><br/>

          <Panel style={styles.borderColor5}>
          Panel
          </Panel>
            <Button style={styles.borderColor1}> Color 1 </Button>
            <Button style={styles.borderColor2}> Color 2 </Button>
            <Button style={styles.borderColor3}> Color 3 </Button>
            <Button style={styles.borderColor4}> Color 4 </Button>
            <Button style={styles.borderColor5}> Color 5 </Button>
        </div>
        <br/>
        <Button bsStyle="primary" onClick={this.editPalette.bind(this)}>Edit this palette</Button>

      </div>
    );
  }
}

module.exports = ColorFamilyInfoView;
