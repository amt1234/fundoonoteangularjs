var app = angular.module('fundoonote', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'content-editable', 'ngSanitize', 'ngImgCrop']);
app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

    //  STATES AND NESTED VIEWS
    .state('login', {
      url: '/login',
      templateUrl: 'templetes/login.html',
      controller: 'loginController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templetes/home.html',
      controller: 'dashboardController'
    })
    .state('register', {
      url: "/register",
      templateUrl: "templetes/register.html",
      controller: "loginController"
    })
    .state('forgotpassword', {
      url: "/forgotpassword",
      templateUrl: "templetes/forgotpassword.html",
      controller: "loginController"
    })
    .state('reset', {
      url: "/reset",
      templateUrl: "templetes/resetpassword.html",
      controller: "loginController"
    })
    .state('home.dashboard', {
      url: "/dashboard",
      templateUrl: "templetes/dashboard.html",
      controller: "dashboardController"
    })
    .state('home.archive', {
      url: "/archive",
      templateUrl: "templetes/archive.html",
      controller: "dashboardController"
    })
    .state('home.trash', {
      url: "/trash",
      templateUrl: "templetes/trash.html",
      controller: "dashboardController"
    })
    .state('home.label', {
      url: "/label/:labelName",
      templateUrl: "templetes/label.html",
      controller: "dashboardController",
    })
    .state('home.reminders', {
      url: "/reminders",
      templateUrl: "templetes/reminders.html",
      controller: "dashboardController",
    });

  $urlRouterProvider.otherwise('/login');
});

//for change color of navbar at the time state change
app.run(function ($rootScope) {
  $rootScope.$on('$locationChangeStart',
    function (event, toState) {
      // do something
      console.log(event);
      console.log(toState);
      var path = toState.split('/');
      console.log(path[5]);

      if (path[5] != undefined) {
        if (path[5] == "reminders") {
          $rootScope.color = "rgb(96, 125, 139)";
          $rootScope.title = "Reminders";
        } else if (path[5] == "dashboard") {
          $rootScope.color = "#fb0";
          $rootScope.title = "Google Keep";
        }
        else if (path[5] == "archive") {
          $rootScope.color = "rgb(96, 125, 139)";
          $rootScope.title = "Archive";
        }
        else if (path[5] == "trash") {
          $rootScope.color = " rgb(99, 99, 99)";
          $rootScope.title = "Trash";
        }
        else {
          $rootScope.color = "rgb(96, 125, 139)";
          $rootScope.title = path[6];
        }
      }
    })
});
