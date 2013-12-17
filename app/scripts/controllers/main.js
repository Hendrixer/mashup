'use strict';

angular.module('mashupApp')
  .controller('MainCtrl', function ($scope, $firebase, $location, Session) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.authenticate = function() {
      Session.auth.login('twitter');
    };
  })
  .controller('SigninController', function($scope) {
    $scope.name = 'signin';
  })
  .controller('ProfileController', function($scope) {
    $scope.name = 'profile';
  })