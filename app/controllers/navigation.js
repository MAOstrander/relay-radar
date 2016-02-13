app.controller('navigation',
  ["$scope", "$rootScope", "$uibModal", "$log", "fireFactory", "$location", 
  function($scope, $rootScope, $uibModal, $log, fireFactory, $location) {

  $scope.animationsEnabled = true;
  // Workaround for the top navbar and map to never have to reload
  $rootScope.loggedIn = false;
  $rootScope.friendDash = false;
  $rootScope.ProfileSlide = false;
  $rootScope.messageSlide = false;

  // Scroll down to the 'What is this?' section
  $scope.whatIsThis = function(){
    window.scrollTo(0, 725);
  };
  // Scroll down to the 'Why Log in?' section
  $scope.whyLogin = function(){
    window.scrollTo(0, 1500);
  };

  // Show or hide the friendslist at bottom of screen
  $scope.friendDashboard = function(){
    if ($scope.friendDash) {
      $rootScope.friendDash = false;
    } else {
      $rootScope.friendDash = true;
    }
  };

  // Show or hide the Profile Sidebar on left
  $scope.profileSlider = function(){
    console.log("You clicked profile");
    if ($rootScope.ProfileSlide) {
      $rootScope.ProfileSlide = false;
      console.log("Slider should close");
    } else {
    $rootScope.ProfileSlide = true;
      console.log("Slider should open");
    }
  };
  // Show or hide the Message Sidebar on right
  $scope.messageSlider = function(){
    console.log("You clicked messages");
    if ($rootScope.messageSlide) {
      $rootScope.messageSlide = false;
      console.log("Slider should close");
    } else {
    $rootScope.messageSlide = true;
      console.log("Slider should open");
    }
  };

  // Logs out and takes to intro page
  $scope.logOut = function() {
    fireFactory.useAuth().$unauth();
    $scope.authData = null;
    $scope.user={};
    $rootScope.loggedIn = false;
    console.log("No longer logged in?");
    $location.path('/intro').replace();
  };

  // This is the login modal
  $scope.loginModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/partials/loginModal.html',
      controller: 'ModalInstanceCtrl',
      size: "large",
      resolve: {
        items: function () {return $scope.user;}
      }
    });
    modalInstance.result.then(function (modalresult) {
      //If they click signup, brings up the signup modal
      if (modalresult === "initiateSignup") {
        var signupModalInstance = $uibModal.open({
          templateUrl: 'app/partials/signupModal.html',
          controller: 'signupFormCtrl',
          size: "large",
          resolve: {
            items: function () {return $scope.user;}
          }
        });
      } else {
        // If they were able to login then store that state...
        if (modalresult.uid) {
          $rootScope.loggedIn = true;
          // ...and change the navbar & pages
          $location.path('/member').replace();
        }
      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());

    });
  };


}]); // END NAVIGATION CONTROLLER

// $modalInstance represents a modal window (instance) dependency.
app.controller('ModalInstanceCtrl',
  ["$scope", "$rootScope","fireFactory", "$uibModalInstance", "$firebaseArray",  
  function ($scope, $rootScope, fireFactory, $uibModalInstance, $firebaseArray) {

  $scope.user={};

  //Logs the user in with email/password
  $scope.loginUser = function() {
    $scope.message = null;
    $scope.error = null;

    fireFactory.useAuth().$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(userData) {
      console.log("User logged in with uid: ", userData.uid);
      fireFactory.setUid(userData.uid);
      $uibModalInstance.close(userData);
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  //Closes this modal and will load the sign up modal
  $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $uibModalInstance.close("initiateSignup");
    };
  
  //Dismiss without logging in or signing up
  $scope.cancel = function () {
    console.log("This is from the cancel function");
    $uibModalInstance.dismiss('cancel');
  };
}]); //END LOGIN MODAL INSTANCE CONTROLLER


app.controller('signupFormCtrl',
  ["$scope", "$rootScope", "userFactory", "fireFactory", "$uibModalInstance", "$firebaseArray", "$firebaseObject", "$location",  
  function ($scope, $rootScope, userFactory, fireFactory, $uibModalInstance, $firebaseArray, $firebaseObject, $location) {

  $scope.hobbyArray = userFactory.getHobbyArray();
  $scope.colorArray = userFactory.getColorArray();
  $scope.favoriteColor = $scope.colorArray[0];
  $scope.favoriteHobby = $scope.hobbyArray[26];


  // Submit the info for signup
  $scope.submitSignUp = function() {
    $scope.message = null;
    $scope.error = null;
    $scope.user = {
      username: $scope.user.username,
      colorFave: $scope.favoriteColor,
      hobbyFave: $scope.favoriteHobby,
      zip: $scope.user.zip,
      email: $scope.user.email,
      password: $scope.user.password
    };

    var checkUser = fireFactory.getFirebaseRoot().child('user');
    checkUser = $firebaseArray(checkUser);
    checkUser.$loaded().then(function() {
    
      //This loops through the collection of all usernames to check whether a username is unique or not
      var takenUsername = false;
      for (var i = 0; i < checkUser.length; i++) {
        if (checkUser[i].username === $scope.user.username) {
          takenUsername = true;
        }
      }
      //If the username is taken the if statement prevents the authcall from being made
      if (takenUsername) {
        console.log("Sorry, this username exists already", takenUsername);
      } else {

        fireFactory.useAuth().$createUser({
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(userData) {
          console.log("User created with uid: ", userData.uid);
          fireFactory.setUid(userData.uid);

          var addRef = new Firebase("https://relay-radar.firebaseio.com/user/"+userData.uid);
          var addRefObject = $firebaseObject(addRef);
          addRefObject.$loaded()
          .then(function() {
            addRefObject.username = $scope.user.username;
            addRefObject.zip = $scope.user.zip;
            addRefObject.uid = userData.uid;
            addRefObject.colorFave = $scope.user.colorFave;
            addRefObject.hobby = $scope.user.hobbyFave;
            addRefObject.friendsList = {defaultFriend: userData.uid};
            //Save the profile info from user into firebase
            addRefObject.$save();
          }) 
          .then(function() {
            $rootScope.loggedIn = true;
            $location.path('/member').replace();
          })
          .catch(function(error) {
          console.log("Error in the addRef:", error);
          });

          $uibModalInstance.close(userData);
        }).catch(function(error) {
          $scope.error = error;
        });
      } //end of else bracket for unique username determination
    }); //End ofCheckuser.loaded bracket combo
  }; //End of SubmitSignup Function
  
  $scope.cancel = function () {
    console.log("This is from the cancel function");
    $uibModalInstance.dismiss('cancel');
  };
}]); //END SIGN-UP FORM MODAL INSTANCE CONTROLLER