import React from 'react';
import ColorFamily from './ColorFamily.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Jumbotron, Button} from 'react-bootstrap';


class ColorFamilyView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-wrap">
        {this.props.colorFamilies.map(function(obj, index) {
          return (
            <ReactCSSTransitionGroup
              transitionName='fade'
              transitionAppear={true}
              transitionAppearTimeout={3000}
              transitionEnter={false}
              transitionLeave={false}
              key={index}>
              <ColorFamily setCurrentFamily={this.props.setCurrentFamily} toggleSidebarOn={this.props.toggleSidebarOn} colorFamily={obj} />
            </ReactCSSTransitionGroup>
          );
        }.bind(this))}
     </div>
    );
  }

}

module.exports = ColorFamilyView;
