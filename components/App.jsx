import React from 'react';
import TopBar from './TopBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 'mostClicked',
    }
  }
  render() {
    return (
      <div>
        <TopBar className="app-nav"/>
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;
