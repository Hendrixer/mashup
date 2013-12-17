'use strict';

angular.module('mashupApp')
  .controller('MainCtrl', function ($scope, $firebase, $location, $cookieStore, AUTH,  Session) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.authenticate = function() {
      Session.auth.login('twitter');
    };
    $scope.url = function() {
      
    };
  })
  .controller('SigninController', function($scope) {
    $scope.name = 'signin';
  })
  .controller('ProfileController', function($scope, $firebase, Session, Auth) {
    $scope.auth = function(){
      Auth.getAuth("https://api.instagram.com/oauth/authorize/?client_id=ef52537333bb4b31948821519a949d73&redirect_uri=http://127.0.0.1:3000/&response_type=code");
    };
    $scope.name = Session.currentUser;
    $scope.pic = Session.currentUser.profile_image_ur;
    var ref = new Firebase("https://mashup.firebaseio.com/");
    $scope.user = $firebase(ref);
    $scope.addUser = function() {
      $scope.user.$add({name: $scope.name.name, id: $scope.name.id});
      console.log($scope.name);
    };
  });