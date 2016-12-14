import React from 'react';
import FilterBar from './FilterBar.jsx';

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
        <FilterBar className="app-nav"  />
        {/*handleStateChange={this.handleStateChange} currentFilter={this.state.currentFilter} toggleSubmit={this.toggleSubmitForm}*/}
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;
