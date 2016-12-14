import React from 'react';
import ColorInfoView from './ColorInfoView.jsx';
import {Row, Col, Grid} from 'react-bootstrap';
import $ from 'jquery';

class CreateYourOwn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
      seconday1: '',
      secondary2: '',
      tertiary1: '',
      tertiary2: '',
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
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon1" value={this.state.primary} onChange={this.handleChange('primary')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon2">Color 2 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon2" value={this.state.secondary1} onChange={this.handleChange('secondary1')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon3">Color 3 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon3" value={this.state.secondary2} onChange={this.handleChange('secondary2')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon4">Color 4 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon4" value={this.state.tertiary1} onChange={this.handleChange('tertiary1')}></input>
        </div>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon5">Color 5 </span>
          <input type="text" className="form-control" placeholder="Hex code" aria-describedby="basic-addon5" value={this.state.tertiary2} onChange={this.handleChange('tertiary2')}></input>
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
