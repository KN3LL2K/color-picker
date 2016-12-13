import React from 'react';
import ColorInfoView from './ColorInfoView.jsx';
import {Row, Col, Grid} from 'react-bootstrap';
import $ from 'jquery';

class CreateYourOwn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {

    console.log(event);

    $.ajax({
      method: 'POST',
      url: 'api/colors',
      data: this.state,
      dataType: 'JSON',
      success: function (resp) {
        console.log('success', resp);
      },
      error: function (error) {
        console.log('error', error);
      }
    });
  }

  render() {
    return (
      <form className="content-wrap" onSubmit={this.handleSubmit}>
        <h5>Create your own!</h5>
        <br/>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Color 1 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon1" value={this.state.color1} onChange={this.handleChange('color1')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon2">Color 2 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon2" value={this.state.color2} onChange={this.handleChange('color2')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon3">Color 3 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon3" value={this.state.color3} onChange={this.handleChange('color3')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon4">Color 4 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon4" value={this.state.color4} onChange={this.handleChange('color4')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon5">Color 5 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon5" value={this.state.color5} onChange={this.handleChange('color5')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Submit</button>
          </span>
        </div>

      </form>
    );
  }
}

module.exports = CreateYourOwn;

/*{this.convertHexToRGB().map(function(color, index) {
  return <ColorInfoView color={color} key={index} index={index}/>
})}*/