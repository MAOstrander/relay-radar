var app = angular.module("RelayRadar", ["ngRoute", "firebase", "uiGmapgoogle-maps", "pageslide-directive", "ui.bootstrap", "checklist-model"]);

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
        templateUrl: 'app/partials/member.html',
        controller: 'memberController'
      })
      .when('/intro', {
        templateUrl: 'app/partials/introduction.html'
      })
      .otherwise('/intro');
  }]);
