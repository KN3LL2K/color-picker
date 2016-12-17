import React from 'react';
import ColorFamily from './ColorFamily.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Jumbotron, Button, Row} from 'react-bootstrap';
import Palette from '../Palette.jsx';


class ColorFamilyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    // this.toggleHover = this.toggleHover.bind(this);
  }

  componentDidMount() {
    console.log('cfamv', this.props);
  }

  // toggleHover() {
  //   this.setState({hover: !this.state.hover});
  // }

  onClickHandler() {
    this.props.setCurrentFamily(this.props.colorFamily);
    this.props.toggleSidebarOn();
  }

  render() {
    let styles = {
      rowStyle: {
        padding: '0',
        height: '150px',
        width: '80%',
        
      },
      view: {
        minHeight: '1000px',
        width: '100%',
        paddingLeft: '5%',
        marginLeft: '50px'
      },
      palette: {
        padding: '0',
        height: '200px',
        width: '80%',
        display: 'flex'
      }
    };
    return (
      <div className="content-wrap container-fluid" style={styles.view}>
        {this.props.colorFamilies.map((obj, index) => {
          return (
            <Palette key={index} clickHandler={this.onClickHandler.bind(this)} setCurrentFamily={this.props.setCurrentFamily} toggleSidebarOn={this.props.toggleSidebarOn} colorFamily={obj}/> 
          );
        })}
     </div>
    );
  }

}

module.exports = ColorFamilyView;
