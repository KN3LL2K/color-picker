import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


class Swatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      r: 0,
      g: 0,
      b: 0
    };
    this.updateColor = _.debounce(this._hexUpdate.bind(this), 250);
    this.updateRed = _.debounce(this._rUpdate, 250);
    this.updateGreen = _.debounce(this._gUpdate, 250);
    this.updateBlue = _.debounce(this._bUpdate, 250);
    this.updateFrom = _.debounce(this._updateFromParent, 250);
  }

  componentDidMount() {
    let RGB = this.hexToRgb(this.state.color);
    this.setState({r: RGB[0], g: RGB[1], b: RGB[2]});
  }
  componentWillReceiveProps() {
    // this.setState({color: this.props.color});
    this.updateFrom();
  }

  _updateFromParent() {
    let RGB = this.hexToRgb(this.props.color);
    this.setState({color: this.props.color, r: RGB[0], g: RGB[1], b: RGB[2]});
  }
// these two functions handle updating the hex value //////////////////////
  _handleHexChange(e) {
    e.persist();
    let newColor = e.target.value;
    this.setState({color: newColor});
    this.updateColor(newColor);
  }

  _hexUpdate(newColor) {
    let RGB = this.hexToRgb(newColor);
    this.setState({r: RGB[0], g: RGB[1], b: RGB[2]});
    this.props.update(newColor, this.props.type);
  }
// these two functions handle updating the red value //////////////////////
  _handleRChange(e) {
    e.persist();
    let newRed = e.target.value;
    this.setState({r: newRed});
    this.updateRed();
  }
  _rUpdate() {
    let RGB = [this.state.r, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex});
    this.props.update(hex, this.props.type);
  }
// these two functions handle updating the green value //////////////////////
  _handleGChange(e) {
    e.persist();
    let newGreen = e.target.value;
    this.setState({g: newGreen});
    this.updateGreen();
  }
  _gUpdate() {
    let RGB = [this.state.r, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex});
    this.props.update(hex, this.props.type);
  }
// these two functions handle updating the blue value //////////////////////
  _handleBChange(e) {
    e.persist();
    let newBlue = e.target.value;
    this.setState({b: newBlue});
    this.updateBlue();
  }
  _bUpdate() {
    let RGB = [this.state.r, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex});
    this.props.update(hex, this.props.type);
  }
///////////////////////////////////////////////////////////////////////////


  _sliderRChange(e) {
    e.persist();
    let newRed = e.target.value;
    let RGB = [newRed, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex, r: newRed});
    this.props.update(hex, this.props.type);
  }
  _sliderGChange(e) {
    e.persist();
    let newGreen = e.target.value;
    let RGB = [this.state.r, newGreen, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex, g: newGreen});
    this.props.update(hex, this.props.type);
  }
  _sliderBChange(e) {
    e.persist();
    let newBlue = e.target.value;
    let RGB = [this.state.r, this.state.g, newBlue];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex, b: newBlue});
    this.props.update(hex, this.props.type);
  }

  //convert hex string e.g.'#DA5252' to rgb array e.g.([218, 82, 82]) 0-255
  hexToRgb (hex) {
    var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};
    var result = [];
    
    // split
    hex = hex.toUpperCase().match(/.{1,2}/g);
    var r = hex[0].split(''), g = hex[1].split(''), b = hex[2].split('');
    
    result[0] = Math.round(hexChars[r[0]] * 16 + hexChars[r[1]]);
    result[1] = Math.round(hexChars[g[0]] * 16 + hexChars[g[1]]);
    result[2] = Math.round(hexChars[b[0]] * 16 + hexChars[b[1]]);
    return result;
  }

  //convert rgb array e.g.([218, 82, 82]) to hex e.g.'#DA5252'
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
  


  render() {
    let r = Number(this.state.r);
    let g = this.state.g;
    let b = this.state.b;
    return (
      <div className='container swatchEditor'>
         
          <div className='swatch' style={{backgroundColor: '#' + this.props.color}}>
          </div>
          
          <div className="controlWrapper">
          
            <div className="input-group swatchinput">
              <span className="input-group-addon" id="basic-addon5"><i className="fa fa-hashtag" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Hex code" value={this.state.color} aria-describedby="basic-addon5" onChange={(e) => this._handleHexChange(e)}></input>
            </div>
            <br/>
            <div className='input-group swatchinput'>
              <span className="input-group-addon" id="basic-addon5">RGB: </span>
              <input type="text" className="form-control" placeholder="R" value={this.state.r} aria-describedby="basic-addon5" onChange={(e) => this._handleRChange(e)}></input>
              <input type='range' name='red' value={r} min={0} max={255} step={1}
              onChange={(e) => this._sliderRChange(e)}></input>
              <input type="text" className="form-control" placeholder="G" value={this.state.g} aria-describedby="basic-addon5" onChange={(e) => this._handleGChange(e)}></input>
              <input type='range' name='red' value={g} min={0} max={255} step={1}
              onChange={(e) => this._sliderGChange(e)}></input>
              <input type="text" className="form-control" placeholder="B" value={this.state.b} aria-describedby="basic-addon5" onChange={(e) => this._handleBChange(e)}></input>
              <input type='range' name='red' value={b} min={0} max={255} step={1}
              onChange={(e) => this._sliderBChange(e)}></input>
            </div>
          </div>
      </div>
    );
  }
}


export default Swatch;
