app.controller('homeController', function ($scope, $mdSidenav, $state,$mdDialog) {
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
      $scope.islist = true;
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

  //create new label dialog
    $scope.labelDialog = function (event) {
      $mdDialog.show({
          // locals: {
          //     passNote: note,
          //     abc: $scope//to give $scope access  of main controller (ie dashboardController scope) 
          // },
          controller: labelDialogController,
          templateUrl: 'templetes/labeldialog.html',
          targetEvent: event,
          parent: angular.element(document.body),
          clickOutsideToClose: true,
      })
  };
  function labelDialogController($scope,$mdDialog) {
      // $scope.note = passNote;
      // $scope.outerScope = abc;
      $scope.close = function () {
          console.log("close update");
         // abc.update(passNote);
          $mdDialog.hide();
      }
  }
});
