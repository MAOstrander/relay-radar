var app = angular.module("RelayRadar", ["ngRoute", "firebase", "uiGmapgoogle-maps"]);

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
        controller: 'test'
      })
      .when('/intro', {
        templateUrl: 'app/partials/introduction.html',
        controller: 'test'
      })
      .otherwise('/intro');
  }]);



app.controller("test",
	["$scope",
	function($scope, $log, uiGmapGoogleMapApi) {

	$scope.map = { 
		center: { latitude: 36.1667, longitude: -86.7833 },
		zoom: 8 
	};
	var events = {
    places_changed: function (searchBox) {
    	console.log("searchBox", searchBox);
    }
  }
  $scope.searchbox = { template:'searchbox.tpl.html', events:events};




}]);