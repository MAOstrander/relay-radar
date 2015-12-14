app.controller('navigation',
  ["$scope", "$rootScope", "$uibModal", "$log", "userFactory", "$location", 
  function($scope, $rootScope, $uibModal, $log, userFactory, $location) {

  $scope.animationsEnabled = true;

      $scope.user={};

    $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.starter = [];
      var board = 'sample';
      var img = "ImageString";
      var title = "pin Title";
      var description = "pin Description";
        // Auth.logUs(true);

      Auth.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
        Auth.setUid(userData.uid);
        
        console.log("What we'll add", {board: board, img, title, description});
        
        var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        var addRefArray = $firebaseArray(addRef)
        addRefArray.$loaded()
          .then(function() {
            addRefArray.$add({board: board, img, title, description});
          }) 
          .then(function() {
            $rootScope.loggedIn = true;
            $location.path('/board').replace();
          })
          .catch(function(error) {
          console.log("Error in the addRef:", error);
          });

      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.loginUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.useAuth().$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User logged in with uid: " + userData.uid;
        $rootScope.loggedIn = true;
        // Auth.logUs(true);
        Auth.setUid(userData.uid);
        $location.path('/board').replace();

        console.log("HELLO?", $scope.message);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    Auth.logUs(false);
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
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $firebaseArray, userFactory) {

  $scope.pins = [];
  // $scope.selected = {
  //   item: $scope.pins[0]
  // };

  $scope.ok = function () {
    // var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    // addRef = $firebaseArray(addRef)
    // addRef.$loaded().then(function(){
      
    // console.log("addRef", addRef);
    // addRef.$add($scope.pins);
    // console.log("$scope.pins", $scope.pins);
    // })
    $uibModalInstance.close($scope.pins);
  };

  $scope.cancel = function () {
    console.log("This is from the cancel function");
    $uibModalInstance.dismiss('cancel');
  };
});