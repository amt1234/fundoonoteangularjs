app.controller('dashboardController', function ($scope, Userfactory) {
    $scope.isVisible = false;
    $scope.isPinned=false;
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
        this.onMouse = true;
    };
    $scope.hoverOut = function () {
        this.onMouse = false;
    };

    //pinned operation
    $scope.myClass = [];
    $scope.addClass = function (item) {
        $scope.isPinned=this.onMouse = true;
        console.log("add class");
        if($scope.isPinned){
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.notePinned = false;
            $scope.update(item);
        }
        else{
            $scope.removeClass(item);
        } 
    }
    $scope.removeClass = function (item) {
        console.log("remove class");
        item.notePinned = true;
        $scope.myClass.slice(item);
        $scope.update(item);
    }

    //get all note
    $scope.getAllNote = function () {
        var url = "note/list";
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
        var url = "note/create";
        Userfactory.postmethod(createNote, url).then(function successCallback(response) {
            console.log("note created : " + response);

        }, function errorCallback(response) {
            console.log("error create note");
        });
    }

    //update note
    $scope.update=function(note){
        // note.notePinned = true;
        var url="note/update";
        Userfactory.postmethod(note, url).then(function successCallback(response) {
            console.log("pin note update : " + response);
            $scope.getAllNote();
        }, function errorCallback(response) {
            console.log("error pin note");
        });
    }

});