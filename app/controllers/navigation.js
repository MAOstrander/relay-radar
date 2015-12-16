app.controller('navigation',
  ["$scope", "$rootScope", "$uibModal", "$log", "fireFactory", "$location", 
  function($scope, $rootScope, $uibModal, $log, fireFactory, $location) {

  $scope.animationsEnabled = true;
  $rootScope.loggedIn = false;
  $rootScope.ProfileSlide = false;
  $rootScope.messageSlide = false;

  $scope.whatIsThis = function(){
    window.scrollTo(0, 575);
  };
  $scope.whyLogin = function(){
    window.scrollTo(0, 1000);
  };

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

  $scope.logOut = function() {
    fireFactory.useAuth().$unauth();
    $scope.authData = null;
    $scope.user={};
    $rootScope.loggedIn = false;
    console.log("No longer logged in?");
    $location.path('/intro').replace();
  };

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
        if (modalresult.uid) {
          $rootScope.loggedIn = true;
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

  $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $uibModalInstance.close("initiateSignup");
    };
  
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



  $scope.submitSignUp = function() {
    $scope.message = null;
    $scope.error = null;
    $scope.user = {
      username: $scope.user.username,
      colorFave: $scope.favoriteColor.selectedColor,
      hobbyFave: $scope.favoriteHobby.selectedhobby,
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