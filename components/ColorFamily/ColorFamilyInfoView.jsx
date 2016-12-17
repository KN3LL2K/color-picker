import React from 'react';
import { Panel, Button, Row, Col, Grid, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SwatchPreview from './SwatchPreview.jsx';
import request from 'superagent';

class ColorFamilyInfoView extends React.Component {
  constructor(props) {
    super(props);
  
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
    // This component can render without a currentFamily
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

            <div className='likeBtn' onClick={this.props.likeHandler}>
            { this.props.currentFamily.isLiked ? <i className="fa fa-heart" aria-hidden="true"></i> : <i className='fa fa-heart-o' aria-hidden="true"></i> } {this.props.currentFamily.likes}
            </div>
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
