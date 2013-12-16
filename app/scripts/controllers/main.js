'use strict';

var fireRef = new Firebase('https://mashup.firebaseio.com');


angular.module('mashupApp')
  .controller('MainCtrl', function ($scope, $firebase, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var auth = new FirebaseSimpleLogin(fireRef, function(error, user) {
      if (error) {
        console.log(error);
      } else if (user) {
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
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
  });