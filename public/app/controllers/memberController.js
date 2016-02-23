app.controller("memberController",
	["$scope", "$rootScope", "fireFactory", "userFactory", "$firebaseObject", "$firebaseArray",
	function($scope, $rootScope, fireFactory, userFactory, $firebaseObject, $firebaseArray) {

	$scope.editMode = false;
	$scope.friends = 'current';
	var memberUid = fireFactory.getUid();
	console.log("memberProfile UID:", memberUid);
  $scope.sendTo = '';
  $scope.messageToSend = '';

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
 	$scope.allUsers = $firebaseArray(allUserRef);
 	console.log("memberProfile", $scope.allUsers);

  // This filter is for all the users, returning only people in the friend list
  $scope.searchBy = function () {
    return function (maybeFriend) {
      for (var testUID in $scope.memberProfile.friendsList) {
        // console.log("testUID", $scope.memberProfile.friendsList[testUID]);
        // console.log("maybeFriend.uid", maybeFriend.uid);
        if ($scope.memberProfile.friendsList[testUID] === memberUid) {
          //Don't display yourself
          console.log("That's you!");
        } else {
          if ( $scope.memberProfile.friendsList[testUID] === maybeFriend.uid ) {
            // console.log("maybeFriend", maybeFriend);
            return true;
          }
        }
      }
    };
  };

  // This filter is for all the users, returning only people NOT in the friend list
  $scope.notFriends = function () {
    return function (maybeFriend) {
    	var isFriend = false;
    	for (var testUID in $scope.memberProfile.friendsList) {
    		// console.log("testUID", $scope.memberProfile.friendsList[testUID]);
    		// console.log("maybeFriend.uid", maybeFriend.uid);
	      if ( $scope.memberProfile.friendsList[testUID] === maybeFriend.uid ) {
	      	// console.log("maybeFriend", maybeFriend);
	      	isFriend = true;
	      }
    	}
    	if (isFriend === false) {
	      return true;
    	}
    };
  };

  // This allows a user to edit their profile information and save it
 	$scope.toggleEditMode = function(){
    if ($scope.editMode) {
      $scope.editMode = false;
      $scope.memberProfile.$save();
    } else {
      $scope.editMode = true;
    }
  };

  //This shows all the users that aren't currently friends
  $scope.showAll = function(){
    $scope.friends = 'find';
  };
  //This shows the list of friends
  $scope.showFriends = function(){
    $scope.friends = 'current';
  };

  // When you click the 'Friend+' button it adds the target to the user's friend list
  $scope.addFriend = function(friendsUid){
    var newRef = new Firebase('https://relay-radar.firebaseio.com/user/');
    newRef.child(memberUid).child('friendsList').push(friendsUid.uid);
  };

  //Allows you to send a message to a friend
	$scope.sendMessage = function(){
    var sendHere = $scope.sendTo.uid;
    var newMessageRef = new Firebase('https://relay-radar.firebaseio.com/user/' + sendHere);
    var theMessage = {'from': $scope.memberProfile.username, 'message': $scope.messageToSend};
    newMessageRef.child('messages').push(theMessage);

    //reset the fields
    $scope.messageToSend = '';
    $scope.sendTo = '';
  };


}]);
