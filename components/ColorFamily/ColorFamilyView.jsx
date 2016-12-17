import React from 'react';
import ColorFamily from './ColorFamily.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Jumbotron, Button, Row} from 'react-bootstrap';
import Palette from '../Palette.jsx';


class ColorFamilyView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('cfamv', this.props);
  }

  onClickHandler(colorFamily) {
    this.props.setCurrentFamily(colorFamily);
    this.props.toggleSidebarOn();
  }

  render() {
    return (
      <div className="content-wrap container-fluid" className='paletteView'>
        {this.props.colorFamilies.map((colorFamily, index) => {
          return (
            <Palette key={index} clickHandler={this.onClickHandler.bind(this, colorFamily)} setCurrentFamily={this.props.setCurrentFamily} toggleSidebarOn={this.props.toggleSidebarOn} colorFamily={colorFamily}/> 
          );
        })}
     </div>
    );
  }

}

module.exports = ColorFamilyView;
