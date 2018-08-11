app.controller('dashboardController', function ($scope, Userfactory, $mdDialog, $mdPanel) {
    $scope.isVisible = false;
    $scope.isPinned = false;
    $scope.onColor = false;
    this.onpanel = false;
    $scope.reminderpanel = false;
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
        reminderDate: "",
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
        if (!this.onpanel) {
            this.onMouse = false;
        }
    };

    //pinned operation
    $scope.addClass = function (item, id) {
        //$scope.isPinned=$scope.isPinned ===true ? false: true;
        if (item.notePinned) {
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.notePinned = false;
            if (id != undefined) {
                $scope.update(item);
            }
        }
        else {
            item.notePinned = true;
            $scope.myClass.slice(item);
            if (id != undefined) {
                $scope.update(item);
            }
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
    $scope.archive = function (item, id) {

        if (item.noteArchiev) {
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.noteArchiev = false;
            if (id != undefined) {
                $scope.update(item);
            }
        }
        else {
            item.noteArchiev = true;
            $scope.myClass.slice(item);
            if (id != undefined) {
                $scope.update(item);
            }
        }
    }

    //trash operation
    $scope.trash = function (item, id) {

        if (item.noteTrash) {
            console.log("add noteTrash ");
            $scope.myClass.push(item);
            $scope.notes.slice(item);
            item.noteTrash = false;
            if (id != undefined) {
                $scope.update(item);
            }
        }
        else {
            console.log("remove noteTrash");
            item.noteTrash = true;
            $scope.myClass.slice(item);
            if (id != undefined) {
                $scope.update(item);
            }
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
    $scope.colorApply = function (secondarray, note, id) {
        console.log("color apply" + secondarray);
        note.color = secondarray;
        if (id != undefined) {
            $scope.update(note);
        }
    }

    //reminder menu diaplay
    $scope.showReminderMenu = function (ev, note) {
        var position = $mdPanel.newPanelPosition()
            .relativeTo(ev.target)
            .addPanelPosition(
                $mdPanel.xPosition.ALIGN_START,
                $mdPanel.yPosition.BELOW
            );

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelMenuCtrl,
            locals: {
                reminderscope: $scope,
                note: note
            },
            templateUrl: "templetes/remindMe.html",
            position: position,
            panelClass: 'menu-panel-container',
            propagateContainerEvents: true,
            openFrom: ev,
            // clickOutsideToClose: true,
            zIndex: 80,
        };
        this.onpanel = true;
        $mdPanel.open(config);
    }

    function PanelMenuCtrl(mdPanelRef, $scope, reminderscope, note) {

        $scope.reminderDate = null;
        $scope.note = note;
        $scope.date = new Date();
        $scope.closeMenu = function (item) {
            console.log("close panel" + item);
            this.onpanel = false;
            item.reminderDate = $scope.reminderDate,
            reminderscope.update(item);
            mdPanelRef && mdPanelRef.close();
        };

        $scope.openpickdate = function () {
            console.log("open menu ");
            $scope.reminderpanel = !$scope.reminderpanel;
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
                reminderDate: "",
                color: 'white'
            };
        }, function errorCallback(response) {
            console.log("error create note");
        });
    }

    //update note
    $scope.update = function (note) {
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
                abc: $scope//to give $scope access  of main controller (ie dashboardController scope) 
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