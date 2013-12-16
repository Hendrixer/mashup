'use strict';

var fireRef = new Firebase('https://mashup.firebaseio.com');


angular.module('mashupApp')
  .controller('MainCtrl', function ($scope, $firebase, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var session = {
      currentUser: null,
      isLoggedIn: function(){
        return !!session.currentUser
      }
    };
    var auth = new FirebaseSimpleLogin(fireRef, function(error, user) {
      if (error) {
        console.log(error);
      } else if (user) {
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        console.log('user', user);
        session.currentUser = user;
        console.log('session', session);
        $location.path('/profile');
      }
    });
    
    $scope.authenticate = function() {
      auth.login('twitter');
    };
  })
  .controller('SigninController', function($scope) {
    $scope.name = 'signin';
  })
  .controller('ProfileController', function($scope) {
    $scope.name = 'profile';
  })