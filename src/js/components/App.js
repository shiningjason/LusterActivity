var React = require('react');
var Router = require('react-router')
  , RouteHandler = Router.RouteHandler;
var Header = require('./partials/Header');
var AuthStore = require('../stores/AuthStore');

var App = React.createClass({
  getInitialState: function() {
    return { user: AuthStore.getFbUser() };
  },
  componentDidMount: function() {
    AuthStore.addSignInSuccessListener(this.onUserChanged);
    AuthStore.addSignInFailedListener(this.onUserChanged);
    AuthStore.addSignOutListener(this.onUserChanged);
  },
  componentWillUnmount: function() {
    AuthStore.removeSignInSuccessListener(this.onUserChanged);
    AuthStore.removeSignInFailedListener(this.onUserChanged);
    AuthStore.removeSignOutListener(this.onUserChanged);
  },
  render: function() {
    return (
      <div>
        <Header user={this.state.user} />
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    );
  },
  onUserChanged: function() {
    this.setState({ user: AuthStore.getFbUser() });
  }
});

module.exports = App;
