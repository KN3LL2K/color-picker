import React from 'react';
import ColorInfoView from './ColorInfoView.jsx';
import {Panel, Button, Row, Col, Grid} from 'react-bootstrap';


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
    for (var key in this.props.currentFamily) {
      if (key.match(/^color./)) {
        var newObj = {};
        var rgbObj = hexToRGB(this.props.currentFamily[key]);
        var rgb = 'rgb(' + rgbObj.r + ', ' + rgbObj.g + ', ' + rgbObj.b + ')';
        var newObj = {hex: this.props.currentFamily[key], rgb: rgb};
        objArr.push(newObj);
      }
    }
    return objArr;
  }

  render() {
    console.log(this.props.currentFamily);

    var styles = {
      borderColor1: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: this.props.currentFamily.color1
      },
      bgColor1: {
        margin: '1px',
        backgroundColor: this.props.currentFamily.color1
      },

      borderColor2: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: this.props.currentFamily.color2
      },
      bgColor2: {
        margin: '1px',
        backgroundColor: this.props.currentFamily.color2
      },

      borderColor3: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: this.props.currentFamily.color3
      },
      bgColor3: {
        margin: '1px',
        backgroundColor: this.props.currentFamily.color3
      },

      borderColor4: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: this.props.currentFamily.color4
      },
      bgColor4: {
        margin: '1px',
        backgroundColor: this.props.currentFamily.color4
      },

      borderColor5: {
        margin: '1px',
        borderWidth: '2px',
        borderColor: this.props.currentFamily.color5
      },
      bgColor5: {
        margin: '1px',
        backgroundColor: this.props.currentFamily.color5
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

      </div>
    );
  }
}

module.exports = ColorFamilyInfoView;