app.controller('dashboardController', function ($scope, Userfactory, $mdDialog, $mdPanel,
    $mdSidenav, $state, $location, $timeout) {

    $scope.isVisible = false;
    $scope.isPinned = false;
    $scope.onColor = false;
    this.onpanel = false;
    $scope.reminderpanel = false;
    $scope.isLabelPanel = false;
    $scope.readonly = false;
    $scope.isRemider = false;
    // $scope.toolbarColor = $rootScope.color;

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
        reminderTime: "",
        color: 'white'
    }

    $scope.userProfile = localStorage.getItem("userInfo");
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

    //reminder menu display
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
            //clickOutsideToClose: true,
            zIndex: 80,
        };
        this.onpanel = true;
        $mdPanel.open(config);
    }

    function PanelMenuCtrl(mdPanelRef, $scope, reminderscope, note) {
        // $scope.today = "Today 8:00 PM'";
        // $scope.tomorrow = "Tomorrow 8:00 AM";
        // $scope.currentdate = "Mon,8:00 AM";
        $scope.reminderDate = null;
        $scope.reminderTime = null;

        $scope.note = note;
        $scope.date = new Date();
        $scope.closeMenu = function (item) {
            console.log("close panel" + item);
            this.onpanel = false;

            item.reminderDate = $scope.reminderDate,
                item.reminderTime = $scope.reminderTime,
                console.log("reminder Time" + $scope.reminderTime);
            if (!($scope.reminderDate == null) || !($scope.reminderTime == null)) {
                reminderscope.update(item);
            }
            mdPanelRef && mdPanelRef.close();
        };

        $scope.openpickdate = function () {
            console.log("open menu ");
            $scope.reminderpanel = !$scope.reminderpanel;
        }
    }

    //chip close function
    $scope.remindercancel = function (item) {
        item.reminderDate = null;
        item.reminderTime = null;
        $scope.update(item);
    }

    //reminder div show
    $scope.isRemider = function () {
        if (!note.reminderDate == null) {
            $scope.isRemider = true;
        }
    }

    $scope.init = function () {
        $scope.reminderTime = 'Today 8:00 PM';
    }


    //panel for more option
    $scope.showMoreOptionMenu = function (ev, note) {
        var position = $mdPanel.newPanelPosition()
            .relativeTo(ev.target)
            .addPanelPosition(
                $mdPanel.xPosition.ALIGN_START,
                $mdPanel.yPosition.BELOW
            );

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelMenuCtrlOption,
            locals: {
                optionscope: $scope,
                note: note
            },
            templateUrl: "templetes/MoreOption.html",
            position: position,
            panelClass: 'menu-panel-container',
            propagateContainerEvents: true,
            openFrom: ev,
            clickOutsideToClose: true,
            zIndex: 80,
        };
        this.onpanel = true;
        $mdPanel.open(config);
    }

    function PanelMenuCtrlOption(mdPanelRef, optionscope, note, $scope) {
        $scope.note = note;
        $scope.label = optionscope.labels;
        $scope.outSideScope = optionscope;
        $scope.labels = optionscope.labels;
        $scope.closeOption = function (note) {
            this.onpanel = false;
            optionscope.trash(note, note.noteId);
            mdPanelRef && mdPanelRef.close();
        }
        $scope.addLabel = function () {
            console.log("open menu ");
            $scope.isLabelPanel = true;
        }

        //checkbox
        $scope.selected = note.labels;

        $scope.toggle = function (item, list, noteId) {
            console.log("list : ", list);

            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
                console.log("check box splice");
                optionscope.removeLabelToNote(item, noteId);
            }
            else {
                list.push(item);
                console.log("check box push");
                optionscope.addLabelToNote(item, noteId);
            }
        };

        $scope.exists = function (item, list) {
            for (var i = 0; i < list.length; i++) {
                var selectedItem = list[i];
                if (selectedItem.labelName == item.labelName)
                    return true;
            }
            return false;
        };
    }

    $scope.removeImage = function (item) {
        item.image = null;
        console.log("item image: " + item.image);
        $scope.update(item);
    }
    //get all note
    $scope.getAllNote = function () {
        var url = "note/list";
        Userfactory.getmethod(url).then(function successCallback(response) {
            $scope.notes = response.data.payload;
            console.log("Notes " + $scope.notes);
        }, function errorCallback(response) {
            console.log("error  getAllNotes" + response);
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
                reminderTime: "",
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
            console.log("note delete" + response);
            $scope.getAllNote();
        }, function errorCallback(response) {
            console.log("error delete" + response);
        });
    }

    //update user
    $scope.updateUser = function (userProfile) {
        var url = "user/update";
        Userfactory.postmethod(userProfile, url).then(function successCallback(response) {
            console.log("userProfile upload" + response.data.payload);
            $scope.userProfile = response.data.payload;
            localStorage.setItem("userInfo", JSON.stringify(response.data.payload));
        }, function errorCallback(response) {
            console.log("erroe upload");
        });
    }
    //update note dialog
    $scope.noteDialog = function (event, note) {
        $mdDialog.show({
            locals: {
                passNote: note,
                abc: $scope//to pass $scope to dialog controller (ie dashboardController scope) 
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

    $scope.uploadFile = function (ev, note) {
        console.log(ev);
        document.addEventListener('change', function (event) {
            console.log("dfgsdgsdg./............");

            console.log(event.target.files[0]);

            var files = event.target.files;
            var File = files[0];
            var formdata = new FormData();
            formdata.append("file", File);
            console.log("file :" + File);

            var url = "note/uploadFile";
            Userfactory.imageUpload(url, formdata).then(function successCallback(response) {
                console.log("image upload :" + response.data.payload);
                $scope.image = response.data.payload;
                if (note != undefined) {
                    console.log("update image");
                    note.image = $scope.image;
                    $scope.update(note);
                }
                else {
                    console.log("user profile update...");
                }
            }, function errorCallback(response) {
                console.log("image not upload : " + response.data);
            })
        });
    }

    //panel for signOut
    $scope.showSignOut = function (ev) {
        var position = $mdPanel.newPanelPosition()
            .relativeTo(ev.target)
            .addPanelPosition(
                $mdPanel.xPosition.ALIGN_START,
                $mdPanel.yPosition.BELOW
            );

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelSignOutOption,
            locals: {
                optionscope: $scope,
            },
            templateUrl: "templetes/SignOut.html",
            position: position,
            panelClass: 'menu-panel-container',
            propagateContainerEvents: true,
            openFrom: ev,
            clickOutsideToClose: true,
            zIndex: 80,
        };
        this.onpanel = true;
        $mdPanel.open(config);
    }

    function PanelSignOutOption(mdPanelRef, $scope, optionscope) {
        $scope.profile = JSON.parse(localStorage.getItem("userInfo"));
        $scope.closeOption = function () {
            this.onpanel = false;
            mdPanelRef && mdPanelRef.close();
        }
        $scope.signOut = function () {
            console.log("remove localStorage: ");
            localStorage.clear();
            $state.go('login');
        }

        //upload profile image dialog(signOut)
        $scope.uploadProfile = function (event) {
            console.log("profile upload dialog box");

            $mdDialog.show({
                locals: {
                    abc: optionscope//to pass $scope of dashboardcontroller to dialog controller (ie  profileDialogController) 
                },
                controller: profileDialogController,
                templateUrl: 'templetes/profiledialog.html',
                targetEvent: event,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
            })
        };
        function profileDialogController($scope, $mdDialog, abc) {
            console.log("profile upload dialog box");
            $scope.outerScopeForProfile = abc;
            $scope.closedone = function () {
                console.log("close update :");
                $mdDialog.hide();
            }
            $scope.myImage = '';
            $scope.myCroppedImage = '';
            $scope.filename = "";

            var handleFileSelect = function (event) {
                var file = event.currentTarget.files[0];
                $scope.filename = file.name;

                var reader = new FileReader();
                reader.onload = function (event) {
                    $scope.$apply(function ($scope) {

                        $scope.myImage = event.target.result;
                        console.log(" $scope.myImage " + $scope.myImage);
                        console.log("myCroppedImage " + $scope.myCroppedImage);
                    });
                };
                reader.readAsDataURL(file);
            };
            $timeout(function () {
                angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
            }, 1000, false);
        }
    }

    $scope.setProfile = function (myCroppedImage, filename, userProfile) {
        console.log("hello set profile " + myCroppedImage);
        console.log("filename : " + filename);


        var arr = myCroppedImage.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1
        }
        var fileToImage = new File([u8arr], filename, {
            type: mime
        });

        var formdata2 = new FormData();
        formdata2.append("file", fileToImage);
        var url = "note/uploadFile";
        Userfactory.imageUpload(url, formdata2).then(function successCallback(response) {
            console.log("image upload :" + response.data.payload);
            $scope.imageUrl = response.data.payload;
            var userInformatiom = JSON.parse(localStorage.getItem("userInfo"));
            console.log(userInformatiom);
            userInformatiom.userProfileImage = $scope.imageUrl;
            $scope.updateUser(userInformatiom);
        },
            function errorCallback(response) {
                console.log("error ");
            });
    }

    //----------------------home (label operations)-----------------------------------------//

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
    $scope.archiveState = function () {
        $state.go('home.archive');
    }

    $scope.trashState = function () {
        $state.go('home.trash');
    }

    $scope.noteState = function () {
        $state.go('home.dashboard');
    }

    $scope.reminderState = function () {
        $state.go('home.reminders');
    }

    $scope.labelState = function (labelName) {
        $state.go('home.label', {
            labelName: labelName
        });
    }

    $scope.labelPath = function () {
        var path = $location.path().split('/');
        console.log("location path : " + path);
        var firstParameter = path[2];
        $scope.secondParameter = path[3];
        console.log("first parameter :" + firstParameter);
    }
    $scope.labelPath();

    $scope.label = {
        labelName: ""
    }

    //create new label dialog
    $scope.labelDialog = function (event) {
        $mdDialog.show({
            locals: {
                abc: $scope//to pass $scope of dashboardcontroller to dialog controller (ie  labelDialogController) 
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
            console.log("response label create" + response);
            $scope.getAllLabel();

        }, function errorCallback(response) {
            console.log("Label already existing" + response);
        });
    }

    //get all label
    $scope.getAllLabel = function () {
        var url = "label/list";
        Userfactory.getmethod(url).then(function successCallback(response) {
            $scope.labels = response.data.payload;
            console.log("Labels" + $scope.labels);
        }, function errorCallback(response) {
            console.log("error  getAllLabels" + response);
        });
    }

    $scope.getAllLabel();

    $scope.updateLabel = function (label) {
        var url = "label/update";
        console.log("update label");

        Userfactory.postmethod(label, url).then(function successCallback(response) {
            $scope.getAllLabel();
        }, function errorCallback(response) {
            console.log("error getUpdateLabels" + response);
        })
    }

    $scope.deleteLabel = function (labels) {
        var id = labels.labelId;
        var url = "label/delete/" + id;
        Userfactory.deletemethod(url).then(function successCallback(response) {
            console.log("label delete" + response);
            $scope.getAllLabel();
        }, function errorCallback(response) {
            console.log("error label not delete" + response);
        });
    }

    $scope.addLabelToNote = function (labels, noteId) {
        var url = "label/addLabel/" + noteId;
        Userfactory.postmethod(labels, url).then(function successCallback(response) {
            $scope.getAllNote();
            console.log("add label on note" + response);
        }, function errorCallback(response) {
            console.log("error add label" + response);
        });
    }

    $scope.removeLabelToNote = function (labels, noteId) {
        var url = "label/removeLabel/" + noteId;
        Userfactory.postmethod(labels, url).then(function successCallback(response) {
            $scope.getAllNote();
            console.log("remove label from note");
        }, function errorCallback(response) {
            console.log("error remove label" + response);
        });
    }


    //cancel chip on note 
    $scope.cancelChip = [];

    $scope.toggleForCancelChip = function (itemlabel, list, note) {
        var noteId = note.noteId;
        var index = list.indexOf(itemlabel);
        if (index > -1) {
            list.splice(index, 1);
        }
        $scope.removeLabelToNote(itemlabel, noteId);
    }


    //collaborator
    $scope.collaboratorDialog = function (event,note) {
        $mdDialog.show({
            locals: {
                abc: $scope,//to pass $scope of dashboardcontroller to dialog controller (ie  collaboratorController) 
                note:note
            },
            controller: collaboratorController,
            templateUrl: 'templetes/collaboratordialog.html',
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        })
    };
    function collaboratorController($scope, $mdDialog, abc,note) {
        $scope.userName=null;
        $scope.note = note;
        console.log("note "+note);
        
        $scope.profile = JSON.parse(localStorage.getItem("userInfo"));
        $scope.outerScopeForCollaborator = abc;
        $scope.close = function () {
            console.log("close ");
            $mdDialog.hide();
        }

        //user List
        $scope.userList = function () {
            var url = "user/list";
            Userfactory.getmethod(url).then(function successCallback(response) {
                console.log("user list : " + response.data.payload);
                $scope.users = response.data.payload;
            }, function errorCallback(response) {
                console.log("error");
            });
        }
        $scope.userList();

        //ADD COLLABORATOR ON NOTE
        $scope.addUserOnNote=function(user){
            var id=note.noteId;
            var url="user/addCollaborator/"+id;
            Userfactory.postmethod(user,url).then(function successCallback(response){
                console.log("Collaborator add on note :"+response);
            },function errorCallback(response){
                console.log("error");
            });
        }

        //REMOVE COLLABORATOR ON NOTE
        $scope.removeUserOnNote=function(user){
            var id=note.noteId;
            var url="user/removeCollaborator/"+id;
            Userfactory.postmethod(user,url).then(function successCallback(response){
                console.log("remove collaborator"+response);
            },function errorCallback(response){
                console.log("error");  
            });
        }
    }
});