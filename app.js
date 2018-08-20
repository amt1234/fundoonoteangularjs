var app = angular.module('fundoonote', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'content-editable', 'ngSanitize']);
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
    .state('home.reminders',{
      url:"/reminders",
      templateUrl:"templetes/reminders.html",
      controller:"dashboardController",
    });

  $urlRouterProvider.otherwise('/login');

  
});

app.run(function($rootScope){
  $rootScope.$on('$locationChangeStart', 
function(event, toState){ 
    // do something
    console.log(event);
    console.log(toState);
    var path = toState.split('/');
    console.log(path[5]);
    
    if(path[5]!=undefined){
      if(path[5] == "reminders"){
        $rootScope.color = "rgb(96, 125, 139)";
      }else{
        $rootScope.color ="#fb0";
      }
    }
})
});
