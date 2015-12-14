app.controller("mapController",
	["$scope", "fireFactory",
	function($scope, fireFactory, $log, uiGmapGoogleMapApi) {
    var matLat = 36.1667;
    var matLong = -86.7833;
    var addMode;
    console.log("fireFactory", fireFactory);

    $scope.toggleAddMode = function(){
    	if (addMode) {
    		addMode = false;
	    	console.log("no longer in add a relay mode");
    	} else {
    		addMode = true;
	    	console.log("Add a relay mode");
    	}
    };

		$scope.map = {
	    center: {latitude: matLat, longitude: matLong },
      zoom: 10,
	    markers: fireFactory.getMarkers(),
      events: {
        click: function (map, eventName, originalEventArgs) {
        	if (addMode) {
            var e = originalEventArgs[0];
            var lat = e.latLng.lat(),lon = e.latLng.lng();
            var marker = {
                id: Date.now(),
                coords: {
                    latitude: lat,
                    longitude: lon
                }
            };
            $scope.map.markers.push(marker);
            fireFactory.addMarker(marker);
            console.log($scope.map.markers);
            addMode = false;
            $scope.$apply();
          }
        }
      }
    };
	var events = {
    places_changed: function (searchBox) {
    	console.log("searchBox", searchBox);
    }
  };

  $scope.searchbox = { template:'searchbox.tpl.html', events:events};


    // $scope.user = {'from': '', 'fromLat': '', 'fromLng' : ''};
    $scope.options = {
      componentRestrictions: {country: "usa"},
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, $scope.options);

    // google.maps.event.addListener('center_changed', function(){
    // 	console.log("SOMETHING HAPPENED");
    // })


  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.matfrom = place.formatted_address;
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
        $scope.map = { 
					center: { latitude: matLat, longitude: matLong },
					zoom: 13
				};
        $scope.$apply();
    });

 //  $scope.setCenter = function(lati, longi) {
 //  	$scope.map.center = { latitude: lati, longitude: longi };
 //  	console.log("We're in the setCenter funciton");
 //  }

	// $scope.$watch(matLat, function () {
 //  	var loc = new google.maps.LatLng(matLat, matLong)
 //  	$scope.setCenter(loc)
 //  	console.log("DOES THIS EVER FIRE?");
	// })

  // var updateCenter = function(){
  // 	var ll = new google.maps.LatLng($scope.user.fromLat, $scope.user.fromLng);
  // 	$scope.map.panTo(ll);
  // }
  // $scope.$watch('user.fromLat', updateCenter);
  // $scope.$watch('user.fromLng', updateCenter);


}]);