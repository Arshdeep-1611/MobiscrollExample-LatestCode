$(document).ready(function () {


    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    var textContactNumberSmallPassenger;
    var FirstNameNameSmallPassenger;
    var LastNameNameSmallPassenger;
    var PhoneDisplayNameSmallPassenger;
    var EmailDisplayNameSmallPassenger;
    var MobilePhoneDisplayNameSmallPassenger;
    var CostCenterNameSmallPassenger;
    var LastNameOrFirstNameRequired;
    var ThisFieldIsRequired;
    var NoRecordFound;
    var EditPassenger;
    var EditPassengerTitle;
    var addPassengerTitle;
    var AddPassenger;
    var RowIsNotSelected;
    var VipUser;
    var AuthorizedUser;
    var UnAuthorizedUser;
    //XmdrEmployee Search starts
    //XmdrEmployee Search starts


    //searching module starts

    $.ajax({
        url: '../Home/GetBtnLanguages',
        method: 'GET',
        success: function (data) {
            editPassengerTitle1 = data['editPassengerTitle'];
            addPassengerTitle = data['addPassengerTitle'];
            EditPassenger = data['EditPassenger'];
            EditPassengerTitle = data['EditPassengerTitle'];
            AddPassenger = data['AddPassenger'];
        }
    });


    function handleRowSelection(rowId) {
        var grid = $("#smallPassangerGrid");
        var rowData = grid.jqGrid('getRowData', rowId);
        $("#textPersonnelNbr1").val(rowData.PersonnelNbr);
        $("#textEmployeeId1").val(rowData.EmpId);
        $("#textTelePhone1").val(rowData.Telephone);
        $("#textMobileNumber1").val(rowData.MobileNumber);
        $("#textEmail1").val(rowData.Email);
        $('#textLastName1Hidden').val(rowData.LastName);
        $('#textFirstName1Hidden').val(rowData.FirstName);
        $('#textTitle1').val(rowData.title);

        $("#textPersonnelNbr2").val(rowData.PersonnelNbr);
        $("#textEmployeeId2").val(rowData.EmpId);
        $("#textTelePhone2").val(rowData.Telephone);
        $("#textMobileNumber2").val(rowData.MobileNumber);
        $("#textEmail2").val(rowData.Email);
        $('#textLastName2').val(rowData.LastName);
        $('#textFirstName2').val(rowData.FirstName);
        selectTitleOption(rowData.title, 'textTitle2');
        $("#small-passanger-table").removeClass("empty-border");
        $('#textLastName1').removeClass('empty-inputs-border');
        $('#textLastName1').removeAttr('title');
        $('#textFirstName1').removeClass('empty-inputs-border');
        $('#textFirstName1').removeAttr('title');
    }




    $.ajax({
        url: '../Home/GetTextFieldTitles',
        method: 'GET',
        success: function (data) {
            LastNameOrFirstNameRequired = data.LastNameOrFirstNameRequired;
            ThisFieldIsRequired = data.ThisFieldIsRequired;
            PhonePattern = data.PhonePattern;
            EmailPattern = data.EmailPattern;
            NoRecordFound = data.NoRecordFound;
            RowIsNotSelected = data.RowIsNotSelected;
            VipUser = data.VipUser;
            AuthorizedUser = data.AuthorizedUser;
            UnAuthorizedUser = data.UnAuthorizedUser;
        }
    });

    //Passenger Filter ends

    //XmdrEmployee Search starts

    var firstRowSelected = false; // Flag to track first row selection

    // XmdrEmployee Search starts
    $.ajax({
        url: '../Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("Language translation data", data);

            // Assign the localization data
            FirstNameNameSmallPassenger = data.FirstNameName;
            LastNameNameSmallPassenger = data.LastNameName;
            PhoneDisplayNameSmallPassenger = data.PhoneDisplayName;
            EmailDisplayNameSmallPassenger = data.EmailDisplayName;
            MobilePhoneDisplayNameSmallPassenger = data.MobilePhoneDisplayName;
            CostCenterNameSmallPassenger = data.CostCenterName;

            // Defining empty data for the grid
            var mydata0 = [];

            // Initialize jqGrid with localization names
            $("#smallPassangerGrid").jqGrid({
                data: mydata0,
                datatype: "local",
                colNames: ['', 'EmpId', 'PersonnelNbr', LastNameNameSmallPassenger, FirstNameNameSmallPassenger, CostCenterNameSmallPassenger, PhoneDisplayNameSmallPassenger, MobilePhoneDisplayNameSmallPassenger, EmailDisplayNameSmallPassenger, 'IsVipOrAuthorized','Title'],
                colModel: [
                    { name: 'IconSmall', index: 'IconSmall', width: 40, align: 'left', formatter: iconFormatter },
                    { name: 'EmpId', index: 'EmpId', hidden: true },
                    { name: 'PersonnelNbr', index: 'PersonnelNbr', hidden: true },
                    { name: 'LastName', index: 'LastName', width: 70, align: 'left' },
                    { name: 'FirstName', index: 'FirstName', width: 100, align: 'left' },
                    { name: 'CostCenterName', index: 'CostCenterName', width: 200, align: 'left' },
                    { name: 'Telephone', index: 'Telephone', width: 200, align: 'left' },
                    { name: 'MobileNumber', index: 'MobileNumber', width: 150, align: 'left' },
                    { name: 'Email', index: 'Email', width: 150, align: 'left' },
                    { name: 'IsVipOrAuthorized', index: 'IsVipOrAuthorized', hidden: true },
                    { name: 'Title', index: 'Title', hidden: true }
                ],
                viewrecords: true,
                scroll: 1, // Enable vertical scroll
                autowidth: true,
                shrinkToFit: false, // Allow horizontal scroll by keeping column width intact
                forceFit: false, // Disable forcing columns to fit the width of the grid
                height: "calc(15vh)", // Set grid height for vertical scrolling
                width: "100%", // Full width for horizontal scrolling
                altRows: true,
                altclass: 'myAltClass',
                multiselect: false,
                resizable: true,
                loadonce: true, // Prevent adding empty row
                onSelectRow: function (rowId, status, e) {
                    var grid = $("#smallPassangerGrid");
                    var rowIds = grid.getDataIDs();

                    // Check if there are any rows
                    if (rowIds.length > 0) {
                        if (rowId) {
                            handleRowSelection(rowId); // Custom function to handle row selection logic
                            $("#small-passanger-table").removeClass("empty-border");
                            $("#empty-message1").hide();
                            $("#empty-message2").hide();
                        }
                    }
                },
                beforeSelectRow: function (rowid, e) {
                    var $grid = $(this);

                    // Check if the row is already selected
                    var isSelected = $grid.jqGrid('getGridParam', 'selrow') === rowid;

                    // If already selected, prevent deselection
                    if (isSelected) {
                        return false; // Prevent row deselection
                    }

                    return true; // Allow row selection
                },
                gridComplete: function () {
                    setTimeout(function () {
                        var firstRowId = $("#smallPassangerGrid").getDataIDs()[0];
                        if (firstRowId) {
                            firstRowSelected = true; // Set flag when selecting the first row
                            $("#smallPassangerGrid").setSelection(firstRowId);
                            firstRowSelected = false; // Reset flag after selection
                        }
                    }, 100); // Delay to ensure grid rendering

                    // Iterate through each row
                    var ids = $("#smallPassangerGrid").jqGrid('getDataIDs');
                    ids.forEach(function (rowid) {
                        var isVipOrAuthorized = parseInt($("#smallPassangerGrid").jqGrid('getCell', rowid, 'IsVipOrAuthorized'));
                        var iconCell = $("#smallPassangerGrid").find(`tr#${rowid} td[aria-describedby='smallPassangerGrid_IconSmall']`);

                        // Set icons based on IsVipOrAuthorized field value
                        if (isVipOrAuthorized === 1) {
                            $(iconCell).html('<img src="./img/Passenger-VIP.png" alt="VIP" title="' + VipUser + '">');
                        } else {
                            $(iconCell).html('<img src="./img/user-alt-black.png" alt="Authorized" title="' + AuthorizedUser + '">');
                        }
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('Error fetching localization data:', errorThrown);
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching localization data:', errorThrown);
        }
    });


    // Formatter function for icon column
    function iconFormatter(cellValue, options, rowObject) {
        var isVipOrAuthorized = rowObject.IsVipOrAuthorized;
        if (isVipOrAuthorized === 1) {
            return '<img src="./img/Passenger-VIP.png" alt="VIP">';
        } else {
            return '<img src="./img/user-alt-black.png" alt="Authorized">';
        }
    }


    function emptySmallPassengerGrid() {
        var mydata0 = "";
        // Clear and reload the grid with the filtered data
        var $grid = $("#smallPassangerGrid");
        $grid.jqGrid('clearGridData');
        $grid.jqGrid('setGridParam', {
            datatype: 'local',
            data: mydata0
        }).trigger("reloadGrid");
    }



    //Search employee from XMDR view
    $('#searchEmpBtn1').on('click', function () {

        $('#empty-message1').remove();
        $('#empty-message2').remove();
        $("#small-passanger-table").removeClass("empty-border");

        var firstName = $('#textFirstName1').val();
        var lastName = $('#textLastName1').val();

        if (firstName === '' && lastName === '') {
            emptyNameFieldValidation('Employee');
            return false;
        } else {
            $('#load_smallPassangerGrid').show(); // Show loading spinner

            $.ajax({
                url: '../Passenger/GetXmdrEmployeesBySearch',
                method: 'GET',
                data: {
                    firstName: firstName,
                    lastName: lastName
                },
                success: function (data) {
                    var $grid = $("#smallPassangerGrid");
                    $grid.jqGrid('clearGridData'); // Clear any existing grid data

                    if (data.length === 0) {
                        // No data found, show an empty message
                        var mydata = [];
                        $grid.jqGrid('setGridParam', {
                            datatype: 'local',
                            data: mydata
                        }).trigger("reloadGrid");

                        $("#small-passanger-table").addClass("empty-border");
                        $(".grid-table").attr('title', NoRecordFound);
                        $('#small-passanger-table').append("<div class='empty-message text-center' id='empty-message1'>" + NoRecordFound + "</div>");
                    } else {
                        // Data found, map it to the grid format
                        var mydata = data.map(function (item) {
                            return {
                                IconSmall: "<img src='' class='small-user-type-icon' width='100%' height='100%'>",
                                EmpId: item.empId,
                                PersonnelNbr: item.personnelNbr,
                                LastName: item.lastName,
                                FirstName: item.firstName,
                                CostCenterName: item.costCenterName,
                                Telephone: item.phoneNumber,
                                MobileNumber: item.mobileNumber,
                                Email: item.email,
                                IsVipOrAuthorized: item.isVipOrAuthorized,
                                Title: item.Title
                            };
                        });

                        // Set new data to the grid
                        $grid.jqGrid('setGridParam', {
                            datatype: 'local',
                            data: mydata
                        }).trigger("reloadGrid");

                        // Remove any previous empty messages
                        $grid.parent().find(".empty-message").remove();
                        $("#small-passanger-table").removeClass("empty-border");
                    }

                    $('#load_smallPassangerGrid').hide(); // Hide loading spinner
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('Error fetching employee data:', errorThrown);
                    $('#load_smallPassangerGrid').hide(); // Hide loading spinner in case of error
                    alert('Error fetching employee data. Please try again later.');

                }
            });
        }
    });

    //XmdrEmployee Search End
    //searching module ends


    //Insert Passenger records
    function insertPassenger(string) {

        // Define dataToSend object
        var dataToSend = {};

        // Get current date and time
        var currentDateTime = new Date();
        var formattedDateTime = currentDateTime.toLocaleString();

        // Check the value of the string parameter to determine which block of data to populate
        if (string === "Employee") {

            var isCheckedAuthorized = $('#checkAuthorized1').prop('checked');
            var isCheckedPrivate = $('#checkPrivate1').prop('checked');
            var isCheckedCustomised = $('#checkCustomised1').prop('checked');

            dataToSend = {
                passengerId: 0,
                employeeId: parseInt($("#textEmployeeId1").val()),
                personnelNbr: $('#textPersonnelNbr1').val(),
                firstName: $('#textFirstName1Hidden').val(),
                lastName: $('#textLastName1Hidden').val(),
                email: $('#textEmail1').val(),
                telePhone: $('#textTelePhone1').val(),
                mobilePhone: $('#textMobileNumber1').val(),
                contactPhone: $('#textContactNumber1').val(),
                isAuthorized: isCheckedAuthorized ? 1 : 0,
                isPrivate: isCheckedPrivate ? 1 : 0,
                accessLevel: 0,
                isEditable: isCheckedCustomised ? 1 : 0,
                comments: $('#textComment1').val(),
                modifiedBy: '',
                ownerUserId: 0,
                valid: 0,
                isVip: 0,
                createdBy: '',
                timeStamp: formattedDateTime,
                Title: $('#textTitle1').val(),
            };
        } else if (string === "Custom") {

            var isCheckedAuthorized = $('#checkAuthorized2').prop('checked');
            var isCheckedPrivate = $('#checkPrivate2').prop('checked');
            var isCheckedCustomised = $('#checkCustomised2').prop('checked');

            dataToSend = {
                passengerId: 0,
                employeeId: 0,
                firstName: $('#textFirstName2').val(),
                lastName: $('#textLastName2').val(),
                email: $('#textEmail2').val(),
                telePhone: $('#textTelePhone2').val(),
                mobilePhone: $('#textMobileNumber2').val(),
                contactPhone: $('#textContactNumber2').val(),
                isAuthorized: isCheckedAuthorized ? 1 : 0,
                isPrivate: isCheckedPrivate ? 1 : 0,
                accessLevel: 0,
                isEditable: isCheckedCustomised ? 1 : 0,
                comments: $('#textComment2').val(),
                modifiedBy: '',
                ownerUserId: 0,
                valid: 0,
                isVip: 0,
                createdBy: '',
                timeStamp: formattedDateTime,
                Title: $('#textTitle2').val(),
            };

        }

        // Send AJAX request
        $.ajax({
            url: '../Passenger/AddPassengers',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                if(response.success) {
                    $('#alert-insert-popup').modal('hide');
                    $('#alert-insert-green').modal('show');
                    $('#alert-insert-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-insert-green').modal('hide');
                    }, 3000);
                    if (typeof window.getAllUpdatedPassengers === 'function') {
                        getAllUpdatedPassengers();
                    }
                } else {
                    $('#alert-norecord-yellow').modal('hide');
                    $('#alert-norecord-yellow modal-body').remove();
                    $('#alert-norecord-yellow modal-body').html('<h4>' + response.message + '</h4>');
                    $('#alert-norecord-yellow').modal('show');
                    $('#alert-norecord-yellow').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-norecord-yellow').modal('hide');
                    }, 5000);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error fetching data:', errorThrown);

            }
        });
    }

    //set Check box checked or unchecked
    function setCheckBox(element, value) {
        if (value == 1) {
            $('#' + element).prop('checked', true); // Check the checkbox
        }
        if (value == 0) {
            $('#' + element).prop('checked', false); // Uncheck the checkbox
        }
    }


    //Display records int different ui elements
    //Display records int different ui elements
    function customPassenger(result) {
        var edit = 0, authorized = 0, accesslevel = 0;
        $.each(result, function (index, obj) {

            clearALL('Custom');
            setCheckBox('checkAuthorized2', parseInt(obj.isAuthorized) ? 1 : 0);
            setCheckBox('checkPrivate2', parseInt(obj.isPrivate) ? 1 : 0);
            setCheckBox('checkCustomised2', parseInt(obj.isEditable) ? 1 : 0);
            $('#textAccessLevelId2').val(obj.accessLevel);
            $('#textPassengerId2').val(obj.passengerId);
            $("#textEmployeeId2").val(obj.employeeId);
            $('#textFirstName2').val(obj.firstName);
            $('#textLastName2').val(obj.lastName);
            $('#textEmail2').val(obj.email);
            $('#textTelePhone2').val(obj.telePhone);
            $('#textMobileNumber2').val(obj.mobilePhone);
            $('#textContactNumber2').val(obj.contactPhone);
            $('#textComment2').val(obj.comment);
            $('#textOwnerId2').val(obj.ownerUserId);
            $('#textisValid2').val(obj.valid);
            $('#textisVip2').val(obj.isVip);
            selectTitleOption(obj.title, 'textTitle2');
            var checkCustomizesRadio = obj.isEditable ? 1 : 0;
            if (checkCustomizesRadio == 1) {
                enableAuthoriseHideContactGroup2();
            } else {
                disableAuthoriseShowContactGroup2();
            }
            applyRights();
        });
    }

    //Highlight the option which as per passenger table data
    function selectOwnerById(selectId, id) {
        // Find the select element
        var $select = $('#' + selectId);

        // Iterate through options to find the matching id
        $select.find('option').each(function () {
            if ($(this).val() == id) {
                // Select the option
                $(this).prop('selected', true);
            } else {
                // Deselect other options
                $(this).prop('selected', false);
            }
        });
    }

    //clear records or reset
    function clearALL(string) {
        if (string == 'Employee') {

            $('#textLastName1').removeClass('empty-inputs-border');
            $('#textFirstName1').removeAttr('title');
            $('#textFirstName1').removeClass('empty-inputs-border');
            $('#textFirstName1').removeAttr('title');
            setCheckBox('checkAuthorized1', 0);
            setCheckBox('checkPrivate1', 0);
            setCheckBox('checkCustomised1', 0);
            $('#textPassengerId1').val('');
            $('#textFirstName1').val('');
            $('#textFirstName1Hidden').val('');
            $('#textLastName1').val('');
            $('#textLastName1Hidden').val('');
            $('#textEmail1').val('');
            $('#textTelePhone1').val('');
            $('#textMobileNumber1').val('');
            $('#textContactNumber1').val('');
            $('#textComment1').val('');
            $('#textAccessLevelId1').val('');
            $('textTitle1').val('');
        }

        if (string == 'Custom') {
            $('#textLastName2').removeClass('empty-inputs-border');
            $('#textLastName2').removeAttr('title');
            $('#textFirstName2').removeClass('empty-inputs-border');
            $('#textFirstName2').removeAttr('title');
            setCheckBox('checkAuthorized2', 0);
            setCheckBox('checkPrivate2', 0);
            setCheckBox('checkCustomised2', 0)
            $('#textPassengerId2').val('');
            $('#textFirstName2').val('');
            $('#textFirstName2').val('');
            $('#textLastName2').val('');
            $('#textEmail2').val('');
            $('#textTelePhone2').val('');
            $('#textMobileNumber2').val('');
            $('#textContactNumber2').val('');
            $('#textComment2').val('');
            $('#textAccessLevelId2').val('');
            selectTitleOption('Mr', 'textTitle2');
        }

    }


    $("#closeBtn").on("click", function () {
        var idNames = ['#textLastName1', '#textFirstName1', '#textLastName2', '#textFirstName2'];
        idNames.some(function (fieldId) {
            $(fieldId).removeClass('empty');
            $(fieldId).removeAttr('title');
        });
        emptySmallPassengerGrid();
    });


    $('#submitPassengerBtn').on("click", function () {
        $("#empty-message1").remove();
        $("#empty-message2").remove();
        var modalType = localStorage.getItem('selectedGrid');
        var actionType = localStorage.getItem('actionType');
        if (emptyFieldValidation(modalType)) {
            return false;
        }
        else {
            $('#AddNewPassenger').modal('hide');
            if (actionType == 'Edit') {
                $('#alert-update-popup').modal('show');
                // Handle the confirmation action
                $('#btnUpdateConfirm').one('click', function () {

                    updatePassenger(localStorage.getItem('selectedGrid'));
                });
            }
            if (actionType == 'Insert') {
                $('#alert-insert-popup').modal('show');
                // Handle the confirmation action
                $('#btnInsertConfirm').one('click', function () {

                    insertPassenger(localStorage.getItem('selectedGrid'));
                });
            }
        }
    });

    function clearFilter() {
        $('#inputFirstName').val('');
        $('#inputLastName').val('');
        $('#inputTelephone').val('');
        $('#inputEmail').val('');
        $('#PassengersFilters').modal('hide');
    }

    $('#OpenFilterBtn').on("click", function () {
        clearFilter();
    });


    $.ajax({
        url: '../Home/GetUserAccessLevel',
        method: 'GET',
        success: function (result) {
            localStorage.setItem('myAccessLevel', result.AccessLevel);
            localStorage.setItem('userId', result.UserId);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching data:', errorThrown);

        }

    });

    //Validation of different kind of fields starts

    function checkGridStatus() {
        var grid = $("#smallPassangerGrid");
        var rowCount = grid.getGridParam("records");
        var selectedRowId = grid.getGridParam("selrow");

        var isGridEmpty = rowCount === 0;
        var isRowSelected = !!selectedRowId;

        if (isGridEmpty) {
            console.log("The grid has no rows.");
        } else {
            console.log("The grid has rows.");
        }

        if (isRowSelected) {
            console.log("A row is selected. Row ID:", selectedRowId);
        } else {
            console.log("No row is selected.");
        }

        return {
            isGridEmpty: isGridEmpty,
            isRowSelected: isRowSelected
        };
    }

    function clearValidationTextFields1() {
        var ids1 = ['#textLastName1', '#textFirstName1'];
        //, '#textContactNumber1'
        // Attach event handlers to each input field
        ids1.some(function (fieldId) {
            $(fieldId).removeClass('empty-inputs-border');
            $(fieldId).removeAttr('title');
        });
        $("#small-passanger-table").removeClass("empty-border");
        $("#empty-message1").remove();
        $('#load_smallPassangerGrid').hide();
    }



    //Code validation parts 
    function clearValidationTextFields2() {
        var ids1 = ['#textLastName2', '#textFirstName2'];
        //, '#textContactNumber1'
        // Attach event handlers to each input field
        ids1.some(function (fieldId) {
            $(fieldId).removeClass('empty-inputs-border');
            $(fieldId).removeAttr('title');
        });
    }

    function emptyNameFieldValidation(string) {
        if (string === 'Employee') {
            var flag = 0;
            var ids1 = "";
            var ids1 = ['#textLastName1', '#textFirstName1'];
            //, '#textContactNumber1'
            // Attach event handlers to each input field
            ids1.some(function (fieldId) {
                if ($(fieldId + 'a').val().trim() === '') {
                    $(fieldId).addClass('empty-inputs-border');
                    $(fieldId).attr('title', LastNameOrFirstNameRequired);
                    flag = +1;
                    // return flag;
                } else {
                    $(fieldId).removeClass('empty-inputs-border');
                    $(fieldId).removeAttr('title');
                    // return flag;
                }
            });
            if (flag > 0) {
                return true;
            } else {
                return false;
            }
        }
    }


    function emptyFieldValidation(string) {
        if (string === 'Employee') {
            var flag = 0;

            var statusOfSmallGrid = checkGridStatus();
            if (statusOfSmallGrid.isGridEmpty) {
                $("#empty-message1").remove();
                $("#small-passanger-table").addClass("empty-border");
                $('#small-passanger-table').append("<div class='empty-message text-center' id='empty-message1'>" + NoRecordFound + "</div>");
                $(".grid-table").attr('title', NoRecordFound);
                $('#load_smallPassangerGrid').hide();
                flag = +1;
            } else {
                $("#small-passanger-table").removeClass("empty-border");
                $("#empty-message1").remove();
                $('#load_smallPassangerGrid').hide();
            }
            if (flag > 0) {
                return true;
            } else {
                return false;
            }
        }
        if (string === 'Custom') {
            var ids2 = ['#textLastName2', '#textFirstName2'];
            var count = 0;
            var emptyFieldFound = ids2.some(function (fieldId) {
                if ($(fieldId).val().trim() === '') {
                    $(fieldId).addClass('empty-inputs-border');
                    $(fieldId).attr('title', ThisFieldIsRequired);
                    count = +1;
                } else {
                    $(fieldId).removeClass('empty-inputs-border');
                    $(fieldId).removeAttr('title');
                }
            });
            if (count > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    $('#textLastName1').on('change', function (event) {
        // Get the value of the input field
        event.stopPropagation();
        if ($('#textLastName1').val().trim() === '' && $('#textFirstName1').val().trim() === '') {
            $('#textLastName1').addClass('empty-inputs-border');
            $('#textLastName1').attr('title', LastNameOrFirstNameRequired);
            $('#textFirstName1').addClass('empty-inputs-border');
            $('#textFirstName1').attr('title', LastNameOrFirstNameRequired);
        } else {
            $('#textLastName1').removeClass('empty-inputs-border');
            $('#textLastName1').removeAttr('title');
            $('#textFirstName1').removeClass('empty-inputs-border');
            $('#textFirstName1').removeAttr('title');
            // return flag;
        }
    });

    $('#textFirstName1').on('change', function (event) {
        // Get the value of the input field
        event.stopPropagation();
        if ($('#textLastName1').val().trim() === '' && $('#textFirstName1').val().trim() === '') {
            $('#textLastName1').addClass('empty-inputs-border');
            $('#textLastName1').attr('title', LastNameOrFirstNameRequired);
            $('#textFirstName1').addClass('empty-inputs-border');
            $('#textFirstName1').attr('title', LastNameOrFirstNameRequired);
        } else {
            $('#textLastName1').removeClass('empty-inputs-border');
            $('#textLastName1').removeAttr('title');
            $('#textFirstName1').removeClass('empty-inputs-border');
            $('#textFirstName1').removeAttr('title');
            // return flag;
        }
    });


    var inputTextFields2 = ['#textLastName2', '#textFirstName2'];

    // Attach event handlers to perform email validation
    inputTextFields2.some(function (fieldId) {
        $(fieldId).on('change', function () {
            // Get the value of the input field

            if ($(fieldId).val().trim() === '') {
                $(fieldId).addClass('empty-inputs-border');
                $(fieldId).attr('title', ThisFieldIsRequired);
                flag = +1;
                // return flag;
            } else {
                $(fieldId).removeClass('empty-inputs-border');
                $(fieldId).removeAttr('title');
                // return flag;
            }
        });
    });

    //validation text input fields

    var phoneIds = ['#textContactNumber1', '#textTelePhone2', '#textMobileNumber2', '#textContactNumber2'];

    // Attach keypress event handler to each phone input field
    $.each(phoneIds, function (index, id) {
        $(id).on('keypress', function (event) {

            var inputString = $(id).val();
            var digitCount = 1;
            for (var i = 0; i < inputString.length; i++) {
                if (!isNaN(parseInt(inputString[i]))) {
                    digitCount++;
                }
            }
            if (digitCount > 15) {
                event.preventDefault();
                return false;
            }
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Allow digits (0-9), space (32), '-' (45), and '+' (43)
            if ((charCode >= 48 && charCode <= 57) || // Digits
                charCode === 32 || // Space
                charCode === 45 || // '-'
                charCode === 43) { // '+'
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        });
    });

    // Define the IDs of the email input fields
    var emailIds = ['#textEmail2'];
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Attach event handlers to perform email validation
    $.each(emailIds, function (index, id) {
        $(id).on('change', function () {
            // Get the value of the email input fields
            if ($(this).val().trim() != '') {
                var emailValue = $(this).val().trim();

                // Regular expression for email validation

                // Check if the email is valid
                if (!emailPattern.test(emailValue)) {
                    // Invalid email, clear the field and show error message
                    $(this).addClass('empty-inputs-border');
                } else {
                    $('#textEmail2').removeClass('empty-inputs-border');
                }
            } else {
                $('#textEmail2').removeClass('empty-inputs-border');
            }

        });
    });



    //button click functions Open form..

    function toggleCheckboxByName(name, state) {
        $(`input[name="${name}"]`).prop('disabled', state);
    }

    $('#openPassengerModal').on("click", function () {
        $('#submitPassengerBtn').text(AddPassenger);
        $("#small-passanger-table").removeClass("empty-border");
        $("#small-passanger-table").removeAttr('title');
        $("#empty-message1").hide();
        $("#empty-message2").hide();
        $('#load_smallPassangerGrid').hide();

        $('#exampleModalLabel.modal-title').text(addPassengerTitle);
        $("#existingEmployeeLink").show();
        $("#Exist-emp").show();
        $("#Custom-passenger").hide();
        $("#existingEmployeeLink").addClass("active-3");
        $("#customPassengerLink").removeClass("active-3");
        emptySmallPassengerGrid();
        clearALL('Employee');
        clearALL('Custom');
        localStorage.setItem('selectedGrid', 'Employee');
        localStorage.setItem('actionType', 'Insert');
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
            if (accessLevel == 1) {
                $('#textContactNumberGroup1').show();
                toggleCheckboxByName("checkPrivate1", true);
                //$('#labelPrivate1').attr('title', 'This filed is disabled? ' + true);         
                toggleCheckboxByName("checkCustomised1", true);
                //$('#labelAuthorized1').attr('title', 'This filed is disabled? ' + true);
            }
            toggleCheckboxByName("checkAuthorized1", true);
            // $('#labelCustomised1').attr('title', 'This filed is disabled? ' + true);
        }
        return;
    });


    //First tab Existing employee search from xmdr to insert to passenger table

    $("#existingEmployeeLink").on("click", function () {
        clearValidationTextFields1();
        localStorage.setItem('selectedGrid', 'Employee');
        var idNames = ['#textLastName2', '#textFirstName2'];
        idNames.some(function (fieldId) {
            $(fieldId).removeClass('empty');
            $(fieldId).removeAttr('title');
        });
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            $('#textContactNumber1').val($('#textContactNumber2').val());
            toggleCheckboxByName("checkCustomised2", false);
            var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
            if (accessLevel == 1) {
                $('#textContactNumberGroup1').hide();
                toggleCheckboxByName("checkPrivate1", false);
                //$('#labelPrivate1').attr('title', 'This filed is disabled? ' + false);
                toggleCheckboxByName("checkCustomised1", true);
                //$('#labelAuthorized1').attr('title', 'This filed is disabled? ' + true);
            }
            if ($('#textContactNumber1').val()) {
                $('#textContactNumberGroup1').show();
            } else {
                $('#textContactNumberGroup1').show();
            }
            //$('#labelCustomised1').attr('title', 'This filed is disabled? ' + true);
        }
        return;
    });


    //Custom passenger tab control

    $("#customPassengerLink").on("click", function () {
        clearValidationTextFields2();
        localStorage.setItem('selectedGrid', 'Custom');
        var idNames = ['#textLastName1', '#textFirstName1'];
        idNames.some(function (fieldId) {
            $(fieldId).removeClass('empty');
            $(fieldId).removeAttr('title');
        });
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
            setCheckBox('checkCustomised2', true);
            enableFields();
            if (accessLevel == 1) {
                accessLevelOneCustomCheckBox();
            } else {
                toggleCheckboxByName("checkAuthorized2", false);
                // $('#labelCustomised2').attr('title', 'This filed is disabled? ' + false);
            }
            if ($('#textContactNumber2').val()) {
                $('#textContactNumberGroup2').show();
            } else {
                $('#textContactNumberGroup2').hide();
            }
        }
        return;
    });


    $('#textContactNumber1').on('input', function (event) {
        event.stopPropagation();
        var inputString = $('#textContactNumber1').val().trim(); // Get and trim the input value
        if (inputString === "") { // Check if the input is empty
            inputString = "";
            $('#textContactNumber1').val(''); // Clear input if empty
        }
        $('#textContactNumber2').val(inputString); // Set the value in textContactNumber2
        //localStorage.setItem('textContactNumber', inputString); // Save to localStorage
    });

    $('#textContactNumber2').on('input', function (event) {
        event.stopPropagation();
        var inputString = $('#textContactNumber2').val().trim(); // Get and trim the input value
        if (inputString === "") { // Check if the input is empty
            inputString = "";
            $('#textContactNumber2').val(''); // Clear input if empty
        }
        $('#textContactNumber1').val(inputString); // Set the value in textContactNumber1
        //localStorage.setItem('textContactNumber', inputString); // Save to localStorage
    });


    function accessLevelOneCustomCheckBox() {
        if ($('#textContactNumber2').val()) {
            $('#textContactNumberGroup2').show();
        } else {
            $('#textContactNumber2').val('');
            $('#textContactNumberGroup2').hide();
        }
        toggleCheckboxByName("checkAuthorized2", true);
        toggleCheckboxByName("checkCustomised2", true);
    }


    $('#checkCustomised1').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkCustomizesRadio = $('#checkCustomised1').prop('checked') ? 1 : 0;
            if (checkCustomizesRadio == 1) {
                enableAuthoriseHideContactGroup1();
            } else {
                disableAuthoriseShowContactGroup1();
            }
            var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
            var isPrivate = $('#checkPrivate1').prop('checked') ? true : false;
            if (accessLevel == 1) {
                if (isPrivate) {
                    if ($('#textContactNumberGroup1').val()) {
                        $('#textContactNumberGroup1').show();
                    } else {
                        $('#textContactNumberGroup1').hide();
                    }
                } else {
                    disablePrivateShowContactGroup1();
                }
            }
        }
    });

    function disablePrivateShowContactGroup1() {
        if ($('#textContactNumber1').val()) {
            $('#textContactNumberGroup1').show();
        } else {
            $('#textContactNumberGroup1').show();
        }
        //$('input[name="checkPrivate1"]').prop('disabled', true);
        toggleCheckboxByName("checkPrivate1", true);
        //$('#labelPrivate1').attr('title', 'This filed is disabled? ' + true);
    }

    function disableAuthoriseShowContactGroup1() {
        $('#textContactNumberGroup1').show();
        //$('input[name="checkAuthorized1"]').prop('disabled', true);
        toggleCheckboxByName("checkAuthorized1", true);
        //$('#checkAuthorized1').attr('title', 'This filed is disabled? ' + true);
    }

    function enableAuthoriseHideContactGroup1() {
        if ($('#textContactNumber1').val()) {
            $('#textContactNumberGroup1').show();
        } else {
            $('#textContactNumberGroup1').hide();
        }
        //$('input[name="checkAuthorized1"]').prop('disabled', false);
        toggleCheckboxByName("checkAuthorized1", false);
        //$('#checkAuthorized1').attr('title', 'This filed is disabled? ' + false);
    }


    $('#checkCustomised2').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkCustomizesRadio = $('#checkCustomised2').prop('checked') ? 1 : 0;
            if (checkCustomizesRadio == 1) {
                var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
                if (accessLevel > 1) {
                    enableFields();
                }
                $('#textContactNumberGroup1').hide();
                enableAuthoriseHideContactGroup2();
            } if (checkCustomizesRadio == 0) {
                var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
                if (accessLevel > 1) {
                    disableFields();
                }
                disableAuthoriseShowContactGroup2();
            }
        } else if (actionType == 'Edit') {
            var checkCustomizesRadio = $('#checkCustomised2').prop('checked') ? 1 : 0;
            if (checkCustomizesRadio == 1) {
                var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
                if (accessLevel > 1) {
                    enableFields();
                }
                enableAuthoriseHideContactGroup2();
            } if (checkCustomizesRadio == 0) {
                var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
                if (accessLevel > 1) {
                    disableFields();
                }
                disableAuthoriseShowContactGroup2();
            }
        }
    });

    $('#checkPrivate2').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkPrivateRadio = $('#checkPrivate2').prop('checked') ? 1 : 0;
            setCheckBox('checkPrivate1', checkPrivateRadio);
        }
    });

    $('#checkPrivate1').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkPrivateRadio = $('#checkPrivate1').prop('checked') ? 1 : 0;
            setCheckBox('checkPrivate2', checkPrivateRadio);
            var accessLevel = parseInt(localStorage.getItem('myAccessLevel'));
            if (accessLevel == 1) {
                disableAuthoriseShowContactGroup1()
            }
        }
    });
    $('#checkAuthorized1').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkPrivateRadio = $('#checkAuthorized1').prop('checked') ? 1 : 0;
            setCheckBox('checkAuthorized2', checkPrivateRadio);
        }
    });

    $('#checkAuthorized2').on('change', function (event) {
        event.stopPropagation();
        var actionType = localStorage.getItem('actionType');
        if (actionType == 'Insert') {
            var checkPrivateRadio = $('#checkAuthorized2').prop('checked') ? 1 : 0;
            setCheckBox('checkAuthorized1', checkPrivateRadio);
        }
    });


    function toggleFields(ids, state) {
        ids.forEach(id => $(id).prop('disabled', state));
    }

    function toggleVisibility(show) {
        if (show) {
            $('#textContactNumberGroup2').show();
        } else {
            $('#textContactNumberGroup2').hide();
        }
    }

    function disableFields() {
        toggleFields(['#textLastName2', '#textFirstName2', '#textTelePhone2', '#textMobileNumber2', '#textEmail2', '#textTitle2.input-val'], true);
    }

    function enableFields() {
        toggleFields(['#textLastName2', '#textFirstName2', '#textTelePhone2', '#textMobileNumber2', '#textEmail2', '#textTitle2.input-val'], false);
    }

    function disableAuthoriseShowContactGroup2() {
        if ($('#textContactNumber2').val().trim() != '') {
            toggleVisibility(true);
        } else {
            toggleVisibility(true);
            //toggleVisibility('#textContactNumberGroup2', true);
        }
        toggleCheckboxByName("checkAuthorized2", true);
        //toggleFields(['input[name="checkAuthorized2"]'], true);
    }

    function enableAuthoriseHideContactGroup2() {
        if ($('#textContactNumber2').val().trim() != '') {
            toggleVisibility(true);
        } else {
            toggleVisibility(false);
            //toggleVisibility('#textContactNumberGroup2', false);
        }
        toggleCheckboxByName("checkAuthorized2", false);
        //toggleFields(['input[name="checkAuthorized2"]'], false);
    }

   

    window.getPassengerById = getPassengerById;
    function getPassengerById(passengerId) {
        $('#submitPassengerBtn').text(EditPassengerTitle);
        $('#AddNewPassenger').modal('show');
        $('#exampleModalLabel.modal-title').text(EditPassengerTitle);
        $("#existingEmployeeLink").hide();
        $("#Exist-emp").hide();
        $("#Custom-passenger").show();
        $.ajax({
            url: '../ManagerPassengers/GetPassengersByID',
            method: 'GET',
            data: { id: passengerId },
            success: function (result) {
                var idNames = ['#textLastName2', '#textFirstName2'];
                idNames.some(function (fieldId) {
                    $(fieldId).removeClass('empty-inputs-border');
                    $(fieldId).removeAttr('title');
                });
                customPassenger(result);
                //existingEmployee(result);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error fetching data:', errorThrown);

            }

        });
    }

    

    //Display records int different ui elements
    function customPassenger(result) {
        var edit = 0, authorized = 0, accesslevel = 0;
        $.each(result, function (index, obj) {

            clearALL('Custom');
            setCheckBox('checkAuthorized2', parseInt(obj.isAuthorized) ? 1 : 0);
            setCheckBox('checkPrivate2', parseInt(obj.isPrivate) ? 1 : 0);
            setCheckBox('checkCustomised2', parseInt(obj.isEditable) ? 1 : 0);
            $('#textAccessLevelId2').val(obj.accessLevel);
            $('#textPassengerId2').val(obj.passengerId);
            $("#textEmployeeId2").val(obj.employeeId);
            $('#textFirstName2').val(obj.firstName);
            $('#textLastName2').val(obj.lastName);
            $('#textEmail2').val(obj.email);
            $('#textTelePhone2').val(obj.telePhone);
            $('#textMobileNumber2').val(obj.mobilePhone);
            $('#textContactNumber2').val(obj.contactPhone);
            $('#textComment2').val(obj.comment);
            $('#textOwnerId2').val(obj.ownerUserId);
            $('#textisValid2').val(obj.valid);
            $('#textisVip2').val(obj.isVip);
            selectTitleOption(obj.title, 'textTitle2');

            var checkCustomizesRadio = obj.isEditable ? 1 : 0;
            if (checkCustomizesRadio == 1) {
                enableAuthoriseHideContactGroup2();
            } else {
                disableAuthoriseShowContactGroup2();
            }
            var actionType = localStorage.getItem('actionType');
            if (actionType === 'Edit') {
                applyRights();
            }
        });
    }

    function applyRights() {
        var accessLevel2 = localStorage.getItem('myAccessLevel');
        var isEditable = $('#checkCustomised2').prop('checked') ? true : false;
        var isAuthorized = !$('#checkAuthorized2').prop('checked') ? true : false;

        var canEdit = (isEditable && !isAuthorized);
        var user = parseInt(accessLevel2);
        var isExtended = user >= 3;

        if (user == 1) {
            disableFields();
            if (isEditable) {
                enablePrivate2();
                $('#textContactNumberGroup2').hide();
                enableFields();
            } else {
                disablePrivate2();
                $('#textContactNumberGroup2').show();
                disableFields();
            }
            disableCustomAuthorize2();
        } else {
            customChangeAuthorizeAndContactGroup();
            customChangeFields();
        }
    }

    function disablePrivate2() {
        toggleCheckboxByName("checkPrivate2", true);
        //toggleFields(['input[name="checkPrivate2"]'], true);
    }

    function customChangeAuthorizeAndContactGroup() {
        var isVip = localStorage.getItem('isVip') ? 1 : 0;
        var isEditable = $('#checkCustomised2').prop('checked');
        isEditable ? enableAuthoriseHideContactGroup2() : disableAuthoriseShowContactGroup2();
    }
    function customChangeFields() {
        var isEditable = $('#checkCustomised2').prop('checked');
        isEditable ? enableFields() : disableFields();
    }

    function updatePassenger(string) {
        var isCheckedAuthorized = $('#checkAuthorized1').prop('checked');
        var isCheckedPrivate = $('#checkPrivate1').prop('checked');
        var isCheckedCustomised = $('#checkCustomised1').prop('checked');

        var dataToSend = {};
        var currentDateTime = new Date();
        // Format the date and time as desired
        var formattedDateTime = currentDateTime.toLocaleString();
        if (string === "Employee") {

        }
        if (string === "Custom") {
            var isCheckedAuthorized = $('#checkAuthorized2').prop('checked');
            var isCheckedPrivate = $('#checkPrivate2').prop('checked');
            var isCheckedCustomised = $('#checkCustomised2').prop('checked');

            dataToSend = {
                passengerId: parseInt($('#textPassengerId2').val()),
                employeeId: parseInt($("#textEmployeeId2").val()),
                firstName: $('#textFirstName2').val(),
                lastName: $('#textLastName2').val(),
                email: $('#textEmail2').val(),
                telePhone: $('#textTelePhone2').val(),
                mobilePhone: $('#textMobileNumber2').val(),
                contactPhone: $('#textContactNumber2').val(),
                isAuthorized: isCheckedAuthorized ? 1 : 0,
                isPrivate: isCheckedPrivate ? 1 : 0,
                accessLevel: $('#textAccessLevelId2').val(),
                isEditable: isCheckedCustomised ? 1 : 0,
                comments: $('#textComment2').val(),
                modifiedBy: '',
                ownerUserId: parseInt($("#textOwnerId2").val()),
                valid: parseInt($("#textisValid2").val()),
                isVip: parseInt($("#textisVip2").val()),
                createdBy: '',
                timeStamp: formattedDateTime,
                Title: $('#textTitle2').val(),
            };
        }

        $.ajax({
            url: '../Passenger/UpdatePassengers',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                if (response.success) {
                    $('#alert-update-popup').modal('hide');

                    $('#alert-update-green').modal('show');
                    $('#alert-update-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-update-green').modal('hide');
                    }, 3000);

                    if (typeof window.getUpdateRelatimeDropdown === 'function') {
                        getUpdateRelatimeDropdown(localStorage.getItem('element'));
                    }
                } else {
                    $('#alert-norecord-yellow').modal('hide');

                    $('#alert-norecord-yellow modal-body').html('<h4>' + response.message + '</h4>');
                    $('#alert-norecord-yellow').modal('show');
                    $('#alert-norecord-yellow').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-norecord-yellow').modal('hide');
                    }, 5000);
                    if (typeof window.getUpdateRelatimeDropdown === 'function') {
                        getUpdateRelatimeDropdown(localStorage.getItem('element'));
                        
                    }

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error fetching data:', errorThrown);

                // Show the alert with fading effect
                $('.alert').fadeIn();
                // Delay for 5 seconds
                $('.alert').delay(5000).fadeOut();
            }
        });
    }

    function selectTitleOption(selectedOption, targetElementId) {
        var optionsData = [
            { value: 'Mr', text: 'Mr' },
            { value: 'Ms', text: 'Ms' },
            { value: 'Miss', text: 'Miss' },
            { value: 'Mrs', text: 'Mrs' },
            { value: 'Dr', text: 'Dr' },
            { value: 'Pr', text: 'Pr' }
        ];

        var $selectElement = $("#" + targetElementId);
        $selectElement.empty();

        $.each(optionsData, function (index, option) {
            var $option = $('<option>', {
                value: option.value,
                text: option.text // Evaluate the localized text dynamically
            });
            // Set the selected property based on the comparison with id
            $option.prop('selected', option.value === selectedOption);

            // Append the option to the select element
            $selectElement.append($option);
        });
    }
});
