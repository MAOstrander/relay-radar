app.factory("fireFactory", 
	["$firebaseAuth","$firebaseArray", "$q", function($firebaseAuth, $firebaseArray, $q) {
		var firebaseRef = new Firebase("https://relay-radar.firebaseio.com/");
    var uid;

    function getFirebaseRoot() {
      return firebaseRef;
    };
    function getParticularNode(Particular){
      return getFirebaseRoot().child(Particular);   
    };
    function getMarkers(){
      var ref = getFirebaseRoot();
      var markerRef = ref.child("markers")
      return $firebaseArray(markerRef);
    };
    function addMarker(data){
      var addRef = getFirebaseRoot();
      addMarkerRef = addRef.child("markers")
      addMarkerRef = $firebaseArray(addMarkerRef);
      return  addMarkerRef.$add(data);
    };
    // addData: function(data, Particular){
    //   var ref = getParticularNode(Particular);
    //   return  $firebase(ref).$push(data);
    // },
    // getData: function(callback, Particular){
    //   var ref = getParticularNode(Particular);
    //   return $firebase(ref).$asArray();
    // },

  //   getUid: function(){
  //     return uid;
  //   },
  //   setUid: function(passedUid){
  //     uid = passedUid;
  //   },
		// useAuth: function() {
  //   return $firebaseAuth(ref);
  // 	},
  // 	logUs: function(inorOut){
  // 		$rootScope.loggedIn = inorOut;
  // 		console.log("inorOut", inorOut);
  // 	},
  // 	isLoggedIn: function(){
  // 		return $rootScope.loggedIn;
  // 	}

  return {
    getFirebaseRoot: getFirebaseRoot,
    getParticularNode: getParticularNode,
    getMarkers: getMarkers,
    addMarker: addMarker
  }
}]);
