'use strict';

angular.module('mashupApp')

.factory('Session', function($location, $cookieStore) {
  var fireRef = new Firebase('https://mashup.firebaseio.com');
  var auth = new FirebaseSimpleLogin(fireRef, function(error, user) {
    if (error) {
      console.log(error);
    } else if (user) {
      $cookieStore.put('user', user.id);
      console.log(user);
      services.currentUser = user;
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
  services.currentUser = $cookieStore.get('user');
  return services;
})
.factory('Auth', function(/* dependency injection */ $q, $http){
  var service = {
    getAuth: function(url) {
      window.location.href = url;
    }
  };  
  return service;
})
.factory("API", function($location, $cookieStore) {
  var service = {
    currentUser: null,
    isAuth: function() {
      return !!service.currentUser
    },
    getAuth: function() {
      if($location.search().code){
        $cookieStore.put('insta', $location.search().code);
      }
    }
  };
  service.currentUser = $cookieStore.get('insta');
  return service;
})

