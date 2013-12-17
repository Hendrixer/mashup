'use strict';

angular.module('mashupApp')
  .controller('MainCtrl', function ($scope, $firebase, $location, $cookieStore, Session) {
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
  .controller('ProfileController', function($scope, $firebase, Session, Auth) {
    $scope.auth = function(){
      Auth.getAuth();
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