import React from 'react';
import ReactDOM from 'react-dom';



class Swatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      r: '',
      g: '',
      b: ''
    };
    // debugger;
  }

  componentDidMount() {
    let RGB = this.hexToRgb(this.state.color);
    this.setState({r: RGB[0], g: RGB[1], b: RGB[2]});
  }

  // componentDidUpdate() {
  //   this.setState({color: this.props.color});
  // }

  _handleHexChange(e) {
    let newColor = e.target.value;
    this.setState({color: newColor});
    let RGB = this.hexToRgb(newColor);
    this.setState({r: RGB[0], g: RGB[1], b: RGB[2]});
  }

  _handleRChange(e) {
    let newRed = e.target.value;
    this.setState({r: newRed});
    let RGB = [this.state.r, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex});
  }
  _handleGChange(e) {
    let newGreen = e.target.value;
    this.setState({g: newGreen});
    let RGB = [this.state.r, this.state.g, this.state.b];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex});
  }
  _handleBChange(e) {
    let newBlue = e.target.value;
    let RGB = [this.state.r, this.state.g, newBlue];
    let hex = this.rgbToHex(RGB);
    this.setState({color: hex, b: newBlue});
  }


  //convert hex string e.g.'#DA5252' to rgb array e.g.([218, 82, 82]) 0-255
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
    return (
      <div className='container swatchEditor' style={{padding: 0}}>
          <div className='swatch' style={{backgroundColor: '#' + this.state.color}}>
          </div>
          <div className="input-group swatchinput">
            <span className="input-group-addon" id="basic-addon5">HEX: </span>
            <input type="text" className="form-control" placeholder="Hex code" value={this.state.color} aria-describedby="basic-addon5" onChange={(e) => this._handleHexChange(e)}></input>
          </div>
          <div className='input-group swatchinput'>
            <span className="input-group-addon" id="basic-addon5">RGB: </span>
              <input type="text" className="form-control" placeholder="R" value={this.state.r} aria-describedby="basic-addon5" onChange={(e) => this._handleRChange(e)}></input>
              
              <input type="text" className="form-control" placeholder="G" value={this.state.g} aria-describedby="basic-addon5" onChange={(e) => this._handleGChange(e)}></input>
              
              <input type="text" className="form-control" placeholder="B" value={this.state.b} aria-describedby="basic-addon5" onChange={(e) => this._handleBChange(e)}></input>
          </div>
      </div>
    );
  }
}


export default Swatch;
