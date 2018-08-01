app.controller('dashboardController', function ($scope, Userfactory) {
    $scope.isVisible = false;
    $scope.notes=[];
    $scope.showHide = function () {
        $scope.isVisible = $scope.isVisible = true;
    }

    $scope.showHide1 = function () {
        $scope.isVisible = $scope.isVisible = false;
    }


    $scope.getAllNote = function () {
        var url = "http://localhost:8080/SpringRestFoundoNote/note/" + 'list';
        Userfactory.getmethod(url).then(function successCallback(response) {
            $scope.notes = response.data;
            console.log("Notes "+$scope.notes);
        }, function errorCallback(response) {
            console.log(response);

            console.log("error localstorage with getAllNotes");
        });
    }
    $scope.getAllNote();

});