var app=angular.module('fundoonote',['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate']);
app.config(function($stateProvider,$urlRouterProvider){

  $stateProvider

//  STATES AND NESTED VIEWS
  .state('login',{
    url:'/login',
    templateUrl:'templetes/login.html',
   controller:'loginController'
  })
  .state('home',{
    url:'/home',
    templateUrl:'templetes/home.html',
    controller:'homeController'
  })
  .state('register',{
    url:"/register",
    templateUrl:"templetes/register.html",
    controller:"loginController"
  })
  .state('forgotpassword',{
    url:"/forgotpassword",
    templateUrl:"templetes/forgotpassword.html",
    controller:"loginController"
  })
  .state('reset',{
    url:"/reset",
    templateUrl:"templetes/resetpassword.html",
    controller:"loginController"
  });
  $urlRouterProvider.otherwise('/login');
});
