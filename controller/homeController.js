app.controller('homeController', function ($scope, $mdSidenav, $state, $mdDialog, Userfactory) {
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

  $scope.label = {
    labelName: ""
  }

  //create new label dialog
  $scope.labelDialog = function (event) {
    $mdDialog.show({
      locals: {
        // passLabel:label,
        abc: $scope//to pass $scope of homecontroller to dialog controller (ie  labelDialogController) 
      },
      controller: labelDialogController,
      templateUrl: 'templetes/labeldialog.html',
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
    })
  };
  function labelDialogController($scope, $mdDialog, abc) {
    $scope.labels = abc.labels;
    $scope.outerScopeForLabel = abc;
    $scope.closedone = function () {
      console.log("close update :" + $scope.labelName);

      if ($scope.labelName != null) {
        abc.createLabel($scope.labelName);
      }
      $mdDialog.hide();
    }

    //label rename to edit onClick
    $scope.isEdit = false;
    $scope.showIsEdit = function () {
      this.isEdit = true;
    }

    //function for labeldialog to display images onMouseOver
    $scope.hoverIn = function () {
      this.onMouseLabel = true;
    };
    $scope.hoverOut = function () {
      this.onMouseLabel = false;
    };
  }


  //create Label
  $scope.createLabel = function (labelabc) {
    var labelcreate = {
      labelName: labelabc
    };
    var url = "label/create";
    Userfactory.postmethod(labelcreate, url).then(function successCallback(response) {
      console.log("response label create");
      $scope.getAllLabel();

    }, function errorCallback(response) {
      console.log("Label already existing");
    });
  }

  //get all label
  $scope.getAllLabel = function () {
    var url = "label/list";
    Userfactory.getmethod(url).then(function successCallback(response) {
      $scope.labels = response.data;
      console.log("Labels" + $scope.labels);
    }, function errorCallback(response) {
      console.log(response);
      console.log("error  getAllLabels");
    });
  }

  $scope.getAllLabel();

  $scope.updateLabel = function (label) {
    var url = "label/update";
    console.log("update label");

    Userfactory.postmethod(label, url).then(function successCallback(response) {
      $scope.getAllLabel();
    }, function errorCallback(response) {
      console.log("error getUpdateLabels");
    })
  }

  $scope.deleteLabel = function (labels) {
    var id = labels.labelId;
    console.log("label id " + id);
    var url = "label/delete/" + id;
    Userfactory.deletemethod(url).then(function successCallback(response) {
      console.log("label delete");
      $scope.getAllLabel();
    }, function errorCallback(response) {
      console.log("error label not delete");
    });
  }
});
