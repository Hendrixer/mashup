'use strict';

var app = angular.module('mashupApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]);
app.config(function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
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
    .when('/when',{
      templateUrl: 'views/when.html',
      controller: 'ProfileController'
    })
    .when('/trigger', {
      templateUrl: 'views/trigger.html',
      controller: 'ProfileController'
    })
    .when('/do', {
      templateUrl: 'views/do.html',
      controller: 'ProfileController'
    })
    .when('/dothis', {
      templateUrl: 'views/dothis.html',
      controller: 'ProfileController'
    })
    .when('/activate', {
      templateUrl: 'views/activate.html',
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
