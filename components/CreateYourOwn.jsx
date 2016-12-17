import React from 'react';
import {Row, Col, Grid, FormGroup, FormControl} from 'react-bootstrap';
import $ from 'jquery';
import SwatchEditor from './SwatchEditor.jsx';
import color from '../utils/colorHelpers.js';
import _ from 'lodash';
import request from 'superagent';


class CreateYourOwn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      primary: '',
      secondary1: '',
      secondary2: '',
      tertiary1: '',
      tertiary2: '',
      isChanged: false
    };
  }



  componentWillMount() {
    let path = this.props.route;
    let palette;
    let name;
    if (path && path.path.slice(0, 13) === '/swatch/edit/') {
      
      this.setState({
        name: localStorage.paletteName,
        primary: localStorage.primary,
        secondary1: localStorage.secondary1,
        secondary2: localStorage.tertiary1,
        tertiary1: localStorage.secondary2,
        tertiary2: localStorage.tertiary2
      });


    } else {

      this.setState({isChanged: true, name: 'Enter a name..'});
    //randomly pick seed color
      let randNum = function() {
        return Math.floor(Math.random() * 254);
      };
      let randColor = [randNum(), randNum(), randNum()];
      let hex = this.rgbToHex(randColor);
      //randomly pick style of palette
      let styles = ['shades'];
      let randStyle = styles[Math.floor(Math.random() * styles.length)];
      //generate random palette
      // let palette;
      if (randStyle === 'complementary') {
        palette = color.complementaryPalette(hex);
      } else if (randStyle === 'splitComp') {
        palette = color.splitCPalette(hex);
      } else if (randStyle === 'triad') {
        palette = color.triadPalette(hex);
      } else if (randStyle === 'analagous') {
        palette = color.analagousPalette(hex);
      } else {
        palette = color.shadesPalette(hex);
      }
      //pass to swatches
      this.setState({
        primary: palette.primary,
        secondary1: palette.secondary1,
        secondary2: palette.tertiary1,
        tertiary1: palette.secondary2,
        tertiary2: palette.tertiary2
      });
    }
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

  _complementary() {
    let palette = color.complementaryPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

  _splitComplementary() {
    let palette = color.splitCPalette(this.state.primary);
    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

  _triad() {
    let palette = color.triadPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    }); 
  }
  _analagous() {
    let palette = color.analagousPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.tertiary1,
      secondary2: palette.secondary1,
      tertiary1: palette.secondary1,
      tertiary2: palette.secondary2
    }); 
  }

  _shades() {
    let palette = color.shadesPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.tertiary1,
      tertiary1: palette.secondary2,
      tertiary2: palette.tertiary2
    });
  }

  _handleSwatchClick() {

  }

  _updateSwatch(color, type) {
    var change = _.extend({}, this.state);
    change[type] = color;
    change.isChanged = true;
    this.setState(change);
    
  }

  _nameChange(e) {
    e.persist();
    let name = e.target.value;
    this.setState({
      name: name,
      isChanged: true
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    let newColor = {
      name: this.state.name,
      colors: {
        primary: this.state.primary,
        secondary1: this.state.secondary1,
        secondary2: this.state.secondary2,
        tertiary1: this.state.tertiary1,
        tertiary2: this.state.tertiary2
      }
    };
    request.post('/api/colors')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(newColor))
    .end(function(err, res) {
      if (err) {
        throw err;
      }
    });

    delete localStorage.primary;
    delete localStorage.secondary1;
    delete localStorage.secondary2;
    delete localStorage.tertiary1;
    delete localStorage.tertiary2;
    delete localStorage.paletteName;
  }

  render() {
    return (
      <div>
        <div className="input-group buttonRow">
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this._complementary.bind(this)}>Complementary</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this._splitComplementary.bind(this)}>Split Complementary</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this._triad.bind(this)}>Triad</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this._analagous.bind(this)}>Analogous</button>
          </span>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this._shades.bind(this)}>Shades</button>
          </span>
      </div>

        <br/>
        <div className='editorWrapper row'>
          <SwatchEditor update={this._updateSwatch.bind(this)} type={'tertiary1'} color={this.state.tertiary1} />
          <SwatchEditor update={this._updateSwatch.bind(this)} type={'secondary1'} color={this.state.secondary1} />
          <SwatchEditor update={this._updateSwatch.bind(this)} type={'primary'} color={this.state.primary} />
          <SwatchEditor update={this._updateSwatch.bind(this)} type={'secondary2'} color={this.state.secondary2} />
          <SwatchEditor update={this._updateSwatch.bind(this)} type={'tertiary2'} color={this.state.tertiary2} />
        </div>
        <div className='nameForm'>
          <FormGroup onSubmit={(e) => this._handleSubmit(e)}>
            <FormControl placeholder={this.state.name} onChange={this._nameChange.bind(this)}/>
            <br/><br/>
              <button className="btn btn-default" disabled={!this.state.isChanged} action='' type="submit">Save</button>
            
              
          </FormGroup>
        </div>
        
      </div>
    );
  }
}

module.exports = CreateYourOwn;

