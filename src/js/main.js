var _ = require('lodash');
var React = require('react');

// Parse Configs

var Parse = require('parse').Parse;
var AppConstants = require('./constants/AppConstants');
var AuthActions = require('./actions/AuthActions');

Parse.initialize(AppConstants.PARSE_APP_ID, AppConstants.PARSE_JS_KEY);

window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId: AppConstants.FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v2.2'
  });

  AuthActions.init();
};

// Router Configs

var Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute;
var App = require('./components/App');
var ActivityListPage = require('./components/pages/ActivityListPage');
var ActivityDetailPage = require('./components/pages/ActivityDetailPage');
var ActivityFormPage = require('./components/pages/ActivityFormPage');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={ActivityListPage} />
    <Route name="createActivity" path="/activities/create" handler={ActivityFormPage} />
    <Route name="activityDetail" path="/activities/:id" handler={ActivityDetailPage} />
    <Route name="editActivity" path="/activities/:id/edit" handler={ActivityFormPage} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
