app.controller("mapController",
	["$scope", "$rootScope", "fireFactory",
	function($scope, $rootScope, fireFactory, $log, uiGmapGoogleMapApi, $location) {
    // Nashville's latitude and longitude is: 36.1667, -86.7833
    var matLat = 47.6509517;
    var matLong = -122.1395801;
    var addMode;
    $scope.matfrom = '';
    $scope.coinIcon = 'app/images/Coin.gif';
    console.log("coinIcon", $scope.coinIcon);
    console.log("fireFactory", fireFactory);

    //This is in order to recenter the map based on the users Geolocation upon button click
    $scope.geolocateMe = function() {
      console.log("GEOLOCATING! HANG ON!");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          matLat = position.coords.latitude;
          matLong = position.coords.longitude;
          $scope.map.center = { latitude: matLat, longitude: matLong };
          $scope.$apply();      
        });
      } else {
        console.log("GEOLOCATION NOT SUPPORTED, SORRY");
      } 
    };
    //This is called in order to locate the user upon arrival
    $scope.geolocateMe();

    // The user clicks the 'Add Relay' button, then clicks the map or the button again
    $scope.toggleAddMode = function(){
      if (addMode) {
        addMode = false;
        console.log("no longer in add a relay mode");
      } else {
        addMode = true;
        console.log("Add a relay mode");
      }
    };

    //Create the map on the scope and load the markers in
		$scope.map = {
      center: {latitude: matLat, longitude: matLong },
      zoom: 15,
	    markers: fireFactory.getMarkers(),
      events: {
        click: function (map, eventName, originalEventArgs) {
        	if (addMode) {
            var e = originalEventArgs[0];
            var lat = e.latLng.lat(),lon = e.latLng.lng();
            var marker = {
                creator: fireFactory.getUid(),
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
    //options to disable streetview and custom marker images
    $scope.options = {
      scrollwheel: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'app/images/SmallCoin.gif'
    };
    
    // Input form autocomplete
    var inputFrom = document.getElementById('from');
    console.log("inputFrom", inputFrom);
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, $scope.options);

    // Saves a marker at the input/autocomplete address
    $scope.addSearch = function(){
      var addressMarker = {
          creator: fireFactory.getUid(),
          id: Date.now(),
          coords: {
            latitude: matLat,
            longitude: matLong
          }
        };
        $scope.map.markers.push(addressMarker);
        fireFactory.addMarker(addressMarker);
        console.log($scope.map.markers);
    };

  // This moves the map to a new location from the search box
  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.matfrom = place.formatted_address;
        console.log("place", place);

        matLat = place.geometry.location.lat();
        matLong = place.geometry.location.lng();
        console.log("latitude", place.geometry.location.lat());
        console.log("longitude", place.geometry.location.lng());

        console.log("place.formatted_address", place.formatted_address);

        $scope.map.center = { latitude: matLat, longitude: matLong };
        $scope.map.zoom = 18;
        $scope.$digest();
    });





}]);