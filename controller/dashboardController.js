app.controller('dashboardController', function ($scope, Userfactory) {
    $scope.isVisible = false;
    //$scope.onMouse=false;
    $scope.notes = [];

    //function for centercard to display on-click inputtext
    $scope.showHide = function () {
        $scope.isVisible = $scope.isVisible = true;
    };

    //function for centercard to set isvisible false on-click close button
    $scope.showHide1 = function () {
        $scope.isVisible = $scope.isVisible = false;
        $scope.create();
    };

    //function for cards to display images onMouseOver
    $scope.hoverIn = function () {
        //$scope.onMouse=$scope.onMouse=true;
        this.onMouse = true;
    };

    $scope.hoverOut = function () {
        // $scope.onMouse=$scope.onMouse=false;
        this.onMouse = false;
    };

    //get all note
    $scope.getAllNote = function () {
        var url = "http://localhost:8080/SpringRestFoundoNote/note/" + 'list';
        Userfactory.getmethod(url).then(function successCallback(response) {
            $scope.notes = response.data;
            console.log("Notes " + $scope.notes);
        }, function errorCallback(response) {
            console.log(response);
            console.log("error  getAllNotes");
        });
    }
    $scope.getAllNote();

    //create note
    $scope.create = function () {
        var createNote = {
            noteTitle: $scope.title,
            noteDescribtion: $scope.description
        };
        var url = "http://localhost:8080/SpringRestFoundoNote/note/" + 'create';
        Userfactory.postmethod(createNote, url).then(function successCallback(response) {
            console.log("note created : " + response);

        }, function errorCallback(response) {
            console.log("error create note");
        });
    }

});