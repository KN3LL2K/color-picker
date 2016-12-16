import React from 'react';
import { Panel, Button, Row, Col, Grid, Tooltip } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';


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
    console.log('val', copyVal);

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
    var styles = {
      color: {
        backgroundColor: '#' + this.props.color
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
      <li>
        <Tooltip style={styles.toolTip} placement="top" className="in" id="tooltip">{this.state.toolTipText} Copied!</Tooltip>
        <div className='sideBarPreview' style={styles.color}></div>
        <CopyToClipboard onCopy={this._onCopyHandler.bind(this)} text={'#' + this.props.color}>
        <span className='swatchPreview'> #{this.props.color}</span>
        </CopyToClipboard>
      </li>
    );
  }
}

export default SwatchPreview;


        // <CopyToClipboard onCopy={this._onCopyHandler.bind(this)} text={'#' + this.props.color}>
        //   <div className='sideBarPreview' style={styles.color}></div> #{this.props.color}
        // </CopyToClipboard>
