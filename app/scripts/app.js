'use strict';

var app = angular.module('mashupApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    // .when('/signin',{
    //   templateUrl: 'views/signin.html',
    //   controller: 'SigninController'
    // })
    // .when('/profile',{
    //   templateUrl: 'views/profile.html',
    //   controller: 'Profile.html'
    // })
    .otherwise({
      redirectTo: '/'
    });
});
