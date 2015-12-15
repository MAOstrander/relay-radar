var app = angular.module("RelayRadar", ["ngRoute", "firebase", "uiGmapgoogle-maps", "ui.bootstrap"]);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBa028xCpQIps4RcDWbP2E5kfPaZsGp5RU',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/member', {
        templateUrl: 'app/partials/login.html',
        controller: 'mapController'
      })
      .when('/intro', {
        templateUrl: 'app/partials/introduction.html',
        controller: 'mapController'
      })
      .otherwise('/intro');
  }]);

