'use strict';

angular.module('mashupApp')

.factory('Session', function($location) {
  var fireRef = new Firebase('https://mashup.firebaseio.com');
  var auth = new FirebaseSimpleLogin(fireRef, function(error, user) {
    if (error) {
      console.log(error);
    } else if (user) {
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      console.log('user', user);
      services.currentUser = user;
      console.log('session', services);
      $location.path('/profile');
    }
  });  
  var services = {
    currentUser: null,
    isLoggedIn: function() {
      return !!services.currentUser;
    },
    fireRef: fireRef,
    auth: auth
  };
  return services;
});

