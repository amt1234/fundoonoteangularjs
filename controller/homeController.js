app.controller('homeController', function ($scope, $mdSidenav, $state) {
  $scope.toggleLeft = buildToggle('open');

  //toggle for sidebar
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

  //listview and gridview
  $scope.islist = false;
  $scope.view = function () {
    var elements = document.getElementsByClassName("listgrid");
    var i;
    if (($scope.islist)) {
      console.log("islist true");
      for (i = 0; i < elements.length; i++) {
        elements[i].style.width = "240px";
      }
      $scope.islist = false;
    }
    else {
      console.log("islist false");
      for (i = 0; i < elements.length; i++) {
        elements[i].style.width = "800px";
      }
     // document.getElementsByClassName("main").style.width = "800px";
      $scope.islist = true;
      // $scope.getAllNote();
    }
  }

  //$state function call
  $state.go('home.dashboard');

  $scope.archiveState = function () {
    $state.go('home.archive');
  }

  $scope.trashState = function () {
    $state.go('home.trash');
  }

  $scope.noteState = function () {
    $state.go('home.dashboard');
  }
});
