app.controller("mapController",
	["$scope", "$rootScope", "fireFactory",
	function($scope, $rootScope, fireFactory, $log, uiGmapGoogleMapApi, $location) {
    // Nashville's latitude and longitude is: 36.1667, -86.7833
    var matLat = 47.6509517;
    var matLong = -122.1395801;
    var addMode;
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
    $scope.options = {
      scrollwheel: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
  $scope.searchbox = { 
    template:'searchbox.tpl.html', 
    events:{
      place_changed: function (searchBox) {
        console.log("searchBox", searchBox);
      }
    }
  };

    
    var inputFrom = document.getElementById('from');
    console.log("inputFrom", inputFrom);
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, $scope.options);



  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.matfrom = place.formatted_address;
        console.log("place", place);
        console.log("matfrom", $scope.matfrom);

        matLat = place.geometry.location.lat();
        matLong = place.geometry.location.lng();
        console.log("latitude", place.geometry.location.lat());
        console.log("longitude", place.geometry.location.lng());

        console.log("place.formatted_address", place.formatted_address);

        $scope.map.center = { latitude: matLat, longitude: matLong };
        $scope.$digest();
    });



}]);