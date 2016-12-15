import React from 'react';
import {Row, Col, Grid, Tooltip} from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

class ColorInfoView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.state = {
      copied: false,
      toolTipText: '',
      type: ''
    };
  }
  hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  onCopyHandler(copyVal) {
    console.log(copyVal);
    var type = '';
    if (copyVal[0] === '#') {
      type = 'hex';
    } else {
      type = 'rgb';
    }
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
      preview: {
        backgroundColor: this.props.color.hex,
        height: '30px',
        width: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '-4px',
        position: 'absolute'
      },
      toolTip: {
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        opacity: 0,
        top: '-1px',
        transition: 'opacity 0.2s ease-in-out',
        zIndex: '1000',
      },
      row: {
        position: 'relative',
        paddingBottom: '20px'
      }
    };
    if (this.state.type === 'hex') {
      styles.toolTip.top = '-17px';
      styles.toolTip.left = '-20px';
    } else {
      styles.toolTip.top = '-34px';
      styles.toolTip.left = '-28px';
    }
    if (this.state.copied) {
      styles.toolTip.opacity = 1;
    } else {
      styles.toolTip.opacity = 0;
    }
    return (
      <Row style={styles.row}>
        <Col xs={3}>
          <Tooltip style={styles.toolTip} placement="top" className="in" id="tooltip">{this.state.toolTipText} Copied!</Tooltip>
          <div style={styles.preview}></div>
        </Col>
        <Col xs={3}>
          <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={this.props.color.hex}>
            <span>{this.props.color.hex}</span>
          </CopyToClipboard>
        </Col>
        <Col xs={6}>
          <CopyToClipboard onCopy={this.onCopyHandler.bind(this)} text={this.props.color.rgb}>
            <span>{this.props.color.rgb}</span>
          </CopyToClipboard>
        </Col>
      </Row>
    );
  }


}

module.exports = ColorInfoView;
