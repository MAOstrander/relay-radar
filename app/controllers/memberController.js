app.controller("memberController",
	["$scope", "$rootScope", "fireFactory", "userFactory", "$firebaseObject",
	function($scope, $rootScope, fireFactory, userFactory, $firebaseObject) {

	$scope.editMode;
	var memberUid = fireFactory.getUid();
	console.log("memberProfile UID:", memberUid);

	//Load the profile of the currently logged in user
  var profileRef = new Firebase("https://relay-radar.firebaseio.com/user/"+memberUid);
 	$scope.memberProfile = $firebaseObject(profileRef);
 	console.log("memberProfile", $scope.memberProfile);

 	//Get the profile constants from the factory in order to edit profile
	$scope.hobbyArray = userFactory.getHobbyArray();
	$scope.colorArray = userFactory.getColorArray();
		$scope.dayArray = userFactory.getDayArray();
		$scope.monthArray = userFactory.getMonthArray();
		$scope.gameArray = userFactory.getGameArray();
		console.log("$scope.gameArray", $scope.gameArray);

	//Load the profile of every user in the database
		var allUserRef = new Firebase("https://relay-radar.firebaseio.com/user/");
 	$scope.allUsers = $firebaseObject(allUserRef);
 	console.log("memberProfile", $scope.allUsers);


 	$scope.toggleEditMode = function(){
    if ($scope.editMode) {
      $scope.editMode = false;
      console.log("no longer in edit Profile mode");
      console.log("gamesChecked", $scope.gameChecked);
      $scope.memberProfile.$save();
    } else {
      $scope.editMode = true;
      console.log("Edit Profile mode");
    }
  };

  $scope.addFriend = function(friendsUid){
  	var newRef = new Firebase('https://relay-radar.firebaseio.com/user/')
  	newRef.child(memberUid).child('friendsList').push(friendsUid.uid);
  };



}]);