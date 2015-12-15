app.controller('navigation',
  ["$scope", "$rootScope", "$uibModal", "$log", "userFactory", "$location", 
  function($scope, $rootScope, $uibModal, $log, userFactory, $location) {

  $scope.animationsEnabled = true;

  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    // Auth.logUs(false);
    $scope.user={};
    console.log("No longer logged in?");
    $location.path('/login').replace();
  };

  $scope.goMember = function(){
    $location.path('/member').replace();
  }

  $scope.loginModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/partials/loginModal.html',
      controller: 'ModalInstanceCtrl',
      size: "large",
      resolve: {
        items: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function (modalresult) {
      if (modalresult === "initiateSignup") {
        var signupModalInstance = $uibModal.open({
          templateUrl: 'app/partials/signupModal.html',
          controller: 'signupFormCtrl',
          size: "large",
          resolve: {
            items: function () {
              return $scope.user;
            }
          }
        });

      }
      else {
        console.log("IS THIS USERDATA?", modalresult);
      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.whatIsThis = function(){
    window.scrollTo(200, 100);
  }

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
app.controller('ModalInstanceCtrl',
  ["$scope","userFactory", "$uibModalInstance", "$firebaseArray",  
  function ($scope, userFactory, $uibModalInstance, $firebaseArray) {

  $scope.user={};
  $scope.pins = [];
  // $scope.selected = {
  //   item: $scope.pins[0]
  // };

  $scope.loginUser = function() {
    $scope.message = null;
    $scope.error = null;

    userFactory.useAuth().$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(userData) {
      $scope.message = "User logged in with uid: " + userData.uid;
      // $rootScope.loggedIn = true;
      // Auth.logUs(true);
      userFactory.setUid(userData.uid);
      // $location.path('/member').replace();

      console.log("HELLO?", $scope.message);
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
}]);


app.controller('signupFormCtrl',
  ["$scope","userFactory", "fireFactory", "$uibModalInstance", "$firebaseArray", "$firebaseObject",  
  function ($scope, userFactory, fireFactory, $uibModalInstance, $firebaseArray, $firebaseObject) {

    $scope.colorArray  = [{
      color: 'Red',
      selectedColor: 'red'
    }, {
      color: 'Orange',
      selectedColor: 'orange'
    }, {
      color: 'Yellow',
      selectedColor: 'yellow'
    }, {
      color: 'Light Green',
      selectedColor: 'lightGreen'
    }, {
      color: 'Green',
      selectedColor: 'green'
    }, {
      color: 'Blue',
      selectedColor: 'blue'
    }, {
      color: 'Light Blue',
      selectedColor: 'lightBlue'
    }, {
      color: 'Pink',
      selectedColor: 'pink'
    }, {
      color: 'Purple',
      selectedColor: 'purple'
    }, {
      color: 'Brown',
      selectedColor: 'brown'
    }, {
      color: 'White',
      selectedColor: 'white'
    }, {
      color: 'Black',
      selectedColor: 'black'
    }];

    $scope.hobbyArray  = [{
      hobby: 'Eating Well',
      selectedhobby: 'eating'
    }, {
      hobby: 'Sleeping',
      selectedhobby: 'sleeping'
    }, {
      hobby: 'Chatting',
      selectedhobby: 'chatting'
    }, {
      hobby: 'Partying',
      selectedhobby: 'partying'
    }, {
      hobby: 'Fashion',
      selectedhobby: 'fashion'
    }, {
      hobby: 'Shopping',
      selectedhobby: 'shopping'
    }, {
      hobby: 'Helping Others',
      selectedhobby: 'helping'
    }, {
      hobby: 'Studying',
      selectedhobby: 'studying'
    }, {
      hobby: 'Earning Money',
      selectedhobby: 'money'
    }, {
      hobby: 'Cooking',
      selectedhobby: 'cooking'
    }, {
      hobby: 'Cleaning',
      selectedhobby: 'cleaning'
    }, {
      hobby: 'Playing Video Games',
      selectedhobby: 'games'
    }, {
      hobby: 'Using the Internet',
      selectedhobby: 'internet'
    }, {
      hobby: 'Listening to Music',
      selectedhobby: 'music'
    }, {
      hobby: 'Watching Movies',
      selectedhobby: 'movies'
    }, {
      hobby: 'Reading',
      selectedhobby: 'reading'
    }, {
      hobby: 'Driving',
      selectedhobby: 'driving'
    }, {
      hobby: 'Playing Sports',
      selectedhobby: 'sports'
    }, {
      hobby: 'The Outdoors',
      selectedhobby: 'outdoors'
    }, {
      hobby: 'Traveling',
      selectedhobby: 'traveling'
    }, {
      hobby: 'Fishing',
      selectedhobby: 'fishing'
    }, {
      hobby: 'Taking Photos',
      selectedhobby: 'photos'
    }, {
      hobby: 'Drawing',
      selectedhobby: 'drawing'
    }, {
      hobby: 'Keeping Pets',
      selectedhobby: 'pets'
    }, {
      hobby: 'Dancing',
      selectedhobby: 'dancing'
    }, {
      hobby: 'Secret',
      selectedhobby: 'secret'
    }, {
      hobby: 'Other',
      selectedhobby: 'other'
    }];

  $scope.favoriteColor = $scope.colorArray[0];
  console.log("favoriteColor", $scope.favoriteColor);
  $scope.favoriteHobby = $scope.hobbyArray[26];
  console.log("favoriteHobby", $scope.favoriteHobby);

  $scope.submitSignUp = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.user = {
        username: $scope.user.username,
        colorFave: $scope.favoriteColor.selectedColor,
        hobbyFave: $scope.favoriteHobby.selectedhobby,
        email: $scope.user.email,
        password: $scope.user.password
      }

      var checkUser = fireFactory.getFirebaseRoot().child('user');
      checkUser = $firebaseArray(checkUser)
      checkUser.$loaded()
          .then(function() {
            
      var takenUsername = false;
      console.log("checkUser", checkUser);
      for (var i = 0; i < checkUser.length; i++) {
        if (checkUser[i].$id === $scope.user.username) {
          
          takenUsername = true;
        }
      }
      console.log("takenUsername", takenUsername);
      if (takenUsername) {
        console.log("Sorry, this username exists already", takenUsername);
      } else {


      userFactory.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        console.log("User created with uid: ", userData.uid);
        // $scope.message = "User created with uid: " + userData.uid;
        userFactory.setUid(userData.uid);
  
        
        var addRef = new Firebase("https://relay-radar.firebaseio.com/user/"+$scope.user.username);
        var addRefObject = $firebaseObject(addRef)
        addRefObject.$loaded()
          .then(function() {
            addRefObject.username = $scope.user.username;
            addRefObject.uid = userData.uid;
            addRefObject.colorFave = $scope.user.colorFave;
            addRefObject.hobby = $scope.user.hobbyFave;
            addRefObject.$save().then(function(addRef) {
  addRef.key() === addRefObject.$id; // true
}, function(error) {
  console.log("Error:", error);
});
          }) 
        //   .then(function() {
        //     $rootScope.loggedIn = true;
        //     $location.path('/board').replace();
        //   })
          .catch(function(error) {
          console.log("Error in the addRef:", error);
          });

        $uibModalInstance.close(userData);
      }).catch(function(error) {
        $scope.error = error;
      });
    } //else bracket
          }) //loaded bracket combo
    };
  
  $scope.cancel = function () {
    console.log("This is from the cancel function");
    $uibModalInstance.dismiss('cancel');
  };
}]);