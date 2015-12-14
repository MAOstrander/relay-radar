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

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.testingAuthFactory = function(){

    userFactory.testery();
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
    }).catch(function(error) {
      $scope.error = error;
    });
  };


    $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
        // Auth.logUs(true);

      userFactory.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        console.log("User created with uid: ", userData.uid);
        // $scope.message = "User created with uid: " + userData.uid;
        userFactory.setUid(userData.uid);
        
        // var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        // var addRefArray = $firebaseArray(addRef)
        // addRefArray.$loaded()
        //   .then(function() {
        //     addRefArray.$add({board: board, img, title, description});
        //   }) 
        //   .then(function() {
        //     $rootScope.loggedIn = true;
        //     $location.path('/board').replace();
        //   })
        //   .catch(function(error) {
        //   console.log("Error in the addRef:", error);
        //   });

      }).catch(function(error) {
        $scope.error = error;
      });
    };
      
  $scope.cancel = function () {
    console.log("This is from the cancel function");
    $uibModalInstance.dismiss('cancel');
  };
}]);