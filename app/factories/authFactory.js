app.factory("userFactory", 
	["$firebaseAuth","$firebaseArray", "$q", function($firebaseAuth, $firebaseArray, $q) {
		var firebaseRef = new Firebase("https://relay-radar.firebaseio.com/");
    var uid;


    function getUid(){
      return uid;
    };
    function setUid(passedUid){
      uid = passedUid;
    };
		function useAuth() {
    return $firebaseAuth(ref);
  	};
  	function logUs(inorOut){
  		$rootScope.loggedIn = inorOut;
  		console.log("inorOut", inorOut);
  	};
  	function isLoggedIn(){
  		return $rootScope.loggedIn;
  	};

  return {
    getUid: getUid,
    setUid: setUid,
    useAuth: useAuth,
    logus: logus,
    isLoggedIn: isLoggedIn
  }
}]);
