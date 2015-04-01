var Parse = require('parse').Parse;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AuthActions = {
  init: function() {
    var user = Parse.User.current();
    if (user) {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected' && response.authResponse.userID === user.get('authData').facebook.id) {
          FB.api('/me?fields=id,name,picture', function(response) {
            if (response && !response.error) {
              AppDispatcher.handleViewAction({
                actionType: ActionTypes.SIGNIN_SUCCESS,
                user: user,
                fbUser: response
              });
            } else {
              Parse.User.logOut();
            }
          });
        } else {
          Parse.User.logOut();
        }
      });
    }
  },
  signIn: function() {
    Parse.FacebookUtils.logIn('public_profile', {
      success: function(user) {
        FB.api('/me?fields=id,name,picture', function(response) {
          if (response && !response.error) {
            AppDispatcher.handleViewAction({
              actionType: ActionTypes.SIGNIN_SUCCESS,
              user: user,
              fbUser: response
            });
          } else {
            AppDispatcher.handleViewAction({
              actionType: ActionTypes.SIGNIN_FAILED
            });
          }
        });
      },
      error: function(user, error) {
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.SIGNIN_FAILED
        });
      }
    });
  },
  signOut: function() {
    Parse.User.logOut();
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.SIGNOUT
    });
  }
};

module.exports = AuthActions;
