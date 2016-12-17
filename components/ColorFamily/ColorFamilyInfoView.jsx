import React from 'react';
import ColorInfoView from '../ColorInfoView.jsx';
import { Panel, Button, Row, Col, Grid, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SwatchPreview from './SwatchPreview.jsx';

class ColorFamilyInfoView extends React.Component {
  constructor(props) {
    super(props);
  }

   //convert rgb array e.g.([218, 82, 82]) to hex e.g.'DA5252'
  rgbToHex (array) {
    var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
    var result = '';
    for (var i = 0; i < array.length; i++) {
      var d1 = parseInt(array[i] / 16);
      result += hexChars[d1];
      var d2 = array[i] - (d1 * 16);
      result += hexChars[d2];
    }
    return result;
  }
     //convert hex string e.g.'DA5252' to rgb array e.g.([218, 82, 82]) 0-255
  hexToRgb (hex) {
    var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};
    var result = [];
    //remove #
    hex = hex.toUpperCase().match(/.{1,2}/g);
    // split
    var r = hex[0].split(''), g = hex[1].split(''), b = hex[2].split('');
    
    result[0] = Math.round(hexChars[r[0]] * 16 + hexChars[r[1]]);
    result[1] = Math.round(hexChars[g[0]] * 16 + hexChars[g[1]]);
    result[2] = Math.round(hexChars[b[0]] * 16 + hexChars[b[1]]);
    return result;
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
        borderColor: '#' + colors.primary
      },
      bgColor1: {
        margin: '1px',
        backgroundColor: '#' + colors.primary
      },

      borderColor2: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: '#' + colors.secondary1
      },
      bgColor2: {
        margin: '1px',
        backgroundColor: '#' + colors.secondary1
      },

      borderColor3: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: '#' + colors.secondary2
      },
      bgColor3: {
        margin: '1px',
        backgroundColor: '#' + colors.secondary2
      },

      borderColor4: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: '#' + colors.tertiary1
      },
      bgColor4: {
        margin: '1px',
        backgroundColor: '#' + colors.tertiary1
      },

      borderColor5: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: '#' + colors.tertiary2
      },
      bgColor5: {
        margin: '1px',
        backgroundColor: '#' + colors.tertiary2
      },
      list: {
        listStyle: 'none'
      }
    };
    
    return (
      <div className="sidebar-content">
        <div className="sidebar-scrollable">
          <Button onClick={this.props.toggleSidebarOff}>Hide Sidebar</Button>
          <div className="color-family-info">
   
          <h4>Name: {this.props.currentFamily.name}</h4>
    
          <h5>Click a Code to Copy!</h5>
          <ul style={styles.list}>
            {Object.keys(colors).map((color, key) => <SwatchPreview color={colors[color]} key={color} />)}
          </ul>
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
      </div>
    );
  }
}

module.exports = ColorFamilyInfoView;
