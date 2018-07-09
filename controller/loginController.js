app.controller('loginController',function($scope,$state){
  $scope.login=function(){
    $state.go('home');
  }
});
