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
    .when('/signin',{
      templateUrl: 'views/signin.html',
      controller: 'SigninController'
    })
    .when('/profile',{
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.run(function($rootScope, $location, Session){
  $rootScope.$on('$routeChangeStart', function(event, nextUrl, currentUrl){
    console.log('event', event, 'nextUrl', nextUrl, 'currentUrl', currentUrl);
    if(nextUrl.$$route.controller !== 'MainCtrl' && !Session.isLoggedIn()){
      console.log('no auth');
      $location.path('/');
    }
  });
});
