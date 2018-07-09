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
  });
  $urlRouterProvider.otherwise('/login');
});
