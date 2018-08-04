app.controller('dashboardController', function ($scope, Userfactory) {
    $scope.isVisible = false;
    $scope.isPinned = false;
    $scope.isArchive = false;
    //  $scope.isTrash = false;
    $scope.notes = [];
    $scope.myClass = [];

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
    $scope.addClass = function (item) {

        //$scope.isPinned=$scope.isPinned ===true ? false: true;
        if (item.notePinned) {
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.notePinned = false;
            $scope.update(item);
        }
        else {
            item.notePinned = true;
            $scope.myClass.slice(item);
            $scope.update(item);
        }
    }
    //pinned visibility
    $scope.isPinned = function () {
        if ((this.myClass) != null) {
            $scope.isPinned = $scope.isPinned = true;
        }
        else {
            $scope.isPinned = $scope.isPinned = false;
        }
    }

    //pinned
    // $scope.custom = true;
    // $scope.addClass() = function(note) {
    //     $scope.custom = $scope.custom === false ? true: false;
    // };

    //archive operation
    $scope.archive = function (item) {

        if (item.noteArchiev) {
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.noteArchiev = false;
            $scope.update(item);
        }
        else {
            item.noteArchiev = true;
            $scope.myClass.slice(item);
            $scope.update(item);
        }
    }

    //trash operation
    $scope.trash = function (item) {

        if (item.noteTrash) {
            console.log("add noteTrash ");
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.noteTrash = false;
            $scope.update(item);
        }
        else {
            console.log("remove noteTrash");
            item.noteTrash = true;
            $scope.myClass.slice(item);
            $scope.update(item);
        }
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
    $scope.update = function (note) {
        // note.notePinned = true;
        var url = "note/update";
        Userfactory.postmethod(note, url).then(function successCallback(response) {
            console.log("pin note update : " + response);
            $scope.getAllNote();
        }, function errorCallback(response) {
            console.log("error pin note");
        });
    }

    //delete note
    $scope.delete = function (note) {
        var id = note.noteId;
        var url = "note/delete/" + id;
        Userfactory.deletemethod(url).then(function successCallback(response) {
            console.log("note delete");

        }, function errorCallback(response) {
            console.log("error delete");

        });
    }
});