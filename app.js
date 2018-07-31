var app=angular.module('fundoonote',['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate','ngAria']);
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
  })
  .state('home.dashboard',{
    url:"/home.dashboard",
    templateUrl:"templetes/dashboard.html",
    controller:"dashboardController"
  });
  $urlRouterProvider.otherwise('/login');
});
