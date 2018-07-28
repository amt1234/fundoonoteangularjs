app.controller('homeController',function($scope,$mdSidenav){
$scope.toggleLeft=buildToggle('open');
$scope.toggleRight=buildToggle('close');

  function buildToggle(ComponentId){
      return function(){
        $mdSidenav(ComponentId).toggle();
  };
  }
});
