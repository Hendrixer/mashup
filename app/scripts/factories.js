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
  console.log('cookies',$cookieStore.get('user'));
  return services;
})
.factory('Auth', function(/* dependency injection */ $q, $http){
  var service = {
    getAuth: function(){
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/instagram',
        data: {url: 'https://api.instagram.com/oauth/authorize/?client_id=ef52537333bb4b31948821519a949d73&redirect_uri=http://127.0.0.1:3000/#/profile&response_type=code'}
      }).success(function(data){
        d.resolve(data);
        //link['data'] = new Date(link.created_at);
        console.log('data', data);
      }).error(function(data){
        d.reject(reason);
      });
      return d.promise;
    },
    postLinks: function(data){
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/links',
        data: JSON.stringify(data)
      }).success(function(data){
        d.resolve(data);
      }).error(function(data){
        d.reject(reason);
      });
      return d.promise;
    }
  };
  return service;
});

