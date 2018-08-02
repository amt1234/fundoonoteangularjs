app.controller('homeController', function ($scope, $mdSidenav, $state) {
  $scope.toggleLeft = buildToggle('open');

  function buildToggle(ComponentId) {
    return function () {
      if (!$mdSidenav(ComponentId).isOpen()) {
        $mdSidenav(ComponentId).toggle();
        document.getElementById("main").style.marginLeft = "280px";
      }
      else {
        $mdSidenav(ComponentId).toggle();
        document.getElementById("main").style.marginLeft = "0px";
      }
    };
  }

  //$state function call
  $state.go('home.dashboard');
});
