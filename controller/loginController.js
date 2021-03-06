app.controller('loginController', function ($scope, $state, Userfactory, $location) {

  // login 
  $scope.login = function () {
    var userlogin = {
      userEmail: $scope.userEmail,
      password: $scope.password
    };
    var url = "user/login";
    Userfactory.postmethod(userlogin, url).then(function successCallback(response) {
      console.log("Token : " + response.data);
      // Store
      localStorage.setItem("Token", response.data.payload);
      $state.go('home.dashboard');
      $scope.userInfo();
    }, function errorCallback(response) {
      console.log("error login" + response);
    });
  }

  //register
  $scope.register = function () {
    var userregister = {
      userName: $scope.userName,
      userEmail: $scope.userEmail,
      password: $scope.password,
      phoneNumber: $scope.phoneNumber,
      dateOfBirth: $scope.dateOfBirth
    };
    var url = "user/save";
    Userfactory.postmethod(userregister, url).then(function successCallback(response) {
      $scope.factory = response.data.payload;
      $state.go('login');
    },
      function errorCallback(response) {
        console.log("error registration" + response);
      });
  }

  //forgot password
  $scope.forgotpassword = function () {
    var userforgotpassword = {
      email: $scope.userEmail
    };
    var url = "user/forgotpassword";
    Userfactory.postmethod(userforgotpassword, url).then(function successCallback(response) {
      console.log("forgot password : " + response.data.payload);
      $state.go('reset');
    },
      function errorCallback(response) {
        console.log("error forgot password" + response);
      });
  }

  //reset password
  // $location.search() without arguments is a getter, which returns an object containing all the query string parameters.
  //$location.search() with arguments is a setter, which will write to the query string.
  $scope.resetpassword = function () {
    var object = $location.search();
    console.log("token : " + object.token);
    var userresetpassword = {
      password: $scope.password
    };
    var url = "user/resetpassword/" + object.token;
    Userfactory.postmethod(userresetpassword, url).then(function successCallback(response) {
      console.log("reset password : " + response.data.payload);
      $state.go('login');
    },
      function errorCallback(response) {
        console.log("error reset password" + response);
      });
  }

  $scope.userInfo = function () {
    var url = "user/userInfo";
    Userfactory.getmethod(url).then(function successCallback(response) {
      console.log(response);
      // Store
      localStorage.setItem("userInfo", JSON.stringify(response.data.payload));

    }, function errorCallback(response) {
      console.log("error");
    });
  }
});
