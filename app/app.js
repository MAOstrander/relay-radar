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
    var matLat = 36.1667;
    var matLong = -86.7833;

	$scope.myMap = { 
		center: { latitude: matLat, longitude: matLong },
		zoom: 8 
	};
	var events = {
    places_changed: function (searchBox) {
    	console.log("searchBox", searchBox);
    }
  };

  $scope.searchbox = { template:'searchbox.tpl.html', events:events};


    // $scope.user = {'from': '', 'fromLat': '', 'fromLng' : ''};
    var options = {
        componentRestrictions: {country: "usa"}
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);

    // google.maps.event.addListener('center_changed', function(){
    // 	console.log("SOMETHING HAPPENED");
    // })


  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        console.log("place", place);
        console.log("matfrom", $scope.matfrom);
        // $scope.user.fromLat = place.geometry.location.lat();
        // $scope.user.fromLng = place.geometry.location.lng();
        matLat = place.geometry.location.lat();
        matLong = place.geometry.location.lng();
        console.log("longitude", place.geometry.location.lng());
        // $scope.user.from = place.formatted_address;
        console.log("place.formatted_address", place.formatted_address);
        // $scope.panTo(matLat, matLong);
          // $scope.setCenter(matLat, matLong);
        $scope.myMap = { 
					center: { latitude: matLat, longitude: matLong },
					zoom: 13
				};
        $scope.$apply();
    });

 //  $scope.setCenter = function(lati, longi) {
 //  	$scope.myMap.center = { latitude: lati, longitude: longi };
 //  	console.log("We're in the setCenter funciton");
 //  }

	// $scope.$watch(matLat, function () {
 //  	var loc = new google.maps.LatLng(matLat, matLong)
 //  	$scope.setCenter(loc)
 //  	console.log("DOES THIS EVER FIRE?");
	// })

  // var updateCenter = function(){
  // 	var ll = new google.maps.LatLng($scope.user.fromLat, $scope.user.fromLng);
  // 	$scope.myMap.panTo(ll);
  // }
  // $scope.$watch('user.fromLat', updateCenter);
  // $scope.$watch('user.fromLng', updateCenter);


}]);


