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

    function getUid(){
      return uid;
    };
    function setUid(passedUid){
      uid = passedUid;
    };
    function useAuth() {
      return $firebaseAuth(firebaseRef);
    };
    function logUs(inorOut){
      $rootScope.loggedIn = inorOut;
      console.log("inorOut", inorOut);
    };
    function isLoggedIn(){
      return $rootScope.loggedIn;
    };


  return {
    getFirebaseRoot: getFirebaseRoot,
    getParticularNode: getParticularNode,
    getMarkers: getMarkers,
    addMarker: addMarker,
    getUid: getUid,
    setUid: setUid,
    useAuth: useAuth,
    logUs: logUs,
    isLoggedIn: isLoggedIn
  }
}]);
