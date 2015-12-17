app.controller("memberController",
	["$scope", "$rootScope", "fireFactory", "userFactory", "$firebaseObject",
	function($scope, $rootScope, fireFactory, userFactory, $firebaseObject) {

		$scope.editMode;
		var memberUid = fireFactory.getUid();
		console.log("memberProfile UID:", memberUid);

    var profileRef = new Firebase("https://relay-radar.firebaseio.com/user/"+memberUid);
   	$scope.memberProfile = $firebaseObject(profileRef);
   	console.log("memberProfile", $scope.memberProfile);

		$scope.hobbyArray = userFactory.getHobbyArray();
		$scope.colorArray = userFactory.getColorArray();
		$scope.favoriteColor = $scope.colorArray[0];
 		$scope.favoriteHobby = $scope.hobbyArray[26];


      $scope.editUser = {
      // zip: $scope.memberProfile.zip,
      colorFave: $scope.favoriteColor.selectedColor,
      hobbyFave: $scope.favoriteHobby.selectedhobby,
    //   Gender: 'a',
	   //  Birthday: 'a',
	   //  Friendcode: 'a',
	   //  Games: 'a',
		  // Records: 'a'
    };


   	$scope.toggleEditMode = function(){
      if ($scope.editMode) {
        $scope.editMode = false;
        console.log("no longer in edit Profile mode");
        console.log("editUser", $scope.memberProfile);
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