app.controller('dashboardController', function ($scope, Userfactory, $mdDialog) {
    $scope.isVisible = false;
    $scope.isPinned = false;
    $scope.onColor = false;
    // $scope.isArchive = false;
    //  $scope.isTrash = false;

    $scope.myClass = [];
    $scope.note = {
        noteTitle: "",
        noteDescribtion: "",
        noteTrash: false,
        noteArchiev: false,
        notePinned: false,
        createdDate: "",
        updatedDate: "",
        color: 'white'
    }

    //function for centercard to display on-click inputtext
    $scope.showHide = function () {
        $scope.isVisible = $scope.isVisible = true;
    };

    //function for centercard to set isvisible false on-click close button
    $scope.showHide1 = function (note) {
        $scope.isVisible = $scope.isVisible = false;
        if (note.noteTitle == "" && note.noteDescribtion == "") {
            console.log("note is empty not created");
        } else {
            $scope.create();
        }

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

    //color picker
    $scope.colorbox = [
        [
            "#fff",

            "rgb(255, 138, 128)",

            "rgb(255, 209, 128)",

            "rgb(255, 255, 141)"
        ],
        [
            'rgb(204, 255, 144)',

            'rgb(167, 255, 235)',

            'rgb(128, 216, 255)',

            'rgb(130, 177, 255)'
        ],
        [
            'rgb(179, 136, 255)',

            'rgb(248, 187, 208)',

            'rgb(215, 204, 200)',

            'rgb(207, 216, 220)'

        ]
    ];

    //colorplate menu display
    $scope.openColorPalette = function ($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    //applycolor on note
    $scope.colorApply = function (secondarray, note) {
        console.log("color apply" + secondarray);

        note.color = secondarray;
        $scope.update(note);
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
        var url = "note/create";
        Userfactory.postmethod($scope.note, url).then(function successCallback(response) {
            console.log("note created : " + response);
            $scope.getAllNote();
            $scope.note = {
                noteTitle: "",
                noteDescribtion: "",
                noteTrash: false,
                noteArchiev: false,
                notePinned: false,
                createdDate: "",
                updatedDate: "",
                color: 'white'
            };
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
            $scope.getAllNote();
        }, function errorCallback(response) {
            console.log("error delete");
        });
    }
    //update note dialog
    $scope.noteDialog = function (event, note) {
        $mdDialog.show({
            locals: {
                passNote: note,
                abc: $scope//to give access the scope of main controller (ie dashboardController scope) 
            },
            controller: noteDialogController,
            templateUrl: 'templetes/dialog.html',
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        })
    };

    function noteDialogController($scope, passNote, $mdDialog, abc) {
        $scope.note = passNote;
        $scope.outerScope = abc;
        $scope.close = function () {
            console.log("close update");
            abc.update(passNote);
            $mdDialog.hide();
        }
    }


});