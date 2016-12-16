import React from 'react';
import ColorInfoView from '../ColorInfoView.jsx';
import { Panel, Button, Row, Col, Grid, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';

class ColorFamilyInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      toolTipText: '',
      type: ''
    };
  }

  componentDidMount() {

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

  onCopyHandler(copyVal) {
    console.log(copyVal);
    var type = '';
    // if (copyVal[0] === '#') {
    //   type = 'hex';
    // } else {
    //   type = 'rgb';
    // }
    this.setState({
      copied: true,
      toolTipText: copyVal,
      type: type
    });
    setTimeout(function() {
      this.setState({
        copied: false
      });
    }.bind(this), 1500);
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
      toolTip: {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        zIndex: '1000',
      }
    };
    if (this.state.copied) {
      styles.toolTip.opacity = 1;
    } else {
      styles.toolTip.opacity = 0;
    }
    
    return (
      <div className="sidebar-content">
        <Button onClick={this.props.toggleSidebarOff}>Hide Sidebar</Button>
        <div className="color-family-info">
 
        <h4>Name: {this.props.currentFamily.name}</h4>
        <Tooltip style={styles.toolTip} placement="top" className="in" id="tooltip">{this.state.toolTipText} Copied!</Tooltip>
        <h5>Click a Code to Copy!</h5>
        <ul>
        <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={'#' + this.props.currentFamily.colors.primary}>
          <li>Primary: <div className='sideBarPreview' style={styles.bgColor1}></div> #{this.props.currentFamily.colors.primary} </li></CopyToClipboard>
        <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={'#' + this.props.currentFamily.colors.secondary1}>
          <li>Secondary 1:<div className='sideBarPreview' style={styles.bgColor2}></div> #{this.props.currentFamily.colors.secondary1} </li></CopyToClipboard>
        <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={'#' + this.props.currentFamily.colors.secondary2}>
          <li>Secondary 2:<div className='sideBarPreview' style={styles.bgColor3}></div> #{this.props.currentFamily.colors.secondary2} </li></CopyToClipboard>
        <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={'#' + this.props.currentFamily.colors.tertiary1}>
          <li>Tertiary 1:<div className='sideBarPreview' style={styles.bgColor4}></div>  #{this.props.currentFamily.colors.tertiary1} </li></CopyToClipboard>
        <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={'#' + this.props.currentFamily.colors.tertiary2}>
          <li>Tertiary 2:<div className='sideBarPreview' style={styles.bgColor5}></div>  #{this.props.currentFamily.colors.tertiary2} </li></CopyToClipboard>
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
    );
  }
}

module.exports = ColorFamilyInfoView;
