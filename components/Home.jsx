import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ColorFamilyView from './ColorFamily/ColorFamilyView.jsx';
import ColorFamilyInfoView from './ColorFamily/ColorFamilyInfoView.jsx';
import CreateYourOwn from './CreateYourOwn.jsx';
import FilterBar from './FilterBar.jsx';
import {Button, Grid} from 'react-bootstrap';


//this app relies heavily on React Bootstrap
//https://react-bootstrap.github.io/ for the documentation

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 'mostClicked',
      currentFamily: {},
      colorFamilies: [],
      allFamilies: [],
      appClass: 'app-main-full',
      sidebarClass: 'app-sidebar-hidden',
      createClass: 'create-family-hidden'
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.toggleSidebarOn = this.toggleSidebarOn.bind(this);
    this.toggleSidebarOff = this.toggleSidebarOff.bind(this);
    this.toggleSubmitForm = this.toggleSubmitForm.bind(this);
  }

  //Convert hex values to rgb object
  hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : null;
  }

  //Filter display based on navbar choices
  handleStateChange (color) {
    var filteredColorFamilies = [];

    this.setState({
      currentFilter: color,
    });

    this.state.allFamilies.forEach(function (obj) {
      var include = false;
      for (var key in obj) {
        if (key.slice(0, 5) === 'color') {
          var colorRgb = this.hexToRGB(obj[key], 16);
          if (color === 'red') {
            if (colorRgb.red > (1.5 * colorRgb.blue) && colorRgb.red > (1.5 * colorRgb.green)) {
              include = true;
            }
          }
          if (color === 'blue') {
            if (colorRgb.blue > (1.5 * colorRgb.red) && colorRgb.blue > (1.5 * colorRgb.green)) {
              include = true;
            }
          }
          if (color === 'green') {
            if (colorRgb.green > (1.5 * colorRgb.blue) && colorRgb.green > (1.5 * colorRgb.red)) {
              include = true;
            }
          }
          if (color === 'all') {
            include = true;
          }
        }
      }
      if (include === true) {
        filteredColorFamilies.push(obj);
      }
    }.bind(this));
    this.setState({
      colorFamilies: filteredColorFamilies
    });
  }

  setCurrentFamily(familyData) {
    this.setState({
      currentFamily: familyData
    });
  }

  toggleSubmitForm() {
    if (this.state.createClass === 'create-family-hidden') {
      this.setState({createClass: 'create-family-show'});
    } else {
      this.setState({createClass: 'create-family-hidden'});
    }
  }

  //Change state of components to display side via css

  toggleSidebarOn() {
    this.setState({
      sidebarClass: 'app-sidebar',
      appClass: 'app-main'
    });
    console.log('toggle on');
  }

  toggleSidebarOff() {
    this.setState({
      sidebarClass: 'app-sidebar-hidden',
      appClass: 'app-main-full'
    });
    console.log('toggle off');

  }

  //load data before render
  componentWillMount() {
    $.ajax({
      url: '/api/colors',
      success: function(data) {
        this.setState({ colorFamilies: data });
        this.setState({ allFamilies: data });
      }.bind(this),
      dataType: 'JSON'
    });
  }

  render() {
    return (
      <div className="app-body">
        <FilterBar className="app-nav" handleStateChange={this.handleStateChange} currentFilter={this.state.currentFilter} toggleSubmit={this.toggleSubmitForm} />
        <div>
          <div className={this.state.appClass}>
            <div className={this.state.createClass}>
            <CreateYourOwn/>
            </div>

            <ColorFamilyView setCurrentFamily={this.setCurrentFamily.bind(this)} colorFamilies={this.state.colorFamilies} toggleSidebarOn={this.toggleSidebarOn}/>
          </div>
          <div className={this.state.sidebarClass}>
            <ColorFamilyInfoView currentFamily={this.state.currentFamily} toggleSidebarOff={this.toggleSidebarOff}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Home;
