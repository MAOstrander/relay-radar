app.controller("memberController",
	["$scope", "$rootScope", "fireFactory", "$firebaseObject",
	function($scope, $rootScope, fireFactory, $firebaseObject) {

		$scope.editMode;
		var memberUid = fireFactory.getUid();
		console.log("memberProfile UID:", memberUid);

    var profileRef = new Firebase("https://relay-radar.firebaseio.com/user/"+memberUid);
   	$scope.memberProfile = $firebaseObject(profileRef);

   	$scope.toggleEditMode = function(){
      if ($scope.editMode) {
        $scope.editMode = false;
        console.log("no longer in edit Profile mode");
      } else {
        $scope.editMode = true;
        console.log("Edit Profile mode");
      }
    };

  //   profileRef.$loaded().then(function() {
		// 	console.log("profileRef after $loaded from firebaseObject", profileRef);
		// });

		// var testiest = fireFactory.getParticularNode($scope.memberUid);
		// console.log("testiest from fireFactory", testiest);
		// testiest = $firebaseObject(testiest);
		// console.log("testiest after firebaseObject", testiest);

		// testiest.$loaded().then(function() {
		// 	console.log("testiest after $loaded from firebaseObject", testiest);
		// });


}]);