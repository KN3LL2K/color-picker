import React from 'react';
import { Panel, Button, Row, Col, Grid, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { hexToRgb } from '../../utils/colorHelpers.js';

class SwatchPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      toolTipText: '',
      type: ''
    };
  }

  _onCopyHandler(copyVal) {
    var type = '';
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
    let color = this.props.color
    let rgb = hexToRgb(color);
    let isClicked = this.state.copied;
    var styles = {
      color: {
        backgroundColor: '#' + color,
        boxShadow: `0px 2px 6px 0px rgba(120, 120, 120, 0.25), 0px 2px 6px 0px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.15)`
      },
      toolTip: {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
        zIndex: '1000',
      }
    };
    // if (this.state.copied) {
    //   styles.toolTip.opacity = 1;
    // } else {
    //   styles.toolTip.opacity = 0;
    // }
    return (
      <li>
        {isClicked ? <Tooltip style={styles.toolTip} placement="top" className="in" id="tooltip">{this.state.toolTipText} Copied!</Tooltip> : null }
        <CopyToClipboard onCopy={this._onCopyHandler.bind(this)} text={'#' + this.props.color}>
          <div>
            <div className='sideBarPreview' style={styles.color}></div>
            <span className='swatchPreview'>#{this.props.color}</span>
          </div>
        </CopyToClipboard>
      </li>
    );
  }
}

export default SwatchPreview;


        // <CopyToClipboard onCopy={this._onCopyHandler.bind(this)} text={'#' + this.props.color}>
        //   <div className='sideBarPreview' style={styles.color}></div> #{this.props.color}
        // </CopyToClipboard>
