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
      return $firebaseAuth(firebaseRef);
  	};
  	function logUs(inorOut){
  		$rootScope.loggedIn = inorOut;
  		console.log("inorOut", inorOut);
  	};
  	function isLoggedIn(){
  		return $rootScope.loggedIn;
  	};

    function testery() {
      console.log('testery')
    }

  return {
    getUid: getUid,
    setUid: setUid,
    useAuth: useAuth,
    logUs: logUs,
    isLoggedIn: isLoggedIn,
    testery: testery
  }

}]);
