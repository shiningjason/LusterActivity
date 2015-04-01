var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Parse = require('parse').Parse;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var EVENT = {
  SIGNIN_SUCCESS: 'signinSuccess',
  SIGNIN_FAILED: 'signinFailed',
  SIGNOUT: 'signout'
};

var fbUser;

var AuthStore = _.assign({}, EventEmitter.prototype, {
  addSignInSuccessListener: function(cb) {
    this.on(EVENT.SIGNIN_SUCCESS, cb);
  },
  addSignInFailedListener: function(cb) {
    this.on(EVENT.SIGNIN_FAILED, cb);
  },
  addSignOutListener: function(cb) {
    this.on(EVENT.SIGNOUT, cb);
  },
  removeSignInSuccessListener: function(cb) {
    this.removeListener(EVENT.SIGNIN_SUCCESS, cb);
  },
  removeSignInFailedListener: function(cb) {
    this.removeListener(EVENT.SIGNIN_FAILED, cb);
  },
  removeSignOutListener: function(cb) {
    this.removeListener(EVENT.SIGNOUT, cb);
  },
  getUser: function() {
    return Parse.User.current();
  },
  getUserId: function() {
    var user = this.getUser();
    return (user ? user.id : undefined)
  },
  getFbUser: function() {
    return fbUser;
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    case ActionTypes.SIGNIN_SUCCESS:
      fbUser = action.fbUser;
      AuthStore.emit(EVENT.SIGNIN_SUCCESS);
      break;
    case ActionTypes.SIGNIN_FAILED:
      fbUser = undefined;
      AuthStore.emit(EVENT.SIGNIN_FAILED);
      break;
    case ActionTypes.SIGNOUT:
      fbUser = undefined;
      AuthStore.emit(EVENT.SIGNOUT);
      break;
  }
});

module.exports = AuthStore;
