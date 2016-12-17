import React from 'react';
import TopBar from './TopBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username || null,
      userId: localStorage.userId || null
    };
  }

  setUser(username = null, userId = null) {
    this.setState({
      username: username,
      userId: userId
    });
    localStorage.username = username;
    localStorage.userId = userId;
  }

  swal(jsx) {
    this.setState({ alert: jsx });
  }

  hideAlert() {
    this.setState({ alert: null });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        swal: this.swal.bind(this),
        setUser: this.setUser.bind(this),
        hideAlert: this.hideAlert.bind(this),
      })
    );

    let loggedIn = !!this.state.username;

    return (
      <div>
        <TopBar
          className="app-nav"
          setUser={this.setUser.bind(this)}
          swal={this.swal.bind(this)}
          hideAlert={this.hideAlert.bind(this)}
          username={this.state.username}
        />
        <div className={`heightManager ${loggedIn ? 'loggedIn' : 'guest'}`}>
          {childrenWithProps}
        </div>
        {this.state.alert}
      </div>
    );
  }
}

module.exports = App;
